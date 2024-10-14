import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { deleteAuthCookie, getAuthCookie } from "@/actions/auth.action";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

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
      if (!serverUrl) {
        throw new Error("Server URL is not defined");
      }
      const response = await fetch(serverUrl + levelId + `/course`, {
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

  const handleRemoveCourse = async (courseId: number, logoPath: string) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(serverUrl + "course/" + courseId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        if (logoPath) {
          try {
            await deleteFileFromFirebaseStorage(logoPath);
          } catch (error) {
            console.error("Error deleting old picture:", error);
          }
        }
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

  const ChangeCourseLogo = async (
    picture: File,
    oldpicture: string,
    courseid: number,
    LevelName: string
  ) => {
    try {
      // Delete the old picture if it exists
      if (oldpicture) {
        try {
          await deleteFileFromFirebaseStorage(oldpicture);
        } catch (error) {
          console.error("Error deleting old picture:", error);
        }
      }

      // Create folder logic (Firebase will create it automatically when uploading)
      const folderPath = `Learn/Courses/${LevelName}`;

      // Upload the new picture to the correct folder path
      const pictureUrl = picture
        ? await uploadFileToFirebaseStorage(picture, folderPath)
        : null;

      // Send the uploaded picture URL to the server
      const token = await getAuthCookie();
      const response = await fetch(serverUrl + "course/UploadLogo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseid,
          pictureUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          return { status: true, result: data.result };
        } else {
          return { status: false, result: data.result };
        }
      } else {
        return { status: false, result: "An unexpected error occurred" };
      }
    } catch (error) {
      return { status: false, result: error };
    }
  };

  const uploadFileToFirebaseStorage = async (
    file: File,
    folderName: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const uniqueFileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}-${file.name}`;
        const fileRef = ref(storage, `${folderName}/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // You can monitor the progress here if needed.
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error("Error uploading file:", error);
            reject(error);
          },
          async () => {
            try {
              // Upload completed statusly, get the download URL.
              const downloadURL = await getDownloadURL(fileRef);
              resolve(downloadURL);
            } catch (error) {
              console.error("Error getting download URL:", error);
              reject(error);
            }
          }
        );

        // Wait for the upload to complete.
        await uploadTask;
      } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
        reject(error);
      }
    });
  };

  const deleteFileFromFirebaseStorage = async (fileUrl: string) => {
    try {
      const storage = getStorage();
      const fileRef = ref(storage, fileUrl);

      // Check if the file exists
      const url = await getDownloadURL(fileRef);
      if (url) {
        // Delete the file
        await deleteObject(fileRef);
      }
    } catch (error) {
      if ((error as { code: string }).code === "storage/object-not-found") {
        // File doesn't exist
      } else {
        // Some other error occurred
        console.error("Error deleting file:", error);
      }
    }
  };

  const handleAddCourse = async (LevelId: number, courseData: any) => {
    try {
      const token = await getAuthCookie();
      if (!serverUrl) {
        throw new Error("Server URL is not defined");
      }

      const response = await fetch(serverUrl + LevelId + "/course", {
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
    ChangeCourseLogo,
  };
};

export default Courses;
