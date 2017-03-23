import React, { Component } from 'react';
import Client from '../Client';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../Transitions/Slide.css';


class SlideIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [],
            currentSlideIndex: 0
        }

        this.setTimer = this.setTimer.bind(this);
        this.moveSlide = this.moveSlide.bind(this);
    }

    setTimer() {
        //var totalslidetime = this.state.slides.length * 1000;
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
                currentSlideIndex: 0
            })
            this.setTimer()
        })
    }
    componentUnmount() {
        clearInterval(this.state.interval);
    }
    render() {



        //let slideelement = <div id={"slide-"+this.currentSlideIndex} style={style} dangerouslySetInnerHTML={{ __html: slide }} key={this.currentSlideIndex} />
        /*const slideoutput = this.state.slides.map((slide, index) => {
            let slidebody = slide.elements.slide_body_text.value;
            return (
                <div style={style} dangerouslySetInnerHTML={{ __html: slidebody }} key={index} />
            )
        });*/
        let x = this.state.currentSlideIndex;
        let slide = this.state.slides[x];
        let slidebody = this.state.slides.length === 0 ? "<div>NODATA</div>" : slide.elements.slide_body_text.value;
        let slidebackground = this.state.slides.length === 0 ? null : slide.elements.slide_color.value;
        let style = {
            position: 'fixed',
            top: 0,
            zIndex: -1000,
            color : slidebackground,
            width: '100%',
            height: '100%'
        };
        let slideHtml = this.state.slides.length === 0 ? null :  (<div key={'bong' + x}>
                    <div class='slide' id={"slide-" + x} style={style} dangerouslySetInnerHTML={{ __html: slidebody }} key={x} />
                </div>)
        return (
            <ReactCSSTransitionGroup
                transitionName="slideright"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {slideHtml}
            </ReactCSSTransitionGroup>
        );
    }
}
export default SlideIndex