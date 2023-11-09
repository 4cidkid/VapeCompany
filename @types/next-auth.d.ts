import { DefaultSession } from "next-auth"
import NextAuth from "next-auth/next"

declare module "next-auth"{
    interface Profile{
        avatar_url: string | null,
        picture: string | null,
    }
    interface Token{
        name: string,
        lastname: string,
        email: string,
        points: number,
        image: string
    }
    interface User{
        name: string,
        lastname: string,
        email: string,
        points: number,
        image: string
    }
    interface Session{
        user:User & {
            email: string,
            name: string,
            lastname: string
            points: number
        } & DefaultSession["user"]
    }
}