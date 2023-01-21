import { request, gql } from 'graphql-request'
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react';
import Card from "./Card"
import { useWindowDimensions, classNameGenerator } from '../utils';
import { RotatingLines } from 'react-loader-spinner';
//import testdata from '../testdata/data.json'

const Market = () => {
    const [lang, setLang] = useState("en");
    const [name, setName] = useState("");
    const [data, setData] = useState();
    const itemsRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const limit = 20;

    const search = async () => {
        setIsLoading(true);
        const q = gql`
        {
            items(lang: ${lang}, names: "${name}") {
                id
                name
                shortName
                normalizedName
                width
                height
                lastLowPrice
                iconLink
                sellFor {
                    source
                    vendor {
                        name
                        normalizedName
                    }
                    price
                    currency
                    priceRUB
                }
            }
        }`

        try{
            const req = await request('https://api.tarkov.dev/graphql', q);
            setData(req.items);
        }
        catch(e)
        {
            console.log(e);
        }
        finally{
            setIsLoading(false);
        }
    };

    async function getInitData() {
        setIsLoading(true);
        const offset = Math.floor(Math.random() * (2950 - 0 + 1));
        const qInit = gql`
        {
            items(lang: ${lang}, offset: ${offset}, limit: ${limit}) {
                id
                name
                shortName
                normalizedName
                width
                height
                lastLowPrice
                iconLink
                sellFor {
                    source
                    vendor {
                        name
                        normalizedName
                    }
                    price
                    currency
                    priceRUB
                }
            }
        }
        `
        try{
            const req = await request('https://api.tarkov.dev/graphql', qInit);
            setData(req.items);
        }
        catch(e)
        {
            console.log(e);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        itemsRef.current = [];
        getInitData();
    },[]);

    useEffect(() => {
        if(name === "") {
            getInitData();
            return;
        }
        const id = setTimeout(() => search(), 1000);
        return () => clearTimeout(id);
    }, [name, lang])


    const onChange = (e) => {
        setName(e.target.value);
    };

    const onClickLangButton = () => {
        if(lang === "en"){
            setLang("ko");
        }
        else {
            setLang("en");
        }
    }

    const {height} = useWindowDimensions();

    return (
        <div className={styles.market} style={{maxHeight:height - 100}}>
            <div className={styles.menu_header}>
                <div style={{display:"block", marginRight:"10px", flexDirection:"column"}}>
                    <h1>플리마켓</h1>
                    <div className={styles.comment}>
                        powered by&nbsp;
                        <a href='https://tarkov.dev/'>tarkov.dev</a>
                    </div>
                </div>
                <div className={styles.market_button_wrapper}>
                    <div className={classNameGenerator(styles.market_trans_lang) + " " +(isLoading ? classNameGenerator(styles.market_trans_lang_disabled) : '')} onClick={onClickLangButton}>
                        {lang === "en" ? "En" : "한"}
                    </div>
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <RotatingLines
                        strokeColor="gray"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="40"
                        visible={isLoading} />
                </div>
            </div>
            <div className={styles.search}>
                <input className={styles.search_input} placeholder='검색' type="text" onChange={onChange} value={name}>
                </input>
            </div>
            <div className={styles.market_list} style={{height:height - 270}}>
                {data &&
                    data.map((item) => {
                        return (<div key={item.id} ref={(e, i) => itemsRef.current[i] = e}><Card item={item} /></div>)
                    })
                }
                {/* {items.current &&
                    items.current
                } */}
            </div>
        </div>
)};

export default Market;