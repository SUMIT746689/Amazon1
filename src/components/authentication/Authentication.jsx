import React from 'react';
import { useSelector } from 'react-redux';
import FbSignIn from './FbAuth';
import GoogleSignIn from './GoogleAuth';
import LogIn from './normalAuth/LogIn';


export default function Authentication() {
    let {logInUser} = useSelector(state=>state.FirstReducer);
    console.log(logInUser);
    
    return (
        <div>
            <GoogleSignIn/>
            <FbSignIn/>
            <LogIn/>    
        </div>
    )
}
