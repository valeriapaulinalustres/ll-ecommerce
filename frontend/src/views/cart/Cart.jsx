import { useContext, useEffect } from "react";
import { styles } from "../../styles/Cart.module.css";
import CartContext from "../../context/CartContext";
import UsersContext from "../../context/UsersContext";
import { Link } from "react-router-dom";
import { TiPlusOutline } from "react-icons/ti";
import { TiMinusOutline } from "react-icons/ti";
import Button from "react-bootstrap/Button";
import { toastAlert } from "../../utils/alerts";

function Cart() {
  const { cart, getCartById, addProductToCart, deleteProductFromCart, deleteCart, editProductQty } =
    useContext(CartContext);
  const { user } = useContext(UsersContext);

  useEffect(() => {
    getCartById(user.cartId);
  }, []);

  console.log("cart", cart);

  function handleAddProduct(pid) {
    console.log("add");
    addProductToCart(pid, user.cartId, user).then(() =>
      getCartById(user.cartId)
    );
  }

  function handleDeleteProduct(pid) {
    console.log("delete");
    deleteProductFromCart(user.cartId, pid).then(() =>
    getCartById(user.cartId))
  }

  function handleDeleteCart(){
    deleteCart(user.cartId).then(() =>
    getCartById(user.cartId))
  }


let subtotal = 0
cart?.message?.products?.forEach(el=>{
   
    let subtotalEl = el.id.price * el.quantity
    subtotal = subtotal + subtotalEl
   
   

  })

  function handleChangeQty (e, pid) {
  
if( e.target.value ==""){
  return toastAlert('warning', 'Complete una cantidad a comprar por favor');
  }

  if( e.target.value < 1){
    return toastAlert('error', 'Debe ingresar valores mayores o iguales a 1');
    }
  
let qty = e.target.value;
let cid = user.cartId;

   editProductQty(cid,pid, qty).then(() =>
    getCartById(user.cartId))
  }

  console.log('user', user)

  return (
    <div>
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <Button onClick={handleDeleteCart}>Vaciar carrito</Button>
                <div className="col align-self-center text-right text-muted">
                  {cart?.message?.products ? `${cart?.message?.products?.length} items` : '0 items'}
                </div>
              </div>
            </div>
            {cart?.message?.products ? (
              cart.message.products.map((el, index) => {
                return (
                  <div className="row border-top border-bottom" key={index}>
                    <div className="row main align-items-center">
                      <div className="col-2">
                        <img className="img-fluid" src={el.id.thumbnails[0]} />
                      </div>
                      <div className="col">
                        <div className="row text-muted">{el.id.title}</div>
                        <div className="row">{el.id.description}</div>
                      </div>
                      <div className="col">
                        <Button onClick={() => handleDeleteProduct(el.id._id)}>
                          <TiMinusOutline />
                        </Button>

                        {/* <div className="border">{el.quantity}</div> */}
                        <input 
                        type='number' 
                        defaultValue={el.quantity} 
                        onChange={(e)=>handleChangeQty(e, el.id._id)}
                        min='1'
                        />

                        <Button onClick={() => handleAddProduct(el.id._id)}>
                          <TiPlusOutline />
                        </Button>
                      </div>
                      <div className="col">
                        ${el.id.price} x {el.quantity} = ${el.id.price * el.quantity}
                        <span className="close">&#10005;</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Carrito vacío</p>
            )}

            <div className="back-to-shop">
              <Link to="/" className="text-muted">
                Back to shop
              </Link>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col" style={{ paddingLeft: 0 }}>
              {cart?.message?.products ? `${cart?.message?.products.length} items` : '0 items'}
              </div>
              <div className="col text-right">${subtotal}</div>
            </div>
            <form>
              <p>SHIPPING</p>
              <select>
                <option className="text-muted">
                  Standard-Delivery- $5.00
                </option>
              </select>
              <p>GIVE CODE</p>
              <input id="code" placeholder="Enter your code" />
            </form>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">${subtotal} falta sumar delivery</div>
            </div>
            <Button >Finalizar compra</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
