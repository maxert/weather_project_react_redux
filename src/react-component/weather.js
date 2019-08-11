import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllList } from "../getElement/getCityAll";
import { Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "3254e6994606da89542269b2c8e5b2ef";
class Weather extends Component {
  componentDidMount() {
    this.props.onGetList();
  }
  infoAdd = event => {
    event.currentTarget.querySelectorAll(".element_info")[0].classList.add("active");
  };

  updateItems = (i, event) => {
    let count_url = "http://api.openweathermap.org/data/2.5/forecast?id=" + i + "&lang=ru&units=metric&appid=" + API_KEY;
    axios
      .get(count_url)
      .then(response => {
        var data = new Date(new Date().toString().split("GMT")[0] + " UTC").toISOString().split("T")[0];
        var dateTime = new Date();
        var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
        var timeNow = data + " " + time;
        var isBoolean = true;
        var timeNowItems = response.data.list.filter(Element => {
          if (Element.dt_txt > timeNow) {
            if (isBoolean === true) {
              isBoolean = false;
              return Element;
            }
          }
          return Element;
        });
        this.props.onUpdateList(timeNowItems[0], i);
        
      })
      .catch(err => {
        console.log("ERROR:", err.message);
      });
  };
  

  deleteItems=(id,event)=>{
    this.props.onRemoveItems(id);
  }
  addList = () => {
    let count_url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.listvalue.value + "&lang=ru&units=metric&appid=" + API_KEY;
    axios
      .get(count_url)
      .then(response => {
        this.props.onAddList(response.data);
      })
      .catch(err => {
        console.log("ERROR:", err.message);
      });
  };
  render() {

    return (
      <div>
        <input
          name='text'
          id=''
          type='text'
          ref={input => {
            this.listvalue = input;
          }}
        />
        <button onClick={this.addList.bind(this)}>Добавить погоду</button>

         
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
    ownProps
  }),
  dispatch => ({
    onAddInfo: (listAll, idCity) => {
      dispatch({ type: "ADD_INFO", list: listAll, id: idCity });
    },
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
    }
  }),
)(Weather);
