import React from 'react'

export default function Home() {
    const style ={
        display:"flex",
        height:"50vh",
        color:"rgba(0,0,0,.6)",
        width:'100%',
        justifyContent:"center",
        alignItems:"center"
    } 
    return (
        <div style={style}>
            <h1 >This is Home Page ...</h1>
        </div>
    )
}
