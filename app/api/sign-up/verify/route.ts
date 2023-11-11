import { NextRequest, NextResponse } from "next/server";
import { httpStatus } from "@/constants/httpStatus";
import { throwCustomError } from "@/utils/utils";
import validator from "validator";
import prisma from "@/lib/prisma";
export async function PUT(request: NextRequest) {
    try {
        const data = await request.json()
        const { token, email } = data;
        if (!token || !email) {
            throwCustomError("Data or email wasn't present on the request", 400)
        }
        if (!validator.isEmail(email)) {
            throwCustomError("You need to enter a valid email", 400)
        }
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            throwCustomError("The email or the token was incorrect", 401);
        }
        const tokenDB = await prisma.verificationRequest.findUnique({
            where: {
                userId: user?.id
            }
        })
        if (token === tokenDB?.token) {
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    emailVerified: new Date()
                }
            })
            return NextResponse.json({
                message: "User verified successfully"
            }, {
                status: 200
            })
        } else {
            throwCustomError("The email or the token was incorrect", 401);
        }


    } catch (error: any) {
        console.error(error)
        if (error?.hasOwnProperty('status')) /* custom error */ {
            return NextResponse.json({
                message: error.message
            }, {
                status: error.status
            })
        } else /* common error */ {
            return NextResponse.json({
                message: httpStatus.http_message_internal_server_error
            }, {
                status: httpStatus.http_status_internal_server_error
            })
        }
    }
}