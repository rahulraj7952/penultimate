import React , {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';	
import {SET_CURRENT_BOOK} from '../../constants/actionTypes';
import {connect} from 'react-redux'; 



const mapDispatchToProps = dispatch => ({
  onBookSelect: (book) =>{
    dispatch({ type: SET_CURRENT_BOOK, book })}
});


class Book extends React.Component{
	
	constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.selectBook = this.selectBook.bind(this);
  }

	selectBook=(book)=>{
		console.log("in select book")
		this.props.onBookSelect(book)
		}
		
	
	render(){
		return(
		          
		  <div className="col-12 col-lg-7 mb-15 mt-15">
                                           
                                            <div className="single-blog-post post-style-4 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.2s">
                                               
                                                <div className="post-thumbnail">
                                                    <img src="http://via.placeholder.com/150x225"  alt=""/>
                                                </div>
                                               
                                                <div className="post-content">
                                                    <Link to='/' className="headline">
                                                        <h5>{this.props.book.title}</h5>
                                                    </Link>
                                                    <p>1208How Did van Gogh’s Turbulent Mind Depict One of thein...</p>
                                              
                                                   <Link to={`myworks/${this.props.book.slug}`}><button className="btn btn-outline-primary" onClick={()=>{this.selectBook(this.props.book)}}><h4>Continue Writing</h4></button></Link>
                                                </div>
                                            </div>
                                        </div>         
		          
		          
		          
		          
		
	
	)
}
}

export default connect(null, mapDispatchToProps)(Book);
