import React from 'react'
import Button from 'react-bootstrap/Button';
import {  useDispatch ,useSelector } from 'react-redux'
import { removeCart } from '../../../redux/actions/Actions'

export default function CartItem() {
    const state = useSelector (state => state.FirstReducer.cartProducts)
    const dispatch = useDispatch() ;
    console.log(state)
    
    const cartProduct =state.map((value)=>(
        <div className="cartItem" key={value[1]} >
            <img src={value[0].image} alt={`imageNo ${value[0].id}`} style={{width :'10%'}}/>
            <h4>{`Id : ${value[0].id}`}</h4>
            <div>
                <h5>{`Category : ${value[0].category}`}</h5>
                <h4>{`Price : ${value[0].price}`}</h4>
            </div>
            <div style={{display: 'flex',justifyContent:'center',alignItems:'center'}}>
                <Button variant='dark' onClick={()=>{dispatch(removeCart(value[1]))}} style={{width : 'auto',}}>Remove Item</Button>
            </div>
        </div>
    ))
    return (
        <div>
            <h2> Cart Items : </h2>
            {
                cartProduct
            }
        </div>
    )
}
