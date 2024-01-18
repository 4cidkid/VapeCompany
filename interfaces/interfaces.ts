import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Toast } from "react-hot-toast";
export interface SignUpBody {
    name: string,
    lastname: string
    username: string, //email
    password: string
}

export interface StepTextProps {
    text: string;
    ref?: React.Ref<HTMLSpanElement>;
}
export interface StepsState {
    stepOne: boolean,
    stepTwo: boolean,
    stepThree: boolean
}
export interface StepsProps {
    step: number,
    stepHover: StepsState,
    setStepHover: Dispatch<SetStateAction<StepsState>>
}
export interface PasswordReq {
    height: boolean,
    lower: boolean,
    upper: boolean,
    number: boolean,
    symbol: boolean
}
export interface StepOneProps {
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    password: string
    setPassword: Dispatch<SetStateAction<string>>,
    passwordReq: PasswordReq
    showPasswordReq: boolean
    setShowPasswordReq: Dispatch<SetStateAction<boolean>>,
    setStep: Dispatch<SetStateAction<number>>
}
export interface StepTwoProps {
    name: string,
    lastName: string,
    password: string,
    email: string,
    setName: Dispatch<SetStateAction<string>>,
    setLastName: Dispatch<SetStateAction<string>>,
    setStep: Dispatch<SetStateAction<number>>
}
export interface SendUserInfoArgs {
    name: string
    lastname: string
    email: string
    password: string,
}
export interface ApiFetchCommonReturn {
    state: boolean,
    message: string
}
export interface StepThreeProps {
    token: string,
    email: string
    setToken: Dispatch<SetStateAction<string>>,
    setRedirectUser: Dispatch<SetStateAction<boolean>>
}

export interface RequestData {
    sender: {
        name: string,
        email: string,
    }
    to: Array<{
        email: string,
        name?: string
    }>,
    subject: string,
    templateId: number
    params: {
        [key: string]: string
    }
}
export interface CategoriesProps {
    categories: {
        name: string,
        image: string
    }[],
}
export interface ButtonProps {
    className?: string,
    ariaLabel?: string,
    text: string | JSX.Element
    link?: string
}
export interface Product {
    id: number,
    name: string,
    price: number,
    image: string | StaticImageData,
}
export interface Brands {
    id: number,
    name: string,
    image: string | StaticImageData,
}