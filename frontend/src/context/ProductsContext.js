import { createContext, useState } from "react";
import { base_URL } from "../utils/mainRoute";
import { fetchFunction } from "../utils/utilsFetch";
import { toastAlert } from "../utils/alerts";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [allProductsFromBack, setAllProductsFromBack] = useState([]);
  const [productById, setProductById] = useState();
  const [productToEdit, setProductToEdit] = useState(undefined);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // --- Trae todos los productos ---
  async function getProducts(page) {
    const response = await fetch(`${base_URL}/api/products?page=${page}`);
    const responseData = await response.json();
    setAllProductsFromBack(responseData?.response?.products);
    setPageCount(responseData.response.totalPages);
  }

  // --- Trae producto por id ---
  async function getProductById(id) {
    const response = await fetch(`${base_URL}/api/products/${id}`);
    const responseData = await response.json();
    setProductById(responseData.response.product);
  }

  // --- Agregar productos ---
  async function addProduct(newProduct, owner, user) {
    let response;
    try {
      response = await fetchFunction(`/api/products`, {
        newProduct,
        owner,
      });

      if (response.response.product) {
        toastAlert("success", "Producto creado con éxito");
      } else {
        toastAlert("error", "Error al crear el producto");
      }
    } catch (error) {
      toastAlert("error", response.message);
    }
  }

  // --- Edita productos ---
  async function editProduct(id, updatedProduct, owner) {
    try {
      const resp = await fetch(`${base_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          updatedProduct: updatedProduct,
          owner: owner,
        }),
      });
      const rep = await resp.json();
      if (rep.response.status === "success") {
        toastAlert("success", "Producto actualizado con éxito");
      } else {
        toastAlert("error", "Error al actualizar el producto");
      }
    } catch (error) {
      console.log("Error desde el context", error);
    }
  }

  // --- Borra productos ---
  async function deleteProduct(id, owner) {
    try {
      const resp = await fetch(`${base_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          owner: owner,
        }),
      });
      const rep = await resp.json();
      if (rep.response.status === "success") {
        toastAlert("success", "Producto eliminado con éxito");
      } else {
        toastAlert("error", "Error al eliminar el producto");
      }
    } catch (error) {
      console.log("Error desde el context", error);
    }
  }

  const data = {
    getProducts,
    allProductsFromBack,
    setAllProductsFromBack,
    getProductById,
    productById,
    setProductById,
    addProduct,
    editProduct,
    productToEdit,
    setProductToEdit,
    deleteProduct,
    page,
    setPage,
    pageCount,
    setPageCount,
  };

  return (
    <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>
  );
};

export { ProductsProvider };

export default ProductsContext;
