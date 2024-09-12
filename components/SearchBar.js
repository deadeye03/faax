"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Search } from "lucide-react"


const searchCategories = [
    {
        name: 't-shirt',
        aliases: ['tshirt', 't shirt', 'tee'],
        suggestions: [
            'T-shirt for men',
            'T-shirt for women',
            'Latest T-shirt designs',
            'Trendy T-shirts',
            'Black T-shirt',
            'White T-shirt',
            'Sport T-shirts'
        ]
    },
    {
        name: 'shoes',
        aliases: ['footwear', 'sneakers','shoe','sho'],
        suggestions: [
            'Running shoes',
            'Casual shoes for men',
            'Women\'s high heels',
            'Kids\' sneakers',
            'Sports shoes'
        ]
    },
    {
        name: 'shirt',
        aliases: ['men shirt', 'shi'],
        suggestions: [
            'Shirt for men',
            'Shirt for women',
            'Women\'s top',
            'Kids\' shirt',
            'Trendy Shirt',
            'Black Shirt'
        ]
    }
    // Add more categories as needed
]

export default function SearchBar() {
    /**
     * SearchBar component allows users to search for products, brands, or more.
     * It provides suggestions based on the input and hides suggestions when clicking outside the component.
     */

    const [searchTerm, setSearchTerm] = useState('')

    // State to store the list of suggestions based on the search term
    const [suggestions, setSuggestions] = useState([])

    // State to control the visibility of the suggestions dropdown
    const [showSuggestions, setShowSuggestions] = useState(false)

    // Reference to the search input element
    const searchRef = useRef(null)

    /**
     * Effect to handle clicks outside the search bar.
     * If a click is detected outside the search bar, the suggestions dropdown is hidden.
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    /**
     * Effect to update suggestions based on the search term.
     * Normalizes the search term and finds matching categories to update the suggestions.
     */
    useEffect(() => {
        const normalizedSearchTerm = searchTerm.toLowerCase().trim()

        const matchedCategory = searchCategories.find(category =>
            category.name === normalizedSearchTerm ||
            category.aliases.some(alias => normalizedSearchTerm.includes(alias))
        )

        if (matchedCategory) {
            setSuggestions(matchedCategory.suggestions)
            setShowSuggestions(true)
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }, [searchTerm])

    return (
        <div className="flex-1 mx-4" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for products, brands or more"
                    className=" md:block border-none outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                />
                {/* <Search className="absolute left-3 top-2.5 text-gray-400" /> */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSearchTerm(suggestion)
                                    setShowSuggestions(false)
                                }}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
