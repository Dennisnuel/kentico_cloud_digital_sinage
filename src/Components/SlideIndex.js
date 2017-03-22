import React, { Component } from 'react';
import Client from '../Client';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import  '../Transitions/Slide.css';


class SlideIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [],
            //currentSlideIndex: 0
        }

        //this.setTimer = this.setTimer.bind(this);
        //this.moveSlide = this.moveSlide.bind(this);
    }

    setTimer() {

        var interval = setInterval(this.moveSlide, 5000);
        this.setState({
            interval: interval
        });
    }

    moveSlide() {
        this.setState({
            currentSlideIndex: (this.state.currentSlideIndex + 1) % this.state.slides.length
        });
    }

    componentDidMount() {
        Client.getItems({
            "system.type": "slide",
            "order": "elements.weight"
        }).then((response) => {
            this.setState({
                slides: response.items,
                //currentSlideIndex: 0
            })
            //this.setTimer()
        })
    }
    componentUnmount() {
        //clearInterval(this.state.interval);
    }
    render() {
        let style = {
            position: 'fixed',
            top: 0,
            zIndex: -1000,
            backgroundColor: '#FFFEF4',
            width: '100%',
            height: '100%'
        };
        
        //let slide = this.state.slides.length === 0 ? "<div>NODATA</div>" : this.state.slides[this.state.currentSlideIndex].elements.slide_body_text.value;
        const slideoutput = this.state.slides.map((slide, index) => {
            let slidebody = slide.elements.slide_body_text.value;
            return(
                <div style={style} dangerouslySetInnerHTML={{ __html: slidebody }} key={index} />
            )
        });

        return (
            <ReactCSSTransitionGroup
            transitionName="slideright"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
                {slideoutput}
            </ReactCSSTransitionGroup>       
        );
    }
}
export default SlideIndex