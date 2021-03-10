import React from 'react';
import './ProductCard.css';
import { FormattedNumber } from 'react-intl';

function Product({
  product,
  onShowCart,
  onAddToCart,
  selectedCurrency,
  loadingCurrency
}) {
  return (
    <div className="single-product">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image_url}
          alt={product.title}
        ></img>
      </div>
      <h3 className="product-title">{product.title}</h3>
      <p className="single-product-price">
        From{' '}
        {!loadingCurrency ? (
          <FormattedNumber
            value={product.price}
            // eslint-disable-next-line react/style-prop-object
            style="currency"
            currency={selectedCurrency}
          />
        ) : (
          ''
        )}
      </p>

      <button
        className="acn-bttn acn-bttn-2"
        onClick={() => {
          onAddToCart(product);
          onShowCart();
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default Product;
