import { errorFetchAlert, toastAlert } from "../utils/alerts";
import { base_URL, front_URL } from "./mainRoute";

export const fetchFunction = async (endpoint, body, method='POST') => {
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
      console.log(responseData.error); //devuelve {code: , message: '', internal message: ''}
      //para que vuelva a login en sessión expirada
      if (responseData.error.code === 903) {
        toastAlert("error", "Session expired");
        window.location.href = front_URL
        return null;
      } else {
        errorFetchAlert(responseData.error.message);
        //window.location.href = "http://localhost:3000/"
      }
     
      
      throw new Error('error');
    }
  } catch (error) {
    console.log('error');
  }
};
