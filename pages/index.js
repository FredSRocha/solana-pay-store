import React, {Fragment, useEffect, useState} from 'react';
import {PublicKey} from '@solana/web3.js';
import {useWallet} from '@solana/wallet-adapter-react';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import Product from "../components/Product";
import CreateProduct from "../components/CreateProduct";

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
    const {publicKey} = useWallet();
    const [products, setProducts] = useState([]);
    const [currency, setCurrency] = useState(null);
    const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        if (publicKey && currency) {
            fetch(`/api/fetchProducts/` + `?currency=`+ currency )
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                    console.log("Products", data);
                });
        }
    }, [publicKey, currency]);

    const renderNotConnectedContainer = () => (
        <div className="button-container">
            <WalletMultiButton className="cta-button connect-wallet-button"/>
        </div>
    );

    const renderItemBuyContainer = () => (
        <div className="products-container">
            {products.map((product) => (
                <Product key={product.id} product={product} coin={currency}/>
            ))}
        </div>
    );
    const setCurrencyValue = (value) => {
        setCurrency(value);
    }

    return (
        <Fragment>
            <div className="App">
                <label htmlFor="myDropdown">Selected Currency  </label>
                <br/>
                <div className="dropdown">
                    <button className="dropbtn">{ currency? currency :"Select Currency To Trade" }</button>
                    <div id="myDropdown" className="dropdown-content">
                        <a onClick={() => setCurrencyValue('Solana')}>Solana</a>
                        <a onClick={() => setCurrencyValue('USDC')}>USDC</a>
                    </div>
                </div>
                <div className="container">
                    <header className="header-container">
                        {!currency && ( 
                        <div>
                            <p className="header"> 😳 Game Store 😈</p>
                            <p className="sub-text">Play the Games 🎮</p>
                        </div>)
                        }
                        {isOwner && currency && (
                            <button className="create-product-button" onClick={() => setCreating(!creating)}>
                                {creating ? "Close" : "Create Product"}
                            </button>
                        )}
                    </header>

                    <main>
                        {creating && <CreateProduct currency={currency} />}
                        {publicKey && currency ? renderItemBuyContainer() : renderNotConnectedContainer()}
                    </main>
                    {/*
                    <div className="footer-container">
                        <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg"/>
                        <a
                            className="footer-text"
                            href={TWITTER_LINK}
                            target="_blank"
                            rel="noreferrer"
                        >{`built on @${TWITTER_HANDLE}`}</a>
                    </div>
                    */}
                </div>
            </div>
        </Fragment>
    );
};

export default App;
