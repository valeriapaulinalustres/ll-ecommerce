import { useContext } from "react"
import ProductCard from "../../components/productCard"
import ProductsContext from "../../context/ProductsContext"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UsersContext from "../../context/UsersContext";
import { toastAlert } from "../../utils/alerts";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import {TfiPencil} from 'react-icons/tfi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import styles from '../../styles/Product.module.css'

function Product() {

    const {
      productById,   
       productToEdit, 
      setProductToEdit, 
      deleteProduct
    } = useContext(ProductsContext)
const {existUser, user} = useContext(UsersContext)
const {
  emptyCart, 
  createNewCart,   
  existCart,
  setExistCart,
  addProductToCart
} = useContext(CartContext)

const navigate = useNavigate()

    const {title, description, thumbnails, price, _id, category, code, stock} = productById
console.log(existUser)


function handleAddToCart (pid) {
    if (existUser) {
      console.log('user cart', user.cartId)
      if(!user.hasOwnProperty('cartId')) {
        createNewCart(pid, 1)
      } else {
        console.log('agregar al carr', user);
        console.log(pid)
        addProductToCart(pid, user.cartId, user)
      }
    
      
    } else {
        toastAlert('info', 'Debés ingresar a tu cuenta')
        navigate('/login')
    }
 
}

function handleEditProduct (){
  console.log(productById)
  
  navigate('/edit-product')
}

function handleDeleteProduct (id){
console.log(id)
deleteProduct(id, user).then(()=>navigate('/'))
}

console.log('product to edit',productToEdit)



  return (
    <div className={styles.productContainer}>
<div>
<img src={`${thumbnails[0]}`} width="800px"/>
</div>
<div>
<h2>{title}</h2>
        <h4>Categoría: {category}</h4>
        <h5>Código: {code}</h5>
        <h3>{description}</h3>
        <h2>Precio: ${price}</h2>
        <h4>Stock: {stock}</h4>
        <Button variant="primary" onClick={()=>handleAddToCart(_id)}>Agregar al carrito</Button>
        {
        (user.role === 'admin' || user.role === 'premium') &&
        <div>
        <Button>
          <TfiPencil onClick={handleEditProduct} />
        </Button>
        <Button>
          <RiDeleteBin6Line onClick={()=>handleDeleteProduct(_id)}/>
        </Button>
        </div>
}
<Link to='/'>
    <Button>Volver al Home</Button>
    </Link>
</div>


   
    
    </div>
  )
}

export default Product