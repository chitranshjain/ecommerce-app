import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  // State variables
  const [authStatus, setAuthStatus] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userImagePreview, setUserImagePreview] = useState("");
  const [cart, setCart] = useState();
  const [cartProducts, setCartProducts] = useState();
  const [wishlist, setWishlist] = useState();
  const [wishlistProducts, setWishlistProducts] = useState();

  //   Other variables
  const auth = getAuth();

  useEffect(() => {
    getAuthStatus();
    getCartItems();
    getWishlist();
  }, []);

  const getAuthStatus = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthStatus(true);
        getUserDetails();
      } else {
        setAuthStatus(false);
      }
    });
  };

  const getUserDetails = () => {
    const loggedInUser = reactLocalStorage.getObject("loggedInUser");
    const userId = loggedInUser.user._id;
    axios({
      method: "get",
      url: `https://ecommerceappcj.herokuapp.com/api/users/${userId}`,
    }).then((response) => {
      const responseData = response.data.user;
      const currentUser = {
        fname: responseData.name.substr(0, responseData.name.indexOf(" ")),
        lname: responseData.name.substr(responseData.name.indexOf(" ") + 1),
        phone: responseData.phone,
        address: responseData.address,
        email: responseData.email,
        city: responseData.city,
        pin: responseData.pin,
        state: responseData.state,
        id: responseData._id,
      };
      setUserImagePreview(
        `https://ecommerceappcj.herokuapp.com/${responseData.image}`
      );
      setUserDetails(currentUser);
    });
  };

  const getCartItems = () => {
    setCartProducts([]);
    setCart([]);
    const list = reactLocalStorage.getObject("userCart");
    const userCart = list.cart;
    setCart(list.cart);
    userCart &&
      userCart.forEach((prod) => {
        axios({
          method: "get",
          url: `https://ecommerceappcj.herokuapp.com/api/products/product/${prod.productId}`,
        }).then((response) => {
          setCartProducts((prev) => {
            return [
              ...prev,
              { product: response.data.product, quantity: prod.quantity },
            ];
          });
        });
      });
  };

  const addToCart = (productId) => {
    if (cart.find((prod) => prod.productId === productId)) {
      return;
    } else {
      setCart((prev) => {
        removeFromWishlist(productId);
        return [...prev, { productId, quantity: 1 }];
      });
    }

    const values = [...cart];
    values.push({ productId, quantity: 1 });
    const list = {
      cart: values,
    };

    toast.success("Added To Cart");

    reactLocalStorage.setObject("userCart", list);
    getCartItems();
  };

  const removeFromCart = (productId) => {
    let list;
    if (cart.find((prod) => prod.productId === productId)) {
      let values = [...cart];
      values = values.filter((prod) => prod.productId !== productId);
      setCart(values);
      list = {
        cart: values,
      };
    } else {
      return;
    }

    reactLocalStorage.setObject("userCart", list);
    toast.success("Removed From Cart");
    getCartItems();
  };

  const increaseQuantity = (productId, index) => {
    const val2 = [...cartProducts];
    if (val2[index].productId.stockQuantity < val2[index].quantity) {
      val2[index].quantity = val2[index].quantity + 1;
      setCartProducts(val2);
    } else {
      toast.error("Maximum stock quantity reached");
      return;
    }

    const val1 = [...cart];
    const index1 = cart.findIndex((prod) => prod.productId === productId);
    val1[index1].quantity = val1[index1].quantity + 1;
    reactLocalStorage.setObject("userCart", {
      cart: val1,
    });
    setCart(val1);
  };

  const decreaseQuantity = (productId, index) => {
    const val1 = [...cart];
    const index1 = cart.findIndex((prod) => prod.productId === productId);
    if (val1[index1].quantity > 1) {
      val1[index1].quantity = val1[index1].quantity - 1;
      reactLocalStorage.setObject("userCart", {
        cart: val1,
      });
      setCart(val1);
    } else {
      toast.error("Quantity cannot be lesser than 1");
      return;
    }

    const val2 = [...cartProducts];
    if (val2[index].quantity > 1) {
      val2[index].quantity = val2[index].quantity - 1;
      setCartProducts(val2);
    }
  };

  const getWishlist = () => {
    setWishlistProducts([]);
    const list = reactLocalStorage.getObject("userWishlist");
    const userWishlist = list.wishlist;
    setWishlist(list.wishlist);
    userWishlist &&
      userWishlist.forEach((productId) => {
        axios({
          method: "get",
          url: `https://ecommerceappcj.herokuapp.com/api/products/product/${productId}`,
        }).then((response) => {
          setWishlistProducts((prev) => {
            return [...prev, response.data.product];
          });
        });
      });
  };

  const addToWishlist = (productId) => {
    console.log(productId);
    setWishlist((prev) => {
      return [...prev, productId];
    });

    const values = [...wishlist];
    values.push(productId);
    const list = {
      wishlist: values,
    };

    reactLocalStorage.setObject("userWishlist", list);
    toast.success("Added To Wishlist");
    getWishlist();
  };

  const removeFromWishlist = (productId) => {
    let values = [...wishlist];
    values = values.filter((prod) => prod !== productId);
    setWishlist(values);
    const list = {
      wishlist: values,
    };

    reactLocalStorage.setObject("userWishlist", list);
    getWishlist();
  };

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        userDetails,
        userImagePreview,
        cart,
        cartProducts,
        wishlist,
        wishlistProducts,
        getAuthStatus,
        getUserDetails,
        getCartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getWishlist,
        removeFromWishlist,
        addToWishlist,
        setUserDetails
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
