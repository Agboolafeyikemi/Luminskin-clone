import React from 'react';
import './ProductCard.css';
import { FormattedNumber } from 'react-intl';

const ProductCard = ({
  product,
  onShowCart,
  onAddToCart,
  selectedCurrency,
  loadingCurrency
}) => {
  const { image_url, title, price } = product;
  return (
    <div className="single-product">
      <div className="product-image-container">
        <img className="product-image" src={image_url} alt={title}></img>
      </div>
      <h3 className="product-title">{title}</h3>
      <p className="single-product-price">
        From{' '}
        {!loadingCurrency ? (
          <FormattedNumber
            value={price}
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
};

export default ProductCard;
