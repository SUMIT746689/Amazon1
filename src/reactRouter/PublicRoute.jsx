import { getAuth } from '@firebase/auth';
import React from 'react';
import { Redirect } from 'react-router';



export default function PublicRoute({children}) {
    const auth = getAuth();
    const user =auth.currentUser;
    console.log(children);
    return (
        <div>
           {
               user===null ? 
               <Redirect to='/authentication'/>
               :
               {children}    
               
           }
        </div>
    )
}
