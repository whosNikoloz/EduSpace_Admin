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
import Courses from "@/app/api/Learn/Course";
import { RenderCourseCell } from "./render-cell";

const columns = [
  { name: "Logo", uid: "logo" },
  { name: "NAME_EN", uid: "name_en" },
  { name: "NAME_KA", uid: "name_ka" },
  { name: "FORMATED NAME", uid: "f_name" },
  { name: "DESCRIPTION_EN", uid: "description_en" },
  { name: "DESCRIPTION_KA", uid: "description_ka" },
  { name: "SUBJECTS", uid: "subjects" },
  { name: "ACTIONS", uid: "actions" },
];

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
interface Props {
  Courses: CourseModel[];
  LevelName: string;
  onDeleteCourse: (courseId: number) => void;
  onUpdateCourse: (updatedCourse: CourseModel) => void;
}

export const TableWrapper = ({
  Courses,
  LevelName,
  onDeleteCourse,
  onUpdateCourse,
}: Props) => {
  const [localCourses, setCourses] = useState<CourseModel[]>(Courses);
  useEffect(() => {
    setCourses(Courses);
    console.log(Courses);
  }, [Courses]);

  const handleCourseDelete = (courseId: number) => {
    onDeleteCourse(courseId);
  };

  const hanldeCourseEdit = (updatedCourse: CourseModel) => {
    onUpdateCourse(updatedCourse);
  };

  if (Courses.length === 0) {
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
        <TableBody items={localCourses}>
          {(Course) => (
            <TableRow key={Course.courseId}>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {RenderCourseCell({
                    Course: Course, // Pass the Course instead of user
                    columnKey: column.uid,
                    LevelName: LevelName,
                    onCourseDelete: handleCourseDelete, // Correct function name
                    onCourseEdit: hanldeCourseEdit, // Correct function name
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
