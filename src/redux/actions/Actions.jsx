
export const addCart =(id)=>{
    return {
        type : 'ADD CART',
        productId : id 
    }
}
export const removeCart =(cartItemUniqueKey)=>{
    return {
        type : 'REMOVE CART',
        uniqueKey : cartItemUniqueKey
    }
}
export const Products =(products)=>{
    return {
        type : 'PRODUCTS',
        products 
    }
}
export const LogInUser =(user)=>{
    console.log(user)
    return {
        type: 'LOGINUSER',
        userInfo : user
        }
}
