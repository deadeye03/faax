import Image from 'next/image'
import React from 'react'
export const womenImages=[
  'women/oversized.webp',
  'women/boyfreind.webp',
  'women/co-ords.webp',
  'women/shirt.webp',
  'women/dress.webp',
  'women/cargo.webp',
  'women/jeans.webp',
  'women/joggers.webp',
  'women/shorts.webp',
  'women/pyjama.webp',
  'women/top.webp',
  'women/parachute.webp',
]
function WomenCategories() {

  return (
    <div className='desktop__catogries flex w-full flex-wrap flex-1  justify-center items-center'>
   {Array.from({length:womenImages.length},(_,i)=>{
            return (
                <div key={i} className='min-w-52 bg-slate-200 flex-1 mb-3'>
                  <Image src={`/img/${womenImages[i]}`} height={300} width={300}  className='h-full w-full' alt="women-fashion" />
                </div>
            )
        })}

</div>
  )
}

export default WomenCategories
