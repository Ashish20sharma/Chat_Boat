import {  Avatar, Box, Button, Drawer, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router-dom'
import  axios from "axios"
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
function SIdeDrawer() {
    const [search,setSearch]=useState("")
    const [loading,setLoading] =useState(false)
    const [searchResult,setSearchResult] =useState([])
    const navigate = useNavigate()
    const { user,setSelectedChat ,chats,setChats} = ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const toast=useToast()
    const handleSearch=async()=>{
        if(!search){
            toast({
                title: 'Please Enter something in search.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"top-left"
            })
            return;
        }
        try {
            setLoading(true)

            const config={
                headers:{
                    Autherization:`Bearer ${user.token}`
                }
            }

            const {data}=await axios.get(`/searchUser/search/${search}`,config)
            console.log(data)
            setLoading(false)
            setSearchResult(data.user)
        } catch (error) {
            toast({
                title: 'Error Occured!.',
                description:'Failed to Load the Search Result',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top-left"
            })
        }
    }

    const accessChat=async(UserId)=>{
        try {
            setLoading(true);

            const config={
                headers:{
                    "content-type":"application/json",
                    Autherization:`Bearer ${user.token}`
                }
            }

            const {data}=await axios.post("/chat/accessChat",{UserId},config)

            if(!chats.find((c)=>c._id === data._id)) setChats([data,...chats])

            setSelectedChat(data);
            setLoading(false);
            onClose();
        } catch (error) {
            toast({
                title: 'Error fetching the chats!.',
                description:error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top-left"
            })
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }
    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
                <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="ri-search-line"></i>
                        <Text display={{ base: "none", md: "flex" }} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="exl" >
                    ChatBoat
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <i className="ri-notification-2-fill"></i>
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<i className="ri-arrow-drop-down-fill"></i>}>
                            <Avatar size="sm" cursor="pointer" name={user.data.name} src={user.data.pic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModel>
                            <MenuDivider />
                            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Search User</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Box display="flex" pb={2}>
                        <Input placeholder='Search by name or email' mr={2} value={search} onInput={(e)=>setSearch(e.target.value)}/>
                        <Button onClick={()=>handleSearch()}>
                            Go
                        </Button>
                        </Box>
                        {loading?(<ChatLoading/>):
                        searchResult.map((user)=>{
                            return <UserListItem 
                            key={user._id} user={user} handleFunction={()=>accessChat(user._id)} />
                        })}
                        {loading && <Spinner ml="auto" display="flex"/>}
                    </DrawerBody>

                    {/* <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default SIdeDrawer
