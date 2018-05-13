import React, { Component } from "react";
import {Media, Col} from 'react-bootstrap';
import Slider from "react-slick";
import "./slick-carousel/slick/slick.css"; 
import "./slick-carousel/slick/slick-theme.css";
import "./Homepage/HomePageStyle.css";
import ListComponent from "./ListComponent"

export default class MultipleItemsCarousel extends Component {
  render() {
	  
	  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    
    return (
   <div >
	<h3 className="homepage-subheading">{this.props.title}</h3>
     <span className="carousel"><Slider {...settings}>
         { this.props.books.map(book => <div><ListComponent book={book} key={book.slug}/></div>)}
      </Slider></span>
	</div>
      
     
    );
  }
}
