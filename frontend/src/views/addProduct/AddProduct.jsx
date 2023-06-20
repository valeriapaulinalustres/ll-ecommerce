import { useContext } from "react";
import ProductsContext from "../../context/ProductsContext";
import UsersContext from "../../context/UsersContext";
import AddEditProductRender from "../../components/AddEditProductRender";

function AddProduct() {
  const { productById, addProduct } = useContext(ProductsContext);
  const { existUser, user } = useContext(UsersContext);


  function handleAddProduct(e) {
    e.preventDefault();

    let imgs = [];

    let imputs = [e.target[0].value, e.target[1].value, e.target[2].value];

    for (let i = 0; i < imputs.length; i++) {
      if (imputs[i]) {
        imgs.push(imputs[i]);
      }
    }

    const newProduct = {
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
      e.target[i].value = "";
    }

    addProduct(newProduct, user);
  }

  return <AddEditProductRender handleAddProduct={handleAddProduct} />;
}

export default AddProduct;
