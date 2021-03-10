import React from 'react';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import './Cart.css';

const Cart = ({
  productsInCart,
  onAddToCart,
  onRemoveFromCart,
  onHideCart,
  totalPrice,
  onSelectCurrency,
  selectedCurrency,
  loadingCurrency
}) => {
  const CURRENCY = gql`
    {
      currency
    }
  `;
  const { loading, error, data } = useQuery(CURRENCY);

  if (loading) return <p>Loading currency...</p>;
  if (error) return <p>Error in loading currency...</p>;

  return (
    <div className="right-trial-overlay">
      <div className="cart-header-wrapper">
        <div className="cart-header">
          <div className="flex-container" onClick={onHideCart}>
            <img
              className="close-img"
              src={process.env.PUBLIC_URL + '/right-arrow.png'}
              alt=""
            ></img>
          </div>
          <div className="flex-container section-container">
            <h1>YOUR CART</h1>
          </div>
        </div>
        <div className="flex-container-start">
          <div className="cart-currency-wrapper">
            <select
              className="currencySelect"
              onChange={onSelectCurrency}
              defaultValue={selectedCurrency}
            >
              {data.currency.map((curr) => {
                return (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                );
              })}
            </select>
          </div>
          <span>&nbsp;</span>
          {loadingCurrency ? <div className="loader"></div> : ''}
        </div>
      </div>
      <div id="cart-item-list">
        {productsInCart.length === 0 && (
          <p className="empty-cart">There are no items in your cart</p>
        )}
        {productsInCart?.map(({ product }) => {
          const { image_url, title, price, id, count } = product;
          return (
            <div className="cart-product" key={id}>
              <div className="product-description">
                <h6>{title}</h6>
                <div className="quantity">
                  <div className="quantity-selector">
                    <span
                      className="counter-action"
                      onClick={() => onRemoveFromCart(product)}
                    >
                      -
                    </span>
                    <span className="counter"> {count} </span>
                    <span
                      className="counter-action"
                      onClick={() => onAddToCart(product)}
                    >
                      {' '}
                      +{' '}
                    </span>
                  </div>
                  <div className="price">
                    {!loadingCurrency ? (
                      <FormattedNumber
                        value={count * price}
                        style="currency"
                        currency={selectedCurrency}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              <div className="product-image">
                <img
                  className="product-image"
                  src={image_url}
                  alt={title}
                ></img>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-subtotal">
        <div className="subtotal-price">
          <span>Subtotal</span>
          <div>
            <span className="estimated-price">
              {}
              {!loadingCurrency ? (
                <FormattedNumber
                  value={totalPrice}
                  style="currency"
                  currency={selectedCurrency}
                />
              ) : (
                ''
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
