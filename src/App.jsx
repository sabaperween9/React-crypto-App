import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import CoinDetails from "./component/CoinDetails";
import Exchange from "./component/Exchange";
import Coin from "./component/Coin";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { useParams } from "react-router-dom";
import Footer from "./component/Footer";


function App() {
  const param = useParams();
  return (
    <Router>
      <Header />
      <ColorModeSwitcher css ={{ color: 'white' }}/>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path="/coin" element = {<Coin />}/>
        <Route path='/coin/:id'  element = {<CoinDetails />}/>
        <Route path="/exchange" element = {<Exchange />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
