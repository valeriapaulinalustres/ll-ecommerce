import { useContext, useEffect } from 'react'
import {styles} from '../../styles/Cart.module.css'
import CartContext from '../../context/CartContext'
import UsersContext from '../../context/UsersContext'

function Cart() {

    const {cart, getCartById} = useContext(CartContext)
    const {user} = useContext(UsersContext)

useEffect(()=>{
    console.log(user.cartId)
    getCartById('646a1c17db72fbd4185b8ef8')
},[])

    console.log(cart)


  return (
    <div>
        <div className="card">
            <div className="row">
                <div className="col-md-8 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right text-muted">3 items</div>
                        </div>
                    </div>   
{
    cart.message.products.map((el, index)=>{
        return(
            <div className="row border-top border-bottom">
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={el.id.thumbnails[0]}/></div>
                <div className="col">
                    <div className="row text-muted">{el.id.title}</div>
                    <div className="row">{el.id.description}</div>
                </div>
                <div className="col">
                    <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
                </div>
                <div className="col">$ {el.id.price}<span className="close">&#10005;</span></div>
            </div>
        </div>
        )
    })
}
              

         


                    <div className="back-to-shop"><a href="#">&leftarrow;</a><span className="text-muted">Back to shop</span></div>
                </div>
                <div className="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr/>
                    <div className="row">
                        <div className="col" style={{paddingLeft:0}}>ITEMS 3</div>
                        <div className="col text-right">&euro; 132.00</div>
                    </div>
                    <form>
                        <p>SHIPPING</p>
                        <select><option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
                        <p>GIVE CODE</p>
                        <input id="code" placeholder="Enter your code"/>
                    </form>
                    <div className="row" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">&euro; 137.00</div>
                    </div>
                    <button className="btn">CHECKOUT</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Cart