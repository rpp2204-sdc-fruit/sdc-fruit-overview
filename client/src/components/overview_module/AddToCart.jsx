import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddToCart({ style, current }) {
  const [styleAvail, setStyleAvail] = useState({});
  const [outOfStock, setOutOfStock] = useState(true);
  const [sizeSelected, setSizeSelected] = useState('');
  const [quantities, setQuantities] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [sku, setSku] = useState('');

  const availability = async (skus) => {
    const resultObj = {};
    let skusArray;
    if (skus) {
      skusArray = Object.entries(skus);
      if (skusArray.length > 0) {
        skusArray.forEach((size) => {
          const sizesArray = Object.entries(size[1]);
          resultObj[sizesArray[1][1]] = sizesArray[0][1];
        });
      }
    }

    setStyleAvail(resultObj);
    if (Object.keys(resultObj).length === 0) {
      setOutOfStock(true);
    } else {
      setOutOfStock(false);
    }
  };

  const addToCart = (qty) => {
    axios
      .post(`/cart/${sku}/${qty}`)
      .then(() => {
        console.log(
          `${qty} units of ${style.name} in size ${sizeSelected} added to the cart`
        );
      })
      .catch((err) => console.log(err));
  };

  const openDropdown = (e) => {
    e.preventDefault();
    const drop = document.getElementById('size-dropdown');
    const add = document.getElementById('addto-cart');
    add.addEventListener('mousedown', () => {
      const evt = event;
      setTimeout(() => {
        drop.dispatchEvent(evt);
      });
    });
  };

  const handleSizeChange = (e) => {
    setSizeSelected(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantitySelected(e.target.value);
  };

  useEffect(() => {
    availability(style.skus);
  }, [style]);

  useEffect(() => {
    let qtys = [];
    const qty = styleAvail[sizeSelected];
    for (let i = 1; i < qty; i++) {
      qtys.push(i + 1);
    }
    if (qtys.length > 14) {
      qtys = qtys.slice(0, 14);
    }
    setQuantities(qtys);
  }, [sizeSelected]);

  useEffect(() => {
    const styleSkus = style.skus;

    for (const s in styleSkus) {
      if (styleSkus[s].size === sizeSelected) {
        setSku(styleSkus[s]);
      }
    }
  }, [sizeSelected]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!outOfStock && sizeSelected !== '' && quantitySelected !== 0) {
      addToCart(sku, sizeSelected, quantitySelected);
    } else if (!outOfStock && sizeSelected === '') {
      console.log('Open the size selector');
      openDropdown(e);
    }
  };

  if (outOfStock === false && Object.keys(styleAvail).length) {
    return (
      <div className="add-to-cart">
        <select
          className="size-dropdown"
          id="size-dropdown"
          defaultValue="Select Size"
          onChange={(e) => {
            handleSizeChange(e);
          }}
        >
          <option value="Select Size" disabled hidden>
            Select Size
          </option>
          {Object.keys(styleAvail).map((size, index) => {
            if (styleAvail[size] !== 0) {
              return (
                <option value={size} key={index}>
                  {size}
                </option>
              );
            }
          })}
        </select>

        {!sizeSelected ? (
          <select disabled>
            <option> - </option>
          </select>
        ) : (
          <select
            onChange={(e) => {
              handleQuantityChange(e);
            }}
          >
            <option selected> 1 </option>
            {quantities.map((num, index) => (
              <option value={num} key={index}>
                {num}
              </option>
            ))}
          </select>
        )}

        {!outOfStock ? (
          <button
            id="addto-cart"
            onClick={(e) => {
              handleAddToCart(e);
            }}
          >
            Add to Cart
          </button>
        ) : null}
      </div>
    );
  }
  if (outOfStock === true) {
    return (
      <select>
        <option disabled>OUT OF STOCK</option>
      </select>
    );
  }
}

export default AddToCart;
