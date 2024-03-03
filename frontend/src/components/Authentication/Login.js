import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [show, setShow] = useState(false)
    const [login, setLogin] = useState([])
    const toast=useToast()
    const navigate=useNavigate()
    function handleClick() {
        setShow(!show)
    }
    const handleLogin = () => {
        if (login.email === undefined || login.password === undefined) {
            toast({
                title: 'Please fill details.',
                description: "Email and password are empty.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:"top-right"
            })
        }
        else {
            axios.post("/user/login", login).then((res, err) => {
                if(res.status===200){
                    localStorage.setItem("user", JSON.stringify(res.data))
                    navigate("/chats")
                }else{
                    toast({
                        title: 'User not found.',
                        description: "Please fill right details of user.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position:"top-right"
                    })
                }
            })
        }
    }
    return (
        <VStack>
            <FormControl id='login-email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeContent="Enter Your Email" onInput={(e) => setLogin({ ...login, email: e.target.value })} />
            </FormControl>
            <FormControl id='login-password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "Password"} placeContent="Enter Your Email" onInput={(e) => setLogin({ ...login, password: e.target.value })} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => handleClick()}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme='blue' width="100%" style={{ marginTop: 15 }} onClick={() => handleLogin()}>
                Login
            </Button>
        </VStack>
    )
}
