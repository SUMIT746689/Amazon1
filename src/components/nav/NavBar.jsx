import React from 'react';
import {Container, Nav, Navbar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import {AiOutlineHome,AiOutlineLogin,AiOutlineLogout} from "react-icons/ai";
import {BsCartPlusFill} from "react-icons/bs";
import {MdAppRegistration} from "react-icons/md";
import {RiProductHuntLine} from "react-icons/ri";
import {FiSettings} from "react-icons/fi";
import {getAuth, signOut } from '@firebase/auth';
import {useDispatch } from 'react-redux';
import {LogInUser } from '../../redux/actions/Actions';


export default function NavBar(props) {
    const auth = getAuth ();
    const user = auth.currentUser;
    const dispatch = useDispatch ();
    
    const handleLogOut =()=> {
        const auth = getAuth ();
        signOut(auth)
        .then(() => {
            dispatch(LogInUser(null));
        }).catch((error) => {
            // An error happened.
        });
    }

    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        opacity :'0.5',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center' 

      };
    const iconStyle ={
        textAlign:'center',
        marginRight:'10px',
        fontSize:'22px',

    };

    const cartProductsLength = props.cart;
    const cartIconShow =  cartProductsLength >0 ? <NavLink to='/cart' style={linkStyle}> <BsCartPlusFill style={iconStyle}/> Cart</NavLink> : '';
    const userAuth = user===null ? 
        <>
           
                <NavLink to='/authentication' style={linkStyle}>
                    <AiOutlineLogin style={iconStyle} /><span>Log In</span>
                </NavLink>
                <NavLink to='/signup'style={linkStyle}>
                    <MdAppRegistration style={iconStyle}/>    
                    Sign Up
                </NavLink> 
            
        </>
    :
            <NavLink to='/logout'style={linkStyle}>
                <button className='text-light'style={{border:'none',background:'none'}} onClick={handleLogOut}>  
                <AiOutlineLogout style={iconStyle}/>  
                Log Out
                </button>
            </NavLink>  
    ;
   
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">React-Redux-Bootstrap-Firebase</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <NavLink to='/home' style={linkStyle}> <AiOutlineHome style={iconStyle}/> Home</NavLink>
                <NavLink to='/items'style={linkStyle}> <RiProductHuntLine style={iconStyle}/> Items</NavLink>
                
                {cartIconShow}

                {userAuth}
              
                    <Link to='/setting' style={linkStyle}>
                        <OverlayTrigger delay='5' key='right' placement='right'
                            overlay={
                                <Tooltip className='text-success' id={`tooltip right`}>
                                    Setting
                                </Tooltip>
                            }
                        >   
                        <div>
                            <FiSettings style={iconStyle}/>
                        </div>
                        </OverlayTrigger>
                    </Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}
