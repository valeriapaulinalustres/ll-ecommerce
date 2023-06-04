
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import UsersContext from '../../context/UsersContext';

function Register() {

    const {registro, registroGithub, registroGoogle} = useContext(UsersContext)

function handleSubmitRegister (e) {
    e.preventDefault()
    console.log(
        e.target[0].value, 
        e.target[1].value, 
        e.target[2].value, 
        e.target[3].value, 
        e.target[4].value, 
        e.target[5].value, 
      
        
        )

        if (e.target[4].value !== e.target[5].value) {console.log('Las contraseñas no coinciden')}


const newUser = {
    first_name: e.target[0].value,
    last_name: e.target[1].value,
    email: e.target[2].value,
    age: e.target[3].value,
    password: e.target[4].value
}

        registro(newUser)
}

function handleRegisterGithub() {
  registroGithub()
}

function handleRegisterGoogle() {
  registroGoogle()
}

  return (
    <Container>
 <Form onSubmit={handleSubmitRegister} action="/api/users/registro" method="post" >
 <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>Nombres</Form.Label>
          <Form.Control type="text" placeholder="Nombres" name="first_name"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" placeholder="Apellido" name="last_name"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAge">
          <Form.Label>Edad</Form.Label>
          <Form.Control type="number" placeholder="Edad" name="age"/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword2">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control type="password" placeholder="Repeat Password" name="repeatPassword" />
        </Form.Group>
      </Row>

    
    


      <Button variant="primary" type="submit">
        Registrarme
      </Button>
    </Form>
<Row>
    <Col>
    <Button onClick={handleRegisterGithub}>Registrarme con GitHub</Button>
    </Col>
    <Col>
    <Button onClick={handleRegisterGoogle}>Registrarme con Google</Button>
    </Col>
</Row>
   
   
    </Container>
   
  );
}

export default Register;