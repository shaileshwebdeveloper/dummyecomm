import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  HStack,
  Menu,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect} from "react";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./Redux/auth/action";



const Links = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/8948/8948777.png",
    nav: "/wishlist",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
    nav: "/addtocart",
  },
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    // href={"#"}
  >
    {children}
  </Link>
);




export const Navbar = () => {

  const [state, setState] = useState('Active')
  const [count, setCount] = useState(0)
  const [remaining, setRemaining] = useState(0)

  const onIdle = () => {
    setState('Idle')
  }

  const onActive = () => {
    setState('Active')
  }

  const onAction = () => {
    setCount(count + 1)
  }

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 10_000,
    throttle: 500
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  // console.log("getremainingtime", getRemainingTime)


  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const isAuth =  useSelector(state =>  state.AuthReducer.isAuth)
  
  useEffect(() => {

    if(isAuth){
       navigate("/")
    }

  }, [isAuth])

//  console.log("isAuth", isAuth)
  

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Avatar
                src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404__340.png"
                size={"sm"}
                w="100px"
                alt=""
                onClick={() => navigate("/")}
              />
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink>
                <Avatar
                  size={"sm"}
                  src={
                    "https://cdn-icons-png.flaticon.com/512/8948/8948777.png"
                  }
                  alt=""
                  onClick={() => navigate("/wishlist")}
                />
              </NavLink>

              <NavLink>
                <Avatar
                  size={"sm"}
                  src={"https://cdn-icons-png.flaticon.com/512/891/891462.png"}
                  alt=""
                  onClick={() => navigate("/addtocart")}
                />
              </NavLink>
            </HStack>

            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => {
               navigate("/signup");
              }}
            >
              SIGN UP
            </Button>

            { !isAuth ? (
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                SIGN IN
              </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Avatar src={link} alt="" size="sm" />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
