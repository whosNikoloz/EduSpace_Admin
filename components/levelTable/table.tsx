"use client";

import React, { useEffect, useState } from "react";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { RenderLevelCell } from "./render-cell";

const columns = [
  { name: "NAME_EN", uid: "name_en" },
  { name: "NAME_KA", uid: "name_ka" },
  { name: "DESCRIPTION_EN", uid: "description_en" },
  { name: "DESCRIPTION_KA", uid: "description_ka" },
  { name: "COURSES", uid: "courses" },
  { name: "ACTIONS", uid: "actions" },
];

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
  levels: LevelModel[];
  onDeleteLevel: (levelid: number) => void;
  onUpdateLevel: (newLevel: LevelModel) => void;
}

export const TableWrapper = ({
  levels,
  onDeleteLevel,
  onUpdateLevel,
}: Props) => {
  const [locallevels, setLevels] = useState<LevelModel[]>(levels);
  useEffect(() => {
    setLevels(levels);
  }, [levels]);

  const handleLevelDelete = (levelId: number) => {
    onDeleteLevel(levelId);
  };

  const hanldeLevelEdit = (updatedLevel: LevelModel) => {
    onUpdateLevel(updatedLevel);
  };

  if (levels.length === 0) {
    <Spinner />;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={locallevels}>
          {(level) => (
            <TableRow key={level.levelId}>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {RenderLevelCell({
                    level: level, // Pass the level instead of user
                    columnKey: column.uid,
                    onLevelDelete: handleLevelDelete, // Correct function name
                    onLevelEdit: hanldeLevelEdit, // Correct function name
                  })}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
