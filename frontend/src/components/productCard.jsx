import { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ProductsContext from '../context/ProductsContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ProductCard.module.css';

function ProductCard({ product }) {
  const { getProductById, setProductToEdit } = useContext(ProductsContext);

  const navigate = useNavigate();

  async function handleGetProductById(id) {
    setProductToEdit(product);
    const productData = await getProductById(id);
    navigate('/product');
  }

  const { title, description, thumbnails, price, id } = product;

  return (
    <Card className={styles.cardContainer} data-testid='product-card'>
      <Card.Img src={`https://placedog.net/500?r`} />
      <Card.Body className={styles.body}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.text}>{description}</Card.Text>
        <Card.Title className={styles.text}>Precio: ${price}</Card.Title>
        <button
          onClick={() => handleGetProductById(id)}
          className={styles.button}
        >
          Ver detalles
        </button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
