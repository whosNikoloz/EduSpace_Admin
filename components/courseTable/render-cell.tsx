import React from "react";
import { DeleteCourse } from "./delete-course";
import { EditCourse } from "./edit-course";
import ChangeCourseLogo from "./changeLogo/change-logo";
import Image from "next/image";

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
  Course: CourseModel;
  LevelName: string;
  columnKey: string | React.Key;
  onCourseDelete?: (CourseId: number) => void;
  onCourseEdit?: (Course: CourseModel) => void;
  onChangeLogo(newPicture: string, courseId: number): void;
}

export const RenderCourseCell = ({
  Course,
  LevelName,
  columnKey,
  onCourseDelete,
  onCourseEdit,
  onChangeLogo,
}: Props) => {
  // @ts-ignore
  const cellValue = Course[columnKey];

  const handleCourseRemove = (CourseId: number) => {
    if (onCourseDelete) {
      onCourseDelete(CourseId);
    }
  };

  const SubjectCount = Course.subjects.length;

  const handleCourseEdit = (updatedCourse: CourseModel) => {
    if (onCourseEdit) {
      onCourseEdit(updatedCourse);
    }
  };

  const handleCourseView = (CourseId: number) => {
    console.log("View Course", CourseId);
  };

  const handleChangeLogo = (newPicture: string, courseId: number) => {
    if (onChangeLogo) {
      onChangeLogo(newPicture, courseId);
    }
  };

  switch (columnKey) {
    case "logo":
      return (
        <div className="flex items-center">
          <Image
            src={Course.courseLogo}
            alt={Course.courseName_en}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      );
    case "name_en":
      return (
        <div className="flex items-center">
          <span>{Course.courseName_en}</span>
        </div>
      );
    case "name_ka":
      return (
        <div className="flex items-center">
          <span>{Course.courseName_ka}</span>
        </div>
      );
    case "f_name":
      return (
        <div className="flex items-center">
          <span>{Course.formattedCourseName}</span>
        </div>
      );
    case "description_ka":
      return <span>{Course.description_ka}</span>;
    case "description_en":
      return <span>{Course.description_en}</span>;
    case "subjects":
      return <span>{SubjectCount}</span>;
    case "actions":
      return (
        <div className="flex items-center gap-4">
          <ChangeCourseLogo
            courseLogo={Course.courseLogo}
            courseid={Course.courseId}
            courseName={LevelName}
            onUpdateLogo={handleChangeLogo}
          />
          <EditCourse onUpdateCourse={handleCourseEdit} Course={Course} />
          <DeleteCourse
            LogoPath={Course.courseLogo}
            CourseId={Course.courseId}
            onCourseDelete={handleCourseRemove}
          />
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
