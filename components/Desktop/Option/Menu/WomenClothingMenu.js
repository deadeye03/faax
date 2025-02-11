import React from 'react'

const menuData = [
  {
    category: "Indian & Fusion Wear",
    items: ["Kurtas & Suits", "Kurtis, Tunics & Tops", "Sarees", "Ethnic Wear", "Leggings, Salwars & Churidars", "Skirts & Palazzos", "Dress Materials", "Lehenga Cholis", "Dupattas & Shawls", "Jackets"]
  },
  {
    category: "Western Wear",
    items: ["Dresses", "Tops", "Tshirts", "Jeans", "Trousers & Capris", "Shorts & Skirts", "Co-ords", "Playsuits", "Jumpsuits", "Shrugs", "Sweaters & Sweatshirts", "Jackets & Coats", "Blazers & Waistcoats"]
  },

  {
    category: "Lingerie & Sleepwear",
    items: ["Bra", "Briefs", "Shapewear", "Sleepwear & Loungewear", "Swimwear", "Camisoles & Thermals"]
  },
  {
    category: "Gadgets",
    items: ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"]
  },
  {
    category: "Footwear",
    items: ["Flats", "Casual Shoes", "Heels", "Boots", "Sports Shoes & Floaters"]
  },
  {
    category: "Sports & Active Wear",
    items: ["Clothing", "Footwear", "Sports Accessories", "Sports Equipment"]
  },
  {
    category: "Beauty & Personal Care",
    items: ["Makeup", "Skincare", "Premium Beauty", "Lipsticks", "Fragrances"]
  },
  {
    category: "Jewellery",
    items: ["Fashion Jewellery", "Fine Jewellery", "Earrings"]
  }
]

export default function WomenClothingMenu({closeMenu}) {
  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {menuData.map((section, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-pink-500 font-semibold mb-2">{section.category}</h2>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li 
                  key={itemIndex} 
                  className="hover:font-bold transition-all duration-200 cursor-pointer text-sm text-gray-700"
                  onClick={()=>closeMenu()}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}