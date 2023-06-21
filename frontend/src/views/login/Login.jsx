import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import styles from "../../styles/Login.module.css";
import { useContext, useState } from "react";
import UsersContext from "../../context/UsersContext.js";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { base_URL } from "../../utils/mainRoute";

function Login() {
  const {
    login,
    existUser,
    setExistUser,
    registroGithub,
    loginError,
    registroGoogle,
    forgotPassword,
    setUser
  } = useContext(UsersContext);

  const [forgotPasswordOn, setForgotPasswordOn] = useState(false);

  const navigate = useNavigate();

  function handleSubmitLogin(e) {
    e.preventDefault();

    login(e.target[0].value, e.target[1].value).then(() => {
      if (existUser) {
        navigate("/");
      }
    });
  }
  if (existUser) {
    navigate("/");
  }
  const github = () => {
    window.open("https://e-commerce-production-8113.up.railway.app/api/users/registroGithub", "_self");
  };

  function handleLoginGithub() {
    registroGithub();
  }

  function handleLoginGoogle() {
    registroGoogle();
  }

  function handleForgotPassword(e) {
    e.preventDefault();
    forgotPassword(e.target[1].value);
    setForgotPasswordOn(false);
  }

  return (
    <Container className={styles.container}>
      <Row>
        <h1>Login</h1>
      </Row>
      <Form onSubmit={handleSubmitLogin}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </FloatingLabel>
        </Form.Group>
        <Row>
          <Col>
            <p
              onClick={() => setForgotPasswordOn(true)}
              className={styles.questionForgotPassword}
            >
              ¿Olvidaste tu contraseña?
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Col>
              <button className={styles.button} type="submit">
                Ingresar
              </button>
            </Col>
          </Col>
        </Row>

        {loginError && <div>Usuario o contraseña incorrecto</div>}
        <Row>
          <Col md="auto">
            <button
              className={styles.button}
              // onClick={() => {
              //   const popup = window.open(
              //     `${base_URL}/api/users/registroGithub`,
              //     "targetWindow",
              //     `toobar=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=620, height=700 `
              //   );
              //   popup?.close()
              //   window.addEventListener("message", (event)=>{
              //     console.log(event);
              //     if(event.origin == "https://e-commerce-production-8113.up.railway.app") {
                   
              //       if (event.data) {
              //         console.log(event.data)
              //         localStorage.setItem("User", JSON.stringify(event.data))
              //         localStorage.setItem("User", 'hola')
              //         popup?.close()
              //       }
              //     }
              //   })
              // }}
               onClick={github}
            >
              Ingresar con Google
            </button>
          </Col>
          <Col md="auto">
            <button
              className={styles.button}
              onClick={() => {
                const popup = window.open(
                  `${base_URL}/api/users/registroGithub`,
                  "targetWindow",
                  `toobar=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=620, height=700 `
                );
              }}
            >
              Ingresar con Github
            </button>
          </Col>
        </Row>
        <p className={styles.questionAccount}>¿No tenés una cuenta? </p>
        <Row>
          <Col>
            <button
              className={styles.button}
              onClick={() => navigate("/register")}
            >
              Crear cuenta
            </button>
          </Col>
        </Row>
      </Form>

      {forgotPasswordOn && (
        <Form
          className="modal show"
          style={{ display: "block", position: "initial" }}
          onSubmit={handleForgotPassword}
        >
          <Modal.Dialog>
            <Modal.Header
              closeButton
              onClick={() => setForgotPasswordOn(false)}
            >
              <Modal.Title>Olvidé mi contraseña</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Control type="email" placeholder="email" />
            </Modal.Body>

            <Modal.Footer>
              <button type="submit" className={styles.button}>
                Guardar cambios
              </button>
            </Modal.Footer>
          </Modal.Dialog>
        </Form>
      )}
    </Container>
  );
}
export default Login;

