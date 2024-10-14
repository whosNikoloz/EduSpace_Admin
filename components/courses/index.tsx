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
import { TableWrapper } from "@/components/courseTable/table";
import { AddCourse } from "./add-course";
import { Toaster } from "react-hot-toast";
import Courses from "@/app/api/Learn/Course";

interface CourseModel {
  courseId: number;
  courseName_ka: string;
  courseName_en: string;
  formattedCourseName: string;
  courseLogo: string;
  description_ka: string;
  description_en: string;
  subjects: [];
}

interface ApiResponse<T> {
  status: boolean;
  result?: T;
}

interface Props {
  levelid: number;
  levelName: string;
}

export const CoursesIndex = ({ levelid, levelName }: Props) => {
  const [courses, setCourses] = useState<CourseModel[]>([]);

  const CourseAPi = Courses();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const statusApi: ApiResponse<any> = await CourseAPi.GetCoursesByLevelId(
          levelid
        );
        if (statusApi.status) {
          setCourses(statusApi.result);
          console.log(statusApi.result);
        } else if (!statusApi.status) {
          console.log("Error fetching Courses:", statusApi.result);
        }
      } catch (error) {
        console.error("Error fetching Courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleAddCourse = (newCourse: any) => {
    newCourse.subjects = [];
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleCourseDelete = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.courseId !== courseId)
    );
  };

  const hanldeCourseEdit = (updatedCourse: CourseModel) => {
    setCourses((prevCourses) =>
      prevCourses.map((Course) =>
        Course.courseId === updatedCourse.courseId ? updatedCourse : Course
      )
    );
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
          <span>Courses</span>
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
          <AddCourse onAddNewCourse={handleAddCourse} levelid={levelid} />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          Courses={courses}
          LevelName={levelName}
          onUpdateCourse={hanldeCourseEdit}
          onDeleteCourse={handleCourseDelete}
        />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};
