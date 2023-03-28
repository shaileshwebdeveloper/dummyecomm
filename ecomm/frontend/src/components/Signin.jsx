import React, { useContext, useEffect, useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './AuthContextProvider';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { Home } from './Home';
import { auth, provider } from './GoogleSignin';
import { googleLogin, login } from './Redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
  
  export const Signin = () => {


    const navigate =  useNavigate()

    // const { isAuth, setIsAuth, toggleAuth } = useContext(AuthContext);

    const isAuth =  useSelector(state =>  state.AuthReducer.isAuth)

    const dispatch =  useDispatch()


     const [payload, setPayload] = useState({
         email : '',
         password : ''
     })

     const [value, setValue] = useState('')

    const handleChange = (e) => {
      const {name, value} = e.target   
      
      setPayload({...payload, [name] : value})
    }
  
    const handleSubmit = (e) => {

      e.preventDefault()
      // console.log("ehssjs")

      dispatch(login(payload))
    
      
      
    //   setData([...data, payload])
    //     axios.post("http://localhost:3001/signin", payload)
    //     .then((r) => {
    //         if(r.data.token !== undefined){
    //           localStorage.setItem("token", r.data.token)
    //           navigate('/')
    //         }
    //         else{
    //            alert("Please add valid email && password")
    //         }
    //     })
    //     .catch((e) => console.log(e))     
  
    }

    const googleSignin = () => {

       signInWithPopup(auth,provider)
       .then((data) => {

         setValue(data.user.email)
         localStorage.setItem("email", data.user.email)
         dispatch(googleLogin())
    
       })


    }


     useEffect(() => {
        
      setValue(localStorage.getItem("email"))

     }, [])
     

     const {email, password} = payload



    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>

          <form onSubmit={handleSubmit}>

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" value={email} onChange={handleChange}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" value={password} onChange={handleChange}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
     
                <FormControl  isRequired>
              <Input type="submit" value="Sign In" />
            </FormControl>
            
            {value? navigate("/") : 
            <Button colorScheme='red' variant='solid' onClick={googleSignin}>Sign in with Google </Button>
             }
              </Stack>
            </Stack>
          </Box>
          </form>
        </Stack>
      </Flex>
    );
  }