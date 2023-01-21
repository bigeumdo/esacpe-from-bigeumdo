import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const rubFormmat = (price) => {
    if(typeof price === 'number') {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else {
        return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}


const Card = ({item}) => {
    const [trader, setTrader] = useState();
    const [iconUrl, setIconUrl] = useState("");
    const [price_per_flea, setPricePerF] = useState(0);
    const [price_per_trader, setPricePerT] = useState(0);
    const num_of_slot = (item.width * item.height)

    useEffect(() => {
        item.sellFor.sort((a, b) => {
            if(a.priceRUB < b.priceRUB) return 1;
            if(a.priceRUB === b.priceRUB) return 0;
            if(a.priceRUB > b.priceRUB) return -1;
        })
        setTrader(item.sellFor[0] && item.sellFor[0].source === "fleaMarket" ? item.sellFor[1] : item.sellFor[0]);
        
        
        setPricePerF((item.lastLowPrice/num_of_slot).toFixed());
    }, [item])

    useEffect(() => {
        if(trader) {
            setIconUrl(`https://tarkov.dev/images/traders/${trader.source}-icon.jpg`)
            setPricePerT((trader.priceRUB/num_of_slot).toFixed(0));
        }
    }, [trader])


    return (
        <div className={styles.cell}>
            <div className={styles.cell_card}>
                <div>
                    <img loading='lazy' title={item.name} src={item.iconLink} className={styles.cell_img} placeholder='blur' />
                    <div className={styles.cell_shortname}>
                        <span>{item.shortName}</span>
                    </div>
                </div>
                <div className={styles.cell_info}>
                    <div title={item.name} className={styles.cell_title}>
                        <div className={styles.cell_name}>
                            {item.name}
                        </div>
                    </div>
                    <div className={styles.cell_price}>
                        {iconUrl ? 
                            <>
                                <div className={styles.cell_trader_wrap}>
                                    <div className={styles.cell_block}><img src={iconUrl} className={styles.cell_trader}/> </div>
                                    <div className={styles.cell_block}>{rubFormmat(trader.priceRUB)}₽{num_of_slot > 1 && ` (${rubFormmat(price_per_trader)}₽)`}</div>
                                </div>
                                <div className={styles.cell_flea_wrap}>
                                    <div className={styles.cell_block}><img src={process.env.PUBLIC_URL + '/fleabx.png'} className={styles.cell_trader}/> </div>
                                    {item.lastLowPrice != null ? 
                                        <div className={styles.cell_block}>{rubFormmat(item.lastLowPrice)}₽{num_of_slot > 1 && ` (${rubFormmat(price_per_flea)}₽)`}</div> :
                                        <div className={`${styles.cell_trader_wrap} ${styles.warn}`}>거래 불가</div>
                                    }
                                </div>
                            </> : <div className={`${styles.cell_trader_wrap} ${styles.warn}`}>거래 불가</div>}
                    </div>
                </div>
            </div>
        </div>
)};

export default Card;