import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";
import Home from "./Core/Home";
import CategoryPage from "./Core/CategoryPage";
import ProductPage from "./Core/ProductPage";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./Core/User Pages/Registration";
import Dashboard from "./Core/User Pages/Dashboard";
import Checkout from "./Core/Checkout/Checkout";
import BuyNow from "./Core/Checkout/BuyNow";
import Orders from "./Core/User Pages/Orders";
import SearchPage from "./Core/SearchPage";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/search/:query" exact component={SearchPage} />
            <Route path="/checkout/:productId" exact component={BuyNow} />
            <Route path="/:categoryId" exact component={CategoryPage} />
            <Route path="/product/:productId" exact component={ProductPage} />
            <Route path="/user/:userId" exact component={Dashboard} />
            <Route
              path="/user/register/:firebaseId"
              exact
              component={Registration}
            />
          </Switch>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
