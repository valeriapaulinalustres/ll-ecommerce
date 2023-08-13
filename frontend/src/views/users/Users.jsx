import { useContext, useEffect, useState } from 'react';
import UsersContext from '../../context/UsersContext';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineKey } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toastAlert } from '../../utils/alerts';
import styles from '../../styles/Users.module.css';

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

  async function handleDeleteUsersDisconnected() {
    await deleteUsersDisconnected();
    getUsers();
  }

  function handleDeleteUser(email) {
    deleteUser(email);
  }

  function handleChangeRolByAdmin(e) {
    if (newRol === 'seleccionar' || !newRol) {
      return toastAlert('error', 'Debe seleccionar un nuevo rol');
    }

    changeRolByAdmin(newRol, emailToChangeRol);
    setEmailToChangeRol(null);
    setNewRol(null);
    setSelectNewRolOn(false);
  }

  return (
    <div className={styles.container}>
      <h2>Lista de usuarios</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col' className={styles.text}>
              Nombre
            </th>
            <th scope='col' className={styles.text}>
              Email
            </th>
            <th scope='col' className={styles.text}>
              Rol
            </th>
            <th scope='col' className={styles.text}>
              Edición
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((el, index) => {
            return (
              <tr key={index}>
                <td className={styles.text}>{el.full_name}</td>
                <td className={styles.text}>{el.email}</td>
                <td className={styles.text}>{el.role}</td>
                <td>
                  <RiDeleteBin6Line
                    onClick={() => handleDeleteUser(el.email)}
                    className={styles.icon}
                  />
                  <MdOutlineKey
                    onClick={() => {
                      setSelectNewRolOn(true);
                      setEmailToChangeRol(el.email);
                    }}
                    className={styles.icon}
                  />
                </td>
              </tr>
            );
          })}
          {selectNewRolOn && (
            <div
              className='modal show'
              style={{ display: 'block', position: 'initial' }}
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
                    <option value='seleccionar'>--Seleccionar--</option>
                    <option value='user'>User</option>
                    <option value='premium'>Premium</option>
                    <option value='admin'>Admin</option>
                  </select>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    className={styles.button}
                    type='submit'
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
      <button onClick={handleDeleteUsersDisconnected} className={styles.button}>
        Eliminar los usuarios que no hayan tenido conexión en los últimos 2 días
      </button>
    </div>
  );
}

export default Users;
