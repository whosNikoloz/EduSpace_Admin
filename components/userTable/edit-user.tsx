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
import Authentication from "@/app/api/User/auth";
import toast from "react-hot-toast";

interface Props {
  onUpdateUser: (UpdatedUser: UserModel) => void;
  user: UserModel;
}

interface ApiResponse<T> {
  status: boolean;
  result?: T;
}

export const Edituser = ({ onUpdateUser, user }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [username, setUsername] = useState(user.userName);
  const [firstname, setFirstName] = useState(user.firstName);
  const [lastname, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phoneNumber);

  const [isLoading, setIsLoading] = useState(false);

  const newUserData = {
    userId: 0,
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
  };

  const AuthAPi = Authentication();
  const handlUSerUpdate = async () => {
    newUserData.userId = user.userId;
    newUserData.username = username;
    newUserData.firstname = firstname;
    newUserData.lastname = lastname;
    newUserData.phone = phone ?? "";

    setIsLoading(true);
    const response: ApiResponse<any> = (await AuthAPi.handleChangeGeneral(
      user.userId,
      username,
      firstname,
      lastname,
      phone ?? ""
    )) as ApiResponse<any>;
    ``;
    if (response.status) {
      setIsLoading(false);
      onClose();
      const updatedUser = {
        ...user,
        userName: username,
        email: firstname,
        lastName: lastname,
        phoneNumber: phone,
      } as UserModel;
      onUpdateUser(updatedUser);
      toast.success(`User ${user.userId} Updated successfully`);
    } else {
      setIsLoading(false);
      toast.error(response.result);
      console.error("Failed to update user:", response);
    }
  };

  return (
    <div>
      <>
        <Tooltip content="Edit level" color="primary">
          <Button isIconOnly className="bg-transparent" onPress={onOpen}>
            <EditIcon size={20} fill="#979797" />
          </Button>
        </Tooltip>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update User
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="UserName"
                    variant="bordered"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    label="FirstName"
                    variant="bordered"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    label="LastName"
                    variant="bordered"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                    label="Phone Number"
                    variant="bordered"
                    value={phone ?? ""}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handlUSerUpdate}
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
