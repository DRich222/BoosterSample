import axios from "axios";
import resumeJSON from "../assets/ResumeObject.JSON";

const apiClient = axios.create({
    baseURL: "http://desktop-uv62u20:8080",
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
                "You know, I didn't put anyone else's resume in my code sample that I'm using to try to convince you to" +
                " give me the job.  I'm going to just redirect you to my resume."
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
