import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';

import ProductCard from '../../components/ProductCard/ProductCard';
import Cart from '../../components/Cart/Cart';

import './productsPage.css';

const Product = () => {
  let [productsInCart, setProductsInCart] = useState([]);
  let [allProducts, setAllProducts] = useState([]);
  let [showCart, setShowCart] = useState(false);
  let [selectedCurrency, setSelectedCurrency] = useState('USD');

  const PRODUCTS = gql`
    query Products($selectedCurrency: Currency!) {
      products {
        id
        title
        image_url
        price(currency: $selectedCurrency)
      }
    }
  `;

  function handleAddToCart(product) {
    if (productsInCart.length === 0) {
      setProductsInCart([{ ...product, count: 1 }]);
    } else {
      if (!productsInCart.find((prod) => prod.id === product.id)) {
        const addedProduct = { ...product, count: 1 };
        setProductsInCart([...productsInCart, addedProduct]);
      } else {
        setProductsInCart(
          productsInCart?.map((prod) => {
            if (prod.id === product.id) {
              const updatedProd = { ...prod, count: ++prod.count };
              return updatedProd;
            } else {
              return prod;
            }
          })
        );
      }
    }
  }

  function handleRemoveFromCart(product) {
    setProductsInCart(
      productsInCart
        .map((prod) => {
          if (prod.id === product.id) {
            const updatedProd = { ...prod, count: --prod.count };
            return updatedProd;
          } else {
            return prod;
          }
        })
        .filter((prod) => {
          return prod.count !== 0;
        })
    );
  }

  function handleShowCart() {
    setShowCart(true);
  }

  function handleHideCart() {
    setShowCart(false);
  }

  function handleQueryComplete({ products }) {
    console.log(products, 'FEYIKEMI\n\n\n\n\n');
    setAllProducts(products);
  }

  const [getProducts, { loading, error, refetch }] = useLazyQuery(PRODUCTS, {
    // variables: { selectedCurrency },
    skip: !selectedCurrency,
    onCompleted: (data) => {
      setAllProducts(data.products);
    }
  });

  useEffect(() => {
    getProducts({
      variables: { selectedCurrency }
    });
  }, []);

  if (loading && !allProducts.length > 0) return 'Loading ...';
  if (error) return `Error! ${error}`;
  console.log(allProducts, '\n\n\n\nallProducts');

  return (
    <>
      <div className={showCart ? 'screen-overlay' : ''}></div>
      <div className="products-page">
        <section className="header-section">
          <div className="products-header">
            <h2>All Products</h2>
            <p>A 360° look at Lumin</p>
          </div>
        </section>
        <section className="products-section">
          {allProducts?.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                onShowCart={handleShowCart}
                onAddToCart={handleAddToCart}
                selectedCurrency={selectedCurrency}
                loadingCurrency={loading}
              />
            );
          })}
        </section>
        {showCart && (
          <Cart
            productsInCart={productsInCart?.map((prod) => {
              prod.price = allProducts.find(
                (product) => product.id === prod.id
              ).price;
              return prod;
            })}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onHideCart={handleHideCart}
            totalPrice={productsInCart
              ?.map((prod) => {
                prod.price = allProducts.find(
                  (product) => product.id === prod.id
                ).price;
                return prod;
              })
              ?.map((prod) => prod.count * prod.price)
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )}
            onSelectCurrency={(event) => {
              setSelectedCurrency(event.target.value);
              refetch();
            }}
            selectedCurrency={selectedCurrency}
            loadingCurrency={loading}
          />
        )}
      </div>
    </>
  );
};

export default Product;
