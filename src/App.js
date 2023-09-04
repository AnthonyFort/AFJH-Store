import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

// Page Components
import Home from './components/Home'
import Category from './components/Category'
import Product from './components/Product'
import NotFound from './components/NotFound'

// Global Components
import Nav from './components/Nav'
import Footer from './components/Footer'

export default function App() {

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/:productId' element={<Product />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

