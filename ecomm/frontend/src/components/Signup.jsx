import React from 'react'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, provider } from './GoogleSignin';
import { signInWithPopup } from 'firebase/auth';

export const Signup = () => {
     

    const [showPassword, setShowPassword] = useState(false)
    const [value, setValue] = useState("")
    const toast = useToast()

    const navigate =  useNavigate()

    const [payload, setPayload] = useState({
      firstname: "",
      lastname : "",
      email: "",
      password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setPayload({ ...payload, [name]: value });
      };
    
      const handleSubmit = (e) => {
    
         e.preventDefault()

        axios
          .post( "http://localhost:3001/signup", payload)
          .then((r) => console.log(r.data),  navigate("/signin"))
      };
    

      
    const googleSignin = () => {

      signInWithPopup(auth,provider)
      .then((data) => {

       console.log(data)

        setValue(data.user.email)
        localStorage.setItem("email", data.user.email)
       
      })

   }


    useEffect(() => {
       
     setValue(localStorage.getItem("email"))

    }, [])


      const { firstname, lastname, email, password } = payload;




  return (
<Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
             WELCOME BACK ✌️
          </Text>
        </Stack>

     
      {/* FORM SUBMISSION */}

       <form onSubmit={handleSubmit}>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name="firstname" value={firstname} onChange={handleChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" name="lastname" value={lastname} onChange={handleChange} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" value={email} onChange={handleChange}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={handleChange}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
               
            <FormControl  isRequired>
              <Input type="submit" value="Sign Up"/>
            </FormControl>

            {/* <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
                
                >
                Sign up
              </Button> */}


            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
    
        </form>

        {value? navigate("/") : 
            <Button colorScheme='red' variant='solid' onClick={googleSignin}>Sign in with Google </Button>
             }


      </Stack>
    </Flex>
  );
}
  

