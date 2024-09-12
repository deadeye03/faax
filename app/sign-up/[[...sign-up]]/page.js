import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='h-[calc(100vh-5rem)] flex justify-center items-center'>
        <SignUp signInUrl='/sign-in' forceRedirectUrl='/'/>

    </div>
  )
}