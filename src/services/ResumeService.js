import axios from "axios";
import resumeJSON from "../assets/ResumeObject.JSON";

const apiClient = axios.create({
  baseURL: "",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getResume(email) {
    const data = { email: email };

    //@Reviewer
    // I have a local client running that I actually call for the real data.  I want this to be stand-alone
    // though, so I'm just returning the static JSON file included in this sample.
    // return apiClient.post('/getRes', data);
    return new Promise(resolve => {
      resolve(resumeJSON);
    });
  }
};
