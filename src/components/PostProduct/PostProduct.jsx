import React, { useState } from 'react';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';
import NavBar from '../NavBar';
import PostProductStepper from './stepper';
const PostProduct = () => {
  return (
    <div className="w-[100%] h-[100%]">
      {/* for header */}
      <Header />
      {/* for nav items */}
      <NavBar />

      <PostProductStepper />

      <Footer />
    </div>
  );
};

export default PostProduct;
