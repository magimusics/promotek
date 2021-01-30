import React, {Component} from "react";

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.sectionRef = React.createRef();
    }

    getRef() {
        return this.sectionRef;
    }

    render() {
        return (
            <section id="main" className="section--main section active-section" ref={this.sectionRef}>
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
        )
    }
}
