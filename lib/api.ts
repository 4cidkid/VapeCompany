import { SendUserInfoArgs, ApiFetchCommonReturn } from "@/interfaces/interfaces";
import { validateSignUpData } from "@/utils/utils";
import { throwCustomError } from "@/utils/utils";
export async function sendUserInfo({ name, lastname, email, password }: SendUserInfoArgs): Promise<ApiFetchCommonReturn> {
    var userInfoRes: ApiFetchCommonReturn = {
        state: false,
        message: "Something went wrong..."
    }
    try {
        const username = email;
        validateSignUpData(name, lastname, username, password)
        const response = await fetch("/api/sign-up/new", {
            method: "POST",
            body: JSON.stringify({ name, lastname, password, username }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        if (!response.ok && data && data?.message) {
            throwCustomError(data.message)
        } else if (!response.ok) {
            throwCustomError(userInfoRes.message)
        }
        return {
            ...userInfoRes,
            state: true,
            message: "A code was sent to your email"
        }
    } catch (err: any) {
        if (err?.hasOwnProperty('status')) {
            return {
                ...userInfoRes,
                message: err.message
            }
        }
        return userInfoRes;
    }
}

export async function sendUserToken({ token, email }: { token: string, email: string }): Promise<ApiFetchCommonReturn> {
    var userInfoRes: ApiFetchCommonReturn = {
        state: false,
        message: "Something went wrong..."
    }
    try {
        const response = await fetch("/api/sign-up/verify", {
            method: "PUT",
            body: JSON.stringify({ token, email }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        if (!response.ok && data && data?.message) {
            throwCustomError(data.message)
        } else if (!response.ok) {
            throwCustomError(userInfoRes.message)
        }
        return {
            ...userInfoRes,
            state: true,
            message: "User successfully verified!"
        }
    } catch (err: any) {
        if (err?.hasOwnProperty('status')) {
            return {
                ...userInfoRes,
                message: err.message
            }
        }
        return userInfoRes;
    }
}