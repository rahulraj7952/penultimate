import React,{Component} from "react";

class Listing extends React.Component{
	render(){
		return(
		<div>{this.props.match.params.id}</div>
		)
	
	}

}

export default Listing;
