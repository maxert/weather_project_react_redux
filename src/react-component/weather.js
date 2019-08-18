import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllList } from "../getElement/getCityAll";
import { Link } from "react-router-dom";
import axios from "axios";
import dataCity from "../JSON/city.list.json";
const API_KEY = "3254e6994606da89542269b2c8e5b2ef";
class Weather extends Component {
  componentDidMount() {
    this.props.onGetList();
  }
  infoAdd = event => {
    event.currentTarget.querySelectorAll(".element_info")[0].classList.add("active");
  };

  updateItems = (i, event) => {
    event.currentTarget.offsetParent.querySelectorAll(".element_info")[0].classList.remove("active");
    let count_url = "http://api.openweathermap.org/data/2.5/forecast?id=" + i + "&lang=ru&units=metric&appid=" + API_KEY;
    axios
      .get(count_url)
      .then(response => {
        var dateTime = new Date();
        var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
        
        var isBoolean = true;
        var timeNowItems = response.data.list.filter(Element => {
          var newTime = Element.dt_txt.split(' ')[1].split(":")[0];
          var getTime =time.split(":")[0];
          if (Number(newTime)> Number(getTime)) {
            if (isBoolean === true) {
              isBoolean = false;
              return Element;
            }
          }
        });
        this.props.onUpdateList(timeNowItems[0], i);
        
      })
      .catch(err => {
        console.log("ERROR:", err.message);
      });
  };
  

  deleteItems=(id,event)=>{
    event.currentTarget.offsetParent.querySelectorAll(".element_info")[0].classList.remove("active");
    this.props.onRemoveItems(id);
  }
  KeyPress=(e)=>{

    if(e.charCode===13){
      document.querySelectorAll(".list_all_city")[0].classList.remove("active");
      let count_url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.listvalue.value + "&lang=ru&units=metric&appid=" + API_KEY;
    axios
      .get(count_url)
      .then(response => {
        this.props.onAddList(response.data);
        this.listvalue.value="";
      })
      .catch(err => {
        console.log("ERROR:", err.message);
      });
  };
  
    }
  
  addList = () => {
    let count_url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.listvalue.value + "&lang=ru&units=metric&appid=" + API_KEY;
    axios
      .get(count_url)
      .then(response => {
        this.props.onAddList(response.data);
          this.listvalue.value="";
      })
      .catch(err => {
        console.log("ERROR:", err.message);
      });
  };
  valueCity=()=>{
    if(this.listvalue.value.length>0){
      document.querySelectorAll(".list_all_city")[0].classList.add("active");
    var Element = dataCity.filter((Element,i)=>{
      return Element.name.toLowerCase().search(this.listvalue.value.toLowerCase())!==-1;
     });
     this.props.onChangeList(Element);
    }else{
      document.querySelectorAll(".list_all_city")[0].classList.remove("active");
    }
  }
  addInput=(name)=>{
    this.listvalue.value=name;
  }
  render() {

    return (
      <div>
      <div className="header_click">
      <div className="list">
        <input
        onChange={this.valueCity.bind(this)}
        onKeyPress={this.KeyPress.bind(this)}
          name='text'
          id=''
          type='text'
          ref={input => {
            this.listvalue = input;
          }}
        />
        
        <ul className="list_all_city">
          {this.props.valueList.map((Element,i)=>{
            if(i<20){
           return <li key={i} onClick={this.addInput.bind(this,Element.name)}  dangerouslySetInnerHTML={{
          __html : Element.name.replace(this.listvalue.value,'<strong>'+this.listvalue.value+'</strong>')
        }}></li>
            }
          })}
        </ul>
        </div>
        <button onClick={this.addList.bind(this)}>Добавить погоду</button>
        </div>

         
        <div className='container container-weather'>
          {this.props.listCityAll.map((listCity, index) => {
            return (
              <div key={index} className="items-row">
                <div onClick={this.infoAdd.bind(this)} data-index={listCity.id} className='d-flex flex-column align-items-center justify-content-center items_city' title={listCity.weather[0].description}>
                  <div className='weather-image d-flex align-items-center justify-content-center'>
                    <img src={"http://openweathermap.org/img/wn/" + listCity.weather[0].icon + "@2x.png"} alt='Картинка' />
                  </div>
                  <div className='title-text'>
                    Город: <Link to={'/list/'+listCity.id}><strong>{listCity.name}</strong></Link>
                  </div>
                  <div className='title-text'>
                    Температура: <strong>{listCity.main.temp}</strong>
                  </div>
                  <div className='element_info'>
                    <div>
                      Координаты:{" "}
                      <strong>
                        {listCity.coord.Lat} {listCity.coord.Lon}
                      </strong>
                    </div>
                    <div>
                      Скорость ветра: <strong>{listCity.wind.speed}</strong>
                    </div>
                    <div>
                      Направление ветра: <strong>{listCity.wind.deg}</strong>
                    </div>
                    <div>
                      Cолнечное излучение: <strong>{listCity.main.sea_level}</strong>
                    </div>
                    <div>
                      Максимальная температура ветра: <strong>{listCity.main.temp_max}</strong>
                    </div>
                    <div>
                      Минимальная температура ветра: <strong>{listCity.main.temp_min}</strong>
                    </div>
                  </div>
                </div>
                <i className='fas fa-sync update' onClick={this.updateItems.bind(this, listCity.id)} />
                 <i className='fas fa-trash-alt delete' onClick={this.deleteItems.bind(this, index)} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default connect(
  
  (state,ownProps) => ({
    listCityAll: state.ListInfo,
    valueList:state.Change,
    ownProps
  }),
  dispatch => ({
    onUpdateList: (listItems, idCity) => {
      dispatch({ type: "UPDATE_ITEMS", list: listItems, id: idCity });
    },
    onAddList: listName => {
      dispatch({ type: "ADD_WEATHER", list: listName });
    },
    onGetList: () => {
      dispatch(getAllList());
    },
    onRemoveItems:(idCity)=>{
      dispatch({ type: "REMOVE_ITEMS",  id: idCity });
    },
    onChangeList:(value)=>{
      dispatch({ type: "CHANGE_ITEMS",  value: value });
    }
  }),
)(Weather);
