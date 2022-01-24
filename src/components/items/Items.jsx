import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/actions/Actions';
import {Button, Spinner} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

export default function Items() {
    const dispatch = useDispatch();
    const {pathname} =useLocation();
    const [items,setItems] = useState([]);
    const [loading,setLoading]= useState(true);
    
    useEffect(()=>{
        fetchText();
        
        window.scrollTo(0,0);
        
      },[pathname]);

    async function fetchText() {
        await fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(data=>setItems(data));
        setLoading(false);
    };
    
    console.log(items)
    return (
        <div style={{width:'100%',height:'100%'}}>
        {!loading ? 
            <div style={{display:'flex',flexWrap: 'wrap',justifyContent:'center'}}>
                {items.map((item)=>(
                <div className='text-secondary'  style={{width:'350px',boxShadow:'0px 5px 15px 1px rgba(0, 0, 0, 0.2)',padding:'10px',margin:'5px',textDecoration:'none',borderRadius:'20%'}} key={item.id} >
                    <div style={{width:'350px',height:'250px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <img src={item.image} alt='IMAGEs' style={{width:'150px',loading:'lazy'}}/>
                    </div>
                    <li >{`${item.id}`}</li>
                    <div>{`${item.category}`}</div>
                    <p className='font-weight-bold'>Price : {item.price}</p>
                    <div style={{width:'70%',margin:'auto'}}>
                        <div className='w-20 d-flex justify-content-around' >

                            <div className='ml-2'>
                                <Button >
                                    Description
                                </Button>
                            </div>
                            <Button className='btn-warning font-weight-bold' onClick={()=>{dispatch(addCart(item.id))}} style={{width:'auto'}}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                    
                </div>))}
                <br></br>
            </div>
                :
                <div>
                    <div >
                    <Button variant="primary" disabled>
                        <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                    </Button>{' '}
                    <Button variant="primary" disabled>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </Button>
                    <br/>
                    <br/>
                    </div>
                    <Spinner style={{width:'100px',height:'100px',opacity:'0.5',padding:'20px',fontSize:'20px'}} animation="border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            
            }
        </div>
    )
}
