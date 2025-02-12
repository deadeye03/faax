"use size"
import React from 'react'
import { size } from './utils/SizeChart'
import { Card, CardContent } from './ui/card'
function ChooseSize({setSizes}) {

    return (
        <div className="SIZE">
            <h1>CHOOSE SIZE:</h1>
            <div className='flex gap-3 rounded-md'>
                {Array.from({ length: 4 }, (_, i) => (
                    <button key={i} onClick={() => setSizes(size[i])} className='focus:bg-black focus:text-white rounded-xl'>
                        <Card className="bg-transparent flex-1 h-[60px] w-[60px] flex-shrink-0">
                            <CardContent className="flex items-center justify-center h-full">
                                <span className="font-semibold">{size[i]}</span>
                            </CardContent>
                        </Card>
                    </button>
                ))}
            </div>
        </div>

    )
}

export default ChooseSize
