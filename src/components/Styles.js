import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

//home page

export const MainHeader = styled.div`
@media(max-width: 425px) {
  				padding: 0;
  			}
`;

export const NavBarDiv = styled.div`

@media(max-width: 425px) {
				  text-align: center;
  			}
;`




export const Header = styled.h1`
        	font-family: 'Rubik', 'Arial', 'sans-serif';
        	font-size: 55px;
        	font-weight: 700;
        	color: #333333;
        	
        	@media(min-width: 1440px) {
				font-size: 55px;
  			}
  			@media(max-width: 375px) {
  				padding: 0;
				font-size: 45px;
  			}
  			@media(max-width: 320px) {
				font-size: 45px;
  			}
		`;



export const SubHeader = styled.h2`
    font-family: 'Rubik', 'Arial', 'sans-serif';
    font-weight: 300;
    font-size: 22px;
    line-height: 1.4;
    color: #666666;
    margin-bottom: 30px;
    
    @media(min-width: 1440px) {
        font-size: 25px;
        margin-bottom: 50px;
    }
     @media(max-width: 425px) {
        font-size: 20px;
    }
    @media(max-width: 375px) {
        font-size: 18px;
    }
    @media(max-width: 320px) {
        font-size: 18px;
    }
`;

export const HomeButton = styled.a`
    font-family: 'Rubik', 'Arial', 'sans-serif';
    background-color: #FC5B45;
    font-weight: 300;
    font-size: 21px;
    text-align: center;
    color: #FFF;
    padding: 18px 35px;
    text-decoration: none;
    border-radius: 5px;
    :hover{
        text-decoration: none;
        color: #FFF;
    }
    
    @media(min-width: 1440px) {
        font-size: 24px;
    }
    @media(max-width: 991px) {
        font-size: 16px;
    }
    
    @media(max-width: 768px) {
        font-size: 18px;
    }
    @media(max-width: 375px) {
        font-size: 15px;
    }
    @media(max-width: 320px) {
        font-size: 13px;
        padding: 10px 25px;
    
    }

`;


export const Boxes = styled.img`

	margin-top: 125px;

	@media(max-width: 425px){
		display: none;
	}
`;

export const FooterLink = styled.a`
	font-family: 'Rubik', 'Arial', 'sans-serif';
    color: #FC5B45;
    font-weight: 600;
    :hover{
        text-decoration: none;
        color: #FC5B45;
    }
`;


export const Row = styled.div`
    margin-top: 50px;
    margin-left: 50px;
`;

export const Logo = styled.a`
	font-family: "Helvetica", "Arial", "sans-serif";
	color: #FC5B45;
	font-weight: bold;
	font-size: 30px;
	text-decoration: none;	
	:hover{
			color: #FC5B45;
			text-decoration: #FC5B45;
		}
	:visited{
		color: #FC5B45;
		text-decoration: none;
	}

	
	

`;

export const NavItem = styled.a`
	font-family: "Helvetica", "Arial", "sans-serif";
	font-size: 16px;
	font-weight: 400;
	text-decoration: none;
	color: #333333;
	:hover{

			color: #333333;
			text-decoration: #333;
		}
	
	@media(max-width: 320px) {
			font-size: 15px;
		}
		@media(max-width: 768px) {
				font-size: 13px;
  			}
`;


export const PostSpace = styled.a`
	color: #FC5B45;
	background-color: #FFF;
	border-width: thin;
	border-style: solid;
	border-color: #FC5B45;
	padding: 7px 15px;
	text-decoration: none;
	border-radius: 3px;
	transition: background-color 0.5s ease;
	:hover{
			background-color: #FC5B45;
			color: #FFF;
			text-decoration: none;
			box-shadow: 0 10px 28px 0 rgba(0,0,0,0.2);
		}
	
	@media(max-width: 768px) {
			padding: 4px 10px;
			font-size: 13px;
		}
`;


export const LoginHeader = styled.h1`
	margin-top: 100px;
	font-family: "Rubik", "Arial", "sans-serif";
	color: #FC5B45;
	font-weight: 400;
	@media(min-width: 1440px) {
			font-size: 45px;
  		}
`;

export const SupportText = styled.h3`
	font-family: "Rubik", "Arial", "sans-serif";
	color: #747272;
	font-weight: 300;
	font-size: 20px;
	@media(min-width: 1440px) {
				font-size: 25px;
		}
`;

export const FormLabel = styled.label`
	font-family: "Rubik", "Arial", "sans-serif";
	color: #333;
	font-weight: 400;
	margin-top: 10px;
	@media(min-width: 1440px) {
				font-size: 18px;
		}

`;

export const FormFormat = styled.form`
	margin-top: 15px;

`;

export const LoginButton = styled.button`
	color: #FC5B45;
	background-color: #ffffff;
	font-family: "Rubik", "Arial", "sans-serif";
	font-weight: 400;
	font-size: 15px;
	margin-top: 35px;
	padding: 8px 30px;
	border-color: #FC5B45;
	@media(min-width: 1440px) {
				font-size: 22px;
				padding: 10px 33px;
		}
	
	
`;

export const FormInput = styled.input`

	@media(min-width: 1440px) {
				font-size: 20px;
		}

`;

export const Feedback= styled.div`
color: red;
`

export const SignUpButton = styled.button`
      color:#fff;
      background-color: #FC5B45;
      border: none;
      border-radius: 6px;
      font-family: "Rubik", "Arial", "sans-serif";
      font-weight: 300;
      margin-top: 25px;
      padding: 10px 45px;
      :hover{
		
			color: #ffffff;
			text-decoration: #ffffff;
		}
`;


export const CloseBtn = styled.button`
      color:#fff;
      background-color: #FC5B45;
      border: none;
      border-radius: 6px;
      font-family: "Rubik", "Arial", "sans-serif";
      font-weight: 300;
      margin-top: 20px;
      :hover{
		
			color: #ffffff;
			text-decoration: #ffffff;
		}
`;

//listing details page
export const CardStyle = styled.div`
   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

export const CardTitle = styled.h2`

  font-family: "Rubik", "Arial", "sans-serif";
  color: #333;
  font-weight: 600;
  margin-left: 15px;
  font-size: 25px;
`;

export const CardHost = styled.h2`

  font-family: "Rubik", "Arial", "sans-serif";
  color: #7F7F7F;
  font-weight: 400;
  margin-left: 15px;
  font-size: 15px;
  padding-bottom: 5px;
  margin-top: -5px;
`;

export const Label = styled.h3`
   font-family: "Rubik", "Arial", "sans-serif";
   font-weight: ${props => props.header ? '500' : '300'};
   font-size: ${props => props.header ? '25px' : '20px'};
   color: ${props => props.header ? '#333' : '#666'};

   @media(min-width: 1440px) {
				font-size: 30px;		
		}
`;

export const Price = styled.h3`
   font-family: "Rubik", "Arial", "sans-serif";
   color: #333;
   font-weight: 600;
   font-size: 30px;
   margin-top: -5px;
   

`;

export const Duration = styled.h3`
   font-family: "Rubik", "Arial", "sans-serif";
   color: #333;
   font-weight: 600;
   font-weight: 600;
   font-size: 16px;
   margin-top: -5px;
   @media(max-width: 768px) {
			font-size: 13px;
		}
	@media(min-width: 1440px) {
				font-size: 16px;
				
		}
`;

export const ListingLabel = styled.h4`
   font-family: "Rubik", "Arial", "sans-serif";
   font-weight: 500;
   color: #333;
   margin-top: 25px;
   margin-left: 15px;
   font-size: 20px;
   @media(min-width: 1440px) {
				font-size: 25px;
				
		}
`;

export const Features = styled.li`
   font-family: "Rubik", "Arial", "sans-serif";
   font-weight: 400;
   color: #666666;
   margin-top: 10px;
   margin-left: 15px;
   font-size: 15px;
   @media(min-width: 1440px) {
				font-size: 20px;
				
		}
`;

export const Description = styled.p`
   font-family: "Rubik", "Arial", "sans-serif";
   font-weight: 400;
   color: #666666;
   margin-left: 15px;
   font-size: 15px;
   line-height: 2;
   @media(min-width: 1440px) {
				font-size: 20px;
				
		}
`;

export const Message = styled.button`

	font-family: Rubik, Arial, sans-serif;
	color: #ffffff;
	margin-top: 10px;
	padding: 10px 60px;
	font-size: 20px;
	background: linear-gradient(to right, #FE947B, #FC5B45);
	border: none;
`;

export const SmallMsg = styled.button`
	font-family: Rubik, Arial, sans-serif;
	color: #ffffff;
    margin: 5px;
    cursor: pointer;
    padding: 0.75rem 1rem;
    border-radius: 0.317rem;
    font-size: 16px;
    background-color: #aaa;
	color: #fff;
	text-decoration: none;
    border: none;
    :hover {
        opacity: 0.85;
    }
`;

//create listing page
export const FormStyle = styled.input`
	font-family: Rubik, Arial, sans-serif;
	color: #333;
	font-weight: 300;
	font-size: 20px;
	border: none;
	box-shadow: none;
	border-bottom: 1px solid #CCCCCC;
	::placeholder{
		font-family: Rubik, Arial, sans-serif;
		color: #C1C1C1;
		font-size: 15px;
	}
	
`;

export const WhiteButton = styled.button`

	color: #FC5B45;
	background-color: #ffffff;
	font-family: Rubik, Arial, sans-serif;
	font-weight: 400;
	margin-top: 50px;
	padding: 10px 35px;
	border-color: #FC5B45;	
`;

export const PriceInput = styled.input`

	border: none;
	box-shadow: none;
	border-bottom: 1px solid #CCCCCC;

	::placeholder{
		font-family: Rubik, Arial, sans-serif;
		color: #C1C1C1;
		font-size: 15px;
	}
`;

export const DescriptionInput = styled.textarea`
	border-radius: 5px;
	border-color: #333;
	::placeholder{
		font-family: Rubik, Arial, sans-serif;
		color: #C1C1C1;
		font-size: 15px;
	}
	resize: none;


`;

export const CreateLabel = styled.h3`
  		
   font-family: "Rubik", "Arial", "sans-serif";
   font-size: 20px;
   font-weight: 400;
   color: #333;
   margin-top: 25px;
   @media(min-width: 1440px) {
				font-size: 30px;
				
		}
`;

export const CreateLabelFeatures = styled.h3`
  		
   font-family: "Rubik", "Arial", "sans-serif";
   font-weight: 300;
   color: #333;
   margin-top: 25px;
   
   @media(min-width: 1440px) {
				font-size: 30px;
				
		}
`;

export const SectionDivider = styled.hr`
    clear:both;
    display:block;
    border: #FC5B45;
    background-color: #FC5B45;
    height: 1px;
`;

//image upload
export const ImageUploadText = styled.p`

	font-family: "Rubik", "Arial", "sans-serif";
	font-weight: 400;
	margin-top: 45px;
	font-size: 18px;
	color: #5E85B2;

`;

export const BlackButton = styled.button`

	font-family: "Rubik", "Arial", "sans-serif";
	padding: 12px 35px;
	border-radius: 5px;
	background-color: #ffffff;
	color: #333;
	border-color: #333;
	border-width: 2px;

`;

export const OrangeButton = styled.button`
	padding: 12px 35px;
	border-radius: 5px;
	background-color: #ffffff;
	border-color: #FC5B45;
	border-width: 2px;
	font-family: "Rubik", "Arial", "sans-serif";
	color: #FC5B45;
	@media(max-width: 425px) {
		padding: 7px 25px;
		font-size: 12px;
		
}
	
				
`;

//listings page

export const Box = styled.div`
	transition: box-shadow .3s;
	border-radius: 5px;
	border: 1.5px solid #E4E4E4;
	:hover {
		box-shadow: 0 0 11px #FC5B45; 
	  }
`

export const ListingPrice= styled.h2`
	font-family: "Rubik", "Arial", "sans-serif";
	color: #FC5B45;
	font-weight: 500;
	font-size: 18px;
	`;


export const ListingCardTitle = styled.h2`

  font-family: "Rubik", "Arial", "sans-serif";
  color: #333;
  font-weight: 500;
  font-size: 18px;
`;

export const FilterContainer = styled.div`
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	padding: 10px;
`;

export const SearchInput = styled.input`
	font-family: Rubik, Arial, sans-serif;
	color: #666;
	font-weight: 300;
	font-size: 20px;
	border: none;
	box-shadow: none;
	border-bottom: 1px solid;
	::placeholder{
		font-family: Rubik, Arial, sans-serif;
		color: #C1C1C1;
		font-size: 15px;
	}
`;

//user chats page
export const MessageCard = styled.div`
	margin-top: 25px;
	padding: 15px;
	text-align: left;
	border: 1px solid rgba(0, 0, 0, .2);
	border-radius: 3px;
	box-shadow: 0 0 3px rgba(0,0,0,0.15);
	`;

export const MessageName = styled.p`
	font-weight: 600;
	font-size: 18px;
	color: #333;
	
	`;

export const WelcomeText = styled.h1`
	font-weight: 600;
	font-size: 35px;
	color: #333;
	text-align: center;
	margin-bottom: 50px;
	margin-top: 50px;
	@media(max-width: 375px) {
		font-size: 30px;
		
}
	`;

export const BackButton = styled.button`
	font-family: "Rubik";
	color: #FFF;
	font-weight: 400;
	width: 150,
    margin-bottom: 20,
    height: 50,
	fontSize: 20,
	background: linear-gradient(to right, #FE947B, #FC5B45);
	border: "none";
	@media(max-width: 425px){
		display: none;
	}
`;

export const Paragraph = styled.p`
	line-height: 1.6
`;

export const StyledLink = styled(Link)`
	text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

// export default (props) => <StyledLink {...props} />;