import React, {Component} from "react";

export default class Contacts extends Component {

    constructor(props) {
        super(props);
        this.contactsSection = React.createRef();
        this.map = React.createRef();
        this.address = React.createRef();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.update);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.update);
    }

    update() {
        this.map.current.innerHTML = '';
        let script = document.createElement('script');
        let width = this.address.current.offsetWidth;
        let height = this.address.current.getBoundingClientRect().bottom - 20;
        script.type = 'text/javascript';
        script.src = `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Afef1b43375ff4ad3f4e9dedd3761038df9e0a84d4285fc2073ce8b0f1009067a&amp;width=${width}&amp;height=${height}&amp;lang=ru_RU&amp;scroll=true`
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
                <div className="container-fluid" style={{paddingTop: '12rem'}}>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <div>
                                <div className="card text-center text-white bg-dark mb-3">
                                    <div className="card-header">Головной офис</div>
                                    <div className="card-body p-2">
                                        <h5 className="card-title">Санкт-Петербург</h5>
                                        <div className="card-text">info@promo-tek.ru</div>
                                        <div className="card-text">+7 (812) 640-40-22</div>
                                        <div className="card-text">г.Санкт-Петербург, проспект 9-го Января, д.3, корп. 1</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card text-center text-white bg-dark mb-3">
                                    <div className="card-header">Филиал</div>
                                    <div className="card-body 2">
                                        <h5 className="card-title">Москва</h5>
                                        <div className="card-text">msk@promo-tek.ru</div>
                                        <div className="card-text">+7 (499) 703-40-03</div>
                                        <div className="card-text">Московская область, г.Подольск, ул. Плещеевская, д.1</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card text-center text-white bg-dark mb-3">
                                    <div className="card-header">Логистический центр</div>
                                    <div className="card-body p-2">
                                        <h5 className="card-title">Самара</h5>
                                        <div className="card-text">info@promo-tek.ru</div>
                                        <div className="card-text">+7 (846) 206-01-90</div>
                                        <div className="card-text">г.Самара, ул. Демократическая, 45А</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="card text-center bg-transparent border-primary mb-3" ref={this.address}>
                                <div className="card-body">
                                    <h5 className="card-title">ООО "ПромоТек"</h5>
                                    <h5 className="card-title">192289, Санкт-Петербург, пр. 9-го Января, д.3, корп. 1, офис 301</h5>
                                    <div className="card-text">РС: 40702810168050000083 в  ОАО «Банк ВТБ Северо-Запад», г. Санкт-Петербург</div>
                                    <div className="card-text">ОГРН/ИНН/КПП: 1097847140368/7810554419/781001001</div>
                                    <div className="card-text">ОКПО/ОКАТО/БИК: 61011733/40284561000/044030791</div>
                                </div>
                            </div>
                            <div ref={this.map}/>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-primary btn-lg call-button">Обратный звонок</button>
                    </div>
                </div>
            </section>
        )
    }
}
