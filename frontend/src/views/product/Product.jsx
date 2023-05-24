import { useContext } from "react"
import ProductCard from "../../components/productCard"
import ProductsContext from "../../context/ProductsContext"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UsersContext from "../../context/UsersContext";
import { toastAlert } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";

function Product() {

    const {productById} = useContext(ProductsContext)
const {existUser, user} = useContext(UsersContext)
const {
  emptyCart, 
  createNewCart,   
  existCart,
  setExistCart,
  addProductToCart
} = useContext(CartContext)

const navigate = useNavigate()

    const {title, description, thumbnails, price, _id} = productById
console.log(existUser)
function handleAddToCart (pid) {
    if (existUser) {
      if(!user.cartId) {
        createNewCart(pid, 1).then(()=>navigate('/cart'))
      } else {
        console.log('agregar al carr', user);
        console.log(pid)
        addProductToCart(pid, user.cartId)
      }
    
      
    } else {
        toastAlert('info', 'Debés ingresar a tu cuenta')
        navigate('/login')
    }
 
}


  return (
    <div>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${thumbnails[0]}`}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Title>Precio: ${price}</Card.Title>
        <Button variant="primary" onClick={()=>handleAddToCart(_id)}>Agregar al carrito</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Product