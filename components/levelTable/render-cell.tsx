import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { DeleteLevel } from "./delete-level";

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
  level: LevelModel;
  columnKey: string | React.Key;
  onLevelDelete?: (levelId: number) => void;
}

export const RenderLevelCell = ({ level, columnKey, onLevelDelete }: Props) => {
  // @ts-ignore
  const cellValue = level[columnKey];

  const handleLevelRemove = (levelId: number) => {
    if (onLevelDelete) {
      onLevelDelete(levelId);
    }
  };

  const handleLevelEdit = (levelId: number) => {
    console.log("Edit level", levelId);
  };

  const handleLevelView = (levelId: number) => {
    console.log("View level", levelId);
  };

  switch (columnKey) {
    case "name_en":
      return (
        <div className="flex items-center">
          <span>{level.levelName_en}</span>
        </div>
      );
    case "name_ka":
      return (
        <div className="flex items-center">
          <span>{level.levelName_ka}</span>
        </div>
      );
    case "description_ka":
      return <span>{level.description_ka}</span>;
    case "description_en":
      return <span>{level.description_en}</span>;
    case "courses":
      return <span>5</span>;
    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Details">
            <button onClick={() => handleLevelView(level.levelId)}>
              <EyeIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Edit level" color="secondary">
            <button onClick={() => handleLevelEdit(level.levelId)}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <DeleteLevel
            levelId={level.levelId}
            onLevelDelete={handleLevelRemove}
          />
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
