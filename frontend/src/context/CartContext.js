import { createContext, useContext, useState } from "react";
import { fetchFunction } from "../utils/utilsFetch";
import { base_URL } from "../utils/mainRoute";
import { toastAlert } from "../utils/alerts";
import UsersContext from "./UsersContext";

const CartContext = createContext()

const CartProvider = ({children}) =>{

    const [cart, setCart] = useState([])
    const [emptyCart, setEmptyCart] = useState(true)
    const [existCart, setExistCart] = useState(false)

    const {addCartToUser, user} = useContext(UsersContext)

    // '/api/carts/' GET: trae todos los carritos
    // '/api/carts/' POST: agrega un nuevo carrito
    // '/api/carts/:cid' GET trae un carrito por id
    // '/api/carts/:cid' DELETE vacía un carrito por id
    // '/api/carts/:cid' PUT edita un carrit por id
    // '/api/carts/:cid/product/:pid' POST agrega un producto por id a un carrito por su id
    // '/api/carts/:cid/product/:pid' DELETE elimina un producto por id de un carrito por id
    // '/api/carts/:cid/product/:pid' PUT modifica un producto por id de un carrito por id
    // '/api/carts/:cid/purchase' POST para completar compra de un carrito

//Crea un nuevo carrito 
async function createNewCart (pid, qty){
const response = await fetchFunction('/api/carts',{
    id:pid,
    quantity:qty
})

if ( response.message.success) {
    console.log('carrito nuevo', response)

//actualiza el usuario agregándole el id de su carrito
    addCartToUser(user._id, response.message.cart._id)
    toastAlert('success', response.message.message)
   setCart(response.message.cart)
   setExistCart(false)
  } else {
    toastAlert('error', response.message.message)
  }
 
}

    //Trae un carrito por su id
async function getCartById (cid) {
    const response = await fetch(`${base_URL}/api/carts/${cid}`)
    const responseData = await response.json()
    console.log(responseData)
    setCart(responseData)
}

//Agrega un producto a un carrito
async function addProductToCart (pid, cid) {
    console.log(pid, cid)
    const response = await fetchFunction(`/api/carts/${cid}/product/${pid}`,{
        pid:pid, cid: cid})
console.log(response)
}


    const data = {
        getCartById,
        cart,
        setCart,
        createNewCart,
        emptyCart, 
        setEmptyCart,
        existCart,
        setExistCart,
        addProductToCart
    }
    return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}


export { CartProvider };



export default CartContext