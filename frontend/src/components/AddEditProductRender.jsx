import Button from 'react-bootstrap/Button';
import styles from '../styles/AddEditProduct.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ProductsContext from '../context/ProductsContext';
import UsersContext from '../context/UsersContext';

function AddEditProductRender({ handleAddProduct }) {
  const { productToEdit, editProduct } = useContext(ProductsContext);
  const { user } = useContext(UsersContext);

  const navigate = useNavigate();

  async function handleEditProduct(e) {
    e.preventDefault();
    let imgs = [];
    let imputs = [e.target[0].value, e.target[1].value, e.target[2].value];

    for (let i = 0; i < imputs.length; i++) {
      if (imputs[i]) {
        imgs.push(imputs[i]);
      }
    }

    const editedProduct = {
      thumbnails: imgs,
      title: e.target[3].value,
      category: e.target[4].value,
      code: e.target[5].value,
      description: e.target[6].value,
      price: parseInt(e.target[7].value),
      stock: parseInt(e.target[8].value),
      status: e.target[9].checked,
    };

    for (let i = 0; i < 9; i++) {
      e.target[i].value = '';
    }
    const returnedPromise = await editProduct(
      productToEdit.id,
      editedProduct,
      user
    );
    navigate('/');
  }

  return (
    <>
      {productToEdit ? (
        <div className={styles.container}>
          <h2>Editar producto</h2>
          <form
            className={styles.productContainer}
            onSubmit={(e) => handleEditProduct(e)}
          >
            <input
              type='text'
              defaultValue={productToEdit?.thumbnails[0]}
              className={styles.input}
            />
            <input
              type='text'
              defaultValue={productToEdit?.thumbnails[1]}
              className={styles.input}
            />
            <input
              type='text'
              defaultValue={productToEdit?.thumbnails[2]}
              className={styles.input}
            />
            <input
              type='text'
              required
              defaultValue={productToEdit?.title}
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Categoría'
              required
              defaultValue={productToEdit?.category}
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Código'
              required
              defaultValue={productToEdit?.code}
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Descripción'
              required
              defaultValue={productToEdit?.description}
              className={styles.input}
            />
            <input
              type='number'
              placeholder='Precio'
              required
              defaultValue={productToEdit?.price}
              className={styles.input}
            />
            <input
              type='number'
              placeholder='Stock'
              required
              defaultValue={productToEdit?.stock}
              className={styles.input}
            />
            Status:{' '}
            <input
              type='checkbox'
              defaultChecked={productToEdit?.status}
              className={styles.input}
            />
            <button type='submit' className={styles.button}>
              Actualizar producto
            </button>
            <button className={styles.button} onClick={() => navigate('/')}>
              Volver al Home
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.container}>
          <h2>Crear producto</h2>
          <form className={styles.productContainer} onSubmit={handleAddProduct}>
            <input
              type='text'
              placeholder='img URL 1'
              className={styles.input}
            />
            <input
              type='text'
              placeholder='img URL 2'
              className={styles.input}
            />
            <input
              type='text'
              placeholder='img URL 3'
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Título'
              required
              defaultValue={productToEdit?.title}
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Categoría'
              required
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Código'
              required
              className={styles.input}
            />
            <input
              type='text'
              placeholder='Descripción'
              required
              className={styles.input}
            />
            <input
              type='number'
              placeholder='Precio'
              required
              className={styles.input}
            />
            <input
              type='number'
              placeholder='Stock'
              required
              className={styles.input}
            />
            Status: <input type='checkbox' className={styles.input} />
            <button className={styles.button} type='submit'>
              Crear producto
            </button>
            <button className={styles.button} onClick={() => navigate('/')}>
              Volver al Home
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AddEditProductRender;
