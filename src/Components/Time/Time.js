import { useState, useEffect } from 'react';
import classes from '../../Ui/Global.module.css';

const Time = () => {

    const [time, setTime] = useState(new Date().toLocaleString());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(new Date().toLocaleString());
        }, 1000);
        return () => clearTimeout(timer);
    }, [time]);

    return (
        <h2 className={classes['time-content']}> {time} </h2>
    )

}

export default Time;