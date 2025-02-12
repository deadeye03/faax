"use client"
// components/CartProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const router = useRouter();
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  })
  const [itemCount, setItemCount] = useState(0);
  const [totalPirce, setTotalPrice] = useState(0)




  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
      setItemCount(cart.reduce((count, item) => count + 1, 0));

      const updatedTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      setTotalPrice(updatedTotalPrice);
    }
  }, [cart]);

  const isCart = (productId, size) => {
    return cart.some(item => item.id === productId && item.size === size);
  };

  const clearCart = () => {
    setCart([]); // Clear the cart array
    localStorage.removeItem("cart"); // Remove cart from localStorage
    setItemCount(0); // Reset the item count
    setTotalPrice(0); // Reset the total price
  };


  const addToBag = (product, size) => {
    setCart(prevCart => {
      // Check if the product already exists in the cart
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id && item.size === size);
      if (existingProductIndex !== -1) {
        // If it exists, update the quantity
        const updatedCart = prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return updatedCart;
      } else {
        // Otherwise, add a new product
        toast.success('Item is added to cart')
        return [...prevCart, { ...product, quantity: 1, size: size }];
      }
    });
  };

  const addQuantity = (product,size) => {
    setCart(prevCart =>
      prevCart.map(item =>
        (item.id == product.id && item.size == size)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    console.log('addd')
  };

  const getItemQuantity = (product,size) => {
    // console.log('Product:', product);
    // console.log('cart is ',cart)
    const item = cart.find((item) => item.id == product.id && item.size == size);
    // console.log('Found Item:', item);
  
    return item ? item.quantity : 0;
  };
  

  const removeItem = (product, size) => {
    // console.log("size is", size);
    
    // Filter out the specific item with the matching product id AND size
    setCart(prevCart =>
      prevCart.filter(item => !(item.id === product.id && item.size === size))
    );
    location.reload();
  };
  

  const removeQuantity = (product,size) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id == product.id && item.size == size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0);
      return updatedCart;
    });
  };



  return (
    <CartContext.Provider value={{ itemCount, addToBag, addQuantity, removeQuantity, isCart, removeItem, getItemQuantity, totalPirce, cart, clearCart }}>

      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
