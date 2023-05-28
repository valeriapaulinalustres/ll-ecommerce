import { useContext } from "react"
import AddEditProductRender from "../../components/AddEditProductRender"
import ProductsContext from "../../context/ProductsContext"
import UsersContext from "../../context/UsersContext"



function EditPrduct () {


    const {   productToEdit, 
        setProductToEdit, editProduct} = useContext(ProductsContext)

        const {user} = useContext(UsersContext)




    return (
<AddEditProductRender />
    )
}

export default EditPrduct