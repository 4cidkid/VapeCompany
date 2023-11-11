
import { SignUpBody, RequestData } from "@interfaces"
import { httpStatus } from "@/constants/httpStatus";
import { throwCustomError, validateSignUpData } from "@/utils/utils";
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma";
import { generateVerificationCode } from "@/utils/utils";
export async function POST(request: Request): Promise<Response> {
    let createdUser = null;
    let createdToken = null;
    try {
        const body: SignUpBody = await request.json();

        // get body data & validate
        const { name, lastname, username, password } = body;
        validateSignUpData(name, lastname, username, password)

        // check if email already exist
        const emailExist = await prisma.user.findFirst({
            where: { email: username }
        })

        if (emailExist?.id) {
            if(!emailExist.emailVerified){
                throwCustomError('Account not verified', httpStatus.http_status_conflict)
            }else{
                throwCustomError('The email is already taken', httpStatus.http_status_conflict)

            }
        }

        // hash pwd with bcrypt
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        // create our user in db
        createdUser = await prisma.user.create({
            data: {
                email: username,
                name: name,
                lastname: lastname,
                password: passwordHash
            }
        })
        // add a verification token
        const token = generateVerificationCode();
        const thirtyDays = new Date()
        thirtyDays.setDate(thirtyDays.getDate() + 30)
        createdToken = await prisma.verificationRequest.create({
            data: {
                identifier: generateVerificationCode(),
                token: token,
                expires: thirtyDays,
                userId: createdUser.id
            }
        })
        const requestData: RequestData = {
            sender: {
                name: "VapeCompany",
                email: "no-reply@vapecompany.nicotordev.com"
            },
            to: [
                {
                    email: username,
                    name: name + " " + lastname
                }
            ],
            subject: "Verify your account",
            templateId: 2,
            params: {
                code: token,
                verifyLink: String(process.env.SITE_URL+"/sign-up/verify?email="+username+"&token="+token)
            }
        }

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'api-key': String(process.env.BREVO_KEY),
                'Content-type': "application/json",
            },
            body: JSON.stringify(requestData)
        })
        const data = response.json()
        if (!createdUser || !createdToken || !response.ok) {
            throwCustomError("We couldn't create the user or the token")
        }
        return Response.json({
            user: {
                id: createdUser.id,
                username: createdUser.email,
                name: createdUser.name,
                lastname: createdUser.lastname,
                points: createdUser.points,
                image: createdUser.image
            }
        }, {
            status: httpStatus.http_status_created
        })
    } catch (error: any) {
        console.error(error)
        if (createdUser) {
            await prisma.user.delete({
                where: {
                    id: createdUser.id
                }
            })
        }
        if (error?.hasOwnProperty('status')) /* custom error */ {
            
            return Response.json({
                message: error.message
            }, {
                status: error.status
            })
        } else /* common error */ {
            return Response.json({
                message: httpStatus.http_message_internal_server_error
            }, {
                status: httpStatus.http_status_internal_server_error
            })
        }
    }
}

