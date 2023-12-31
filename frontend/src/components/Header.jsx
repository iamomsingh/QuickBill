import {Navbar, Nav, Container, NavbarBrand, NavbarToggle, NavbarCollapse,Badge, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import SearchBox from './SearchBox';

const Header = () => {

    const {cartItems} = useSelector((state) => state.cart);
    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err)
        }
       
    }
    
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand = 'md' collapseOnSelect> 
            <Container>
                <LinkContainer to='/'>
                    <NavbarBrand>
                    <img src={logo} alt='ProShop' />
                        shopping
                    </NavbarBrand>
                    
                </LinkContainer>
            
                <NavbarToggle aria-controls='basic-navbar-nav'></NavbarToggle>
                <NavbarCollapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <SearchBox />
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart />
                                Cart
                                {cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </Badge>
                                )}
                                </Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id ='username'>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>

                        ) : (
                        <LinkContainer to='/login'>
                            <Nav.Link><FaUser />Sign In</Nav.Link>
                        </LinkContainer>
                        )}
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header