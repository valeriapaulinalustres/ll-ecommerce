import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersContext from "../../context/UsersContext";

function ResetPassword() {
  const { changeForgottenPassword } = useContext(UsersContext);

  const navigate = useNavigate();

  let { uid } = useParams();
  let { token } = useParams();

  function handleSubmitPassword(e) {
    e.preventDefault();
    changeForgottenPassword(e.target[0].value, uid, token);
    e.target[0].value = "";
    navigate("/login");
  }

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmitPassword}>
        <label htmlFor="password">Ingrese la nueva contraseña</label>
        <input type="password" id="password" />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default ResetPassword;
