"use client";
import { Avatar, Button, Switch } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface LanguageSwitcherProps {
  isSmall?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isSmall = false,
}) => {
  const pathName = usePathname();
  const router = useRouter();

  const lang = pathName?.split("/")[1] || "en";

  const [lngstartCon, setLngstartCon] = useState<ReactNode>(null);

  const handleLanguageChange = (selectedLanguage: string) => {
    if (!pathName) return "/";

    // Check if the path already contains the selected language
    if (pathName.startsWith("/" + selectedLanguage + "/")) return pathName;

    // Find the index of the second occurrence of "/"
    const secondSlashIndex = pathName.indexOf("/", 1);

    if (secondSlashIndex !== -1) {
      // Replace the language segment with the selected language
      const newPath =
        "/" + selectedLanguage + pathName.substring(secondSlashIndex);
      router.push(newPath);
      return newPath;
    }

    // If there's no second occurrence of "/", just append the selected language
    const newPath = "/" + selectedLanguage;
    router.push(newPath);
    return newPath;
  };

  useEffect(() => {
    switch (lang) {
      case "ka":
        setLngstartCon(
          <Avatar
            alt="Georgia"
            className="w-5 h-5 bg-transparent"
            src="https://flagsapi.com/GE/flat/64.png"
          />
        );
        break;
      case "en":
        setLngstartCon(
          <Avatar
            alt="English"
            className="w-5 h-5 bg-transparent"
            src="https://flagsapi.com/US/flat/64.png"
          />
        );
        break;
    }
  }, [lang]);

  if (isSmall) {
    return (
      <>
        <div className="flex gap-1  justify-between ">
          <Button
            isIconOnly
            onClick={() => handleLanguageChange("ka")}
            className={`bg-transparent ${
              lang === "ka" ? "border border-blue-500" : ""
            } p-1 rounded-full`}
          >
            <Avatar
              alt="Georgia"
              className={`w-5 h-5 ${"bg-transparent"} rounded-full`}
              src="https://flagsapi.com/GE/flat/64.png"
            />
          </Button>
          <Button
            isIconOnly
            onClick={() => handleLanguageChange("en")}
            className={`bg-transparent ${
              lang === "en" ? "border border-blue-500" : ""
            } p-1 rounded-full`}
          >
            <Avatar
              alt="English"
              className={`w-5 h-5 ${"bg-transparent"} rounded-full`}
              src="https://flagsapi.com/US/flat/64.png"
            />
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="px-4 py-3 text-sm   text-gray-600 bg-transparent capitalize  dark:text-gray-300   ">
          Language
        </p>
        <Select
          className="w-[150px]"
          size="sm"
          variant="bordered"
          onChange={(event) => handleLanguageChange(event.target.value)}
          aria-label="Select Language"
          labelPlacement="outside"
          defaultSelectedKeys={[lang || `ka`]}
          startContent={lngstartCon}
        >
          <SelectItem
            key="ka"
            value={"georgia"}
            startContent={
              <Avatar
                alt="Georgia"
                className="w-5 h-5 bg-transparent"
                src="https://flagsapi.com/GE/flat/64.png"
              />
            }
          >
            {lang === "ka" ? "ქართული" : "Georgian"}
          </SelectItem>
          <SelectItem
            key="en"
            value={"english"}
            onClick={() => handleLanguageChange("en")}
            startContent={
              <Avatar
                alt="English"
                className="w-5 h-5 bg-transparent"
                src="https://flagsapi.com/US/flat/64.png"
              />
            }
          >
            {lang === "en" ? "English" : "ინგლისური"}
          </SelectItem>
        </Select>
      </div>
    </>
  );
};

export default LanguageSwitcher;
