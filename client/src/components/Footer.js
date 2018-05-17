import React, {Component} from "react";

class Footer extends React.Component{
	render(){
		return(
			 <footer className="footer-area">
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="footer-single-widget">
                        <a href="#"><img src="" alt=""/></a>
                        <div className="copywrite-text mt-30">
                            <p>
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="footer-single-widget">
                        <ul className="footer-menu d-flex justify-content-between">
                            <li><a href="#">2818 Home</a></li>
                            <li><a href="#">Fashion</a></li>
                            <li><a href="#">Lifestyle</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Gadgets</a></li>
                            <li><a href="#">Video</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="footer-single-widget">
                        <h5>Subscribe</h5>
                        <form action="#" method="post">
                            <input type="email" name="email" id="email" placeholder="Enter your mail" />
                            <button type="button"><i className="fa fa-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </footer>
   
			)
		}
	}
	
	export default Footer;
