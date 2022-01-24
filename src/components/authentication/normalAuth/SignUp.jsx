import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Form, Row } from 'react-bootstrap';


export default function SignUp() {
    let error = [] ;
    const [state,setState] = useState({
        email:'',
        password : null,
        confirmPassword: null
    })
    const auth = getAuth();
    console.log(state);
    
    const formSubmitValue =(event)=> {
        console.log(event.target.className)
        
        if(event.target.className==='email form-control'){
            const value = state;
            value.email = event.target?.value;
            setState(value);
            console.log(state);
        }
        if(event.target.className==='password form-control'){
            const value1 = state;
            value1.password=event.target?.value;
            setState(value1);
            console.log(state);
        }
        if(event.target.className==='confirm-Password form-control'){
            const value2 = state;
            value2.confirmPassword=event.target?.value;
            setState(value2);
            console.log(state);
        }
        else{
            console.log('Error founds ....');
        }        
    }        

    const userSignedUp = (event)=>{
        createUserWithEmailAndPassword(auth, state.email, state.password)
        .then((userCredential) => {
        //const user = userCredential.user;
        error = [];
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
        error=[error.Message];
        });

        event.preventDefault();
    }

    return (
        <div>
            <Form  className=' w-50 m-auto shadow-lg rounded mt-3 p-3'>
            <Row>
                <h3 className='text-success '>Sign Up</h3>
            </Row>
            <Row>
                <h5 className='text-success '>{error[0]}</h5>
            </Row>
            <Row className="mb-3 ">
                <Form.Group  controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control className='email' onBlur={formSubmitValue} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group  controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className='password' onBlur={formSubmitValue} type="password" placeholder="Password" />
                </Form.Group>
                
                <Form.Group  controlId="formGridPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control className='confirm-Password' onBlur={formSubmitValue} type="password" placeholder="confirmPassword" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" >
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button onClick={userSignedUp} variant="primary" type="submit" >
                Submit
            </Button>
            </Form>
        </div>
    )
}
