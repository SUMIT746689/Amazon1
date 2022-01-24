import {getAuth, GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';
import React from 'react';
import { initializeApp } from "firebase/app";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseConfigure } from '../../firebase/firebaseConfig/FirebaseConfigure';
import { LogInUser } from '../../redux/actions/Actions';
import {FcGoogle} from 'react-icons/fc';
 
initializeApp(firebaseConfigure)


export default function SignIn() {
    //const  [logInUser,setLogInUser] =useState([]);
    const dispatch = useDispatch();
    //console.log(logInUser);
    const value = useSelector(state=>state.FirstReducer.logInUser?._tokenResponse);
    console.log(value)
    const auth = getAuth();

    const GoogleSignIn =()=> {
        
    const provider = new GoogleAuthProvider();

        signInWithPopup (auth, provider)
        .then((result) => {
          dispatch(LogInUser(result.user.providerData[0]));
        }).catch((error) => {
      
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          console.log(email,errorCode,errorMessage)
        });
      }
    const GoogleSignOut =()=>{
     
          signOut(auth).then((err) => {
          dispatch(LogInUser(null))
          }).catch((error) => {
          // An error happened.
        });
      }
      

    return (
        <div>
            {value ? 
            <Button onClick={()=>GoogleSignOut()}><FcGoogle/> Log Out With Google </Button> :
            <Button onClick={()=>GoogleSignIn()}><FcGoogle/> Log In With Google </Button>
            }
            
            
        </div>
    )
}
