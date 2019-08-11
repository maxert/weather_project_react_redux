import axios from "axios";
import {loadState} from "../react-component/localstorage";
export   const getAllList = () => { 
  return dispatch=>{
    const API_KEY = "3254e6994606da89542269b2c8e5b2ef";
    let count_url = "http://api.openweathermap.org/data/2.5/find?lat=49.9&lon=37.8&cnt=30&lang=ru&units=metric&appid="+API_KEY;
      axios.get(count_url)
      .then( (response)=>{
          if(loadState()===undefined){
          dispatch({type:'FETCH_API',list:[Array.from(response.data.list)]})
          }else{
            dispatch({type:'FETCH_API',list:[loadState().list.ListInfo]})
          }
      })
      .catch( (err) =>{
          console.log('ERROR:', err.message);
      });
    };
   
};