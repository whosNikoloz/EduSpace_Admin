const learn_API = "https://localhost:44336/api/v1/Learn/";
const learn_API_NIkoloza = "https://172.20.10.7:45455/api/v1/Learn/";
const docker_API = "https://185.139.57.56:8081/api/v1/Learn/";

const learn_conveyAPI = "https://othergreencat21.conveyor.cloud/api/v1/Learn/";

const Levels = () => {
  const GetLevel = async () => {
    try {
      const apiUrl = learn_API + `Levels`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const learnMaterial = await response.json();
        return learnMaterial;
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

  return {
    GetLevel,
  };
};

export default Levels;
