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
		<Col md={6} className="agent-item">
			<Media>
				<Media.Body>	
					<Media.Heading>
						
							<h4><b>{props.agent.username}</b></h4>
						
					</Media.Heading>		
					<h5>Genres: {props.agent.genres[0]} {props.agent.genres[1]} {props.agent.genres[2]}< /h5>	
					<h5>Clients: {props.agent.clients}</h5>
					<br/>
				    <h5>Books: {props.agent.books} </h5>
					<p>{props.agent.bio}			</p>
				</Media.Body>
				<Media.Right>
					<img width={150} height={150} src="http://via.placeholder.com/200x200" alt="thumbnail" className="list-image" />
				</Media.Right>
			</Media><br/>	<hr/>
			</Col>
	)
	}

class Listing extends React.Component{
	
	
	render(){
		
		console.log("agents",agents)
		
		return(
		<Grid>
			<Row>
				<Col md={5} mdOffset={3}>
					<h3>Search for {this.props.match.params.id}</h3>
					<div class="form-group">
					<div class="icon-addon addon-lg">
                    <input type="text" placeholder="Type the genre here..." class="form-control" id="type"/>
                    <label for="email" class="glyphicon glyphicon-search" rel="tooltip" title="email"></label>
                </div>
            </div>
		
		</Col>
		</Row>
		<br/>
		<Row>
			
			{agents.map(agent=><AgentListingComponent agent={agent} key={agent.id}/>)}
		</Row>
		
		</Grid>
		)
	
	}

}

export default Listing;
