import React, {Component} from "react";
import './styles/App.scss';
import Navbar from "./Navbar.jsx";
import Products from "./Products.jsx";
import MainPage from "./MainPage.jsx";
import Contacts from "./Contacts.jsx";

class App extends Component {

    constructor(props) {
        super(props);
        this.fullPageRef = React.createRef();
        this.firstSectionRef = React.createRef();
        this.secondSectionRef = React.createRef();
        this.thirdSectionRef = React.createRef();
        this.isScrolling = false;
        this.onWheel = this.onWheel.bind(this);
        this.clientWidth = window.innerWidth;
        this.currentSection = 0;
        this.sections = [];
    }

    componentDidMount() {
        this.sections.push(this.firstSectionRef);
        this.sections.push(this.secondSectionRef);
        this.sections.push(this.thirdSectionRef);
        this.sections.push(this.thirdSectionRef);
        this.sections.push(this.thirdSectionRef);
        this.sections.push(this.thirdSectionRef);
    }

    onWheel(event) {
        if (!this.isScrolling) {
            event.currentTarget.scrollLeft += event.deltaY;
            this.isScrolling = true;
            if (event.deltaY > 0) {
                this.sections[this.currentSection].current.classList.remove("active-section");
                if (this.currentSection >= this.sections.length - 1) {
                    this.currentSection = 0
                }
                else {
                    this.currentSection++;
                }
                this.sections[this.currentSection].current.classList.add("active-section");
            } else {
                this.sections[this.currentSection].current.classList.remove("active-section");
                if (this.currentSection <= 0) {
                    this.currentSection = this.sections.length - 1;
                }
                else {
                    this.currentSection--;
                }
                this.sections[this.currentSection].current.classList.add("active-section");
            }

            setTimeout(() => {
                this.isScrolling = false;
            }, 1600)
        }
    }

    switchSection (number) {
        if (this.sections) {
            this.sections[this.currentSection].current.getRef().current.classList.remove("active-section");
            this.currentSection = number;
            this.sections[this.currentSection].current.getRef().current.classList.add("active-section");
            if (this.sections[this.currentSection].current.update) {
                this.sections[this.currentSection].current.update();
            }
        }
    }

    render() {
        return (<>
                <Navbar switchSection={this.switchSection.bind(this)}/>
                <main style={{width: '100%', height: '100%'}} className="wrapper" ref={this.fullPageRef}>
                    <MainPage ref={this.firstSectionRef}/>
                    <Products ref={this.secondSectionRef}/>
                    <Contacts ref={this.thirdSectionRef}/>
                </main>
                <footer className="footer fixed-bottom">
                    <div className="text-center">
                        <p className="text-light m-0">
                            <small>- Производственная компания ООО "ПромоТек" -</small>
                        </p>
                        <p className="text-light mb-0">
                            <small>- 2008 - 2021 -</small>
                        </p>
                    </div>
                </footer>
            </>
        )
    }
}

export default App;
