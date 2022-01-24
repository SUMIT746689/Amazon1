import React from 'react';
import { Button } from 'react-bootstrap';
import {signOut, getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { LogInUser } from '../../redux/actions/Actions';
import {FaFacebookSquare} from 'react-icons/fa';

const provider = new FacebookAuthProvider();
export default function FbSignIn() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.FirstReducer.logInUser)
    console.log(state)
    const fbSignIn = ()=>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(LogInUser(user.providerData[0]))    
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode,errorMessage,email,credential)
      });}
    const fbSignOut =()=>{
        const auth = getAuth();
        signOut (auth).then(() => {
        dispatch (LogInUser(null));
        }).catch((error) => {
        // An error happened.
        });
    }
    return (
        <div>
            <div style={{marginTop : '2px'}}>
                
            {state ? 
            <Button onClick={()=>fbSignOut()}><FaFacebookSquare/> Log Out With Facebook  </Button> 
            :
            <Button onClick={()=>fbSignIn() }><FaFacebookSquare/> Log In With Facebook </Button>
            }
        </div>
        </div>
    )
}
