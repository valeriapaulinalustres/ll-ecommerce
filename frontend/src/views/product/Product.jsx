import { useContext } from 'react';
import ProductCard from '../../components/productCard';
import ProductsContext from '../../context/ProductsContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UsersContext from '../../context/UsersContext';
import { toastAlert } from '../../utils/alerts';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { TfiPencil } from 'react-icons/tfi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styles from '../../styles/Product.module.css';

function Product() {
  const { productById, productToEdit, setProductToEdit, deleteProduct } =
    useContext(ProductsContext);
  const { existUser, user } = useContext(UsersContext);
  const {
    emptyCart,
    createNewCart,
    existCart,
    setExistCart,
    addProductToCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const { title, description, thumbnails, price, _id, category, code, stock } =
    productById;

  function handleAddToCart(pid) {
    if (existUser) {
      console.log('user cart', user.cartId);
      if (!user.hasOwnProperty('cartId')) {
        createNewCart(pid, 1);
      } else {
        addProductToCart(pid, user.cartId, user);
      }
    } else {
      toastAlert('info', 'Debés ingresar a tu cuenta');
      navigate('/login');
    }
  }

  function handleEditProduct() {
    navigate('/edit-product');
  }

  async function handleDeleteProduct(id) {
    await deleteProduct(id, user);
    navigate('/');
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.imgContainer}>
        <img
          src={`https://cdn.pixabay.com/photo/2023/06/10/14/48/zebras-8054175__340.jpg`}
          width='100%'
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <h4>Categoría: {category}</h4>
        <h5>Código: {code}</h5>
        <h3>{description}</h3>
        <h2>Precio: ${price}</h2>
        <h4>Stock: {stock}</h4>
        <button
          variant='primary'
          onClick={() => handleAddToCart(_id)}
          className={styles.button}
        >
          Agregar al carrito
        </button>
        {(user.role === 'admin' || user.role === 'premium') && (
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleEditProduct}>
              <TfiPencil className={styles.icon} />
            </button>
            <button
              className={styles.button}
              onClick={() => handleDeleteProduct(_id)}
            >
              <RiDeleteBin6Line className={styles.icon} />
            </button>
          </div>
        )}

        <button
          className={styles.button}
          onClick={() => {
            navigate('/');
          }}
        >
          Volver al Home
        </button>
      </div>
    </div>
  );
}

export default Product;
