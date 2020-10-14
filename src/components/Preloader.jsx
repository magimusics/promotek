import React, {Component} from 'react';
import './styles/App.css';

export default class Preloader extends Component {

    constructor(props) {
        super(props);
        this.viewRef = React.createRef();
    }

    render() {
        return (
            <div ref={this.viewRef} className="preloader">
                <div id="container"/>
            </div>
        );
    }

    componentWillUnmount() {
        this.viewRef.current.style.opacity = 0;
    }
}