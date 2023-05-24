import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductsContext from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({product}) {

    const {getProductById} = useContext(ProductsContext)

    const navigate = useNavigate()

    function handleGetProductById (id) {
        
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