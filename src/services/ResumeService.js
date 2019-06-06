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
    if (email.toUpperCase() !== "DRICH222@HOTMAIL.COM") {
      alert(
        "In production this would take you to someone else's resume.  Since this is a stand-alone demo" +
          " though, I've only included my resume."
      );
    }

    //@Reviewer
    // I have a local client running that I actually call for the real data.  I want this to be stand-alone
    // though, so I'm just returning the static JSON file included in this sample.
    // return apiClient.post('/getRes', data);
    return new Promise(resolve => {
      resolve(resumeJSON);
    });
  }
};
