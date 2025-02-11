import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='h-[calc(100vh-5rem)] relative flex flex-col gap-1 justify-center items-center bg-white'>
      <h1 className='text-red-500 font-montserrat '>Otp Will be Send on Whatsapp OR number</h1>
      <SignIn signUpUrl='/sign-up' forceRedirectUrl='/'/>
      <div className='text-red-800 absolute bg-white h-[90px] flex justify-center items-center w-full z-50 bottom-[65px] md:bottom-[35px] ' >
        If You have not account please sign up first
      </div>
    </div>
  )
}