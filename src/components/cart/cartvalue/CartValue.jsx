import Button from 'react-bootstrap/Button';
import React from 'react';

export default function CartValue(props) {

    const {cartProducts} = props.cartItems;
    console.log(cartProducts)
    const  totalPrice = cartProducts.reduce((total,item)=>{
        total = total + item[0].price;
        return (total);
    },0);

    console.log(totalPrice);
    
    return (
        <div>
            <h2>Cart values :</h2>
            <h5>No of items : {cartProducts.length}</h5>

            <h4 style={{borderTop :'1px solid black',padding:'5px' }}>Total Price : {totalPrice}</h4>            
            <Button variant='warning' className='text-light' >Order Now</Button>
        </div>
    )
}
