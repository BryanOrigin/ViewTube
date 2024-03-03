import axios from "axios";

const API_KEYS =[
  process.env.REACT_APP_YOUTUBE_API_KEY_1,
  process.env.REACT_APP_YOUTUBE_API_KEY_2,
  process.env.REACT_APP_YOUTUBE_API_KEY_3,
  process.env.REACT_APP_YOUTUBE_API_KEY_4,
  process.env.REACT_APP_YOUTUBE_API_KEY_5,
  process.env.REACT_APP_YOUTUBE_API_KEY_6,
  process.env.REACT_APP_YOUTUBE_API_KEY_7,
  process.env.REACT_APP_YOUTUBE_API_KEY_8,
  process.env.REACT_APP_YOUTUBE_API_KEY_9
];

let currentAPIKeyIndex = 0;
const MAX_RETRIES = API_KEYS.length;

const BASE_URL = "https://youtube138.p.rapidapi.com";
const options = {
    params: {
      hl: 'en',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': API_KEYS[currentAPIKeyIndex],
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  
  export const fetchDataFromApi = async (url) => {
    let retries = 0;
    try {
      const response = await axios.get(`${BASE_URL}/${url}`, options);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        if(retries < MAX_RETRIES){
          //alert('API rate limit reached. Switching to a different key.');
          currentAPIKeyIndex = (currentAPIKeyIndex + 1) % API_KEYS.length;
          retries++;
          options.headers['X-RapidAPI-Key'] = API_KEYS[currentAPIKeyIndex];
          return fetchDataFromApi(url);
        }
        else{
          alert('All API keys have reached their limit. Contact rodriguesbryan198@gmail.com for assistance.');
        }
      }
      else{
        alert("This is a techinical error please Contact rodriguesbryan198@gmail.com for assistance");
      } 
    }
  };