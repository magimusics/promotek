import React, {Component, Suspense, lazy} from 'react';
import Preloader from './Preloader.jsx';
import './styles/App.css';

const MainArea = lazy(() => import('./App.jsx'));

export default class Cover extends Component {
    render() {
        return (<div>
                <Preloader/>
                <Suspense fallback={<div>Loading...</div>}>
                    <MainArea/>
                </Suspense>
            </div>
        );
    }
}