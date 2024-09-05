"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import Authentication from "@/app/api/User/auth";
import toast from "react-hot-toast";

interface Props {
  userId: number;
  onUserDelete: (userId: number) => void;
}
interface ApiResponse<T> {
  success: boolean;
  result?: T;
}

export const DeleteUser = ({ userId, onUserDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = Authentication();
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleUserRemove = async (userId: number) => {
    setIsLoading(true);
    const response: ApiResponse<any> = (await auth.handleRemoveUser(
      userId
    )) as ApiResponse<any>;
    if (response.success) {
      onUserDelete(userId);
      setIsLoading(false);
      setIsOpen(false);
      toast.success("User deleted successfully");
    } else {
      setIsLoading(false);
      toast.error(response.result);
      console.error("Failed to delete user:", response);
    }
  };

  return (
    <div>
      <Tooltip content="Delete user" color="danger">
        <button onClick={handleOpen}>
          <DeleteIcon size={20} fill="#FF0080" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={handleClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete User
            </ModalHeader>
            <ModalBody>Delete?</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={handleClose}>
                Close
              </Button>
              <Button
                color="primary"
                isLoading={isLoading}
                onClick={() => {
                  handleUserRemove(userId);
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};
