import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { DeleteUser } from "./deleteuser";
import { Edituser } from "./edit-user";

interface Props {
  user: UserModel;
  columnKey: string | React.Key;
  onUserDelete?: (userId: number) => void;
  onUserEdit?: (user: UserModel) => void;
}

export const RenderCell = ({
  user,
  columnKey,
  onUserDelete,
  onUserEdit,
}: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];

  const handleUserRemove = (userId: number) => {
    if (onUserDelete) {
      onUserDelete(userId);
    }
  };

  const handleUserEdit = (user: UserModel) => {
    if (onUserEdit) {
      onUserEdit(user);
    }
  };

  const handleUserView = (userId: number) => {
    console.log("View user", userId);
  };

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            src:
              user.picture || "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          name={user.userName}
        >
          {user.userName}
        </User>
      );
    case "firstname":
      return <span>{user.firstName}</span>;
    case "lastname":
      return <span>{user.lastName}</span>;
    // case "role":
    //   return <span>{user.role}</span>;
    // case "status":
    //   return (
    //     <Chip size="sm" variant="flat" color={"success"}>
    //       <span className="capitalize text-xs">active</span>
    //     </Chip>
    //   );
    case "phone":
      return <span>{user.phoneNumber}</span>;
    case "email":
      return <span>{user.email}</span>;
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => handleUserView(user.userId)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <Edituser onUpdateUser={handleUserEdit} user={user} />

          <div>
            <DeleteUser userId={user.userId} onUserDelete={handleUserRemove} />
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
