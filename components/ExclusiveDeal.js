"use client"
import React from 'react'
import { Card, CardContent } from './ui/card'
function ExclusiveDeal() {
    const card = [
        "Tshirt",
        "HOODIE",
        "UNDER 199",
        "jOGGERS"
    ]
    const cardImage=[
        'men/Hoodies.webp',
        'men/oversized.webp',
        'men/classic.webp',
        'women/top.webp'
    ]
    return (
        <div className='flex gap-10 flex-1 w-full'>

            {/* 
            * Generates an array of 4 div elements with specific classes and styles.
            * Each div is assigned a unique key based on its index.
            * THIS IS FOR DESKTOP
            */ }
            {Array.from({ length: 4 }, (_, i) => {
                return (
                    <div key={i} className='hidden md:block bg-red-400 rounded-md flex-1'>
                        <img src={`img/${cardImage[i]}`} className='' alt="" />
                    </div>
                );
            })}
            {/* THIS EXCLUSIVE DEAL FORM MOBILE */}
            <div className=' flex flex-wrap gap-2 justify-center items-center  rounded-md  flex-1 md:hidden'>
                {Array.from({ length: 4 }, (_, i) => {
                    return (
                        <Card key={`card-${i}`} className="w-40 h-40 flex-shrink-0">
                            <CardContent className="flex items-center justify-center h-full">
                                <span className="font-semibold">{card[i]}</span>
                            </CardContent>
                        </Card>
                    )
                })
                }
            </div>
        </div>
    )
}

export default ExclusiveDeal
