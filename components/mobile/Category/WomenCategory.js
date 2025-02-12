import React from 'react'
import { womenImages } from '@/components/Desktop/Category/WomenCategories' 
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

function WomenCategory() {
 
    const cardData = Array.from({ length: womenImages.length }, (_, i) => ({
      id: i + 1-1,
      content: `Card ${i + 1}`
    }))
    const upperCards = cardData.filter((_, index) => index % 2 === 0)
    const lowerCards = cardData.filter((_, index) => index % 2 !== 0)
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md ">
    <div className="flex flex-col gap-4 ">
      <div className="flex gap-4">
        {upperCards.map((card) => (
          <Card key={card.id} className=" w-36 h-56 flex-shrink-0 bg-[#E9E9E9]">
            <CardContent className="p-0 flex items-center justify-center h-full w-full ">
              <img src={`img/${womenImages[card.id]} `} className='h-full w-full rounded-xl' alt="" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-4">
        {lowerCards.map((card) => (
          <Card key={`lower-${card.id}`} className="category-card w-36 h-56 flex-shrink-0 bg-[#E9E9E9]">
             <CardContent className="p-0 flex items-center justify-center h-full w-full ">
              <img src={`img/${womenImages[card.id]} `} className='h-full w-full rounded-xl' alt="" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
  )
}
export default WomenCategory

