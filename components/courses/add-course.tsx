import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import Courses from "@/app/api/Learn/Course";
import toast from "react-hot-toast";
import { PlusIcon } from "../icons/plus-icon";

interface ApiResponse<T> {
  status: boolean;
  result?: T;
}

interface Props {
  levelid: number;
  onAddNewCourse: (newCourse: any) => void;
}

export const AddCourse = ({ onAddNewCourse, levelid }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [name_en, setName_en] = useState("");
  const [name_ka, setName_ka] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [description_ka, setDescription_ka] = useState("");
  const [formattedCourseName, setFormattedCourseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCourseData = {
      courseName_ka: name_en,
      courseName_en: name_ka,
      formattedCourseName: formattedCourseName,
      description_ka: description_ka,
      description_en: description_en,
      courseLogo: "", // Assuming you have a way to set this
    };

    setIsLoading(true);
    const CourseAPI = Courses();
    const response: ApiResponse<any> = (await CourseAPI.handleAddCourse(
      levelid,
      newCourseData
    )) as ApiResponse<any>;

    setIsLoading(false);

    if (response.status) {
      onAddNewCourse(response.result);
      toast.success("Course added successfully");
      onClose();
    } else {
      toast.error(response.result);
      console.error("Failed to add Course:", response);
    }
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<PlusIcon fill="currentColor" />}
      >
        Add Course
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <form onSubmit={handleAddCourse}>
            <ModalHeader className="flex flex-col gap-1">
              Add Course
            </ModalHeader>
            <ModalBody>
              <Input
                label="Name_en"
                variant="bordered"
                value={name_en}
                onChange={(e) => setName_en(e.target.value)}
              />
              <Input
                label="Name_ka"
                variant="bordered"
                value={name_ka}
                onChange={(e) => setName_ka(e.target.value)}
              />
              <Input
                label="Fromatted Name"
                variant="bordered"
                value={formattedCourseName}
                onChange={(e) => setFormattedCourseName(e.target.value)}
              />
              <Input
                label="Description_en"
                variant="bordered"
                value={description_en}
                onChange={(e) => setDescription_en(e.target.value)}
              />
              <Input
                label="Description_ka"
                variant="bordered"
                value={description_ka}
                onChange={(e) => setDescription_ka(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
                Add Course
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
