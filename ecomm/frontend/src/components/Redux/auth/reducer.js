import * as types from './actionTypes'

const initialState = {
    isAuth : false,
    token : '',
    isAuthLoading : false,
    isAuthError : false
}

export const reducer = (oldState = initialState, action) => {
       
    const {type, payload} = action;
    switch(type){

      case types.USER_LOGIN_REQUEST:
        return{
            ...oldState,
            isAuthLoading: true
        }

        case types.USER_LOGIN_SUCCESS:
            return{
                ...oldState,
                isAuthLoading: false,
                isAuth: true,
                token : payload
        }


        case types.USER_LOGIN_FAILURE:
            return{
                ...oldState,
                isAuthLoading: false,
                isAuthError  : true,
                isAuth : false,
                token : "",
        }

        case types.USER_LOGOUT_SUCESS :
            return{
                ...oldState,
                isAuthLoading: false,
                isAuthError  : true,
                isAuth : false,
                token : "",
        }

        case types.USER_GOOGLE_LOGIN : 
        return{
            ...oldState,
            isAuthLoading: false,
            isAuth: true,
        }
        
     
    default:
        return oldState
    }
}