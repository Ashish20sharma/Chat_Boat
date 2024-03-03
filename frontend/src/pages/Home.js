import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate=useNavigate()
  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem("user"))
    if(userInfo){
      navigate("/chats")
    }
  },[navigate])
  return (
    <Container maxWidth="xl" centerContent display="flex" alignContent="center" justifyContent="center">
      <Box d="flex" justifyContent='center' textAlign="center" p={3} bg={"white"} w='100%' m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
        <Text fontSize="4xl" fontFamily="Work sans" color="black">Let`s Chat</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px" >
        <Tabs variant='soft-rounded' >
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}
