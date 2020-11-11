import React, {Component} from "react";
import './styles/App.css';
import Navbar from "./Navbar.jsx";
import Products from "./Products.jsx";
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
    }

    onWheel(event) {
        if (!this.isScrolling) {
            let sections = [];
            sections.push(this.firstSectionRef);
            sections.push(this.secondSectionRef.current.getRef());
            sections.push(this.thirdSectionRef.current.getRef());
            event.currentTarget.scrollLeft += event.deltaY;
            let target = event.currentTarget;
            this.isScrolling = true;
            if (event.deltaY > 0) {
                sections[this.currentSection].current.classList.remove("active-section");
                if (this.currentSection >= sections.length - 1) {
                    this.currentSection = 0
                }
                else {
                    this.currentSection++;
                }
                sections[this.currentSection].current.classList.add("active-section");
            } else {
                sections[this.currentSection].current.classList.remove("active-section");
                if (this.currentSection <= 0) {
                    this.currentSection = sections.length - 1;
                }
                else {
                    this.currentSection--;
                }
                sections[this.currentSection].current.classList.add("active-section");
            }

            setTimeout(() => {
                this.isScrolling = false;
            }, 1600)
        }
    }

    render() {
        return (<>
                <Navbar/>
                <main style={{width: '100%', height: '100%'}} className="wrapper" ref={this.fullPageRef} onWheel={this.onWheel}>
                    <section id="main" className="section--main section active-section" ref={this.firstSectionRef}>
                        <div className="jumbotron card section--main navbar-expand-sm">
                            <div className="py-5">
                                <div className="py-5 text-center align-text-bottom">
                                    <h1 className="display-4 pt-5 mb-3 font-bold text-uppercase">Завод композитных изделий</h1>
                                    <hr className="my-4 bg-primary main-line" style={{width: '65%'}}/>
                                    <h2 className="font-weight-light text-uppercase pb-3" style={{letterSpacing: '5px'}}>
                                        Емкости для очистки, хранения и транспортировки
                                    </h2>
                                    <p className="font-weight-light pt-3 d-inline-block text-uppercase" style={{letterSpacing: '5px'}}>Проектирование</p> <span className="point-blue"/>&nbsp;&nbsp;
                                    <p className="font-weight-light d-inline-block text-uppercase" style={{letterSpacing: '5px'}}>Шеф-монтаж</p> <span className="point-blue"/>&nbsp;&nbsp;
                                    <p className="font-weight-light d-inline-block text-uppercase" style={{letterSpacing: '5px'}}>Пусконаладка</p> <span className="point-blue"/>&nbsp;&nbsp;
                                    <p className="font-weight-light d-inline-block text-uppercase" style={{letterSpacing: '5px'}}>Более 230 позиций</p>
                                    <p className="font-weight-light text-uppercase" style={{letterSpacing: '5px'}}>Индивидуально - по техническому заданию</p>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-outline-primary btn-lg call-button">Обратный звонок</button>
                                </div>
                            </div>
                        </div>
                    </section>
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