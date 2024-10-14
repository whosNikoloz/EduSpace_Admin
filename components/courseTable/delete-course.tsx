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
import Courses from "@/app/api/Learn/Course";
import toast from "react-hot-toast";

interface Props {
  CourseId: number;
  LogoPath: string;
  onCourseDelete: (CourseId: number) => void;
}
interface ApiResponse<T> {
  status: boolean;
  result?: T;
}

export const DeleteCourse = ({ CourseId, LogoPath, onCourseDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const CourseAPi = Courses();
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleCourseRemove = async (CourseId: number) => {
    setIsLoading(true);
    const response: ApiResponse<any> = (await CourseAPi.handleRemoveCourse(
      CourseId,
      LogoPath
    )) as ApiResponse<any>;
    if (response.status) {
      onCourseDelete(CourseId);
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
      <Tooltip content="Delete Course" color="danger">
        <button onClick={handleOpen}>
          <DeleteIcon size={20} fill="#FF0080" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={handleClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Course
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
                  handleCourseRemove(CourseId);
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
