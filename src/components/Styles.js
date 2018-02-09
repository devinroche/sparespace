import styled from "styled-components";

export const Header = styled.h1`
        	font-family: 'Rubik', 'Arial', 'sans-serif';
        	font-size: 55px;
        	font-weight: 700;
        	color: #333333;
        	
        	@media(min-width: 1440px) {
				font-size: 65px;
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
        font-size: 30px;
        margin-bottom: 50px;
    }
    @media(max-width: 320px) {
        font-size: 18px;
    }
`;

export const Link = styled.a`
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
        font-size: 27px;
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

export const Row = styled.div`
    margin-top: 50px;
    margin-left: 50px;
`;

export const Logo = styled.a`
	font-family: "Helvetica", "Arial", "sans-serif";
	color: #FC5B45;
	font-weight: bold;
	font-size: 30px;
	margin-left: 40px;
	margin-top: 25px;
	text-decoration: none;	
	:hover{
			color: #FC5B45;
			text-decoration: #FC5B45;
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
	:hover{
			background-color: #FC5B45;
			color: #FFF;
			text-decoration: #FC5B45;
		}
	
	@media(max-width: 768px) {
				padding: 4px 10px;
				font-size: 11px;
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
				font-size: 20px;
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
  font-size: 17px;
  padding-bottom: 15px;
  margin-top: -5px;
`;

export const Label = styled.h3`
   font-family: "Rubik", "Arial", "sans-serif";
   font-weight: 300;
   color: #666;
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
   font-weight: 400;
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
   font-size: 18px;
   @media(min-width: 1440px) {
				font-size: 22px;
				
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
				font-size: 22px;
				
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



//create listing page
export const FormStyle = styled.input`
	font-family: Rubik, Arial, sans-serif;
	color: #333;
	font-weight: 300;
	font-size: 20px;
	margin-top: 50px;
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
	margin-top: 200px;
	padding: 10px 35px;
	border-color: #FC5B45;	
`;

export const PriceInput = styled.input`

	margin-top: 25px;
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

`;

export const CreateLabel = styled.h3`
   font-family: "Rubik", "Arial", "sans-serif";
   font-weight: 300;
   color: #333;
   margin-top: 25px;
   @media(min-width: 1440px) {
				font-size: 30px;
				
		}
`;

