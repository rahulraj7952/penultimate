import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import {FormGroup,ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';

class Submit extends React.Component{

	  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enterPressed = this.enterPressed.bind(this);

    this.state = {
      value: '',
      counter: 0
      
    };
  }
	enterPressed(event){
		var code=event.keyCode || event.which;
		if(code===13){
		this.handleSubmit(event);			
		}	
	}

  handleChange(e) {
  	e.preventDefault();	
  	console.log('loa');
    this.setState({ value: e.target.value });
  }
  
  handleSubmit(e){
  e.preventDefault();
  	console.log("2" +this.state.value)
  	this.props.onSubmit(this.state.value);  
  }

	render(){
		return(
			<div>
  			<Row>
  				<form>
        			<FormGroup controlId="formBasicText">
          			<ControlLabel>Submit your book here</ControlLabel>
          			<FormControl type="text" value={this.state.value} placeholder="Enter text" onChange={this.handleChange} 
          			onKeyPress={this.enterPressed}/>
          			<FormControl.Feedback />
          			<HelpBlock>Type in the book name and press Save Item! {this.state.counter}</HelpBlock>
        			</FormGroup>
        			<Button onClick ={this.handleSubmit} bsStyle="primary" >Submit</Button>
      		</form>
    			
    		</Row>
    		<br/>
    		
			</div>


    	)
	}
	}
	
	export default Submit;
