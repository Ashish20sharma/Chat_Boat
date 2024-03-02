import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Login() {
    const [show, setShow] = useState(false)
    const [login,setLogin]=useState([])
    function handleClick() {
        setShow(!show)
    }
    const handleLogin=()=>{
        
    }
  return (
    <VStack>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeContent="Enter Your Email" onInput={(e)=>setLogin({...login,email:e.target.value})} />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "Password"} placeContent="Enter Your Email"  onInput={(e)=>setLogin({...login,password:e.target.value})}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme='blue' width="100%" style={{marginTop:15}} onClick={()=>handleLogin()}>
                Login
            </Button>
        </VStack>
  )
}
