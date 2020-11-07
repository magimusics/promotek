import React, {Component} from "react";
import './styles/App.css';
import Navbar from "./Navbar.jsx";
import Products from "./Products.jsx";

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
                // target.scrollTo({
                //     left: this.clientWidth,
                //     behavior: 'smooth'
                // });
                this.fullPageRef.current.style.transform = `translate(-50%, 0)`;
            } else {
                // target.scrollTo({
                //     left: 0,
                //     behavior: 'smooth'
                // });
                this.fullPageRef.current.style.transform = `translate(0, 0)`;
            }
            setTimeout(() => {
                this.isScrolling = false;
            }, 600)
        }
    }

    render() {
        return (<>
                <Navbar/>
                <main style={{width: '200%', height: '100%', overflow: 'hidden', transition: 'all 700ms ease 0s'}}
                      ref={this.fullPageRef} onWheel={this.onWheel}>
                    <section id="main" className="section--main" style={{width: `50%`, height: '100%', float: 'left'}}>
                        {/*<div className="container-fluid" style={{padding: '150px 220px'}}>*/}
                        {/*    <div className="row">*/}
                        {/*        <div style={{marginTop: '30px'}}>*/}
                        {/*            <h1 className="display-1">*/}
                        {/*                <span style={{textTransform: 'uppercase'}} className="text-light">ЗАВОД радиосшитых емкостей</span>*/}
                        {/*            </h1>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div style={{marginTop: '30px', letterSpacing: 'normal'}} className="row">*/}
                        {/*        <h2>*/}
                        {/*            <span className="middle-text-header text-light">Для хранения и транспортировки различных жидкостей</span>*/}
                        {/*        </h2>*/}
                        {/*    </div>*/}
                        {/*    <div style={{marginTop: '20px'}} className="row">*/}
                        {/*        <ul className="list-text text-light">*/}
                        {/*            <li key={1} className="">Более 230 позиций</li>*/}
                        {/*            <li key={2}>По техническому заданию</li>*/}
                        {/*            <li key={3}>Бесплатный выезд специалиста</li>*/}
                        {/*            <li key={4}>Доставка по Санкт-Петербургу и ЛО</li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="jumbotron card section--main navbar-expand-sm">
                            <div className="py-5">
                                <div className="py-5 text-center align-text-bottom">
                                    <h1 className="display-4 pt-5 mb-3 font-bold text-uppercase"><span className="display-4 text-primary" style={{fontWeight: '400'}}>Завод</span> композитных изделий</h1>
                                    <h2 className="font-weight-light text-uppercase pb-3" style={{letterSpacing: '5px'}}>
                                        <span className="h2 font-weight-bold text-uppercase text-primary" style={{fontWeight: '400'}}>Емкости</span> для очистки, хранения и транспортировки
                                    </h2>
                                    <hr className="my-3 bg-primary w-75"/>
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
                    <Products/>
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