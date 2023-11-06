
import { SignUpBody } from "@interfaces"
import { httpStatus } from "@/constants/httpStatus";
import { throwCustomError, validateSignUpData } from "@/utils/utils";
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma";
export async function POST(request: Request): Promise<Response> {
    try {

        const body: SignUpBody = await request.json();

        // get body data & validate
        const { name, lastname, username, password } = body;
        validateSignUpData(name, lastname, username, password)

        // check if email already exist
        const emailExist: Boolean = await prisma.user.findFirst({
            where: { email: username }
        }) ? true : false;

        if (emailExist) {
            throwCustomError('The email is already taken', httpStatus.http_status_conflict)
        }

        // hash pwd with bcrypt
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        // create our user in db
        const { password: newUserPassword, ...user } = await prisma.user.create({
            data: {
                email: username,
                name: name,
                lastname: lastname,
                password: passwordHash
            }
        })

        return Response.json({
            user: user
        }, {
            status: httpStatus.http_status_created
        })
    } catch (error: any) {
        console.error(error)
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