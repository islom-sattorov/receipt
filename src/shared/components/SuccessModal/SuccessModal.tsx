import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Click somewhere</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => navigate("/")}>
              Okay!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
