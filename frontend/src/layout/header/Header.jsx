import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UsersContext from '../../context/UsersContext';
import {Link, useNavigate} from 'react-router-dom'
import {BsCart4} from 'react-icons/bs'
import CartContext from '../../context/CartContext';
import styles from '../../styles/Header.module.css'

function Header() {

  const {
    login, 
    existUser,
    setExistUser,
    logout,
    getCartById,
    user
  } = useContext(UsersContext)


const navigate = useNavigate()

  function handleLogout () {
    logout()
    .then(()=>{
      navigate('/')
      setExistUser(false)
    })
  }

  function handleGetCart () {
 navigate('/cart')
   
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Los Lupinos</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="#action2">User</Nav.Link> */}
            
            <NavDropdown title="Usuarios" id="navbarScrollingDropdown">
              {
              existUser
              ? <>
               <NavDropdown.Item  onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
             
              </>
             
              : <>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">
                ¿No tenés cuenta? Registrate aquí
              </NavDropdown.Item>
              </>
              
              }
           
              
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
          {
            existUser &&
           
            <>
                        <h3>Bienvenido {user.full_name}</h3>
<BsCart4 onClick={handleGetCart} className={styles.cartIcon}/>
            </>

           
            
            
          }
        
         
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;