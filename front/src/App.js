import './App.css';
import React from 'react';
import Header from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import Home from './components/Home';
import { ProductsDetails } from './components/products/ProductsDetails';
// Router desdes react-router-dom (NO confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <div className='container container-fluid'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="Home" element={<Home/>}/>
          <Route path="/producto/:id" element={<ProductsDetails />}/>
        </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
