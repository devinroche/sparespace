import React from 'react';
import {Devices} from "./Devices";
import {Logo} from "./Logo";
import './media.css';
import Scroll from 'react-scroll';
import Typing from 'react-typing-animation';
import TypistCycle from "./TypistCycle";

// for scrolling
var scroll = Scroll.animateScroll;

export class Header extends React.Component {


    // componentDidMount() {
    //
    //     //update item every 3 seconds
    //
    //     setInterval(() => {
    //
    //         this.setState({
    //             count: this.state.count + 1
    //         })
    //         if(this.state.count < items.length) {
    //             this.setState({
    //
    //                 currentItem: items[this.state.count]
    //             })
    //         }
    //     }, 3000);
    //
    // }



    constructor(props) {
        super(props)
        this.state = {
            hover: false,
        }
        this.handleHover = this.handleHover.bind(this)
    }

    scrollToBottom() {
        scroll.scrollToBottom();
    }




    handleHover() {

        this.setState({
            hover: !this.state.hover
        })
    }



    render(){


        const headerStyle = {
            fontSize: '2.5em',
            paddingTop: 100

        }
        let buttonStyle = {

            borderRadius: '5px',

        }

        const divStyle = {

            marginTop: 100
        }
        

        if(this.state.hover){
            buttonStyle = {
                marginTop: 25,
                backgroundColor: 'red',
                color: 'white'
            }
        }
        else{

            buttonStyle = {
                marginTop: 25,
                backgroundColor: 'white',
                borderColor: 'red',
                color: 'red'
            }
        }

        const typeAnimation = (this.state.currentItem) ? (
            <Typing> <Typing.Delay ms={100}/> {this.state.currentItem} <Typing.Backspace count = {20} delay={500}/> </Typing>
    ) :  '';

        const typing = <TypistCycle avgTypingDelay={100} startDelay={1000}
            content={[
                'mattress',
                'loft kit',
                'couch',
                'skis',
                'furniture',
                'boxes'
            ]}
            numberOfCycles={-1} // loop indefinitely
            segmentDelay={2} // stop for 0.8s at end line
        />;


        return(
            <div>
                <Logo/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 text-center header" style={divStyle}>
                        <h1 style={headerStyle}> <b> Find cheaper storage for your {typing} </b> </h1>
                        <button onClick={this.scrollToBottom} style={buttonStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} type="button" className="btn btn-outline">Learn More</button>
                    </div>
                    <div className="col-sm-8" style={divStyle}>
                        <Devices/>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}