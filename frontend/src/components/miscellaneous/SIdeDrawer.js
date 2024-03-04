import { Drawer, Avatar, Box, Button, Drawer, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router-dom'

function SIdeDrawer() {
    const navigate = useNavigate()
    const { user } = ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
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
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default SIdeDrawer
