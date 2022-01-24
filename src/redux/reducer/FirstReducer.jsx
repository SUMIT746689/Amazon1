

const initialState = {
    products : [],
    cartProducts : [],
    logInUser : null,
}


export function FirstReducer(state = initialState, action) {
    switch(action.type){
        case 'PRODUCTS' : 
            return{...state,products : action.products}
        case 'ADD CART' :
            const products = state.products.filter((x)=>x.id===action.productId) ;
        
            const values = (state.cartProducts.slice(-1))[0]?.[1];
            const valuse1 = values === undefined ?  0 : values;
            console.log(valuse1);
            const cartProductsLength = state.cartProducts.length ;
            console.log(cartProductsLength)
            const productsUniqueKey =  (cartProductsLength >= valuse1) ? cartProductsLength+1 : valuse1+1 ;
            console.log(productsUniqueKey)
            const updateProducts = [...products,productsUniqueKey];
            const updateAllCartProducts =[...state.cartProducts,updateProducts] ;
            
            return {...state,cartProducts : updateAllCartProducts }
        
        case 'REMOVE CART' :
            const removeFromCartProduct = state.cartProducts.filter((item)=>(item[1]!==action.uniqueKey)) ;
            console.log(removeFromCartProduct)
            
            return {...state,cartProducts : removeFromCartProduct} 
        
        case 'LOGINUSER' :
           
            return {...state,logInUser : action.userInfo}
        
        default :
            return state 
    }
}
