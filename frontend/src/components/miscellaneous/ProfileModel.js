import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function ProfileModel({ user, children }) {
    console.log(children)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {children ? (<span onClick={onOpen}>{children}</span>) : (<IconButton display={{ base: "flex" }} icon={<i class="ri-eye-line"></i>} onClick={onOpen} />)}
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent height="410px">
                    <ModalHeader fontSize="40px" display="flex" justifyContent="center">{user.data.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Image borderRadius="full" boxSize="150px" src={user.data.pic} alt={user.data.name} />
                        <Text fontSize={{ base: "2px", md: "30px" }} fontFamily="Work sans">Email:{user.data.email}</Text>
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
