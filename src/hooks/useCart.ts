import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
    
  const initialCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  // States
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    // Almacenar en localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregando guitarras en el carrito
  const addToCart = (item) => {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    //? Actualizando cantidad o nueva guitarra
    if (itemExists >= 0) {
      // existe en el carrito

      // Valida que no se añadan nuevas guitarras de acuerdo al máximo
      if (cart[itemExists].quantity >= MAX_ITEMS) return;

      // Para no mutar el state
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      // no existe y se agrega la cantidad de 1
      item.quantity = 1;
      setCart([...cart, item]);
      // setCart((prevState) => [ ...prevState, item ])
    }
  };

  //? Quitar guitarra del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  //? Aumentar cantidad de guitarras
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((guitar) => {
      // limitando la cantidad a agregar
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      }
      return guitar;
    });

    setCart(updatedCart);
  };

  //? Disminuir cantidad de guitarras
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      }
      return guitar;
    });

    setCart(updatedCart);
  };

  //? Limpia carrito
  const clearCart = () => {
    setCart([]);
  };



    //* state derivado - valor depende un state 
    //* useMemo - se usa para evitar que se ejecute una función cada vez que se renderiza, solo lo hará cuando cambie el state que tiene como dependencia
    const isEmpty = useMemo( () => cart.length === 0, [cart] )
    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart] )


  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };
};
