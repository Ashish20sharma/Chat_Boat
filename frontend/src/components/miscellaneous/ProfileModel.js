import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function ProfileModel({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(user)
    return (
        <>
            {children ? (<span onClick={onOpen}>{children}</span>) : (<IconButton display={{ base: "flex" }} icon={<i class="ri-eye-line"></i>} onClick={onOpen} />)}

            <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent height="410px">
                    <ModalHeader fontSize="40px" display="flex" justifyContent="center">{user.data?user.data.name:user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Image borderRadius="full" boxSize="150px" src={user.data?user.data.pic:user.pic} alt={user.data?user.data.email:user.email} />
                        <Text fontSize={{ base: "2px", md: "30px" }} fontFamily="Work sans">Email:{user.data?user.data.email:user.email}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModel
