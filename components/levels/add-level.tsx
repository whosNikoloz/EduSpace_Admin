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
interface ApiResponse<T> {
  success: boolean;
  result?: T;
}

export const AddLevel = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [name_en, setName_en] = useState("");
  const [name_ka, setName_ka] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [description_ka, setDescription_ka] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const newLevelData = {
    levelName_ka: "",
    levelName_en: "",
    logoURL: "",
    description_ka: "",
    description_en: "",
  };

  const levelAPI = Levels();
  const handleAddLevel = async () => {
    newLevelData.levelName_en = name_en;
    newLevelData.levelName_ka = name_ka;
    newLevelData.description_en = description_en;
    newLevelData.description_ka = description_ka;

    setIsLoading(true);
    const response: ApiResponse<any> = (await levelAPI.handleAddLevel(
      newLevelData
    )) as ApiResponse<any>;
    if (response.success) {
      //onLevelDelete(levelId);
      setIsLoading(false);
      onClose();
      toast.success("User deleted successfully");
    } else {
      setIsLoading(false);
      toast.error(response.result);
      console.error("Failed to delete user:", response);
    }
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add Level
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Level
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
                  <Button
                    color="primary"
                    onPress={handleAddLevel}
                    isLoading={isLoading}
                  >
                    Add Level
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
