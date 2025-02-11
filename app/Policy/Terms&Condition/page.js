import React from 'react'
// import dynamic from 'next/dynamic';
// const TermsAndConditions = dynamic(() => import('@/components/TermsAndConditions'), { ssr: false });
import TermsAndConditions from '@/components/TermsAndConditions'
function page() {
  return (   
      <>
      <TermsAndConditions/>
      </>
  )
}

export default page
