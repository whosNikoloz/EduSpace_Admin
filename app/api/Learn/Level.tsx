import { getAuthCookie } from "@/actions/auth.action";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const Levels = () => {
  const GetLevel = async () => {
    try {
      const apiUrl = serverUrl;
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
      const response = await fetch(serverUrl + "level/" + levelId, {
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
      const response = await fetch(serverUrl + "level/" + levelId, {
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
      const response = await fetch(serverUrl + "level/", {
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
            result: responseData.result,
          };
        }
      } else {
        const errorText = await response.json();
        return { status: false, result: errorText.result }; // Return the error details
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
