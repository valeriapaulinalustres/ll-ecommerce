import Button from "react-bootstrap/Button";
import styles from "../styles/Product.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ProductsContext from "../context/ProductsContext";
import UsersContext from "../context/UsersContext";

function AddEditProductRender({ handleAddProduct,  }) {
  const { productToEdit, editProduct } = useContext(ProductsContext);
  const {user} = useContext(UsersContext)
  console.log(productToEdit);

function handleEditProduct(e){
  e.preventDefault()
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
      status: e.target[9].checked
    };

    for (let i = 0; i < 9; i++) {
      e.target[i].value = "";
    }
console.log('edited', editedProduct)
 editProduct(productToEdit.id, editedProduct, user)
}

  return (
    <>
      {productToEdit ? (
        <form className={styles.productContainer} onSubmit={(e)=>handleEditProduct(e)}>
          <div>
            <input type="text" defaultValue={productToEdit?.thumbnails[0]} />
            <input type="text" defaultValue={productToEdit?.thumbnails[1]} />
            <input type="text" defaultValue={productToEdit?.thumbnails[2]} />
          </div>
          <div>
            <input type="text" required defaultValue={productToEdit.title} />
            <input
              type="text"
              placeholder="Categoría"
              required
              defaultValue={productToEdit.category}
            />
            <input
              type="text"
              placeholder="Código"
              required
              defaultValue={productToEdit.code}
            />
            <input
              type="text"
              placeholder="Descripción"
              required
              defaultValue={productToEdit.description}
            />
            <input
              type="number"
              placeholder="Precio"
              required
              defaultValue={productToEdit.price}
            />
            <input
              type="number"
              placeholder="Stock"
              required
              defaultValue={productToEdit.stock}
            />
            Status:{" "}
            <input type="checkbox" defaultChecked={productToEdit.status} />
            <Button type="submit">Actualizar producto</Button>
            <Link to="/">
              <Button>Volver al Home</Button>
            </Link>
          </div>
        </form>
      ) : (
        <form className={styles.productContainer} onSubmit={handleAddProduct}>
          <div>
            <input type="text" placeholder="img URL 1" />
            <input type="text" placeholder="img URL 2" />
            <input type="text" placeholder="img URL 3" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Título"
              required
              defaultValue={productToEdit.title}
            />
            <input type="text" placeholder="Categoría" required />
            <input type="text" placeholder="Código" required />
            <input type="text" placeholder="Descripción" required />
            <input type="number" placeholder="Precio" required />
            <input type="number" placeholder="Stock" required />
            Status: <input type="checkbox" />
            <Button type="submit">Crear producto</Button>
            <Link to="/">
              <Button>Volver al Home</Button>
            </Link>
          </div>
        </form>
      )}
    </>
  );
}

export default AddEditProductRender;
