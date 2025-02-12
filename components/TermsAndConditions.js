import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className="terms w-full p-4  text-sm font-montserrat md:p-28">
                <h1 className='text-center text-3xl  font-bold text-gray-300' > Termas & Condition</h1>
                <ol className='flex flex-col gap-6 text-2xl list-decimal list-inside text-slate-400'>

                <li className="text-2xl text-white mb-4 lh-n">Introduction:</li>
                   <p className='mb-0'>Welcome to <strong>FAAX</strong> Fashion. By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.</p>

                <li className="text-2xl text-white mb-0 lh-n">Service Provided:</li>
                    <p> We provide clothing delivery within 50 minutes to our customers. You can choose between two delivery options:</p>
                   <li className='mb-0 pl-4'  ><strong> Trial on Return</strong>  You can try on clothes at home for 15 minutes for free. After the first 15 minutes, you will be charged Rs. 20 for an additional 5 minutes, and Rs. 30 for the final 10 minutes. After 30 minutes, returns or exchanges will not be accepted.</li>
                   <li className='mb-0 pl-4' ><strong>Standard Delivery:</strong>  You can return or exchange products within 7 days without paying any instant delivery fees.</li>
                   <p>Delivery times may vary depending on traffic conditions and the customer’s location. </p>

                <li className="header__secondary--1 text-white mb-0 lh-n">Payments</li>
                   <p className='mb-0'>Users must make full payment for products and any additional charges related to delivery or trial time during the checkout process.</p>

                <li className="header__secondary--1 text-white mb-6 lh-n"> Return & Exchange Policy</li>
                   <li className='pl-4 ' > For <strong>Trial on Return:</strong>  If you don’t like the product or there is a fitting issue, you can return it within 30 minutes, and the delivery boy will accept the return. No returns or exchanges are accepted after the 30-minute period.</li>
                   <li className='pl-4 list-decimal' > For <strong>Standard Delivery:</strong>   You can return or exchange your product within 7 days. <br/> If you wish to exchange the product for a better fit instantly, a delivery fee will be charged, based on your distance (minimum Rs. 50). </li>

                <li className="header__secondary--1 text-white mb-6 lh-n">User Responsibilities</li>
                   <p className='mb-0'>As a user, you are responsible for providing accurate delivery information and ensuring that you are available to accept the delivery within the estimated delivery time.</p>

                <li className="header__secondary--1 text-white mb-6 lh-n">Liability</li>
                   <p className='mb-0'>We are not liable for any delays caused by traffic conditions, weather, or other external factors beyond our control. Our liability is limited to the value of the products purchased.</p>

                <li className="header__secondary--1 text-white mb-6 lh-n">Amendments to Terms</li>
                   <p className='mb-0'>We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website.</p>


                </ol>
            </div>
    
  )
}

export default TermsAndConditions
