<Navbar collapseOnSelect className="Menutab">
  				<Navbar.Header>
    				<Navbar.Brand >
      				LetterShack
    				</Navbar.Brand>
    				<Navbar.Toggle />
  				</Navbar.Header>
  				<Navbar.Collapse>
    			<Nav>
					<NavItem>
						<Link to='/myworks'className="link">
							<strong>Write</strong>
						</Link>
					</NavItem>
					<NavDropdown title={<span className="link"><strong>Find</strong> </span>} id="basic-nav-dropdown"  >
					
					
							<MenuItem>
								<Link to='/listing/agents' className="link" >Agents</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/listing/publishers' className="link">Publishers</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/listing/editors' className="link">Editors</Link>
							</MenuItem>
					</NavDropdown>
					<NavDropdown title={<span className="link"><strong>Browse</strong> </span>} id="basic-nav-dropdown" 	>
					
					<Row className="dropdown-multi">
						<Col md={6} className="dropdown-link"> 
							<MenuItem className="dropdown-link">
								<Link to='/genre/thriller' className="link">	Short Stories</Link>
							</MenuItem>
							<MenuItem className="dropdown-link">	
								<Link to='/genre/adventure' className="link">Adventure</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/comedy' className="link">Comedy</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/drama' className="link">	Drama</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/horror' className="link">	Horror</Link>
							</MenuItem>
							<MenuItem divider />
							<MenuItem >
								<Link to='/genre/satire' className="link">	Satire</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/screenplay' className="link">	Screenplay</Link>
							</MenuItem>
						</Col>
						<Col md={6}>
							<MenuItem >
								<Link to='/genre/tragedy' className="link">	Tragedy</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/fantasy' className="link">	Fantasy</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/mythology' className="link">	Mythology</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/romance' className="link">	Romance</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/mystery' className="link">	Mystery</Link>
							</MenuItem>
							<MenuItem divider />
							<MenuItem >
								<Link to='/genre/plays' className="link">	Plays</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/poetry' className="link">	Poetry</Link>
							</MenuItem>
						</Col>
					</Row>
					
					</NavDropdown>
    			</Nav>
    			<Nav pullRight>
					<NavDropdown title={
                    <div className="pull-left">
                        <Icon size={18} icon={bell}/>{newNotificationCount}
                    </div>} id="basic-nav-dropdown"  onClick={()=> this.props.removeNotificationCount()}>
						  {message}

							
					</NavDropdown>
					
					
					
					<NavItem>
						<Link to={`/@${this.props.currentUser.username}`} className="link">
							<img src={this.props.currentUser.image} className="user-pic"  />
								<strong>{this.props.currentUser.username}</strong>
						</Link>
      				</NavItem>
					
					<NavItem>
						<Link to='/settings' className="link">
							<strong>Settings</strong>
						</Link>
					</NavItem>
				</Nav>
  				</Navbar.Collapse>																	
			</Navbar>
			
			
		
