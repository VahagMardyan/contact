import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

    // // Time.js

    // const [show, setShow] = useState(null);

    // const timeRef = useRef();

    // useEffect(() => {
    //     const showTimeMessage = window.confirm('Dou you want to show the date & time ?');

    //     if (showTimeMessage) {
    //         setShow(true);
    //     }
    //     setTime(new Date().toLocaleString());
    // }, []);

    // useEffect(() => {
    //     if (show) {
    //         timeRef.current = setTimeout(() => {
    //             setTime(new Date().toLocaleString())
    //         }, 1000);
    //     } else {
    //         clearTimeout(timeRef.current);
    //     }
    // }, [show, time]);

    // // Display.js

    // const foundedUsers = item => {
    //     return item.name.toLowerCase().includes(searchUserName.toLowerCase());
    // }

    // const getFoundedUsers = () => {
    //     return users.filter(foundedUsers);
    // }
