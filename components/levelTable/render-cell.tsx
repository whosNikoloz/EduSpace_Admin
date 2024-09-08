import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { DeleteLevel } from "./delete-level";
import { EditLevel } from "./edit-level";

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
  onLevelEdit?: (level: LevelModel) => void;
}

export const RenderLevelCell = ({
  level,
  columnKey,
  onLevelDelete,
  onLevelEdit,
}: Props) => {
  // @ts-ignore
  const cellValue = level[columnKey];

  const handleLevelRemove = (levelId: number) => {
    if (onLevelDelete) {
      onLevelDelete(levelId);
    }
  };

  const CourseCount = level.courses.length;

  const handleLevelEdit = (updatedLevel: LevelModel) => {
    if (onLevelEdit) {
      onLevelEdit(updatedLevel);
    }
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
      return <span>{CourseCount}</span>;
    case "actions":
      return (
        <div className="flex items-center gap-4">
          <EditLevel onUpdateLevel={handleLevelEdit} level={level} />
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
