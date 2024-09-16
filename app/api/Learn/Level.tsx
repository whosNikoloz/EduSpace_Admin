import { getAuthCookie } from "@/actions/auth.action";

const learn_API = "https://localhost:44336/api/v1/";
// const learn_API_NIkoloza = "https://172.20.10.7:45455/api/v1/Learn/";
// const docker_API = "https://185.139.57.56:8081/api/v1/Learn/";
// const learn_conveyAPI = "https://othergreencat21.conveyor.cloud/api/v1/Learn/";

const Levels = () => {
  const GetLevel = async () => {
    try {
      const apiUrl = learn_API;
      const response = await fetch(apiUrl + "levels", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          return { status: true, result: data.result };
        } else {
          return { status: false, result: data.result };
        }
      } else {
        const errorText = await response.text();
        return { status: false, result: errorText };
      }
    } catch (error) {
      return { status: false, result: error };
    }
  };

  const handleRemoveLevel = async (levelId: number) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(learn_API + "level/" + levelId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          return { status: true, result: data.result };
        }
        return { status: false, result: data.result };
      } else {
        const errorText = await response.text();
        return { status: false, result: errorText };
      }
    } catch (error) {
      return { status: false, result: error };
    }
  };

  const handleUpdateLevel = async (levelId: number, data: any) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(learn_API + "level/" + levelId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.status) {
          return { success: true, result: responseData.result };
        } else {
          return {
            status: false,
            result: responseData.error,
          };
        }
      } else {
        const errorText = await response.text();
        return { status: false, result: errorText };
      }
    } catch (error) {
      return { status: false, error };
    }
  };

  const handleAddLevel = async (levelData: any) => {
    try {
      const token = await getAuthCookie();
      const response = await fetch(learn_API + "level/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(levelData), // Convert data to JSON
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