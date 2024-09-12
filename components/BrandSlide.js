import React from 'react'

function BrandSlide() {
    return (
        <div className='brand-container flex justify-start items-center gap-3 overflow-x-scroll scroll-smooth  pb-4   md:gap-10 md:justify-center'>
            {Array.from({ length: 9 }, (_, i) => {
                return (
                    <div key={i} className="circle min-h-20 min-w-20 flex justify-center items-center rounded-full bg-slate-400">
                        ZARA
                    </div>
                )
            })}


        </div>
    )
}

export default BrandSlide
