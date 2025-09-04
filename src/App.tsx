import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainScreen from './components/MainScreen';
import MarketScreen from './components/MarketScreen';
import PortfolioScreen from './components/PortfolioScreen';
import TopUpScreen from './components/TopUpScreen';

export default function PaidaxClone() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainScreen />} />
          <Route path="market" element={<MarketScreen />} />
          <Route path="portfolio" element={<PortfolioScreen />} />
        </Route>
        <Route path="topup" element={<TopUpScreen />} />
      </Routes>
    </Router>
  );
}