import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Signup() {
    const [show, setShow] = useState(false)
    const [signup,setSignup]=useState([])
    function handleClick() {
        setShow(!show)
    }
    const handleSignup=()=>{
        console.log(signup)
    }
    return (
        <VStack>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeContent="Enter Your Name" onInput={(e)=>setSignup({...signup,name:e.target.value})}/>
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeContent="Enter Your Email" onInput={(e)=>setSignup({...signup,email:e.target.value})} />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "Password"} placeContent="Enter Your Email" onInput={(e)=>setSignup({...signup,password:e.target.value})}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Conform Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "Password"} placeContent="Enter Your Email" onInput={(e)=>setSignup({...signup,Cpassword:e.target.value})}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic' isRequired>
                <FormLabel>Upload your picture</FormLabel>
                <Input type='file' p={1.5} accept='image/*' onInput={(e)=>setSignup({...signup,pic:e.target.files[0]})}/>
            </FormControl>
            <Button colorScheme='blue' width="100%" style={{marginTop:15}} onClick={()=>handleSignup()}>
                Sign Up
            </Button>
        </VStack>
    )
}
