
import React from 'react'
import Recomendation from './TopCollection'


export const colletionImage=[
    "men/top-collection/shirt.webp",
    "men/top-collection/tshirt-2.jpg",
    "women/top-collection/top-1.jpg",
    "women/top-collection/top-2.jpg",
    "men/top-collection/tshirt.jpg",
    
]
async function Collection() {
   
    return (
    <div className='text-black'>
      <Recomendation/>
    </div>
  )
}

export default Collection
