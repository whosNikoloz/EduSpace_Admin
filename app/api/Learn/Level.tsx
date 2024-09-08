import { getAuthCookie } from "@/actions/auth.action";

const learn_API = "https://localhost:44336/api/v1/Learn/Levels/";
const learn_API_NIkoloza = "https://172.20.10.7:45455/api/v1/Learn/";
const docker_API = "https://185.139.57.56:8081/api/v1/Learn/";

const learn_conveyAPI = "https://othergreencat21.conveyor.cloud/api/v1/Learn/";

const Levels = () => {
  const GetLevel = async () => {
    try {
      const apiUrl = learn_API;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const levels = await response.json();
        return levels;
      } else {
        const errorText = await response.text();
        console.error("Levels Get:", errorText);
        return errorText;
      }
    } catch (error) {
      console.error("Levels Get error:", error); // Log the error
      return error;
    }
  };

  const handleRemoveLevel = async (levelId: number) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(learn_API + levelId, {
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

  const handleUpdateLevel = async (levelId: number, data: any) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(learn_API + levelId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.successful) {
          return { success: true, result: responseData.level };
        } else {
          console.error("Unsuccessful response:", responseData);
          return {
            success: false,
            result: responseData.error || "Unknown error",
          };
        }
      } else {
        const errorText = await response.text();
        return { success: false, result: errorText };
      }
    } catch (error) {
      console.error("Error while updating level:", error);
      return { success: false, error };
    }
  };

  const handleAddLevel = async (levelData: any) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(learn_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(levelData), // Convert data to JSON
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.successful) {
          try {
            return { success: true, result: responseData.level };
          } catch (error) {
            console.error("Error setting Level:", error);
            return { success: false, error: "Error setting level" };
          }
        } else {
          console.error("Unsuccessful response:", responseData);
          return {
            success: false,
            result: responseData.error || "Unknown error",
          };
        }
      } else {
        const errorText = await response.text(); // Extract error details
        return { success: false, result: errorText }; // Return the error details
      }
    } catch (error) {
      console.error("Error while adding level:", error);
      return { success: false, error }; // Return error if fetch fails
    }
  };

  return {
    handleUpdateLevel,
    handleAddLevel,
    handleRemoveLevel,
    GetLevel,
  };
};

export default Levels;
