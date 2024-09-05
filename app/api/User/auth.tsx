import { useUser } from "@/app/dbcontext/UserdbContext";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuthCookie } from "@/actions/auth.action";

const firebaseConfig = {
  apiKey: "AIzaSyCpTtUB_NqmFfsoccOBozkZ8tMlpzTd0U0",
  authDomain: "eduspace-a81b5.firebaseapp.com",
  projectId: "eduspace-a81b5",
  storageBucket: "eduspace-a81b5.appspot.com",
  messagingSenderId: "121358878167",
  appId: "1:121358878167:web:789c88cd50bdc3ada3b792",
  measurementId: "G-F18D5YQKCK",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth_API = "https://localhost:44336/api/V1/Auth/";
const base_API = "https://localhost:44336/api/V1/";
const user_API = "https://localhost:44336/api/V1/User/";

const docker_auth_API = "https://185.139.57.56:8081/api/v1/Auth/";
const docker_user_API = "https://185.139.57.56:8081/api/v1/User/";

const auth_conveyAPI = "https://fungreenlamp23.conveyor.cloud/api/v1/Auth/";
const user_conveyAPI = "https://fungreenlamp23.conveyor.cloud/api/v1/User/";

const Authentication = () => {
  const { login: loginContext } = useUser();

  const checkEmailLogin = async (email: string) => {
    try {
      const response = await fetch(auth_API + "Login/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Replace with the actual email
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.successful) {
          return { success: true };
        } else {
          return { success: false, result: data.error };
        }
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
    }
  };

  const handleLogin = async (email: any, password: any) => {
    try {
      const response = await fetch(auth_API + "Email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.successful) {
          try {
            console.log(loginContext(data.response.token));
            if (await loginContext(data.response.token)) {
              return { success: true };
            }
            return { success: false, result: "This Accounts isn't Admin" };
          } catch (error) {
            console.error("Error setting cookies:", error);
          }
        } else {
          return { success: false, result: data.error };
        }
      } else {
        const errorText = await response.text();
        // Handle other errors, for example, log the error or display an error message
        console.error("Error:", errorText);
        return { success: false, result: "An unexpected error occurred" };
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleOAuthLogin = async (
    oAuthprovider: string,
    oAuthproviderId: string
  ) => {
    try {
      const response = await fetch(auth_API + "OAuthEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oAuthprovider,
          oAuthproviderId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        try {
          loginContext(data.response.token);
          return true;
        } catch (error) {
          console.error("Error setting cookies:", error);
        }
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      const apiUrl = `${user_API}ForgotPassword?email=${encodeURIComponent(
        email
      )}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleResetPassword = async (
    Token: string,
    Password: string,
    ConfirmPassword: string
  ) => {
    try {
      const response = await fetch(user_API + "ResetPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Token,
          Password,
          ConfirmPassword,
        }),
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const checkEmailRegister = async (email: string) => {
    try {
      const response = await fetch(auth_API + "Register/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Replace with the actual email
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.successful) {
          return { success: true };
        } else {
          return { success: false, result: data.error };
        }
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
    }
  };

  const checkUserNameRegister = async (username: string) => {
    try {
      const response = await fetch(
        auth_API + "Register/check-username/" + username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.successful) {
          return { success: true };
        } else {
          return { success: false, result: data.error };
        }
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
    }
  };

  const handleRegistration = async (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await fetch(auth_API + "Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userName,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        console.error("Registration error:", errorText); // Log the error
        // Display an error message to the user or handle it as needed
        return errorText;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  const CheckeOAuthExist = async (
    oAuthProvider: string,
    oAuthProviderId: string
  ) => {
    try {
      const response = await fetch(auth_API + "OAuth2Exist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oAuthProvider,
          oAuthProviderId,
        }),
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  const handleoAuthRegistration = async (
    email: string,
    username: string,
    picture: string,
    oAuthProvider: string,
    oAuthProviderId: string
  ) => {
    try {
      const response = await fetch(auth_API + "RegisterOAuth2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          picture,
          oAuthProvider,
          oAuthProviderId,
        }),
      });

      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        console.error("Registration error:", errorText); // Log the error
        // Display an error message to the user or handle it as needed
        return errorText;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  const handleChangePassowrd = async (
    userid: number,
    OldPassword: string,
    Password: string,
    ConfirmPassword: string
  ) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(user_API + "ChangePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userid,
          OldPassword,
          Password,
          ConfirmPassword,
        }),
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleChangeGeneral = async (
    userid: number,
    UserName: string,
    FirstName: string,
    LastName: string,
    PhoneNumber: string
  ) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(user_API + "ChangeGeneral", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userid,
          UserName,
          FirstName,
          LastName,
          PhoneNumber,
        }),
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const UpdatedUser = async (userid: number) => {
    try {
      const apiUrl = `${user_API}${userid}`; // Construct the URL with query parameters

      const token = await getAuthCookie();
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        try {
          localStorage.removeItem("jwt");
          loginContext(data.token);
        } catch (error) {
          console.error("Error setting cookies:", error);
        }
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const ReLogin = async (password: string) => {
    try {
      const encodedPassword = encodeURIComponent(password);
      const apiUrl = `${user_API}ReLogin/${encodedPassword}`; // Construct the URL with query parameters
      const token = await getAuthCookie();
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const ChangeEmailRequest = async (email: string) => {
    try {
      const encodedPassword = encodeURIComponent(email);
      const apiUrl = `${user_API}ChangeEmailRequest/${encodedPassword}`; // Construct the URL with query parameters
      const token = await getAuthCookie();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const verificationCode = await response.text();
        return { ok: true, data: verificationCode };
      } else {
        const errorText = await response.text();
        return { ok: false, error: errorText };
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const ChangeEmail = async (email: string) => {
    try {
      const encodedPassword = encodeURIComponent(email);
      const apiUrl = `${user_API}ChangeEmail/${encodedPassword}`; // Construct the URL with query parameters
      const token = await getAuthCookie();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return;
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const ChangeProfilePicture = async (
    picture: File,
    oldpicture: string,
    userId: number
  ) => {
    try {
      if (oldpicture) {
        try {
          await deleteFileFromFirebaseStorage(oldpicture);
        } catch (error) {
          console.error("Error deleting old picture:", error);
        }
      }

      const pictureUrl = picture
        ? await uploadFileToFirebaseStorage(picture, "UserProfiles")
        : null;

      const token = await getAuthCookie();
      const response = await fetch(user_API + "UploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the bearer token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          pictureUrl,
        }),
      });

      if (response.ok) {
        return;
      } else {
        const errorText = await response.text();
        return errorText;
      }
    } catch (error) {
      window.alert(error);
      return error;
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
              // Upload completed successfully, get the download URL.
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

  const getUsers = async () => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(base_API + "Users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: UserModel[] = await response.json(); // Assuming the API returns an array of users
        return { success: true, result: data };
      } else {
        const errorText = await response.text();
        return { success: false, result: errorText };
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  const handleRemoveUser = async (userId: number) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(user_API + userId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        return { success: true };
      } else {
        const errorText = await response.text();
        return { success: false, result: errorText };
      }
    } catch (error) {
      window.alert(error);
      return error;
    }
  };

  return {
    handleLogin,
    handleOAuthLogin,
    handleRegistration,
    handleoAuthRegistration,
    CheckeOAuthExist,
    handleForgotPassword,
    handleResetPassword,
    handleChangePassowrd,
    handleChangeGeneral,
    UpdatedUser,
    ReLogin,
    ChangeEmailRequest,
    ChangeEmail,
    ChangeProfilePicture,
    checkEmailLogin,
    checkEmailRegister,
    checkUserNameRegister,
    getUsers,
    handleRemoveUser,
  };
};

export default Authentication;
