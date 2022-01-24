import React, { useState } from 'react';
import { Form, Row,Button } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { LogInUser } from '../../../redux/actions/Actions';
import { NavLink } from 'react-router-dom';


export default function Login() {
    const [logInValue,setLogInValue] = useState({
        email:'',
        password :'',
        error : '',
        haveError:false 
    });

    const dispatch = useDispatch();

    const auth = getAuth();
    const formSignInValue =(e)=>{
        if(e.target.type==="email"){
            let value1 = logInValue;
            value1.email = e.target.value;
            setLogInValue(value1);
            console.log(logInValue);
            
        }
        if(e.target.type==="password"){
            let value = logInValue;
            value.password = e.target.value;
            setLogInValue(value);
            console.log(logInValue);
        }
    
    }

    const SigninSubmit =(e)=>{
        signInWithEmailAndPassword(auth, logInValue.email, logInValue.password)
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log(userCredential.user.providerData[0]);
            dispatch(LogInUser(user.providerData[0]));
            const value = logInValue;
            value.error = 'success';  
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const value = logInValue;
            value.error = errorCode;
            value.haveError = true ;
            setLogInValue(value );
            console.log(errorCode,errorMessage)
        });

        e.preventDefault()
    }
    
    console.log(useSelector(user=>user))
    return (
        <div>
            <Form  className=' w-50 m-auto shadow-lg rounded mt-3 p-3'>
            <Row>
                <h3 className='text-success '>Log In</h3>
            </Row>
            
                {logInValue.haveError===true ?  <h3>logInValue.error </h3>: ''}
            
            <Row className="mb-3 ">
                <Form.Group  controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onBlur={formSignInValue} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group  controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control  onBlur={formSignInValue} type="password" placeholder="Password" />
                </Form.Group>
            </Row>
            <Button onClick={SigninSubmit} variant="primary" type="submit" >
                Log In 
            </Button>
            <br/>
            <h6 className='text-secondary mb-1'>OR</h6>
            <NavLink to='/signup'>
                <Button>
                    Create a New Account ?
                </Button>
            </NavLink>
            </Form>
            
        </div>
    )
}
