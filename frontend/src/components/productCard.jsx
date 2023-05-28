import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductsContext from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';
import UsersContext from '../context/UsersContext';
import {TfiPencil} from 'react-icons/tfi'
import {RiDeleteBin6Line} from 'react-icons/ri'

function ProductCard({product}) {

    const {getProductById, setProductToEdit} = useContext(ProductsContext)
    const {user} = useContext(UsersContext)

    const navigate = useNavigate()

    function handleGetProductById (id) {
      setProductToEdit(product)
        getProductById(id).then(()=>navigate('/product'))
     
    }

    const {title, description, thumbnails, price, id} = product



  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${thumbnails[0]}`}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Title>Precio: ${price}</Card.Title>
        <Button variant="primary" onClick={()=>handleGetProductById(id)}>Ver detalles</Button>
       
      </Card.Body>
    </Card>
  );
}

export default ProductCard;