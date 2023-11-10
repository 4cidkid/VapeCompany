import Image from "next/image"
import Logo from "@/components/logo"
import Link from "next/link"
import SignInButton from "@/components/signInButton"
export default function SignUp() {
    return (
        <>
            <section className="flex items-center text-text">
                <Logo className="max-md:hidden absolute left-5 top-5 z-10 text-3xl opacity-60" />
                <div className="max-sm:hidden max-md:w-1/5 w-2/5 h-screen relative">
                    <div className="bg-primary-700 w-full h-full brightness-75">
                        <Image width={1000} height={800} className="w-full h-full object-cover mix-blend-luminosity" src={"https://cdn.nicotordev.com/files/557e9134-040e-4cd4-aa28-ce8f6906367e.webp"} alt="sign-up image" />
                    </div>
                </div>
                <div className="p-4 max-sm:w-full max-md:w-4/5 relative w-3/5 bg-white h-screen flex items-center justify-center">
                    <div className="max-sm:w-full sm:w-1/2 sm:min-w-[400px]  flex flex-col gap-5 justify-center mb-12">
                        <Logo className="text-primary-500 md:hidden text-5xl text-center w-full" />

                        <h1 className="text-black font-bold text-3xl capitalize mx-auto mb-8 text-center ">Sign in to your account</h1>
                        <main>
                            <form aria-aria-label="sign in form" className="flex flex-col gap-4 mx-auto w-full child:flex child:flex-col child:gap-1">
                                <div>
                                    <label htmlFor="email" className=" font-extralight">Email address</label>
                                    <input placeholder="Enter your email" type="email" name="email" id="email" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                                </div>
                                <div className="relative">
                                    <div className="flex items-center justify-between w-full">
                                        <label htmlFor="password" className="font-extralight">Password</label>
                                        <Link className="text-primary-500" href="/forgot-password">Forgot password?</Link>
                                    </div>
                                    <input placeholder="Enter your email" type="password" name="password" id="password" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                                </div>
                                <button type="submit" className="mt-3 flex items-center justify-center py-2 bg-primary-500 hover:bg-primary-600 transition-colors  w-full text-lg font-medium text-white rounded-md shadow-sm">
                                    Sign in
                                </button>
                            </form>
                        </main>
                        <div className="flex flex-col gap-6  w-full ">
                            <div className="whitespace-nowrap w-full  mx-auto flex items-center gap-3 mt-4">
                                <div className="w-full h-[2px] bg-[rgba(0,0,0,0.19)]">

                                </div>
                                <span className="w-full flex items-center justify-center">Or continue with</span>
                                <div className="w-full h-[2px] bg-[rgba(0,0,0,0.19)]">

                                </div>
                            </div>
                            <SignInButton className="bg-white hover:bg-[rgba(250,248,248,0.88)] transition-colors border border-[rgba(0,0,0,0.27)]" provider={"google"} text={"Sign in with Google"} />
                            <SignInButton className="bg-black hover:bg-[rgba(0,0,0,0.7)] transition-colors text-white" provider={"github"} text={"Sign in with Github"} />
                        </div>
                        <Link className="whitespace-nowrap absolute left-2/4 -translate-x-2/4 bottom-14 font-extralight" href={"/sign-up"}>
                            Not a member? <strong className="text-primary-500">Sign up today</strong>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}