import React, { Component } from "react";
import Slider from "react-slick";
import "./slick-carousel/slick/slick.css"; 
import "./slick-carousel/slick/slick-theme.css";
import ListComponent from "./ListComponent"

export default class MultipleItemsCarousel extends Component {
  render() {
	  
	  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    
    return (
   <span >
	<h3 className="mb-15 mt-15">{this.props.title}</h3>
	<span className="row">
     <span className="col-lg-12"><Slider {...settings}>
         { this.props.books.map(book => <span><ListComponent book={book} key={book.slug}/></span>)}
      </Slider></span>
    </span>
	</span>
      
     
    );
  }
}
