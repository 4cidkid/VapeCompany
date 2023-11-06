import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prisma";
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
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
                const passwordMatch = await bcrypt.compare(password, user.password) // check introduced password vs hash password
                if (passwordMatch) {
                    return {
                        id: user.id,
                        name: user.name ?? "",
                        lastname: user.lastname ?? "",
                        email: user.email,
                        points: user.points ?? 0,
                        image: user.image ?? ""
                    } // return only neccesary data
                } else {
                    throw new Error('The password isn\'t correct');
                }
            },

        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    points: user.points
                }
            }
            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    email: token.email,
                    name: token.name,
                    lastname: token.lastname,
                    points: token.points
                }
            }
        }
    }
}
