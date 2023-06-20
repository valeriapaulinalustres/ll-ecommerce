import { useContext } from "react";
import Card from "react-bootstrap/Card";
import ProductsContext from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import UsersContext from "../context/UsersContext";
import styles from "../styles/ProductCard.module.css";

function ProductCard({ product }) {
  const { getProductById, setProductToEdit } = useContext(ProductsContext);

  const navigate = useNavigate();

  function handleGetProductById(id) {
    setProductToEdit(product);
    getProductById(id).then(() => navigate("/product"));
  }

  const { title, description, thumbnails, price, id } = product;

  return (
    <Card className={styles.cardContainer}>
      <Card.Img
        src={`https://cdn.pixabay.com/photo/2023/06/10/14/48/zebras-8054175__340.jpg`}
      />
      <Card.Body className={styles.body}>
        <Card.Title >{title}</Card.Title>
        <Card.Text className={styles.text}>{description}</Card.Text>
        <Card.Title className={styles.text}>Precio: ${price}</Card.Title>
        <button onClick={() => handleGetProductById(id)} className={styles.button}>
          Ver detalles
        </button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
