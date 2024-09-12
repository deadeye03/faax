"use client"
import React from 'react'

function MovingMessages() {
    const bannerItems = [
        "⚡ 50 Minutes Delivery",
        "🔥 Latest Trends",
        "🛍️ Try Choose Buy",
        "🔄 Efforts Less Returns"
    ]
    // Repeat the items to ensure no gaps
    const repeatedItems = Array(6).fill(bannerItems).flat()
    return (
        <div>


            <div className="bg-black text-white py-2 overflow-hidden animate-pulse-green">
                <div className="animate-marquee-slow whitespace-nowrap">
                    {repeatedItems.map((item, index) => (
                        <span key={index} className="inline-block mx-2">{item}</span>
                    ))}
                </div>
            </div>
            <style jsx global>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: inline-block;
          white-space: nowrap;
          animation: marquee-slow 25s linear infinite;
        }
        @keyframes pulse-green {
          0%, 100% { background-color: #000000; }
          50% { background-color: #000000; }
        }
        .animate-pulse-green {
          animation: pulse-green 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}

export default MovingMessages
