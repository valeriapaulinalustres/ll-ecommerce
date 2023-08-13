import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UsersContext from '../../context/UsersContext';
import { Link, useNavigate } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import styles from '../../styles/Header.module.css';
import { TbPlant } from 'react-icons/tb';
import ProductsContext from '../../context/ProductsContext';
import { HiOutlineUsers } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';

function Header() {
  const { login, existUser, setExistUser, logout, getCartById, user } =
    useContext(UsersContext);

  const { setProductToEdit } = useContext(ProductsContext);

  const navigate = useNavigate();

  async function handleLogout() {
    const returned = await logout(user);
    navigate('/');
    setExistUser(false);
  }

  function handleGetCart() {
    navigate('/cart');
  }

  return (
    <Navbar className={styles.headerContainer} expand='lg'>
      <Container fluidf className={styles.container}>
        <h1 className={styles.brand}>Los Lupinos</h1>
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to='/' className={styles.linkHome}>
              Home
            </Link>

            <NavDropdown
              title='Usuarios'
              id='navbarScrollingDropdown'
              className={styles.linkHome}
            >
              {existUser ? (
                <>
                  <NavDropdown.Item
                    onClick={handleLogout}
                    className={styles.linkHome}
                  >
                    Cerrar sesión
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item
                    href='/login'
                    className={styles.linkHomeDropdown}
                  >
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href='/register'
                    className={styles.linkHomeDropdown}
                  >
                    ¿No tenés cuenta? Registrate aquí
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>

          {existUser && (
            <>
              <h3 className={styles.welcome}>Bienvenido {user?.full_name}</h3>
              <BsCart4 onClick={handleGetCart} className={styles.icon} />
              <CgProfile
                className={styles.icon}
                onClick={() => navigate('/profile')}
              />
            </>
          )}
          {(user?.role == 'admin' || user?.role == 'premium') && (
            <Link to='/add-product'>
              <div onClick={() => setProductToEdit(null)}>
                <TbPlant className={styles.icon} />
                {/* <MdOutlineAddCircle className={styles.icon}/> */}
              </div>
            </Link>
          )}
          {user?.role == 'admin' && (
            <Link to='/users'>
              <HiOutlineUsers className={styles.icon} />
            </Link>
          )}

          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <button className={styles.button}>Buscar</button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
