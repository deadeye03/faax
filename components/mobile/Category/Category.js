'use client'

import React from 'react'

import CardCategory from './MenCategory'
import WomenCategory from './WomenCategory'



const cardData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  content: `Card ${i + 1}`
}))

export default function Category() {

  return (
    <>
      {/* Men section Category */}
      <img src="/icon/category-men.jpg" alt="men" />
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* IMPORT fROM CARDCATEGORY */}
        <CardCategory />
      </div>

      {/* WOMEN SECTION */}
      <img src="/icon/category-women.jpg" alt="women" />
      <div className="w-full max-w-4xl mx-auto p-4">
        <WomenCategory/>
      </div>
    </>
  )
}