import React, {Component} from "react";

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.buttonList = ['Главная', 'Продукция', 'Галерея', 'Отзывы', 'Дилерам', 'Контакты']
        this.buttons = this.buttonList.map((b, index) => {
            return (
                <li className="nav-item active px-2" key={index}>
                    <button className="btn btn-outline-primary">{b}</button>
                </li>
            )
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark static-top" style={{position: 'fixed', width: '100%', zIndex: '2'}}>
                <div className="container-fluid m-container-header">
                    <a className="navbar-brand" href="#">
                        <h1 className="d-inline-block h-100 text-primary">ПРОМО</h1>
                        <h1 className="d-inline-block">ТЕК</h1>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse flex-column ml-lg-0 ml-3" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto py-3">
                            {this.buttons}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <h1 style={{letterSpacing: '5px'}}>
                                    +7 <strong className="h1 text-primary font-weight-bold">(812)</strong> 309-00-40
                                </h1>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}