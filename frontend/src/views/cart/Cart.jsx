import { useContext, useEffect } from "react";
import styles from "../../styles/Cart.module.css";
import CartContext from "../../context/CartContext";
import UsersContext from "../../context/UsersContext";
import { Link } from "react-router-dom";
import { TiPlusOutline } from "react-icons/ti";
import { TiMinusOutline } from "react-icons/ti";
import { toastAlert } from "../../utils/alerts";

function Cart() {
  const {
    cart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    deleteCart,
    editProductQty,
    eraseProductFromCart,
    completeSale,
    ticket,
  } = useContext(CartContext);
  const { user } = useContext(UsersContext);

  useEffect(() => {
    getCartById(user.cartId);
  }, []);

  function handleAddProduct(pid) {
    addProductToCart(pid, user.cartId, user).then(() =>
      getCartById(user.cartId)
    );
  }

  function handleDeleteProduct(pid) {
    deleteProductFromCart(user.cartId, pid).then(() =>
      getCartById(user.cartId)
    );
  }

  function handleDeleteCart() {
    deleteCart(user.cartId).then(() => getCartById(user.cartId));
  }

  let subtotal = 0;
  cart?.message?.products?.forEach((el) => {
    let subtotalEl = el.id?.price * el.quantity;
    subtotal = subtotal + subtotalEl;
  });

  function handleChangeQty(e, pid) {
    if (e.target.value == "") {
      return toastAlert("warning", "Complete una cantidad a comprar por favor");
    }

    if (e.target.value < 1) {
      return toastAlert("error", "Debe ingresar valores mayores o iguales a 1");
    }

    let qty = e.target.value;
    let cid = user.cartId;

    editProductQty(cid, pid, qty).then(() => getCartById(user.cartId));

    setTimeout(() => (e.target.value = ""), 3000);
  }

  function handleEraseProduct(e, pid) {
    let cid = user.cartId;
    eraseProductFromCart(cid, pid).then(() => getCartById(user.cartId));
  }

  function handleCompleteSale() {
    completeSale(user.cartId, user).then(() => getCartById(user.cartId));
  }

  return (
    <div className={styles.container}>
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className={styles.cartHeader}>
              <h2 className={styles.title}>Carrito de Compras</h2>
              {cart?.message?.products?.length > 0 ? (
                <button onClick={handleDeleteCart} className={styles.button}>
                  Vaciar carrito
                </button>
              ) : (
                <h3>Su carrito se encuentra vacío</h3>
              )}
              <div className={styles.itemTotalTitle}>
                {cart?.message?.products
                  ? `${cart?.message?.products?.length} items`
                  : "0 items"}
              </div>
            </div>

            {cart?.message?.products ? (
              cart.message.products.map((el, index) => {
                return (
                  <div className={styles.row} key={index}>
                    <div className={styles.imgContainer}>
                      <img
                        className={styles.img}
                        src={`https://cdn.pixabay.com/photo/2023/06/10/14/48/zebras-8054175__340.jpg`}
                        width={100}
                      />
                    </div>

                    <div className={styles.text}>{el.id?.title}</div>

                    <div className={styles.commands}>
                      <button
                        onClick={() => handleDeleteProduct(el.id?._id)}
                        className={styles.button}
                      >
                        <TiMinusOutline className={styles.icon} />
                      </button>

                      <div className={styles.qty}>{el.quantity}</div>

                      <button
                        onClick={() => handleAddProduct(el.id?._id)}
                        className={styles.button}
                      >
                        <TiPlusOutline className={styles.icon} />
                      </button>

                      <label htmlFor="qty" className={styles.qtyToBuy}>
                        {" "}
                        o agrega una cantidad a comprar:
                      </label>
                      <input
                        type="number"
                        id="qty"
                        onChange={(e) => handleChangeQty(e, el.id?._id)}
                        min="1"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.text}>
                      ${el.id?.price} x {el.quantity} = $
                      {el.id?.price * el.quantity}
                    </div>
                    <div
                      className={styles.erase}
                      onClick={(e) => handleEraseProduct(e, el.id?._id)}
                    >
                      &#10005;
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Carrito vacío</p>
            )}

            <Link to="/" className={styles.back}>
              Volver al shop
            </Link>
          </div>

          {cart?.message?.products?.length > 0 && (
            <div className="col-md-4 summary">
              <h5 className={styles.summaryTittle}>Resumen</h5>

              <div className={styles.textContainer}>
                <div
                  className={styles.textRight}
                  style={{ paddingLeft: 0 }}
                ></div>
                <div className={styles.textRight}>
                  {cart?.message?.products
                    ? `${cart?.message?.products.length} items: `
                    : "0 items: "}
                  ${subtotal}
                </div>
              </div>
              {/* <form>
                <p>SHIPPING</p>
                <select>
                  <option className="text-muted">
                    Standard-Delivery- $5.00
                  </option>
                </select>
                <p>GIVE CODE</p>
                <input id="code" placeholder="Enter your code" />
              </form> */}
              <div
                className="row"
                style={{
                  borderTop: "1px solid rgba(0,0,0,.1)",
                  padding: "2vh 0",
                }}
              >
                <div className={styles.textRight}>TOTAL PRICE</div>
                <div className={styles.textRight}>${subtotal}</div>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={handleCompleteSale} className={styles.button}>
                  Finalizar compra
                </button>
              </div>
            </div>
          )}

          {ticket && (
            <div className={styles.ticket}>
              <h2>Ticket de compra</h2>
              <h3>Comprador: {ticket.purchaser}</h3>
              <h3>Monto: ${ticket.amount}</h3>
              <h3>Código de compra: {ticket.code}</h3>
              <h3>Fecha de compra: {ticket.purchase_datetime}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
