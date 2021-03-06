import React, {Component} from "react";
const category = [
    {
        name: 'Емкости',
        sub: ['Накопительные', 'Пожарные', 'Топливные', 'Химстойкие', 'Для питьевой воды']
    },
    {
        name: 'Ливневые очистные сооружения',
        sub: ['Комплексные системы очистки', 'Пескоотделители', 'Маслобензоотделители', 'Сорбционные блоки', 'Блоки УФО']
    },
    {
        name: 'Жироотделители'
    },
    {
        name: 'Насосные станции',
        sub: ['Канализационные насосные станции (КНС)', 'Станции пожаротушения', 'Станции повышения давления']
    },
    {
        name: 'Канализация для частного дома',
        sub: ['Септики', 'Станции биологической очистки', 'Биофильтры']
    },
    {
        name: 'Колодцы'
    },
    {
        name: 'Крупные хозбытовые очистные сооружения'
    },
    {
        name: 'Очистные сооружения промышленных стоков'
    },
    {
        name: 'Водоподготовка'
    },
]

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.productSection = React.createRef();
    }

    getRef() {
        return this.productSection;
    }

    render() {
        let firstRow = [];
        let secondRow = [];
        for (let i = 0; i < 4; i++) {
            firstRow.push(
                <div className="col-lg-3 col-sm-12" key={i}>
                    <div className="card mx-4 mb-2 bg-transparent">
                        <img className="card-img-top" alt="Товар" src="http://promo-tek.ru/images/PromoTek/OJ%20goriz.jpg"
                             data-holder-rendered="true" style={{height: '160px', width: '100%', display: 'block'}}/>
                        <div className="card-body p-2">
                            <p className="card-text m-0">Небольшое описание товара.</p>
                            <small className="text-muted">Дополнительная информация.</small>
                        </div>
                    </div>
                </div>
            );
        }
        for (let i = 0; i < 3; i++) {
            secondRow.push(
                <div className="col-lg-4 col-sm-12" key={i}>
                    <div className="card mx-5 px-3 bg-transparent">
                        <img className="card-img-top" alt="Товар" src="http://promo-tek.ru/images/PromoTek/OJ%20goriz.jpg"
                             data-holder-rendered="true" style={{height: '160px', width: '100%', display: 'block'}}/>
                        <div className="card-body p-2">
                            <p className="card-text m-0">Небольшое описание товара.</p>
                            <small className="text-muted">Дополнительная информация.</small>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <section id="products" className="section--products section" ref={this.productSection}>
                <div style={{height: '8rem'}}/>
                <div className="container">
                    <div className="d-flex justify-content-center bd-highlight row">
                        <div className="p-1 bd-highlight logo-menu product-button-wrapper">
                            <button className="btn btn-outline-primary btn-lg product-button white-background">
                                <span className="product-button-text">Комплексные системы очистки</span>
                            </button>
                        </div>
                        <div className="p-1 bd-highlight logo-menu product-button-wrapper">
                            <button className="btn btn-outline-primary btn-lg product-button white-background">
                                <span className="product-button-text">Емкостное оборудование</span>
                            </button>
                        </div>
                        <div className="p-1 bd-highlight logo-menu product-button-wrapper">
                            <button className="btn btn-outline-primary btn-lg product-button white-background">
                                <span className="product-button-text">Очистные сооружения</span>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center bd-highlight row">
                        <div className="p-1 bd-highlight logo-menu product-button-wrapper">
                            <button className="btn btn-outline-primary btn-lg product-button white-background">
                                <span className="product-button-text">Насосные станции</span>
                            </button>
                        </div>
                        <div className="p-1 bd-highlight logo-menu product-button-wrapper">
                            <button className="btn btn-outline-primary btn-lg product-button white-background">
                                <span className="product-button-text">Химстойское оборудование</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-3">
                    <div className="catalog-container white-background m-auto">
                        <div id="carouselExampleSlidesOnly" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="d-flex justify-content-center bd-highlight my-2">
                                        <div className="p-1 bd-highlight">
                                            <span>Какая-то надпись</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {firstRow}
                                    </div>
                                    <div className="row">
                                        {secondRow}
                                    </div>
                                </div>
                                {/*<div className="carousel-item">*/}
                                {/*    <div className="row no-gutters">*/}
                                {/*        <div className="col-4">*/}
                                {/*        </div>*/}
                                {/*        <div className="col-4 product-title">*/}
                                {/*            <h2>Какая-то надпись</h2>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-4">*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="row no-gutters">*/}
                                {/*        {firstRow}*/}
                                {/*    </div>*/}
                                {/*    <div className="row no-gutters">*/}
                                {/*        {secondRow}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleSlidesOnly" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleSlidesOnly" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"/>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
