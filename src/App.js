import './App.css';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Products } from './redux/actions/Actions';
import Items from './components/items/Items';
import CartItem from './components/cart/cartitem/CartItem';
import CartValue from './components/cart/cartvalue/CartValue';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import NavBar from './components/nav/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home';
import Authentication from './components/authentication/Authentication';
import SignUp from './components/authentication/normalAuth/SignUp';
import Setting from './components/userProfile/Setting';
import Footer from './components/footer/Footer';
import {getAuth} from 'firebase/auth'
import { Redirect } from 'react-router';

  export function App() {
    
    
    const auth =getAuth();
    const user = auth.currentUser;
    console.log(user);
    const dispatch = useDispatch()
    
    useEffect(()=>{
      return(fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then(data=>dispatch(Products(data))))
    },[]);

    const values = useSelector((res)=>res);
    console.log(values);

    const cartItems =   
      <div className='cartPart' style={{display:'grid',margin:'5px'}}>
        <div ><div className='cartItemPart'><CartItem  /></div></div>
        <div className='cartValuePart'><CartValue cartItems={values.FirstReducer}/></div>
      </div>

    const cartProductsLength = values.FirstReducer.cartProducts.length;
  
    return (
    <Router>  
      <div className ='App'>
        <div style={{marginBottom:"5px"}}>
          <NavBar cart={cartProductsLength}/>
        </div> 
        <Switch>
            <Route exact path='/home'>
              <Home/>
            </Route>
            <Route exact path='/items'>
              <Items  products={values.FirstReducer.products}/>
            </Route>
            <Route exact path='/cart'>
                {cartItems}
            </Route>
            <Route exact path='/authentication'>
            {
                  user===null ? 
                  <Authentication/>
                  :
                  <Redirect to='/home'/>
              }
            </Route>
            <Route exact path ='/signup'>
            {
                  user===null ? 
                  <SignUp/>
                  :
                  <Redirect to='/home'/>
              }
            </Route>
            <Route exact path='/setting'>
            {
              user===null ? 
                  <Redirect to='/authentication'/>
                :
                  <Setting/>   
              } 
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
        </Switch>
        <div className='footer'>
          <Footer/>
        </div>
      </div>
    </Router>
    )
  }

