import { useContext, useEffect } from "react"
import UsersContext from "../../context/UsersContext"
import {SlPencil} from 'react-icons/sl'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {GrUserAdmin} from 'react-icons/gr'
import Button from 'react-bootstrap/Button';


function Users() {

  const {
    getUsers,
    users, 
    setUsers,
    deleteUsersDisconnected
  } = useContext(UsersContext)

useEffect(()=>{
  getUsers()
},[])

function handleDeleteUsersDisconnected (){
  deleteUsersDisconnected().then(()=>getUsers())
}

  return (
    <div>
     <h2>Lista de usuarios</h2>
      <table className="table table-striped">
  <thead>
    <tr>
   
      <th scope="col">Nombre</th>
      <th scope="col">Email</th>
      <th scope="col">Rol</th>
      <th scope="col" >Edición</th>
    </tr>
  </thead>
  <tbody>
    {
      users.map((el,index)=>{
        return(
          <tr key={index}>
       
          <td>{el.full_name}</td>
          <td>{el.email}</td>
          <td>{el.role}</td>
          <td>
            <SlPencil />
            <RiDeleteBin6Line />
            <GrUserAdmin />
          </td>
        </tr>
        )
      })
    }
   
   
  </tbody>
</table>
<Button onClick={handleDeleteUsersDisconnected}>Eliminar los usuarios que no hayan tenido conexión en los últimos 2 días</Button>
    </div>
  )
}

export default Users