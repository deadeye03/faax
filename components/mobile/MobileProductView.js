'use client'
import Image from '../Image';
import React, { useEffect, useState } from 'react'
import { Slide, Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ItemTitleDetails from '../ItemTitleDetails';
import ChooseSize from '../ChooseSize';
import SpecificationDescription from '../SpecificationDescription';
import PromiseSection from '../PromiseSection';
import CartButtons from '../CartButtons';



function MobileProductView({product}) {
    const indicators = (index) => (<div className="indicator" style={{
        margin: '5px',
        height: '50px',
        width: '50px',
        background: 'blue',
        marginBottom:'20px'
    }}><Image path={`/${product?.images[index]}`} height={30} width={30} className='h-full w-full object-cover object-top'  alt='index-image'/> </div>);
 
    const [sizes, setSizes] = useState("M")
   
    const isLoading = !product

    return (
        <div>
            <div className="slide_image ">
                
                <Slide indicators={indicators} nextArrow={<button style={{ display: 'none' }}></button>} prevArrow={<button style={{ display: 'none' }}></button>} autoplay={false} duration={100} transitionDuration={200}  >

                    {
                        product.images?.map((image, i) => {
                            return (
                                <div key={i} className="each-slide-effect h-[400px] min-w-[90vw] bg-slate-100 p-4">
                                    <Image path={`/${image}`} alt='product image' height={500} width={500} priority className='h-full w-full object-cover object-top rounded-md' />
                                </div>
                            )
                        })
                    }
                </Slide>
            </div>
            <hr className='h-2px w-full bg-black' />

            <div className="detail w-full ">
                {/* PRODUCT DEATILS BUY BUTTONS MANY MORE */}
                <div className="product_info px-4 py-2 flex flex-col gap-2">
                    {/* FIRST CONTENT */}
                    {/* CHOOSE COLOR */}
                    <h1 className='font-montserrat font-bold' >Choose Color:</h1>
                    <div className="colors flex bg-slate-100 justify-center items-center gap-3 p-1">
                          {/* THIS IS COLOR OF PRODUCT */}
                                <div  className={`bg-[${product?.color}] border h-12 w-12 rounded-full`}></div>
                        
                    </div>
                    
                    {/* CHOOSE SIZE  */}
                    <ChooseSize setSizes={setSizes} sizes={sizes} />

                    {/* PRODUCT TITLE AND RATINGS */}
                    <ItemTitleDetails isLoading={isLoading} product={product} />
                    
                    {/* SPECIFICATION AND DESCRIPTION */}
                    <SpecificationDescription isLoading={isLoading} sizes={sizes} product={product} />
                    
                    {/* OUR PROMISES */}
                    <PromiseSection/>

                    {/* SHOPPING BUTTONS */}

                    <CartButtons isLoading={isLoading} product={product}  size={sizes}/>

                </div>
            </div>
        </div>
    )
}

export default MobileProductView
