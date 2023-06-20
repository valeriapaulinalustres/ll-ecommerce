import { errorFetchAlert, toastAlert } from "../utils/alerts";
import { base_URL, front_URL } from "./mainRoute";

export const fetchFunction = async (endpoint, body, method = "POST") => {
  try {
    const response = await fetch(`${base_URL}${endpoint}`, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let responseData = await response.json();

    if (response.status === 200) {
      return responseData;
    } else {
      console.log(responseData.error);
      throw new Error("error");
    }
  } catch (error) {
    console.log("error desde el fetch", error);
  }
};
