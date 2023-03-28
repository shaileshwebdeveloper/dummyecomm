import * as types from './actionTypes'


const initialState = {
    products : [],
    cartProducts : [],
    isLoading:  false,
    isError  : false,
}


export const reducer =  (oldState =  initialState, action) => {

   const {type, payload} = action;

   switch(type){

       case types.GET_PRODUCTS_REQUEST:
        return{
            ...oldState,
            isLoading :  true
        }

        case types.GET_PRODUCTS_SUCCESS:
            return{
                ...oldState,
                isLoading :  false,
                products: payload,
                isError: false
        }

        case types.GET_PRODUCTS_FAILURE:
            return{
                ...oldState,
                isLoading :  false,
                products: [],
                isError: true
        }
     
        case types.ADD_TO_CART:
            return{
                ...oldState,
                cartProducts : [...oldState.cartProducts, payload]
            }

     default:
      return oldState
   }
}