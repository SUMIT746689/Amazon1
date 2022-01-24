import { getAuth } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './userProfile.css';


export default function UserProfile() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [state, setstate] = useState({});
    useEffect(()=>{
    async function getUserProfile(){
        try{
            await setstate(user.providerData[0]);
        }
        catch(e){
            console.log(e)
        }
    };
    getUserProfile();
    },[user]);
    console.log(user);
    const imageStyle={
        width:'20%',
        height:'auto',
        border :'5px solid white',
        borderRadius :'50%',
        boxShadow: '0px 0px 5px 3px rgba(0,0,0,0.3)'
    }
    return (
        
        <div>
            <img src={state?.photoURL} alt="User Photos" style={imageStyle} /> 
            <h1 className ='text-secondary'>User Profile</h1>
            <h4>{state?.displayName}</h4>
            <div style={{border:"0.1px solid rgba(0,0,0,0.5)" }} ></div>
            <h5>Email : {state?.email}</h5>
            
            
        </div>
    )
}
