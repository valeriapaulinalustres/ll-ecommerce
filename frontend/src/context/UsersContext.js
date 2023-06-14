import { createContext, useState } from "react";
import { base_URL, front_URL } from "../utils/mainRoute.js";
import { fetchFunction } from "../utils/utilsFetch.js";
import { errorFetchAlert, toastAlert } from "../utils/alerts.js";


const UsersContext = createContext();



const UsersProvider = ({ children }) => {

  const [existUser, setExistUser] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])


  //Obtener usuario actual del req.user, no funciona
  async function getCurrentUser(){
    const response = await fetch(`${base_URL}/api/users/current`)
    let responseData = await response.json();
 
   
  }

//Obtener usuario actual desde el mail que ingresa al login
async function getCurrentUserFromMail(mail){
  const response = await fetchFunction('/api/users/current',{
    mail
  })
  console.log(response.user)
  setUser(response.user)
}

//Login de usuarios
  async function login (email, password) {
    const response = await fetchFunction('/api/users/login', 
    {
      email,
      password,
    })
    console.log(response)
    setExistUser(response.existUser)
    

    if ( response.existUser) {
      toastAlert('success', response.message)
     
    } else {
      toastAlert('error', response.message)
    }
   
   
  }

//Registro de usuarios nuevos
async function registro (newUser) {
  const {first_name, last_name, email, age, password} = newUser
  const response = await fetchFunction('/api/users/registro',{
    first_name, last_name, email, age, password
  })

  /*
  Access to fetch at 'https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fusers%2Fgithub%2Fcallback&scope=user%3Aemail&client_id=Iv1.672fec06309dff3d' (redirected from 'http://localhost:8080/api/users/registroGithub') from origin 'http://localhost:3000' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:3000' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
  */


  response.success
  ? toastAlert('success', response.message)
  : toastAlert('error', response.message)
}

//registro con GitHub
  async function registroGithub () {
    const response = await fetch(`${base_URL}/api/users/registroGithub`)
    let responseData = await response.json();
    console.log(responseData);
  }

  //registro con Google
  async function registroGoogle () {
    const response = await fetch(`${base_URL}/api/users/registroGoogle`)
    let responseData = await response.json();
    console.log(responseData);
  }

 //cerrar cesión de usuario
 async function logout (){
  const response = await fetch(`${base_URL}/api/users/logout`)
  let responseData = await response.json();

  responseData.success
  ? toastAlert('success', responseData.message)
  : toastAlert('error', responseData.message)

 } 

 //Agregar un carrito a un usuario
 async function addCartToUser (uid, cid) {
  try {
    const response = await fetch(`${base_URL}/api/users/add-cart-to-user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid:uid,
        cid: cid
      }),
    });
    let responseData = await response.json();

    if (response.status === 200) {
      return responseData;
    } else {
      console.log(responseData.error); //devuelve {code: , message: '', internal message: ''}
      //para que vuelva a login en sessión expirada
      if (responseData.error.code === 903) {
        toastAlert("error", "Session expired");
        window.location.href = front_URL
        return null;
      } else {
        errorFetchAlert(responseData.error.message);
        //window.location.href = "http://localhost:3000/"
      }
     
      
      throw new Error('error');
    }
  } catch (error) {
    console.log('error', error);
  }
 }


 async function getUsers (){
  try {
    const response = await fetch(`${base_URL}/api/users`)
    const responseData = await response.json()
    console.log(responseData)
    setUsers(responseData.users)
  } catch (error) {
    console.log('error', error)
  }

 }

 async function deleteUsersDisconnected (){
  try {
    const response = await fetch(`${base_URL}/api/users`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    let responseData = await response.json();
console.log(responseData)
    // if (response.status === 200) {
    //   return responseData;
    // } else {
    //   console.log(responseData.error); //devuelve {code: , message: '', internal message: ''}
    //   //para que vuelva a login en sessión expirada
    //   if (responseData.error.code === 903) {
    //     toastAlert("error", "Session expired");
    //     window.location.href = front_URL
    //     return null;
    //   } else {
    //     errorFetchAlert(responseData.error.message);
    //     //window.location.href = "http://localhost:3000/"
    //   }
     
      
    //   throw new Error('error');
    //}
  } catch (error) {
    console.log('error', error);
  }
 }


  const data = {
    login,
    existUser,
    setExistUser,
    registroGithub,
    loginError, 
    setLoginError,
    registro,
    registroGithub,
    logout,
    getCurrentUser,
    getCurrentUserFromMail,
    user,
    setUser,
    addCartToUser,
    registroGoogle,
    getUsers,
    users, 
    setUsers,
    deleteUsersDisconnected
  };

  return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export { UsersProvider };

export default UsersContext;
