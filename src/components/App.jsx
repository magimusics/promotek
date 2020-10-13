import React, {Component} from "react";

import './styles/App.css';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var $header_top = $('.header-top');
        var $nav = $('nav');
        $header_top.find('a').on('click', function() {
            $(this).parent().toggleClass('open-menu');
        });

        $('#fullpage').fullpage({
            sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
            sectionSelector: '.vertical-scrolling',
            slideSelector: '.horizontal-scrolling',
            navigation: true,
            slidesNavigation: true,
            controlArrows: false,
            anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
            menu: '#menu',

            afterLoad: function(anchorLink, index) {
                $header_top.css('background', 'rgba(0, 47, 77, .3)');
                $nav.css('background', 'rgba(0, 47, 77, .25)');
                if (index == 5) {
                    $('#fp-nav').hide();
                }
            },

            onLeave: function(index, nextIndex, direction) {
                if(index == 5) {
                    $('#fp-nav').show();
                }
            },

            afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
                if(anchorLink == 'fifthSection' && slideIndex == 1) {
                    $.fn.fullpage.setAllowScrolling(false, 'up');
                    $header_top.css('background', 'transparent');
                    $nav.css('background', 'transparent');
                    $(this).css('background', '#374140');
                    $(this).find('h2').css('color', 'white');
                    $(this).find('h3').css('color', 'white');
                    $(this).find('p').css(
                        {
                            'color': '#DC3522',
                            'opacity': 1,
                            'transform': 'translateY(0)'
                        }
                    );
                }
            },

            onSlideLeave: function( anchorLink, index, slideIndex, direction) {
                if(anchorLink == 'fifthSection' && slideIndex == 1) {
                    $.fn.fullpage.setAllowScrolling(true, 'up');
                    $header_top.css('background', 'rgba(0, 47, 77, .3)');
                    $nav.css('background', 'rgba(0, 47, 77, .25)');
                }
            }
        });
    }

    render() {
        return (
            <div>
                <header>
                    <div className="header-top clearfix">
                        <h1 className="l-left"><a href="#firstSection">Your Logo</a></h1>
                        <a className="l-right toggle-menu" href="#">
                            <i/>
                            <i/>
                            <i/>
                        </a>
                    </div>

                    <nav className="hide">
                        <ul id="menu">
                            <li data-menuanchor="firstSection">
                                <a href="#firstSection" title="First Section">First Section</a>
                            </li>
                            <li data-menuanchor="secondSection">
                                <a href="#secondSection" title="Second Section">Second Section</a>
                            </li>
                            <li data-menuanchor="thirdSection">
                                <a href="#thirdSection" title="Second Section">Third Section</a>
                            </li>
                            <li data-menuanchor="fourthSection">
                                <a href="#fourthSection" title="Fourth Section">Fourth Section</a>
                            </li>
                            <li data-menuanchor="fifthSection">
                                <a href="#fifthSection" title="First Slide">First Slide</a>
                            </li>
                            <li data-menuanchor="fifthSection/1">
                                <a href="#fifthSection/1" title="Second Slide">Second Slide</a>
                            </li>
                        </ul>
                    </nav>
                </header>

                <div id="fullpage">
                    <section className="vertical-scrolling">
                        <h2>fullPage.js</h2>
                        <h3>This is the first section</h3>
                        <div className="scroll-icon">
                            <p>Jump into the last slide</p>
                            <a href="#fifthSection/1" className="icon-up-open-big"/>
                        </div>
                    </section>
                    <section className="vertical-scrolling">
                        <h2>fullPage.js</h2>
                        <h3>This is the second section</h3>
                    </section>
                    <section className="vertical-scrolling">
                        <h2>fullPage.js</h2>
                        <h3>This is the third section</h3>
                    </section>
                    <section className="vertical-scrolling">
                        <h2>fullPage.js</h2>
                        <h3>This is the fourth section</h3>
                    </section>
                    <section className="vertical-scrolling">
                        <div className="horizontal-scrolling">
                            <h2>fullPage.js</h2>
                            <h3>This is the fifth section and it contains the first slide (actually section == first slide)</h3>
                        </div>
                        <div className="horizontal-scrolling">
                            <h2>fullPage.js</h2>
                            <h3>This is the second slide</h3>
                            <p className="end">Thank you!</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default App;