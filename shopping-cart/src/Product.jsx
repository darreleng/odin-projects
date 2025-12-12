export default function Product( { src, title, price, rating, ratingCount }) {

    return (
        <div className='product'>
            <div className="product-image-container">
                <img src={src} className='product-image'/>
            </div>
            <div className="product-body">
                <div className="product-details">
                    <p className='product-title'>{title}</p>
                    <div className="product-meta">
                        <p className='product-price'>${price}</p>
                        <p className='product-rating'>{rating}</p>
                        <p className='product-rating-count'>({ratingCount})</p>
                    </div>
                </div>
                <div className="product-controls">
                    <input type="number" className='product-input' value='1' />
                    <div className="product-quantity-buttons">
                        <button className="product-increment">+</button>
                        <button className="product-decrement">-</button>
                    </div>
                    <button className="product-add-to-cart">Add to cart</button>
                </div>
            </div>
        </div>
    )

}