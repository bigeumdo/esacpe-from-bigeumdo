import { Fragment } from 'react';
import { formatHMS, hrs, realTimeToTarkovTime, timeUntilRelative } from '../utils';

function TarkovCurrentTime({ tarkovTime }) {
    return <Fragment>{formatHMS(tarkovTime)}</Fragment>
}

function TarkovCurrentTimeElement({ tarkovTime, left }) {

    return <><TarkovCurrentTime tarkovTime={tarkovTime} /></>
}


const TarkovTime = ({ side, time }) => {
    const isLeft = side === 'left';

    const tTime = realTimeToTarkovTime(time, isLeft);
    const tHour = tTime.getUTCHours();

    const futureHours = [];

    for (let i = tHour; i < tHour + 13; i++) {
        const hour = i % 24;
        let future = timeUntilRelative(hrs(hour), isLeft, time);
        if (i === tHour) future = 0;
        futureHours.push({
            hour,
            future
        });
    }

    return <div style={{

        width:'150px'
    }}>
        <TarkovCurrentTimeElement tarkovTime={tTime} left={isLeft} />
    </div>
};

export default TarkovTime;