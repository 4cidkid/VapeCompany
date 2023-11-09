import {  NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prisma";
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"


const githubProvider = GitHubProvider({
    clientId: String(process.env.GITHUB_ID),
    clientSecret: String(process.env.GITHUB_SECRET),
    allowDangerousEmailAccountLinking: true,

})

const googleProvider = GoogleProvider({
    clientId: String(process.env.GOOGLE_ID),
    clientSecret: String(process.env.GOOGLE_SECRET),
    allowDangerousEmailAccountLinking: true,

})


const credentialsProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith", name: "username" },
        password: { label: "Password", type: "password", name: "password" }
    },
    async authorize(credentials, req) {
        // if no username or no password return null ( error )
        if (!credentials?.username || !credentials?.password) {
            // create a message indicating which properties are missing
            const missingProperties = [!credentials?.username ? 'Email' : '', !credentials?.password ? 'Password' : ''].filter(Boolean).join('and ')
            throw new Error('The following properties are missing: ' + missingProperties);
        }
        const { username, password } = credentials; // get username & password from credentials

        const user = await prisma.user.findUnique({
            where: { email: username }
        })
        if (!user)/* user doesn't exist */ {
            throw new Error('The email or password isn\'t correct');
        }
        if (user && user.password) {
            const passwordMatch = await bcrypt.compare(password, user.password) // check introduced password vs hash password
            if (passwordMatch) {
                return {
                    id: user.id,
                    name: user.name ?? "",
                    lastname: user.lastname ?? "",
                    email: user.email,
                    points: user.points ?? 0,
                    image: user.image ?? "",
                    role: user.role ?? "user",
                } // return only neccesary data
            } else {
                throw new Error('The password isn\'t correct');
            }
        } else {
            throw new Error('We couldn\'t recover your password');
        }
    },

})



export const authOptions: NextAuthOptions = {
    providers: [
        credentialsProvider,
        githubProvider,
        googleProvider
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn: "/sign-in",
        error: "/sign-in",
        signOut: "/",
    },
    callbacks: {
        async signIn({ user, profile, account }) {
            // check if user is from google or github
            if (account?.provider === "google" || account?.provider === "github") {
                if (profile?.email) {
                    // check if user exist
                    const userExist = await prisma.user.findUnique({
                        where: { email: profile.email }
                    })
                    const image = account.provider === "google" ? profile?.picture : profile?.avatar_url
                    // if user exist and has image return true 
                    if (userExist) {
                        if (userExist.image) {
                            return true;
                        }
                        // if user exist but doesn't have image update image
                        await prisma.user.update({
                            where: { email: profile.email },
                            data: {
                                image: image
                            }
                        })
                        return true;
                    } else {
                        // if user doesn't exist create user
                        const newUser = await prisma.user.create({
                            data: {
                                email: profile.email,
                                name: profile.name,
                                image: image
                            }
                        })
                        // if user is created return true
                        if (newUser) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                }
            }
            return true;
        },
        async jwt({ token, user }) {
            let userFromDB;
            if (!user && token?.email) {
                userFromDB = await prisma.user.findUnique({
                    where: { email: token.email }
                })
                if (!userFromDB) {
                    throw new Error("User isn't registered")
                }
                token.points = userFromDB?.points ?? 0;
                token.lastname = userFromDB?.lastname ?? "";
                token.role = userFromDB?.role ?? "user";
            } else {
                token.points = user.points ?? 0;
                token.lastname = user.lastname ?? "";
                token.role = user.role ?? "user";
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    points: token.points ?? 0,
                    lastname: token.lastname ?? "",
                    role: token.role ?? "user",
                }
            };
        },

    },
}