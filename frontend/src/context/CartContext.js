import { createContext, useContext, useState } from "react";
import { fetchFunction } from "../utils/utilsFetch";
import { base_URL } from "../utils/mainRoute";
import { toastAlert } from "../utils/alerts";
import UsersContext from "./UsersContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [emptyCart, setEmptyCart] = useState(true);
  const [existCart, setExistCart] = useState(false);
  const [ticket, setTicket] = useState(null);

  const { addCartToUser, user } = useContext(UsersContext);

  // --- Crea un nuevo carrito ---
  async function createNewCart(pid, qty) {
    const response = await fetchFunction("/api/carts", {
      id: pid,
      quantity: qty,
    });

    if (response.message.success) {
      //actualiza el usuario agregándole el id de su carrito
      addCartToUser(user._id, response.message.cart._id);
      toastAlert("success", response.message.message);
      setCart(response.message.cart);
      setExistCart(false);
    } else {
      toastAlert("error desde el context", response.message.message);
    }
  }

  // --- Trae un carrito por su id ---
  async function getCartById(cid) {
    const response = await fetch(`${base_URL}/api/carts/${cid}`);
    const responseData = await response.json();
    setCart(responseData);
  }

  // --- Agrega un producto a un carrito ---
  async function addProductToCart(pid, cid, user) {
    let response;
    try {
      response = await fetchFunction(`/api/carts/${cid}/product/${pid}`, {
        user,
      });
      if (response.message.status === "success") {
        return toastAlert("success", response.message.message);
      } else {
        return toastAlert("error", response.message);
      }
    } catch (error) {
      console.log('error', error);
      return toastAlert("error desde el context", response.message);
    }
  }

  // --- Elimina un producto del carrito ---
  async function deleteProductFromCart(cid, pid) {
    try {
      const response = await fetch(
        `${base_URL}/api/carts/${cid}/product/${pid}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user }),
        }
      );
      let responseData = await response.json();
      if (responseData.message.status === "success") {
        return toastAlert("success", "Producto eliminado con éxito");
      } else {
        return toastAlert("error", "No se ha podido eliminar el producto");
      }
    } catch (error) {
      console.log('error desde el context', error);
    }
  }

  // --- Vacía el carrito ---
  async function deleteCart(cid) {
    try {
      const response = await fetch(`${base_URL}/api/carts/${cid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });
      let responseData = await response.json();
      if (responseData.status === "success") {
        return toastAlert("success", "Carrito vaciado con éxito");
      } else {
        return toastAlert("error", "No se ha podido vaciar el carrito");
      }
    } catch (error) {
      console.log('Error desde el context',error);
    }
  }

  // --- Edita cantidad de un producto ---
  async function editProductQty(cid, pid, qty) {
    const response = await fetch(
      `${base_URL}/api/carts/${cid}/product/${pid}/${qty}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      }
    );
    let responseData = await response.json();
    if (responseData.message.status === "success") {
      return toastAlert("success", "Cantidad editada con éxito");
    } else {
      return toastAlert("error", "No se ha podido editar la cantidad");
    }
  }

  // --- Elimina un producto del carrito, a través de la cruz ---
  async function eraseProductFromCart(cid, pid) {
    try {
      const response = await fetch(
        `${base_URL}/api/carts/${cid}/product/${pid}/erase`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user }),
        }
      );
      let responseData = await response.json();
      if (responseData.message.status === "success") {
        return toastAlert("success", "Producto eliminado con éxito");
      } else {
        return toastAlert("error", "No se ha podido eliminar el producto");
      }
    } catch (error) {
      console.log('Error desde el context', error);
    }
  }

  // --- Completa la compra ---
  async function completeSale(cid, user) {
    const response = await fetchFunction(`/api/carts/${cid}/purchase`, {
      user,
    });

    if (response.message.ticket) {
      toastAlert("success", response.message.message);
      setTicket(response.message.ticket);
    } else {
      toastAlert("error", response.message.message);
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
    setTicket,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export { CartProvider };

export default CartContext;
