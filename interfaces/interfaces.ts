import NextAuth from "next-auth/next"
export interface SignUpBody {
    name: string,
    lastname: string
    username: string, //email
    password: string
}

declare module "next-auth"{
    interface User{
        email:string,
        name: string,
        lastname: string
        points: number
    }
    interface Session{
        user:User & {
            email: string,
            name: string,
            lastname: string
            points: number
        }
        token:{
            email: string
            name: string,
            lastname: string
            points: number
        }
    }
}