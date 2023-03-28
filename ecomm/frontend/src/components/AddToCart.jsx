import React from 'react'
import { useSelector } from 'react-redux'

export const AddToCart = () => {

  
  const cartProducts = useSelector(state =>  state.AppReducer.cartProducts)



  return (
    
   <>
    {cartProducts.map((item) => (
       
       <div style={{border : "1px solid red"}} key={item.id} >
          <img src={item.img} alt="" style={{width : "50px"}}/>
          <h1>{item.productName}</h1>
          <h1>{item.price}</h1>
       </div>


    ))}

    </>

  

  )
}
