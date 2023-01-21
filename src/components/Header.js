import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css'
import { useInterval } from '../utils';
import TarkovTime from './TarkovTime';

const Header = () => {
    const [time, setTime] = useState(new Date());
    const delay = 50;

    useInterval(() => {
        setTime(new Date());
    }, delay)

    return (
        <div className={styles.header}>
            <Link to='/'>
                <div className={styles.logo}>
                    <img 
                        src={process.env.PUBLIC_URL + '/logo.png'}
                        alt="Esacpe From Bigeumdo"
                        placeholder='blur'
                        height={80}
                    />
                </div>
            </Link>
            <div className={styles.time_wrapper}>
                <div style={{position:"absolute", bottom:0}}>
                    <div>Raid Time</div>
                    {time && 
                        <div className={styles.time}>
                            <TarkovTime side="left" time={time} />
                            <TarkovTime side="right" time={time} />
                        </div>
                    }
                </div>

            </div>

            
        </div>
    );
};

export default Header;