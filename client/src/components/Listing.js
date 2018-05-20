	import React,{Component} from "react";
import {Grid, Row, Col, Media} from 'react-bootstrap';
import './Listing.css'

const agents=[{
		"id":"1",
		"username": "Mohit Jain",
		"bio": "Agent has been working for so long with publishers like xxx , yyy, zzzz",
		"genres":["fiction", "non-fiction", "horror"],
		"clients":["Jhumpa Lahiri","Julia Roberts", "pawan Kumar"],
		"books": ["A brief history of panwa kumar", "Mohta , Piyush, Mohit-what do they have in common", "why rahul kumar cheated on mohit kumar"]
	},
	{
		"id":"2",
		"username": "Pawan Kumar",
		"bio": "Agent has been working for so long with publishers like xxx , yyy, zzzz",
		"genres":["fiction", "non-fiction", "romance"],
		"clients":["Jhumpa Lahiri","Julia Roberts", "satire"],
		"books": ["A brief history of pawan kumar", "Mohta , Piyush, Mohit-what do they have in common", "why rahul kumar cheated on mohit kumar"]
	},{
		"id":"3",
		"username": "Rahul Kumar",
		"bio": "Agent has been working for so long with publishers like xxx , yyy, zzzz",
		"genres":["fiction", "non-fiction", "romance"],
		"clients":["Jhumpa Lahiri","Julia Roberts", "pawan Kumar"],
		"books": ["A brief history of pawan kumar", "Mohta , Piyush, Mohit-what do they have in common", "why rahul kumar cheated on mohit kumar"]
	},{
		"id":"4",
		"username": "Piyush Kumar Drolia",
		"bio": "Agent has been working for so long with publishers like xxx , yyy, zzzz",
		"genres":["fiction", "non-fiction", "comedy"],
		"clients":["Jhumpa Lahiri","Julia Roberts", "pawan Kumar"],
		"books": ["A brief history of pawan kumar", "Khaitan-Market-My-Home-kjkljfdsafjkdlskjafdsklajf", "why rahul kumar cheated on mohit kumar"]
	},{
		"id":"5",
		"username": "Mohit Kumar",
		"bio": "Agent has been working for so long with publishers like xxx , yyy, zzzz",
		"genres":["fiction", "non-fiction", "romance"],
		"clients":["Jhumpa Lahiri","Julia Roberts", "pawan Kumar"],
		"books": ["A brief history of pawan kumar", "Mohta , Piyush, Mohit-what do they have in common", "why rahul kumar cheated on mohit kumar"]
	},{
		"id":"6",
		"username": "Prashant Kumar",
		"bio": "Agent has been working for so long with publishers like xxx , yyy, zzzz",
		"genres":["fiction", "non-fiction", "romance"],
		"clients":["Jhumpa Lahiri","Julia Roberts", "pawan Kumar"],
		"books": ["A brief history of pawan kumar", "Mohta , Piyush, Mohit-what do they have in common", "why rahul kumar cheated on mohit kumar"]
	},{
		"id":"7",
		"username": "Bahubali",
		"bio": "Agent has been working for so long with publishers like xxx , yyy, zzzz",
		"genres":["fiction", "non-fiction", "romance"],
		"clients":["Nacho","Kurankar", "Jindal"],
		"books": ["A brief history of panwa", "Mohta , Piyush, Mohit-what do they have in common", "why rahul kumar cheated on mohit kumar"]
	}]

const AgentListingComponent=props =>{
	return(
		
			<div className="mb-15 mt-15">
							<div className="single-blog-post post-style-4 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.2s">
         
                            <div className="post-thumbnail">
                                <img src="http://via.placeholder.com/120x180" alt=""/>
                            </div>
                        
                            <div className="post-content">
                                    <h5>{props.agent.username}</h5>
								<p> Genres: {props.agent.genres[0]} {props.agent.genres[1]} {props.agent.genres[2]}</p>
                                <p> Clients: {props.agent.clients}</p>
                                <p> Books:{props.agent.books}</p>
                          
                            </div>
                        </div>
                      </div>
	)
	}

class Listing extends React.Component{
	
	
	render(){
		
		
		
		return(
		<div className="main-content-wrapper ">
			<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-lg-6 mb-15 mt-50">
					<h3>Search for {this.props.match.params.id}</h3>
					<div className="form-group">
						<div className="icon-addon addon-lg">
							<input type="text" placeholder="Type the genre here..." className="form-control" id="type"/>
							<label for="email" className="glyphicon glyphicon-search" rel="tooltip" title="email"></label>
						</div>
					</div>
					{agents.map(agent=><AgentListingComponent agent={agent} key={agent.id}/>)}
				</div>
			</div>
			
			</div>
			
		</div>
		

		)
	
	}

}

export default Listing;
