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
import { EditIcon } from "../icons/table/edit-icon";
import Levels from "@/app/api/Learn/Level";
import toast from "react-hot-toast";

interface LevelModel {
  levelId: number;
  levelName_ka: string;
  levelName_en: string;
  logoURL: string;
  description_ka: string;
  description_en: string;
  courses: [];
}
interface Props {
  onUpdateLevel: (UpdatedLeve: LevelModel) => void;
  level: LevelModel;
}

interface ApiResponse<T> {
  success: boolean;
  result?: T;
}

export const EditLevel = ({ onUpdateLevel, level }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [name_en, setName_en] = useState(level.levelName_en);
  const [name_ka, setName_ka] = useState(level.levelName_ka);
  const [description_en, setDescription_en] = useState(level.description_en);
  const [description_ka, setDescription_ka] = useState(level.description_ka);
  const [isLoading, setIsLoading] = useState(false);

  const newLevelData = {
    levelName_ka: "",
    levelName_en: "",
    logoURL: "",
    description_ka: "",
    description_en: "",
  };

  const levelAPI = Levels();
  const handlLevelUpdate = async () => {
    newLevelData.levelName_en = name_en;
    newLevelData.levelName_ka = name_ka;
    newLevelData.description_en = description_en;
    newLevelData.description_ka = description_ka;

    setIsLoading(true);
    const response: ApiResponse<any> = (await levelAPI.handleUpdateLevel(
      level.levelId,
      newLevelData
    )) as ApiResponse<any>;
    if (response.success) {
      setIsLoading(false);
      onClose();
      onUpdateLevel(response.result);
      toast.success("Level Updated successfully");
    } else {
      setIsLoading(false);
      toast.error(response.result);
      console.error("Failed to update level:", response);
    }
  };

  return (
    <div>
      <>
        <Button isIconOnly className="bg-transparent" onPress={onOpen}>
          <EditIcon size={20} fill="#979797" />
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
                  Update Level
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
                    onPress={handlLevelUpdate}
                    isLoading={isLoading}
                  >
                    Save
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
