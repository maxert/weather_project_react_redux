import axios from "axios";
export  const getOneList = (id) => {
    return dispatch=>{
    const API_KEY = "3254e6994606da89542269b2c8e5b2ef";
    let count_url = "http://api.openweathermap.org/data/2.5/forecast?id=" + id + "&lang=ru&units=metric&appid=" + API_KEY;
      
      axios.get(count_url)
      .then( (response)=>{
          dispatch({type:'FETCH_ONE_LIST',list:[response.data]})
      })
      .catch( (err) =>{
          console.log('ERROR:', err.message);
      });
    };
   
};