"use client";
import { useTheme } from "next-themes";
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { MoonFilledIcon } from "./icons/theme/moon-filled-icon";
import { SunFilledIcon } from "./icons/theme/sun-filled-icon";
import { SystemIcon } from "./icons/theme/system-icon";
import { Select, SelectItem } from "@nextui-org/select";
import { Switch } from "@nextui-org/react";

interface ThemeSwitcherProps {
  isSmall?: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isSmall = false }) => {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [startCon, setStartCon] = useState<ReactNode>(null);

  useEffect(() => {
    switch (theme) {
      case "dark":
        setStartCon(<MoonFilledIcon size={20} height={20} width={20} />);
        break;
      case "light":
        setStartCon(<SunFilledIcon size={20} height={20} width={20} />);
        break;
      case "system":
        setStartCon(<SystemIcon size={20} height={20} width={20} />);
        break;
      default:
        break;
    }
  }, [theme]);

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;

    switch (selectedTheme) {
      case "dark":
        setTheme("dark");
        break;
      case "light":
        setTheme("light");
        break;
      case "system":
        setTheme("system");
        break;
      default:
        console.log("Invalid theme");
        break;
    }
  };

  const handleSwitchChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (isSmall) {
    return (
      <>
        <div className="flex gap-4  justify-between ">
          <Switch
            defaultSelected
            size="md"
            onClick={handleSwitchChange}
            startContent={<SunFilledIcon size={15} />}
            endContent={<MoonFilledIcon size={15} />}
          ></Switch>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-4  justify-between ">
        <p className="px-4 text-sm   text-gray-600 bg-transparent capitalize  dark:text-gray-300   ">
          Theme
        </p>
        <Select
          className="w-[150px]"
          size="sm"
          variant="bordered"
          onChange={handleThemeChange}
          aria-label="Select theme"
          labelPlacement="outside"
          defaultSelectedKeys={[theme || "system"]}
          startContent={startCon}
        >
          <SelectItem
            key="dark"
            value={"dark"}
            startContent={<MoonFilledIcon size={20} height={20} width={20} />}
          >
            Dark
          </SelectItem>
          <SelectItem
            key="light"
            value={"light"}
            startContent={<SunFilledIcon size={20} height={20} width={20} />}
          >
            Light
          </SelectItem>
          <SelectItem
            key="system"
            value={"system"}
            startContent={<SystemIcon size={20} height={20} width={20} />}
          >
            System
          </SelectItem>
        </Select>
      </div>
    </>
  );
};

export default ThemeSwitcher;
