'use client';
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import { RedirectType, redirect } from "next/navigation";
export default function SignInForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [shouldRedirect,setShouldRedirect] = useState<boolean>(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validator.isEmail(email)) {
            return toast.error("Please enter a valid email address");
        }
        const toastId = toast.loading("Signing in....")
        const result = await signIn("credentials", {
            redirect: false,
            username: email,
            password
        },

        )
        if (result && result.ok) {
            toast.success("Successfully signed in", {
                id: toastId
            })
            await new Promise((resolve, reject) => setTimeout(resolve, 1500));
            toast("You will be redirected in 5", {
                icon: '⏰',
                id: toastId
            })
            await new Promise((resolve, reject) => setTimeout(resolve, 1000));

            for (let i = 4; i > 0; i--) {
                toast("You will be redirected in " + i, {
                    icon: '⏰',
                    id: toastId
                })
                await new Promise((resolve, reject) => setTimeout(resolve, 1000));
            }
            setShouldRedirect(true)
        } else if (result && result.error) {
            toast.error(result.error, {
                id: toastId
            })
        } else {
            toast.error("There was an error signing in", {
                id: toastId
            })
        }

    }
    if(shouldRedirect){
        return redirect("/")
    }
    return (
        <>
            <form onSubmit={handleSubmit} autoComplete="email" aria-label="sign in form" className="flex flex-col gap-4 mx-auto w-full child:flex child:flex-col child:gap-1">
                <div>
                    <label htmlFor="email" className="font-extralight">Email address</label>
                    <input required value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Enter your email" type="email" name="email" id="email" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                </div>
                <div className="relative">
                    <div className="flex items-center justify-between w-full">
                        <label htmlFor="password" className="font-extralight">Password</label>
                        <Link className="text-primary-500" href="/forgot-password">Forgot password?</Link>
                    </div>
                    <input required autoCapitalize="off" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Enter your password" type="password" name="password" id="password" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                </div>
                <button className="mt-3 flex items-center justify-center py-2 bg-primary-500 hover:bg-primary-600 transition-colors  w-full text-lg font-medium text-white rounded-md shadow-sm">
                    Sign in
                </button>
            </form>
            <Toaster position="top-right" />
        </>
    )
}