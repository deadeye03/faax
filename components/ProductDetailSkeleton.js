import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailsSkeleton() {
  return (
    <div className='flex flex-col md:flex-row w-full gap-3 min-h-screen p-4 md:px-14 md:py-4'>
      {/* LEFT - Image selection (moves to bottom on mobile) */}
      <div className='flex md:flex-col order-3 md:order-1 md:w-[10%] gap-3 mt-4 md:mt-0'>
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={`card-${i}`} className="flex-1 md:flex-none">
            <CardContent className="flex items-center justify-center h-[50px] w-[50px] md:h-[150px] md:w-[120px]">
              <Skeleton className="h-full w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CENTER - Main image */}
      <div className="order-1 md:order-2 md:flex-1 md:w-[45%] h-[300px] md:h-auto">
        <div className='relative w-full h-full'>
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      {/* RIGHT - Details */}
      <div className="order-2 md:order-3 md:flex-1 md:w-[45%] mt-4 md:mt-0 md:overflow-y-scroll">
        <div className='flex flex-col gap-4'>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-1/4" />
          
          {/* Color selection */}
          <div className="color">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className='flex flex-wrap gap-3'>
              {Array.from({ length: 4 }, (_, i) => (
                <Card key={`color-${i}`} className="flex-1 h-[60px] w-[60px] min-w-[60px]">
                  <CardContent className="flex items-center justify-center h-full">
                    <Skeleton className="h-full w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div className="SIZE">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className='flex flex-wrap gap-3'>
              {Array.from({ length: 4 }, (_, i) => (
                <Card key={`size-${i}`} className="flex-1 h-[50px] w-[50px] min-w-[50px]">
                  <CardContent className="flex items-center justify-center h-full">
                    <Skeleton className="h-full w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="cart flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-14 w-full sm:w-1/2" />
            <Skeleton className="h-14 w-full sm:w-1/2" />
          </div>

          {/* Our Promise section */}
          <div className="our__promise flex flex-wrap text-sm gap-4 justify-between">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={`promise-${i}`} className='flex flex-col items-center w-[calc(50%-0.5rem)] sm:w-auto'>
                <Skeleton className="h-[50px] w-[50px] rounded-2xl mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Product specification and description */}
          <div className="w-full description__box p-4 border rounded-md">
            <div className="buttons flex gap-6 mb-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-10 w-1/3" />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={`spec-${i}`} className='flex flex-col gap-1'>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}