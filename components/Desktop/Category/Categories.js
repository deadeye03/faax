import React from 'react'
import MenCategories from './MenCategories'
import WomenCategories from './WomenCategories'

function Categories() {
 
  return (
    <>
    <div>
      <h1 className='text-center text-2xl font-bold font-serif my-4 '>Shop by Category- Men</h1>
      <MenCategories/>
    </div>
    <div>
      <h1 className='text-center text-2xl font-bold font-serif my-4 '>Shop by Category- Women</h1>
      <WomenCategories/>
    </div>
    </>
  )
}

export default Categories
