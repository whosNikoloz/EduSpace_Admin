"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { TableWrapper } from "@/components/levelTable/table";
import { AddLevel } from "./add-level";
import { Toaster } from "react-hot-toast";
import Levels from "@/app/api/Learn/Level";

interface LevelModel {
  levelId: number;
  levelName_ka: string;
  levelName_en: string;
  logoURL: string;
  description_ka: string;
  description_en: string;
  courses: [];
}

export const LevelsIndex = () => {
  const [levels, setLevels] = useState<LevelModel[]>([]);

  const levelAPi = Levels();

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const fetchedLevels = await levelAPi.GetLevel();
        console.log("22", fetchedLevels);
        setLevels(fetchedLevels);
      } catch (error) {
        console.error("Error fetching levels:", error);
      }
    };

    fetchLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddlevel = (newLevel: any) => {
    setLevels((prevLevels) => [...prevLevels, newLevel]);
  };
  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Levels</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Courses</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddLevel onAddNewLevel={handleAddlevel} />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper levels={levels} />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};
