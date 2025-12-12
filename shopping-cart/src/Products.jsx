import { useEffect, useState } from "react";
import Product from "./Product";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

    console.log(products)

    return (
        <div className="products-container">
            {products.map(product => <Product src={product.image} title={product.title} price={product.price} rating={product.rating.rate} ratingCount={product.rating.count}/>)}
        </div>
    )

}
