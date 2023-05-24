import { createContext, useState } from "react";
import { base_URL } from "../utils/mainRoute";
import { fetchFunction } from "../utils/utilsFetch";


const ProductsContext = createContext()

const ProductsProvider = ({children}) => {

    const [allProductsFromBack, setAllProductsFromBack] = useState([])
    const [productById, setProductById] = useState()

//Trae todos los productos
    async function getProducts () {
        const response = await fetch(`${base_URL}/api/products`)
        const responseData = await response.json()
        console.log(responseData)
        setAllProductsFromBack(responseData?.response?.products)
    }

    //Trae producto por id
    async function getProductById (id){
        const response = await fetch(`${base_URL}/api/products/${id}`)
        const responseData = await response.json()
        console.log(responseData)
        setProductById(responseData.response.product)
    }
    

    const data =
    {
        getProducts,
        allProductsFromBack, 
        setAllProductsFromBack,
        getProductById,
        productById, 
        setProductById

    }

    return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>;
}


export { ProductsProvider };

export default ProductsContext