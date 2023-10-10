import React, {useState} from "react";
import styles from "../styles/Product.module.css";
import Buy from "./buy";


export default function Product({ product, coin }) {
    const { id, name, price, description, image_url } = product;

    return (
        <div className={styles.product_container}>
            <div >
                <img className={styles.product_image} src={image_url} alt={name} />
            </div>

            <div className={styles.product_details}>
                <div className={styles.product_text}>
                    <div className={styles.product_title}>{name}</div>
                    <div className={styles.product_description}>{description}</div>
                </div>

                <div className={styles.product_action}>
                    <div className={styles.product_price}>{price} {coin}</div>
                    {/* Replace the IPFS component with the Buy component! */}
                    <Buy itemID={id} coin={coin} />
                </div>
            </div>
        </div>
    );
}