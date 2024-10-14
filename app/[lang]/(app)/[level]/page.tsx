import { CoursesIndex } from "@/components/courses";
import { cookies } from "next/headers";
import React from "react";

const Courses = ({ params }: { params: { level: string } }) => {
  const levelid = Number(cookies().get("levelid")?.value) || 0;
  const level = params.level;
  return <CoursesIndex levelid={levelid} levelName={level} />;
};

export default Courses;
