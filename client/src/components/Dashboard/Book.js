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
		          
    <div class="container">
      <div class="row">

        <div class="col-md-2">
          <img class="img-fluid" src="http://via.placeholder.com/150x225" alt=""/>
        </div>
        

        <div class="col-md-4">
          <h4 class="my-3">{this.props.book.title}</h4>
          <p>{this.props.book.description}</p>
          <Link to={`myworks/${this.props.book.slug}`}><Button bsStyle="warning" onClick={()=>{this.selectBook(this.props.book)}}>Continue Writing</Button></Link>
			
        </div>
		
      </div>
      <br/>

    </div>
	)
}
}

export default connect(null, mapDispatchToProps)(Book);
