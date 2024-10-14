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
import Levels from "@/app/api/Learn/Level";
import toast from "react-hot-toast";
import { PlusIcon } from "../icons/plus-icon";

interface ApiResponse<T> {
  status: boolean;
  result?: T;
}

interface Props {
  onAddNewLevel: (newLevel: any) => void;
}

export const AddLevel = ({ onAddNewLevel }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [name_en, setName_en] = useState("");
  const [name_ka, setName_ka] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [description_ka, setDescription_ka] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddLevel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newLevelData = {
      levelName_en: name_en,
      levelName_ka: name_ka,
      description_en: description_en,
      description_ka: description_ka,
      logoURL: "", // Assuming you have a way to set this
    };

    setIsLoading(true);
    const levelAPI = Levels();
    const response: ApiResponse<any> = (await levelAPI.handleAddLevel(
      newLevelData
    )) as ApiResponse<any>;

    setIsLoading(false);

    if (response.status) {
      onAddNewLevel(response.result);
      toast.success("Level added successfully");
      onClose();
    } else {
      toast.error(response.result);
      console.error("Failed to add level:", response);
    }
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<PlusIcon fill="currentColor" />}
      >
        Add Level
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <form onSubmit={handleAddLevel}>
            <ModalHeader className="flex flex-col gap-1">Add Level</ModalHeader>
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
                Add Level
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
