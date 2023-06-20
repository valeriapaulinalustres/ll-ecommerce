import { createContext, useState } from "react";
import { base_URL, front_URL } from "../utils/mainRoute.js";
import { fetchFunction } from "../utils/utilsFetch.js";
import { errorFetchAlert, toastAlert } from "../utils/alerts.js";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [existUser, setExistUser] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  // // --- Trae el usuario actual ---
  // async function getCurrentUser() {
  //   const response = await fetch(`${base_URL}/api/users/current`);
  //   let responseData = await response.json();
  // }

  // --- Obtiene usuario actual desde el mail que ingresa al login ---
  async function getCurrentUserFromMail(mail) {
    const response = await fetchFunction("/api/users/current", {
      mail,
    });
    setUser(response.user);
  }

  // --- Login de usuarios ---
  async function login(email, password) {
    const response = await fetchFunction("/api/users/login", {
      email,
      password,
    });
    setExistUser(response.existUser);

    if (response.existUser) {
      toastAlert("success", response.message);

      getCurrentUserFromMail(email);
      setExistUser(true);
    } else {
      toastAlert("error", response.message);
    }
  }

  // --- Registro de usuarios nuevos ---
  async function registro(newUser) {
    const { first_name, last_name, email, age, password } = newUser;
    const response = await fetchFunction("/api/users/registro", {
      first_name,
      last_name,
      email,
      age,
      password,
    });

    response.success
      ? toastAlert("success", response.message)
      : toastAlert("error", response.message);
  }

  // --- Registro con GitHub ---
  async function registroGithub() {
    const response = await fetch(`${base_URL}/api/users/registroGithub`);
    let responseData = await response.json();
    console.log(responseData);
  }

  // --- Registro con Google ---
  async function registroGoogle() {
    const response = await fetch(`${base_URL}/api/users/registroGoogle`);
    let responseData = await response.json();
    console.log(responseData);
  }

  // --- Logout ---
  async function logout(user) {
    const response = await fetchFunction(`/api/users/logout`, {
      user,
    });

    response.success
      ? toastAlert("success", response.message)
      : toastAlert("error", response.message);
  }

  // --- Agrega un carrito a un usuario ---
  async function addCartToUser(uid, cid) {
    try {
      const response = await fetch(`${base_URL}/api/users/add-cart-to-user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: uid,
          cid: cid,
        }),
      });
      let responseData = await response.json();

      if (response.status === 200) {
        //actualiza el usuario porque ahora tiene carrito
        setUser(responseData.user);
        return responseData;
      } else {
        //para que vuelva a login en sessión expirada
        if (responseData.error.code === 903) {
          toastAlert("error", "Session expired");
          window.location.href = front_URL;
          return null;
        } else {
          errorFetchAlert(responseData.error.message);
        }
        throw new Error("error");
      }
    } catch (error) {
      console.log("Error desde el context", error);
    }
  }

  // --- Trae usuarios ---
  async function getUsers() {
    try {
      const response = await fetch(`${base_URL}/api/users`);
      const responseData = await response.json();
      setUsers(responseData.users);
    } catch (error) {
      console.log("Error desde el context", error);
    }
  }

  // --- Borra usuarios con antiguas conexiones ---
  async function deleteUsersDisconnected() {
    try {
      const response = await fetch(`${base_URL}/api/users`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      let responseData = await response.json();
      toastAlert(
        "success",
        `Usuarios eliminados: ${
          responseData.message.deletedDisconnected.length +
          responseData.message.deletedNotLogged.length
        }`
      );
    } catch (error) {
      console.log("Error desde el context", error);
    }
  }

  // --- Elimina un usuario ---
  async function deleteUser(email) {
    try {
      const response = await fetch(`${base_URL}/api/users/delete-user`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      let responseData = await response.json();
      if (responseData.message.status === "success") {
        toastAlert("success", responseData.message.message);
        getUsers();
      } else {
        toastAlert("error", responseData.message.message);
      }
    } catch (error) {
      toastAlert("error", error);
    }
  }

  // --- Cambia el rol de un usuario ---
  async function changeRolByAdmin(newRol, email) {
    try {
      const response = await fetch(`${base_URL}/api/users/change-rol`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRol, email }),
      });
      let responseData = await response.json();
      if (responseData.message.status === "success") {
        toastAlert("success", responseData.message.message);
        getUsers();
      } else {
        toastAlert("error", responseData.message.message);
      }
    } catch (error) {
      toastAlert("error", error);
    }
  }

  // --- Restaura contraseña primer paso ---
  async function forgotPassword(email) {
    const response = await fetchFunction(
      "/api/users/forgot-password",
      {
        email,
      },
      "POST"
    );
    toastAlert("success", response.message);
  }

  // --- Restaura contraseña, segundo paso ---
  async function changeForgottenPassword(password, uid, token) {
    const response = await fetchFunction(
      `/api/users/create-new-password/${uid}/${token}`,
      {
        password,
      }
    );
    toastAlert("success", response.message);
  }

  // --- Sube foto de perfil ---
  async function submitProfilePhoto(files) {
    try {
      const response = await fetch(
        `${base_URL}/api/users/${user._id}/documents`,
        {
          method: "POST",
          body: files,
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      toastAlert("success", responseData.message);
    } catch (error) {
      console.log("Error desde el context", error);
    }
  }

  // --- Sube foto de producto ---
  async function submitProductPhoto(file) {
    console.log("del context", file);
  }

  // --- Sube documentos ---
  async function submitDoc(file) {
    console.log("del context", file);
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
    //getCurrentUser,
    getCurrentUserFromMail,
    user,
    setUser,
    addCartToUser,
    registroGoogle,
    getUsers,
    users,
    setUsers,
    deleteUsersDisconnected,
    deleteUser,
    changeRolByAdmin,
    forgotPassword,
    changeForgottenPassword,
    submitProfilePhoto,
    submitProductPhoto,
    submitDoc,
  };

  return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export { UsersProvider };

export default UsersContext;
