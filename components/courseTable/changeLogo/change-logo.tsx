import React, { useState } from "react";
import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  Tooltip,
} from "@nextui-org/react";
import CropImg from "./crop_img";
import Authentication from "@/app/api/User/auth";
import toast from "react-hot-toast";
import { Card, CardBody } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import Courses from "@/app/api/Learn/Course";
import { PictureIcon } from "@/components/icons/table/picture-icon";

interface ApiResponse<T> {
  status: boolean;
  result?: T;
}

function ChangeCourseLogo({
  courseLogo,
  courseid,
  courseName,
  onUpdateLogo,
}: {
  courseLogo: string;
  courseid: number;
  courseName: string;
  onUpdateLogo(newPicture: string, courseId: number): void;
}) {
  const {
    isOpen: isUploadModalOpen,
    onOpen: onUploadModalOpen,
    onClose: onUploadModalClose,
  } = useDisclosure();

  const {
    isOpen: isCropModalOpen,
    onOpen: onCropModalOpen,
    onClose: onCropModalClose,
  } = useDisclosure();

  const {
    isOpen: isCroppedModalOpen,
    onOpen: onCroppedModalOpen,
    onClose: onCroppedModalClose,
  } = useDisclosure();

  const CourseAPi = Courses();

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadinCrop, setIsLoadingCrop] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [UploadedImg, setUploadedImg] = useState<string | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);

  const base64ToBlob = (base64: string, mimeType: string = "image/jpeg") => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleSavePicture = async () => {
    const oldpicture = courseLogo;
    const newpicture = croppedImg;
    setIsUploading(true);

    if (newpicture) {
      const blob = base64ToBlob(newpicture);
      const file = new File([blob], "profilePic.jpg", { type: "image/jpeg" });

      const response: ApiResponse<any> = (await CourseAPi.ChangeCourseLogo(
        file,
        oldpicture,
        courseid,
        courseName
      )) as ApiResponse<any>;

      if (response.status) {
        onUpdateLogo(response.result, courseid);
        toast.success("Course added successfully");
      } else {
        toast.error(response.result);
        console.error("Failed to Upload Logo:", response);
      }

      setIsUploading(false);
      setIsLoadingUpload(false);

      onCroppedModalClose();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingUpload(true);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImg(result);
        setIsLoadingUpload(false);
        onUploadModalClose();
        onCropModalOpen();
      };
      if (file.type.includes("image")) {
        reader.readAsDataURL(file);
      } else {
        alert("Invalid file type. Please upload an image.");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    handleFileChange({
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <Tooltip content="Change Logo" color="success">
        <button onClick={onUploadModalOpen}>
          <PictureIcon size={25} fill="#979797" />
        </button>
      </Tooltip>

      <Modal
        backdrop="blur"
        isOpen={isUploadModalOpen}
        onClose={onUploadModalClose}
      >
        <ModalContent>
          {(onUploadModalClose) => (
            <>
              <ModalHeader className="text-center">
                Add Profile Picture
              </ModalHeader>
              <ModalBody className="flex flex-col items-center gap-6 ">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full gap-6 p-10  border-gray-300 rounded-lg text-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Avatar src={courseLogo} className="w-28 h-28 " />

                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div className="flex flex-col items-center gap-4">
                    <p className="text-gray-500">
                      Drag photo here <br /> — or —
                    </p>

                    <div className="flex gap-4">
                      <Button
                        variant="shadow"
                        color="primary"
                        size="sm"
                        onClick={() => {
                          const fileInput = document.getElementById(
                            "dropzone-file"
                          ) as HTMLInputElement | null;
                          fileInput?.click();
                        }}
                        isLoading={isLoadingUpload}
                      >
                        Upload from Computer
                      </Button>
                      <Button variant="shadow" color="primary" size="sm">
                        Take a Picture
                      </Button>
                    </div>
                  </div>
                </label>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Second Modal - Crop Image */}
      <Modal
        backdrop="blur"
        isOpen={isCropModalOpen}
        onClose={onCropModalClose}
      >
        <ModalContent>
          {(onCropModalClose) => (
            <>
              <ModalHeader className="text-center">Crop Image</ModalHeader>
              <ModalBody className="flex flex-col items-center py-6">
                <CropImg
                  courseLogo={UploadedImg || courseLogo}
                  onCropComplete={(croppedImageData: string) => {
                    setCroppedImg(croppedImageData);
                    onCropModalClose();
                    onCroppedModalOpen();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Third Modal - Cropped Image */}
      <Modal
        backdrop="blur"
        isOpen={isCroppedModalOpen}
        onClose={onCroppedModalClose}
      >
        <ModalContent>
          {(onCroppedModalClose) => (
            <>
              <ModalHeader className="text-center">Cropped Image</ModalHeader>
              <ModalBody className="flex flex-col items-center py-6">
                <Image
                  src={croppedImg || courseLogo}
                  alt="Cropped Profile Pic"
                  className="w-40 h-40 rounded-full"
                />
              </ModalBody>
              <ModalFooter className="flex justify-center gap-4">
                <Button
                  variant="shadow"
                  color="primary"
                  onClick={onCroppedModalClose}
                >
                  Close
                </Button>
                <Button
                  variant="shadow"
                  color="primary"
                  onClick={handleSavePicture}
                  isLoading={isUploading}
                >
                  Save as Profile Picture
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeCourseLogo;
