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

  return {
    handleRemoveLevel,
    GetLevel,
  };
};

export default Levels;
