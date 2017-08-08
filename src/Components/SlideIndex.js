import React, { Component } from 'react';
import Client from '../Client';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../Transitions/Slide.css';
import HTMLParser from 'html-react-parser';



class SlideIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [],
            currentSlideIndex: 0,
            defaultTransition: 'slideright'
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
    generateSlide() {
        let x = this.state.currentSlideIndex;
        let slide = this.state.slides[x];
        let slidebody = this.state.slides.length === 0 ? "<div>NODATA</div>" : slide.elements.slide_body_text.value;
        let slidebackground = this.state.slides.length === 0 ? 'white' : slide.elements.slide_color.value;
        let slidetransition = this.state.slides.length === 0 ? this.state.defaultTransition : slide.elements.transition.value[0].name;
        let style = {
            position: 'absolute',
            display: 'flex',
            flex: "100% 1 1",
            'flexDirection': 'column',
            zIndex: 'auto',
            fontsize: "200%",
            color: 'black',
            fontSize: '3vmax',
            maxWidth: '90%',
            maxHeight: '90%',
            margin: 'auto',
            'alignContent': 'center'
        };
        let backgroundstyle = {
            position: 'fixed',
            display: 'flex',
            top: 0,
            zIndex: 'auto',
            //justifyContent: 'center',
            //alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: slidebackground
        }
        let slideJSX = this.state.slides.length === 0 ? null : (
            <div className='slideBackground' style={backgroundstyle} key={'back' + x}>
                <div className='slide' id={"slide-" + x} style={style} key={x} >
                    {HTMLParser(slidebody)}
                </div>
            </div>
        )
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionName={slidetransition}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                {slideJSX}
            </ReactCSSTransitionGroup>
        )
    }
    render() {
        return (
            this.generateSlide()
        );
    }
}
export default SlideIndex