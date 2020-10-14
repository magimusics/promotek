import React, {Component} from "react";

import './styles/App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.fullPageRef = React.createRef();
        this.firstSectionRef = React.createRef();
        this.secondSectionRef = React.createRef();
        this.isScrolling = false;
        this.onWheel = this.onWheel.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.clientWidth = window.innerWidth;
    }

    componentDidMount() {
        // this.fullpageRef.current.scrollLeft = 220;
    }

    onScroll(event) {

    }

    onWheel(event) {
        if (!this.isScrolling) {
            event.currentTarget.scrollLeft += event.deltaY;
            let target = event.currentTarget;
            this.isScrolling = true;
            if (event.deltaY > 0) {
                target.scrollTo({
                    left: this.clientWidth,
                    behavior: 'smooth'
                });
            } else {
                target.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }
            setTimeout(() => {
                this.isScrolling = false;
            }, 600)
        }
    }

    render() {
        return (
            <div style={{overflow: 'scroll', height: '100%'}} ref={this.fullPageRef} onScroll={this.onScroll}
                 onWheel={this.onWheel}>

                <div id="fullpage" style={{width: this.clientWidth * 2 + 'px', display: 'inline-block', height: '100%'}}>
                    <section className="vertical-scrolling"
                             style={{width: `${this.clientWidth}px`, display: 'inline-block', background: 'wheat', height: '100%'}}
                             ref={this.firstSectionRef}
                    >
                        <h2>fullPage.js</h2>
                        <h3>This is the first section</h3>
                        <div className="scroll-icon">
                            <p>Jump into the last slide</p>
                            <a href="#fifthSection/1" className="icon-up-open-big"/>
                        </div>
                    </section>
                    <section className="vertical-scrolling"
                             style={{width: `${this.clientWidth}px`, display: 'inline-block', background: 'green', height: '100%'}}
                             ref={this.secondSectionRef}
                    >
                        <h2>fullPage.js</h2>
                        <h3>This is the second section</h3>
                    </section>
                </div>
            </div>
        );
    }
}

export default App;