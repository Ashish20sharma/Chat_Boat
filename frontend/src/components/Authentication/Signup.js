import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
export default function Signup() {
    const [show, setShow] = useState(false)
    const [signup, setSignup] = useState([])
    const toast = useToast()
    function handleClick() {
        setShow(!show)
    }
    const handleSignup = () => {
        const formdata = new FormData()
        formdata.append("name", signup.name)
        formdata.append("email", signup.email)
        formdata.append("password", signup.password)
        formdata.append("pic", signup.pic)
        
        if (signup.password === signup.Cpassword) {
            axios.post("/user/register", formdata, { header: { "Content-Type": "multipart/form-data" } }).then((res, err) => {
                if(res.status===200){
                    toast({
                        title: 'RE=egister Success.',
                        description: "Password and Conform password is not matching.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                        position:"top-right"
                    })
                    localStorage.setItem("user",JSON.stringify(res.data))
                }else if (202){
                    toast({
                        title:res.data.message,
                        description: "User already exist with this email",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position:"top-right"
                    })
                }
                console.log(res.data)
            })
        } else {
            toast({
                title: 'Conform password is wrong.',
                description: "Password and Conform password is not matching.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:"top-right"
            })
        }
    }
    return (
        <VStack>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input type='text' placeContent="Enter Your Name" onInput={(e) => setSignup({ ...signup, name: e.target.value })} />
            </FormControl>
            <FormControl id='signup-email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeContent="Enter Your Email" onInput={(e) => setSignup({ ...signup, email: e.target.value })} />
            </FormControl>
            <FormControl id='signup-password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "Password"} placeContent="Enter Your Email" onInput={(e) => setSignup({ ...signup, password: e.target.value })} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='Cpassword' isRequired>
                <FormLabel>Conform Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "Password"} placeContent="Enter Your Email" onInput={(e) => setSignup({ ...signup, Cpassword: e.target.value })} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic' isRequired>
                <FormLabel>Upload your picture</FormLabel>
                <Input type='file' p={1.5} accept='image/*' onInput={(e) => setSignup({ ...signup, pic: e.target.files[0] })} />
            </FormControl>
            <Button colorScheme='blue' width="100%" style={{ marginTop: 15 }} onClick={() => handleSignup()}>
                Sign Up
            </Button>
        </VStack>
    )
}
