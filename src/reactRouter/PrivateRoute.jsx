import { getAuth } from '@firebase/auth';
import React from 'react';
import { Redirect } from 'react-router';



export default function PrivateRoute({children,...rest}) {
    const auth = getAuth();
    const user =auth.currentUser;
    console.log(children);
    return (
        <div>
           {
               user===null ? 
               {children}
               :
               <Redirect to='/home'/>
           }
        </div>
    )
}
