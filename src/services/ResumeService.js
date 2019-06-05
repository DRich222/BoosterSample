import axios from 'axios'
import resumeJSON from '../assets/ResumeObject.JSON'

const apiClient = axios.create({
  baseURL: 'http://desktop-uv62u20:8080'
  , withCredentials: false
  , headers:{
    Accept: 'application/json'
    , 'Content-Type':'application/json'
  }

});

export default {
  getResume(email){

    const data = {email:email};

    // return apiClient.post('/getRes', data);
    return new Promise((resolve,reject)=>{
      resolve(resumeJSON);
    })
  }
}