import { Transition } from "@headlessui/react"
import { Fragment, forwardRef } from "react"
import { StepTextProps, StepsProps } from "@interfaces"
export default function Steps({ stepHover, setStepHover, step }: StepsProps) {
    return (
        <div className="flex items-center justify-between absolute -top-14 w-full">
            <div onMouseEnter={() => setStepHover({ ...stepHover, stepOne: true })} onMouseLeave={() => setStepHover({ ...stepHover, stepOne: step === 0 ? true : false })} className="relative border border-[rgba(0,0,0,0.75)] rounded-full w-8 h-8 flex shrink-0 items-center justify-center">
                <Transition as={Fragment} show={stepHover.stepOne || step === 0}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <StepText text={"Email and Password"} />
                </Transition>
                <Transition as={Fragment} show={step === 0} enter="transition-transform duration-300"
                    enterFrom="scale-0"
                    enterTo="scale-100"
                    leave="transition-scale duration-150"
                    leaveFrom="scale-100"
                    leaveTo="scale-0">
                    <BlueCircles />
                </Transition>
            </div>
            <div className="w-full h-[2px] bg-[rgba(0,0,0,0.4)]">

            </div>
            <div onMouseEnter={() => setStepHover({ ...stepHover, stepTwo: true })} onMouseLeave={() => setStepHover({ ...stepHover, stepTwo: step === 1 ? true : false })} className="relative border border-[rgba(0,0,0,0.75)] rounded-full w-8 h-8 flex shrink-0 items-center justify-center">
                <Transition as={Fragment} show={stepHover.stepTwo || step === 1}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <StepText text={"Personal Information"} />
                </Transition>
                <Transition as={Fragment} show={step === 1} enter="transition-transform duration-300"
                    enterFrom="scale-0"
                    enterTo="scale-100"
                    leave="transition-scale duration-150"
                    leaveFrom="scale-100"
                    leaveTo="scale-0">
                    <BlueCircles />
                </Transition>
            </div>
            <div className="w-full h-[2px] bg-[rgba(0,0,0,0.4)]">

            </div>
            <div onMouseEnter={() => setStepHover({ ...stepHover, stepThree: true })} onMouseLeave={() => setStepHover({ ...stepHover, stepThree: step === 2 ? true : false })} className="relative border border-[rgba(0,0,0,0.75)] rounded-full w-8 h-8 flex shrink-0 items-center justify-center">
                <Transition as={Fragment} show={stepHover.stepThree || step === 2}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <StepText text={"Confirm your email"} />
                </Transition>
                <Transition as={Fragment} show={step === 2} enter="transition-transform duration-300"
                    enterFrom="scale-0"
                    enterTo="scale-100"
                    leave="transition-scale duration-150"
                    leaveFrom="scale-100"
                    leaveTo="scale-0">
                    <BlueCircles />
                </Transition>
            </div>
        </div>
    )
}

const BlueCircles = forwardRef<HTMLDivElement, { ref?: React.Ref<HTMLDivElement> }>(function (props, ref) {
    return (
        <div ref={ref} className="w-5 h-5 bg-primary-500 rounded-full">
        </div>
    )
})

const StepText = forwardRef<HTMLSpanElement, StepTextProps>((props, ref) => {
    return (
        <span className="absolute bottom-full -translate-x-2/4 left-2/4 whitespace-nowrap" ref={ref}>
            {props.text}
        </span>
    )
})


BlueCircles.displayName = "BlueCircles";
StepText.displayName = "StepText";