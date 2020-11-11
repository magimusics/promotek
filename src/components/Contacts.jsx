import React, {Component} from "react";

export default class Contacts extends Component {

    constructor(props) {
        super(props);
        this.contactsSection = React.createRef();
        this.map = React.createRef();
    }

    componentDidMount() {
        // this.map.current.addsc
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Afef1b43375ff4ad3f4e9dedd3761038df9e0a84d4285fc2073ce8b0f1009067a&amp;width=656&amp;height=369&amp;lang=ru_RU&amp;scroll=true'
        try {
            this.map.current.appendChild(script);
        } catch (e) {
            console.error('Error loading map');
        }
    }

    getRef() {
        return this.contactsSection;
    }
    render() {
        return (
            <section className="section section--contacts" id="contact" ref={this.contactsSection}>
                <div className="container" style={{paddingTop: '12rem'}}>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-4 p-0">
                                    <div className="card border-primary mb-3">
                                        <div className="card-header">Головной офис</div>
                                        <div className="card-body text-primary">
                                            <h5 className="card-title">Санкт-Петербург</h5>
                                            <p className="card-text">+7 (812) 640-40-22</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card text-white bg-dark mb-3">
                                        <div className="card-header">Филиал</div>
                                        <div className="card-body">
                                            <h5 className="card-title">Москва</h5>
                                            <p className="card-text">+7 (499) 703-40-03</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card text-white bg-dark mb-3">
                                        <div className="card-header">Логистический центр</div>
                                        <div className="card-body">
                                            <h5 className="card-title">Самара</h5>
                                            <p className="card-text">+7 (846) 206-01-90</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6" ref={this.map}>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}