"use client"
import React, { useRef, useState } from 'react'
import { Skeleton } from './ui/skeleton'; 
function SpecificationDescription({ isLoading, sizes, product }) {
    const SpecBorderRef = useRef(null);
    const DescBorderRef = useRef(null);
    const [isOpenDesc, setIsOpenDesc] = useState(false)

    const handlSpecBorder = () => {
        DescBorderRef.current.style.borderStyle = 'none'
        SpecBorderRef.current.style.borderBottomStyle = 'solid'
        SpecBorderRef.current.style.borderBottomWidth = '2px'
        setIsOpenDesc(false)
    }
    const handlDescBorder = () => {
        DescBorderRef.current.style.borderBottomStyle = 'solid'
        DescBorderRef.current.style.borderBottomWidth = '2px'
        SpecBorderRef.current.style.borderStyle = 'none'
        setIsOpenDesc(true)
    }
    return (
        <div className="w-full description__box p-4 border rounded-md">
            <div className="buttons gap-5 text-sm flex  mb-4 md:gap-6">
                <button className='font-krona font-bold border-b-2 border-black  md:p-3' ref={SpecBorderRef} onClick={handlSpecBorder} >SPECIFICATION</button>
                <button className='font-krona font-bold border-black  md:p-3' ref={DescBorderRef} onClick={handlDescBorder}>DESCRIPTION</button>
            </div>

            {/* THIS IS MY SPECIFICATION AND DESCRIPTION SECTION */}
            {!isOpenDesc && <div className='grid grid-rows-4 grid-cols-2 grid-flow-col auto-rows-max md:grid-rows-3 md:grid-cols-3 gap-x-3 '>
                {[
                    { label: 'Category', value: product?.category },
                    { label: 'Sub Category', value: product?.tags[0] },
                    { label: 'Size', value: sizes },
                    { label: 'Fabric', value: product?.fabric },
                    { label: 'Gender', value: product?.gender },
                    { label: 'Origin', value: 'India' },
                    { label: 'Brand', value: product?.brand },
                ].map((spec, index) => (
                    <div key={index} className='font-montserrat  flex flex-col gap-1 mb-3'>
                        <div className="signature">{spec.label}</div>
                        <div className="nature font-bold">
                            {/* {isLoading ? <Skeleton className="h-4 w-20" /> : spec.value} */}
                            {spec.value}
                        </div>
                    </div>
                ))}
            </div>}
            {/* IF TRUE THEN MY DESCRIPTION BOX ELSE NOT */}
            {isOpenDesc && <div className='h-[256px] md:h-[192px]'>
                {product?.description}
            </div>}
                

        </div>
    )
}

export default SpecificationDescription
