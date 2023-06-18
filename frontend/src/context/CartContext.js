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
    const [ticket, setTicket] = useState(null)

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
async function addProductToCart (pid, cid, user) {
    let response;
    try {
        console.log(pid, cid)
        response = await fetchFunction(`/api/carts/${cid}/product/${pid}`,{
            user
        })
    console.log(response)
    if (response.message.status === 'success') { 
       
        return toastAlert('success', response.message.message)
    } else {
        return toastAlert('error', response.message.message)
    }
    } catch (error) {
        console.log(error)
        return toastAlert('error', response.message)
    }

}

//Elimina un producto del carrito 
async function deleteProductFromCart (cid,pid){
    console.log('aca',cid,pid)
    try {
        const response = await fetch(`${base_URL}/api/carts/${cid}/product/${pid}`, {
        
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user})
        })
        let responseData = await response.json();
        console.log(responseData)  
        if (responseData.message.status === 'success') { return toastAlert('success', 'Producto eliminado con éxito')} else {
            return toastAlert('error', 'No se ha podido eliminar el producto')
        }
    } catch (error) {
        console.log(error)
    }

}

//Vacía el carrito
async function deleteCart (cid){
    try {
        const response = await fetch(`${base_URL}/api/carts/${cid}`, {
        
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user})
        })
        let responseData = await response.json();
        console.log(responseData)  
        if (responseData.status === 'success') {
             return toastAlert('success', 'Carrito vaciado con éxito')} else {
            return toastAlert('error', 'No se ha podido vaciar el carrito')
        }
    } catch (error) {
        console.log(error)
    } 
}

//Edita cantidad de un producto
async function editProductQty (cid,pid,qty) {
const response = await fetch(`${base_URL}/api/carts/${cid}/product/${pid}/${qty}`,{
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({user})
})
let responseData = await response.json()
console.log(responseData)
if (responseData.message.status === 'success') {
    return toastAlert('success', 'Cantidad editada con éxito')} else {
   return toastAlert('error', 'No se ha podido editar la cantidad')
}
}

//Elimina un producto del carrito, a través de la cruz
async function eraseProductFromCart (cid,pid){
    console.log('y por acá');
    try {
        const response = await fetch(`${base_URL}/api/carts/${cid}/product/${pid}/erase`, {
        
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user})
        })
        let responseData = await response.json();
        console.log(responseData)  
        if (responseData.message.status === 'success') { return toastAlert('success', 'Producto eliminado con éxito')} else {
            return toastAlert('error', 'No se ha podido eliminar el producto')
        }
    } catch (error) {
        console.log(error)
    }

}

//Completa la compra
async function completeSale (cid, user){
    console.log(cid)
    const response = await fetchFunction(`/api/carts/${cid}/purchase`,{
        user
    })
    console.log(response)
    

    if ( response.message.ticket) {
        toastAlert('success', response.message.message)
       setTicket(response.message.ticket)
      } else {
        toastAlert('error', response.message.message)
      }
     
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
        addProductToCart,
        deleteProductFromCart,
        deleteCart,
        editProductQty,
        eraseProductFromCart,
        completeSale,
        ticket, 
        setTicket
    }
    return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}


export { CartProvider };



export default CartContext