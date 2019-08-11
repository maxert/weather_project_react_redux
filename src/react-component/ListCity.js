import React, { Component } from "react";
import {connect} from "react-redux";
import { getOneList } from "../getElement/getOneCity";
import { Link } from "react-router-dom";
class ListCity extends Component{
componentDidMount() {
this.props.onOneList(Number(this.props.match.params.id));

}

render(){

return( 
<div>
    {this.props.list.map((Element, index) => {
    return (
    <div className="items-row container_all_info" key={index}>
    <Link to="/" className='prev_button'>Назад</Link>
        <div className='title-text'>
            Город: <strong>{Element.city.name}</strong>
        </div>
        {
        Element.list.map((info,i)=>{
       return <div  key={i} className='d-flex flex-column align-items-center justify-content-center items_city'>
            <div className='weather-image d-flex align-items-center justify-content-center'>
                <img src={"http://openweathermap.org/img/wn/" + info.weather[0].icon + "@2x.png" } alt='Картинка' />
            </div>

            <div className='title-text'>
                Температура: <strong>{info.main.temp}</strong>
            </div>
            <div className='title-text'>
                Погода на: <strong>{info.dt_txt}</strong>
            </div>
            <div className='element_all'>
                <div>
                    Скорость ветра: <strong>{info.wind.speed}</strong>
                </div>
                <div>
                    Направление ветра: <strong>{info.wind.deg}</strong>
                </div>
                <div>
                    Cолнечное излучение: <strong>{info.main.sea_level}</strong>
                </div>
                <div>
                    Максимальная температура ветра: <strong>{info.main.temp_max}</strong>
                </div>
                <div>
                    Минимальная температура ветра: <strong>{info.main.temp_min}</strong>
                </div>
            </div>
            </div>
            })

            }

        </div>
        )
        })}
    </div>
    )

    }

    }

    const mapStateOnProps =(state,ownProps)=>{


    const ListElement = state.listCity.filter(list=>{
    if(list.city.id===Number(ownProps.match.params.id)){
    return list;
    }
    return list;
    });
    console.log(ListElement);
    return{
    list:ListElement
    };
    }
    export default connect(mapStateOnProps,
    dispatch => ({
    onOneList: (id) => {
    dispatch(getOneList(id));
    },
    }))(ListCity);