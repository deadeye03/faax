"use client"
import { color } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
function ImageSlide() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true);
    }, [])
    const images = [
        "/men/bag.webp",
        "/men/Hoodies.webp",
        "/men/sweatshirt.jpg",
        "/women/boyfreind.webp",
        "/women/cargo.webp",
        "/women/co-ords.webp",
        "/men/classic.webp",
        "/men/shirts.webp",
        "/men/cargo.webp",
        "/women/dress.webp",
        "/women/oversized.webp",
        "/women/shirt.webp"
    ]

    const style = {
        textAlign: 'center',
        background: '#bbbaba',
        fontSize: '30px',
        borderRadius: '5px'
        // marginRight:'10px'
    }
    const styleNomargin = {
        textAlign: 'center',
        background: '#bbbaba',
        padding: '200px 0',
        fontSize: '30px',
        borderRadius: '5px',
        marginRight: '0'
    }
    return (
        <>
         <Slide slidesToScroll={1} slidesToShow={1} indicators={true} autoplay={true} duration={1000} easing='ease-out' transitionDuration={2000} responsive={[{
            breakpoint: 800,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }]}>
            {images.map((image, i) => {
                return (
                    <div className='p-0 md:p-4' key={`image-${i}`}>
                        <div className='bg-cover h-[25rem] w-80 rounded-md ' style={{ backgroundImage: `url(/img${image})` }}></div>

                    </div>
                )
            })}
        </Slide>
        
      </>
    )
}

export default ImageSlide

