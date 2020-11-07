import React, {useState, useEffect, useRef} from 'react';
import Preloader from './Preloader.jsx';
import App from './App.jsx';
import './styles/App.css';

export default function mainArea() {

    const [app, setApp] = useState(null);
    const myRef = useRef(null);

    useEffect(() => {
        fetchApplication()
            .then(a => setApp(a));
    }, []);

    if (app === null) {
        return (
            <>
                <Preloader ref={myRef}/>
            </>
        )
    } else {
        myRef.current.show();
        return (
            <>
                {/*<Preloader/>*/}
                {app.app}
            </>
        );
    }
}

function fetchApplication() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("fetched user");
            resolve({
                app: <App/>
            });
        }, 500);
    })
}