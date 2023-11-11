'use client';

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react"
import Steps from "./Steps";
import OauthButton from "@/components/OauthButton"
import Link from "next/link"
import { StepsState, PasswordReq, StepOneProps, StepTwoProps, ApiFetchCommonReturn, StepThreeProps } from "@/interfaces/interfaces";
import validator from "validator";
import clsx from "clsx";
import { Toaster, toast } from "react-hot-toast";
import { sendUserInfo, sendUserToken } from "@/lib/api";
import { usePathname, useSearchParams } from 'next/navigation'
import { redirect } from "next/navigation";
export default function SignUpForm() {
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [step, setStep] = useState<number>(0);
    const [showPasswordReq, setShowPasswordReq] = useState<boolean>(false)
    const [stepHover, setStepHover] = useState<StepsState>({
        stepOne: false,
        stepTwo: false,
        stepThree: false
    })
    const [passwordReq, setPasswordReq] = useState<PasswordReq>({
        height: false,
        lower: false,
        upper: false,
        number: false,
        symbol: false
    })
    const [token, setToken] = useState<string>("")
    const [loadingToken, setLoadingToken] = useState<boolean>(true)
    const [redirectUser, setRedirectUser] = useState<boolean>(false)
    useEffect(() => {
        setPasswordReq({
            ...passwordReq,
            height: password.length >= 8,
            lower: validator.matches(password, /[a-z]/),
            upper: validator.matches(password, /[A-Z]/),
            number: validator.matches(password, /[0-9]/),
            symbol: validator.matches(password, /[\W_]/)
        })
    }, [password])
    useEffect(() => {
        const verify = pathName.includes("/verify")
        const email = searchParams.get("email")
        const token = searchParams.get("token")
        if (verify && email && token && validator.isEmail(email)) {
            setEmail(email);
            setToken(token)
            setStep(2)
        }
        if (verify && email && validator.isEmail(email)) {
            setEmail(email)
            setStep(2)
        }
        setLoadingToken(false)

    }, [pathName, searchParams])
    if (redirectUser) {
        redirect("/sign-in")
    }
    return (
        <>
            <Steps stepHover={stepHover} setStepHover={setStepHover} step={step} />
            <div className={clsx(loadingToken && "cursor-wait pointer-events-none ", "min-h-[550px] w-full flex items-center justify-center bg-white")}>
                <Transition show={step === 0}
                    className={"w-full"}
                    enter="transition-all duration-500"
                    enterFrom="opacity-0 scale-0"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-500 absolute left-0 "
                    leaveFrom="opacity-100 scale-100 absolute left-0 "
                    leaveTo="opacity-0 scale-0 absolute absolute left-0 hidden"
                >
                    <StepOne setStep={setStep} showPasswordReq={showPasswordReq} email={email} setEmail={setEmail} password={password} setPassword={setPassword} passwordReq={passwordReq} setShowPasswordReq={setShowPasswordReq} />
                </Transition>
                <Transition show={step === 1}
                    enter="transition-all duration-500"
                    enterFrom="opacity-0 scale-0"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-500 absolute left-0 "
                    leaveFrom="opacity-100 scale-100 absolute left-0 "
                    leaveTo="opacity-0 scale-0 absolute left-0 hidden"
                    className={"w-full"}
                >
                    <StepTwo name={name} lastName={lastName} password={password} email={email} setName={setName} setLastName={setLastName} setStep={setStep} />
                </Transition>
                <Transition show={step === 2}
                    enter="transition-all duration-500"
                    enterFrom="opacity-0 scale-0"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-500 absolute left-0 "
                    leaveFrom="opacity-100 scale-100 absolute left-0 "
                    leaveTo="opacity-0 scale-0 absolute left-0 hidden"
                    className={"w-full"}
                >
                    <StepThree token={token} setToken={setToken} email={email} setRedirectUser={setRedirectUser} />
                </Transition>
            </div>
            <Toaster position="top-right" />
        </>
    )
}


const StepOne = ({ setStep, showPasswordReq, email, setEmail, password, setPassword, passwordReq, setShowPasswordReq }: StepOneProps) => {
    const passwordRef = useRef(null)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password.length < 8 || !validator.matches(password, /[a-z]/) || !validator.matches(password, /[A-Z]/) || !validator.matches(password, /[0-9]/) || !validator.matches(password, /[\W_]/)) {
            return toast.error("Your password is not strong enough")
        }
        setStep((prev) => prev + 1)
    }
    const handleClickOutside = async (e: MouseEvent) => {
        if (e.target !== passwordRef.current && showPasswordReq === true) {
            await new Promise((resolve, reject) => setTimeout(resolve, 500))
            setShowPasswordReq(false)
        } else if (e.target === passwordRef.current && showPasswordReq === false) {
            setShowPasswordReq(true)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showPasswordReq])
    return (
        <>
            <h1 className="text-black font-bold text-3xl capitalize mx-auto mb-8 text-center ">Create an account</h1>

            <form onSubmit={handleSubmit} aria-label="sign in form" className="flex flex-col gap-4 mx-auto w-full child:flex child:flex-col child:gap-1">
                <div>
                    <label htmlFor="email" className="font-extralight">Email address</label>
                    <input autoComplete="email" required value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Enter your email" type="email" name="email" id="email" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                </div>
                <div className="relative">
                    <div className="flex items-center justify-between w-full">
                        <label htmlFor="password" className="font-extralight">Password</label>
                    </div>
                    <input ref={passwordRef} onFocus={() => setShowPasswordReq(true)} required autoCapitalize="off" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Enter your password" type="password" name="password" id="password" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                    <Transition enter="transition-[max-height] duration-300 ease-in-out"

                        enterFrom="max-h-[0px]"
                        enterTo="max-h-40"
                        leave="transition-[max-height] duration-75 ease-in-out"
                        leaveFrom="max-h-40"
                        leaveTo="max-h-[0px]" as={"ul"} show={showPasswordReq} className={"top-full absolute overflow-hidden flex flex-col gap-2 pt-3 list-disc list-inside"}>
                        <li className={clsx(passwordReq.height ? "text-primary-500" : "text-[rgba(0,0,0,0.6)]", "transition-colors")}>At least 8 characters long</li>
                        <li className={clsx(passwordReq.lower ? "text-primary-500" : "text-[rgba(0,0,0,0.6)]", "transition-colors")}>At least one lower case letter</li>
                        <li className={clsx(passwordReq.upper ? "text-primary-500" : "text-[rgba(0,0,0,0.6)]", "transition-colors")}>At least one upper case letter</li>
                        <li className={clsx(passwordReq.number ? "text-primary-500" : "text-[rgba(0,0,0,0.6)]", "transition-colors")}>At least one number</li>
                        <li className={clsx(passwordReq.symbol ? "text-primary-500" : "text-[rgba(0,0,0,0.6)]", "transition-colors")}>At least one special symbol</li>
                    </Transition>
                </div>


                <button type="submit" className={clsx(showPasswordReq ? " translate-y-40 " : "translate-y-0", "relative transition-all mt-3 flex items-center justify-center py-2 bg-primary-500 hover:bg-primary-600  w-full text-lg font-medium text-white rounded-md shadow-sm")}>
                    Sign up
                </button>

            </form>



            <div className={clsx(showPasswordReq && "opacity-0 pointer-events-none z-[-1]")}>
                <div className="flex flex-col gap-6  w-full ">
                    <div className="whitespace-nowrap w-full  mx-auto flex items-center gap-3 mt-4">
                        <div className="w-full h-[2px] bg-[rgba(0,0,0,0.19)]">

                        </div>
                        <span className="w-full flex items-center justify-center">Or continue with</span>
                        <div className="w-full h-[2px] bg-[rgba(0,0,0,0.19)]">

                        </div>
                    </div>
                    <OauthButton className="bg-white hover:bg-[rgba(250,248,248,0.88)] transition-colors border border-[rgba(0,0,0,0.27)]" provider={"google"} text={"Sign up with Google"} />
                    <OauthButton className="bg-black hover:bg-[rgba(0,0,0,0.7)] transition-colors text-white" provider={"github"} text={"Sign up with Github"} />
                </div>
                <Link className="whitespace-nowrap absolute left-2/4 -translate-x-2/4 -bottom-24 font-extralight" href={"/sign-in"}>
                    <span className="text-[rgba(0,0,0,0.46)]">Already a member?</span> <strong className="text-primary-500">Sign in</strong>
                </Link>

            </div>
        </>
    )
}

const StepTwo = ({ name, lastName, password, email, setName, setLastName, setStep }: StepTwoProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (!validator.isAlpha(name) || !validator.isAlpha(lastName)) {
            return toast.error("Name and Last name can only contain letters");
        }
        const infoToSend = {
            name,
            lastname: lastName,
            email,
            password
        }
        var toastId = toast.loading("Signing up....")
        const result: ApiFetchCommonReturn = await sendUserInfo(infoToSend)
        if (result.state) {
            toast.success(result.message, {
                id: toastId
            })
            return setStep((prev) => prev + 1)
        }else if(result.message === 'Account not verified'){
            toast.error("You need to verify your account",{
                id:toastId
            })
            setStep(2);
        } else {
            toast.error(result.message, {
                id: toastId
            })
            return;
        }
    }
    return (
        <>
            <h1 className="text-black font-bold text-3xl capitalize mx-auto mb-8 text-center ">Enter your personal information</h1>
            <form onSubmit={handleSubmit} aria-label="enter personal information form" className="flex flex-col gap-4 mx-auto w-full child:flex child:flex-col child:gap-1">
                <div>
                    <label htmlFor="name" className="font-extralight">Name</label>
                    <input required value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Enter your name" type="text" name="name" id="name" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                </div>
                <div className="relative">
                    <label htmlFor="lastname" className="font-extralight">Last name</label>
                    <input required value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} placeholder="Enter your last name" type="text" name="lastname" id="lastname" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                </div>

                <button className={"relative transition-all mt-3 flex items-center justify-center py-2 bg-primary-500 hover:bg-primary-600  w-full text-lg font-medium text-white rounded-md shadow-sm"}>
                    Continue
                </button>
                <button aria-label="go back to step one" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault()
                    setStep((prev) => prev - 1)
                }} type="submit" className={"relative transition-all mt-3 flex items-center justify-center py-2 text-text border border-[rgba(0,0,0,0.5)] hover:bg-[rgba(244,243,243,0.8)]  w-full text-lg font-medium  rounded-md shadow-sm"}>
                    Go back
                </button>
            </form>
        </>
    )
}

const StepThree = ({ token, setToken, email, setRedirectUser }: StepThreeProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const toastId = toast.loading("Sending token....")
        if (!token) {
            toast.error("You need to enter a token");
        }
        console.log(email)
        if (!validator.isEmail(email)) {
            toast.error("You need to enter a valid email")
        }
        const result: ApiFetchCommonReturn = await sendUserToken({ token, email })
        if (!result.state) {
            toast.error(result.message, {
                id: toastId
            })
            return;
        }
        toast.success(result.message, {
            icon: "👏",
            id: toastId
        })
        await new Promise((resolve, reject) => setTimeout(resolve, 800))
        setRedirectUser(true)
    }
    return (
        <>
            <h1 className="text-black font-bold text-3xl capitalize mx-auto mb-8 text-center ">Verify your account</h1>
            <form onSubmit={handleSubmit} aria-label="Verify your account" className="flex flex-col gap-4 mx-auto w-full child:flex child:flex-col child:gap-1">
                <div>
                    <label htmlFor="token" className="font-extralight">Code</label>
                    <input required value={token} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)} placeholder="Enter your verification code" type="text" name="text" id="text" className="focus-visible:outline-primary-400 pl-2 w-full border border-[rgba(0,0,0,0.27)] rounded-md py-2 shadow-sm" />
                    <button type="submit" className={"relative transition-all mt-3 flex items-center justify-center py-2 bg-primary-500 hover:bg-primary-600  w-full text-lg font-medium text-white rounded-md shadow-sm"}>
                        Verify your account
                    </button>
                </div>
            </form>
        </>
    )
}