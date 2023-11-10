import Image from "next/image"
import SignUpForm from "@/components/signUpForm"
import Logo from "@/components/logo"
export default function SignUp() {
    return (
        <section>
            <div className="relative flex items-center h-screen overflow-hidden">
                <div className="w-3/5 h-screen bg-white flex  items-center justify-center">
                    <div className="relative max-sm:w-full sm:w-1/2 sm:min-w-[400px]">
                        <main className="">
                            <SignUpForm />
                        </main>
              
                    </div>
                </div>
                <Logo className="absolute top-5 right-52 text-3xl brightness-50 hover:brightness-100 z-50 transition-[filter] duration-500" />
                <div className="relative w-[40%] h-full brightness-50 saturate-150">
                    
                    <Image src={"https://cdn.nicotordev.com/files/be4b5d51-8493-4f9b-a19b-d3693777b6e7.webp"} width={1000} height={800} className="w-full h-full object-cover" alt="sign up image" />
                </div>
            </div>
        </section>
    )
}