import { getAuthCookie } from "@/actions/auth.action";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const Courses = () => {
  const GetCourses = async (lang: string) => {
    try {
      const response = await fetch(serverUrl + `Courses?lang=${lang}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const courses = await response.json();
        return courses;
      } else {
        const errorText = await response.text();
        console.error("Courses Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Courses Get error:", error); // Log the error
      return error;
    }
  };

  const GetCoursesByLevelId = async (levelId: number) => {
    try {
      const response = await fetch(serverUrl + `CoursesByLevel/${levelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const courses = await response.json();
        return courses;
      } else {
        const errorText = await response.text();
        console.error("Courses Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Courses Get error:", error); // Log the error
      return error;
    }
  };

  const handleUpdateCourse = async (courseId: number, courseData: any) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(serverUrl + "courses/" + courseId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.status) {
          return { status: true, result: responseData.result };
        } else {
          return {
            status: false,
            result: responseData.error,
          };
        }
      } else {
        const errorText = await response.text(); // Extract error details
        return { status: false, result: errorText }; // Return the error details
      }
    } catch (error) {
      console.error("Error while updating coruse:", error);
      return { success: false, error }; // Return error if fetch fails
    }
  };

  const handleRemoveCourse = async (courseId: number) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(serverUrl + "courses/" + courseId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.status) {
          return { status: true, result: responseData.result };
        } else {
          return {
            status: false,
            result: responseData.error,
          };
        }
      } else {
        const errorText = await response.text(); // Extract error details
        return { status: false, result: errorText }; // Return the error details
      }
    } catch (error) {
      console.error("Error while deleting coruse:", error);
      return { success: false, error }; // Return error if fetch fails
    }
  };

  const GetCourse = async (courseName: string, lang: string) => {
    try {
      const response = await fetch(
        serverUrl + "Course/" + `${courseName}?lang=${lang}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include the bearer token in the Authorization header
          },
        }
      );
      if (response.ok) {
        const courses = await response.json();
        return courses;
      } else {
        const errorText = await response.text();
        console.error("Courses Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Courses Get error:", error); // Log the error
      return error;
    }
  };

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const GetCourseName = async (
    notFormattedCourseName: string,
    lang: string
  ) => {
    try {
      const response = await fetch(
        `${serverUrl}Courses/CourseName/${notFormattedCourseName}?lang=${lang}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include other headers if needed
          },
        }
      );

      if (response.ok) {
        const courseName = await response.text();
        return courseName;
      } else {
        const errorText = await response.text();
        console.error("Courses Get:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Courses Get error:", error); // Log the error
      return error;
    }
  };

  const handleAddCourse = async (LevelId: number, courseData: any) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(serverUrl + "course/" + LevelId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.status) {
          return { status: true, result: responseData.result };
        } else {
          return {
            status: false,
            result: responseData.error,
          };
        }
      } else {
        const errorText = await response.json();
        return { status: false, result: errorText.result }; // Return the error details
      }
    } catch (error) {
      console.error("Error while adding coruse:", error);
      return { success: false, error }; // Return error if fetch fails
    }
  };

  return {
    GetCourses,
    GetCourse,
    GetCourseName,
    GetCoursesByLevelId,
    handleAddCourse,
    handleUpdateCourse,
    handleRemoveCourse,
  };
};

export default Courses;
