import React from 'react'
import Image from 'next/image'
export const menImages=[
  'men/oversized.webp',
  'men/Hoodies.webp',
  'men/shirts.webp',
  'men/classic.webp',
  'men/sweatshirt.jpg',
  'men/cargo.webp',
  'men/jeans.webp',
  'men/joggers.webp',
  'men/pants.webp',
  'men/pyjamas.webp',
  'men/bag.webp',
  'men/slider.webp',
]
function MenCategories() {
  return (
    <div className='desktop__catogries flex w-full flex-wrap flex-1  justify-center items-center'>
        {Array.from({length:menImages.length},(_,i)=>{
            return (
                <div key={i} className='min-w-52 bg-slate-200 flex-1 mb-3'>
                  <Image src={`/img/${menImages[i]}`} height={300} width={300}  className='h-ful w-full' alt="men-fashion" />
                </div>
            )
        })}

    </div>
  )
}

export default MenCategories
