import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { EditIcon } from "../icons/table/edit-icon";
import Courses from "@/app/api/Learn/Course";
import toast from "react-hot-toast";

interface CourseModel {
  courseId: number;
  courseName_ka: string;
  courseName_en: string;
  formattedCourseName: string;
  courseLogo: string;
  description_ka: string;
  description_en: string;
  subjects: [];
}
interface Props {
  onUpdateCourse: (UpdatedLeve: CourseModel) => void;
  Course: CourseModel;
}

interface ApiResponse<T> {
  status: boolean;
  result?: T;
}

export const EditCourse = ({ onUpdateCourse, Course }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [name_en, setName_en] = useState(Course.courseName_en);
  const [name_ka, setName_ka] = useState(Course.courseName_ka);
  const [description_en, setDescription_en] = useState(Course.description_en);
  const [description_ka, setDescription_ka] = useState(Course.description_ka);
  const [formattedCourseName, setFormattedCourseName] = useState(
    Course.formattedCourseName
  );
  const [isLoading, setIsLoading] = useState(false);

  const CourseAPI = Courses();

  const handleCourseUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newCourseData = {
      CourseName_en: name_en,
      CourseName_ka: name_ka,
      description_en: description_en,
      description_ka: description_ka,
      logoURL: Course.courseLogo, // Assuming you keep the existing logo URL
    };

    setIsLoading(true);
    const response: ApiResponse<any> = (await CourseAPI.handleUpdateCourse(
      Course.courseId,
      newCourseData
    )) as ApiResponse<any>;
    if (response.status) {
      setIsLoading(false);
      onClose();
      onUpdateCourse(response.result);
      toast.success("Course Updated successfully");
    } else {
      setIsLoading(false);
      toast.error(response.result);
      console.error("Failed to update Course:", response);
    }
  };

  return (
    <div>
      <Tooltip content="Edit Course" color="primary">
        <Button isIconOnly className="bg-transparent" onPress={onOpen}>
          <EditIcon size={20} fill="#979797" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <form onSubmit={handleCourseUpdate}>
            <ModalHeader className="flex flex-col gap-1">
              Update Course
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
                label="Formated Name"
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
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
