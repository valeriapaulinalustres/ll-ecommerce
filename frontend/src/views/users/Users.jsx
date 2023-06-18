import { useContext, useEffect, useState } from "react";
import UsersContext from "../../context/UsersContext";
import { SlPencil } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toastAlert } from "../../utils/alerts";

function Users() {
  const {
    getUsers,
    users,
    setUsers,
    deleteUsersDisconnected,
    deleteUser,
    changeRolByAdmin,
  } = useContext(UsersContext);

  useEffect(() => {
    getUsers();
  }, []);

  const [selectNewRolOn, setSelectNewRolOn] = useState(false);
  const [emailToChangeRol, setEmailToChangeRol] = useState(null);
  const [newRol, setNewRol] = useState(null);

  function handleDeleteUsersDisconnected() {
    deleteUsersDisconnected().then(() => getUsers());
  }

  function handleDeleteUser(email) {
    deleteUser(email);
  }

  function handleChangeRolByAdmin(e) {
if (newRol === 'seleccionar' || !newRol) {return toastAlert('error', 'Debe seleccionar un nuevo rol')}

    console.log("modal", newRol, emailToChangeRol);
    changeRolByAdmin(newRol, emailToChangeRol)
setEmailToChangeRol(null)
setNewRol(null)
setSelectNewRolOn(false)
  }

  console.log(emailToChangeRol, newRol);

  return (
    <div>
      <h2>Lista de usuarios</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col">Edición</th>
          </tr>
        </thead>
        <tbody>
          {users.map((el, index) => {
            return (
              <tr key={index}>
                <td>{el.full_name}</td>
                <td>{el.email}</td>
                <td>{el.role}</td>
                <td>
                  <RiDeleteBin6Line
                    onClick={() => handleDeleteUser(el.email)}
                  />
                  <GrUserAdmin
                    onClick={() => {
                      setSelectNewRolOn(true);
                      setEmailToChangeRol(el.email);
                    }}
                  />
                </td>
              </tr>
            );
          })}
          {selectNewRolOn && (
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog>
                <Modal.Header
                  closeButton
                  onClick={() => setSelectNewRolOn(false)}
                >
                  <Modal.Title>Nuevo rol</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <select onChange={(e) => setNewRol(e.target.value)}>
                    <option value="seleccionar">--Seleccionar--</option>
                    <option value="user">User</option>
                    <option value="premium">Premium</option>
                    <option value="admin">Admin</option>
                  </select>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleChangeRolByAdmin}
                  >
                    Guardar cambios
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          )}
        </tbody>
      </table>
      <Button onClick={handleDeleteUsersDisconnected}>
        Eliminar los usuarios que no hayan tenido conexión en los últimos 2 días
      </Button>
    </div>
  );
}

export default Users;
