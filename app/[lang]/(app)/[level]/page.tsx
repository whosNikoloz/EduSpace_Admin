import { CoursesIndex } from "@/components/courses";
import { cookies } from "next/headers";
import React from "react";

const Courses = ({ params }: { params: { level: string } }) => {
  const levelid = Number(cookies().get("levelid")?.value) || 0;
  return <CoursesIndex levelid={levelid} />;
};

export default Courses;
