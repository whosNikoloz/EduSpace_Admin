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
import Levels from "@/app/api/Learn/Level";
import toast from "react-hot-toast";

interface Props {
  levelId: number;
  onLevelDelete: (levelId: number) => void;
}
interface ApiResponse<T> {
  success: boolean;
  result?: T;
}

export const DeleteLevel = ({ levelId, onLevelDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const levelAPi = Levels();
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLevelRemove = async (levelId: number) => {
    setIsLoading(true);
    const response: ApiResponse<any> = (await levelAPi.handleRemoveLevel(
      levelId
    )) as ApiResponse<any>;
    if (response.success) {
      onLevelDelete(levelId);
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
              Delete Level
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
                  handleLevelRemove(levelId);
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
