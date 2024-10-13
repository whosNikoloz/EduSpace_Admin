import React from "react";
import { DeleteCourse } from "./delete-course";
import { EditCourse } from "./edit-course";

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
  columnKey: string | React.Key;
  onCourseDelete?: (CourseId: number) => void;
  onCourseEdit?: (Course: CourseModel) => void;
}

export const RenderCourseCell = ({
  Course,
  columnKey,
  onCourseDelete,
  onCourseEdit,
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

  switch (columnKey) {
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
          <EditCourse onUpdateCourse={handleCourseEdit} Course={Course} />
          <DeleteCourse
            CourseId={Course.courseId}
            onCourseDelete={handleCourseRemove}
          />
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
