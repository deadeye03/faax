import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='relative h-[calc(100vh-5rem)] flex flex-col gap-1 justify-center items-center'>
      <h1 className='text-red-500 font-montserrat '>Otp Will be Send on Whatsapp OR number</h1>
        <SignUp signInUrl='/sign-in' forceRedirectUrl='/'/>
        <div className='text-red-800 absolute bg-white h-[90px] flex justify-center items-center w-full z-50 -bottom-16' >
        If You have Already account please Sign-in
      </div>
    </div>
  )
}