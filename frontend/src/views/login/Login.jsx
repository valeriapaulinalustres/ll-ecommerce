import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Container from 'react-bootstrap/Container';

import { useContext } from "react";
import { base_URL } from "../../utils/mainRoute.js";
import UsersContext from "../../context/UsersContext.js";
import { useNavigate } from "react-router-dom";

function Login () {


const {
  login, 
  existUser,
  setExistUser,
  registroGithub,
  loginError, 
  setLoginError,
  getCurrentUser,
  getCurrentUserFromMail
} = useContext(UsersContext)

const navigate = useNavigate()
      
      function handleSubmitLogin (e) {
        e.preventDefault()
           
        login(e.target[0].value, e.target[1].value).then(() => {
          getCurrentUserFromMail(e.target[0].value);
          navigate("/")
        })
      }

      const github = () => {
        window.open("http://localhost:8080/api/users/registroGithub", "_self");
      }    

      function handleLoginGithub () {
        registroGithub()
      }

    return (
<Container >
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
        <Form.Control type="email" placeholder="name@example.com" name="email"/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" name="password"/>
      </FloatingLabel>
        
       
      </Form.Group>
      <Row>
      <Col>
<p>¿Olvidaste tu contraseña?</p>
</Col>
     <Col>
     <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Sign in</Button>
        </Col>
      </Form.Group>
     </Col>
      </Row>

   

     
      {
  loginError && <div>Usuario o contraseña incorrecto</div>
}
<Row>
  <Col md='auto'>
  <Button onClick={handleLoginGithub}>Ingresar con GitHub</Button>
  </Col>
<Col md='auto'>
<Button>Ingresar con Google</Button>
</Col>

</Row>


    </Form>
<p>¿No tenés una cuenta? </p>
<Button>Crear cuenta</Button>

  
      
      
      
</Container>

     
    )
}
export default Login

/*

<div>
 <form className="App" onSubmit={handleSubmitLogin} method='post' action='http://localhost:8080/api/users/login'>
     <input type='email' name='email'/>
     <input type='password' name='password' />
     <input type='submit' value='Enviar'/>
    </form>
{
  loginError && <div>Usuario o contraseña incorrecto</div>
}
    <div  onClick={github}>
                        
                        Github
                    </div>
      </div>
       

      */