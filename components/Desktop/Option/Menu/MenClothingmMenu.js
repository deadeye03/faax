import Link from 'next/link'
import React from 'react'

const menuData = [
  {
    category: "Topwear",
    items: ["T-Shirt", "Casual Shirts", "Formal Shirts", "Sweatshirt", "Sweaters", "Jackets", "Blazers & Coats", "Suits", "Rain Jackets"]
  },
  {
    category: "Bottomwear",
    items: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"]
  },
  {
    category: "Footwear",
    items: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops", "Socks"]
  },
  {
    category: "Sports & Active Wear",
    items: ["Sports Shoes", "Sports Sandals", "Active T-Shirts", "Track Pants & Shorts", "Tracksuits", "Jackets & Sweatshirts", "Sports Accessories", "Swimwear"]
  },
  {
    category: "Fashion Accessories",
    items: ["Wallets", "Belts", "Perfumes & Body Mists", "Trimmers", "Deodorants", "Ties, Cufflinks & Pocket Squares", "Accessory Gift Sets", "Caps & Hats", "Mufflers, Scarves & Gloves", "Phone Cases", "Rings & Wristwear", "Helmets"]
  }
]

export default function MenClothingMenu({closeMenu}) {
  return (
    <div className="bg-white p-6 overflow-x-auto">
      <div className="flex space-x-8 min-w-max">
        {menuData.map((section, index) => (
          <div key={index} className="flex-none">
            <h2 className="text-pink-500 font-semibold mb-2">{section.category}</h2>
            <div className="space-y-1 flex flex-col">
              {section.items.map((item, itemIndex) => (
                <Link href={`${process.env.NEXT_PUBLIC_URL}/categories/${item.toLowerCase()}`}
                  key={itemIndex} 
                  className="hover:font-bold transition-all duration-200 cursor-pointer"
                  onClick={()=>closeMenu()}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
