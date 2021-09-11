import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";
import Home from "./Core/Home";
import CategoryPage from "./Core/CategoryPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:categoryId" exact component={CategoryPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
