import React, { useEffect } from "react";
import Header from "./components/Layout/Header/Header";
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Footer from "./components/Layout/Footer/Footer";
import CategoryPage from "./pages/CategoryPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAccountPage from "./pages/MyAccountPage";
import { useSelector } from "react-redux";
import MyOrdersPage from "./pages/MyOrdersPage";

function PrivateRoute({ children, ...rest }) {
  const isLogin = useSelector(state => state.auth.isLogin)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {

  useEffect(() => {
    // const item = {
    //   key1: 'HTML',
    //   key2: 'CSS',
    //   key3: 'JS'
    // }
    // const objToArr = (itemObj) => {

    //   return Object.keys(itemObj).reduce((itemArr, key) => {
    //     // itemArr.push({ id: key, value: itemObj[key] });
    //     return [...itemArr, { id: key, value: itemObj[key] }];
    //   }, [])
    // }
    // objToArr(item);
    // console.log(objToArr(item));
    // const list = [{ id: "key1", value: "HTML" }, { id: "key2", value: "CSS" }, { id: "key3", value: "JS" }]
    // const arrToObject = (arr) => {
    //   return arr.reduce((obj, item) => {
    //     obj[item.id] = item.value;
    //     return obj;
    //   }, {})
    // }
    // console.log(arrToObject(list))

  }, [])
  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      <main className="lg:pt-32">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/sign-in' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/product/:id' component={ProductDetailPage} />
          <Route path='/cart' component={CartPage} />
          <PrivateRoute path="/checkout">
            <CheckoutPage />
          </PrivateRoute>
          <Route path='/category' component={CategoryPage} />
          <PrivateRoute path="/my-account">
            <MyAccountPage />
          </PrivateRoute>
          <PrivateRoute path="/my-orders">
            <MyOrdersPage />
          </PrivateRoute>
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
