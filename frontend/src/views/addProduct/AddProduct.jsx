import { useContext } from "react";
import ProductCard from "../../components/productCard";
import ProductsContext from "../../context/ProductsContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import UsersContext from "../../context/UsersContext";
import { toastAlert } from "../../utils/alerts";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { TfiPencil } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "../../styles/Product.module.css";
import AddEditProductRender from "../../components/AddEditProductRender";

function AddProduct() {
  const { productById, addProduct } = useContext(ProductsContext);
  const { existUser, user } = useContext(UsersContext);
  const {
    emptyCart,
    createNewCart,
    existCart,
    setExistCart,
    addProductToCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  //     const {title, description, thumbnails, price, _id, category, code, stock} = productById
  // console.log(existUser)

  function handleAddProduct(e) {
    e.preventDefault();
    console.log(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value,
      e.target[3].value,
      e.target[4].value,
      e.target[5].value,
      e.target[6].value
    );

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
      status: e.target[9].checked
    };

    for (let i = 0; i < 9; i++) {
      e.target[i].value = "";
    }

    
    addProduct(newProduct, user)
  }
  console.log(user);
  return (
<AddEditProductRender handleAddProduct={handleAddProduct}/>
  );
}

export default AddProduct;
