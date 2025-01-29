import React from 'react';
import { Header } from '../../pages/Home/Header';
import Footer from '../../sections/Footer';
import NavBar from '../NavBar';
import PrivacyPolicyContent from './PrivacyPolicyContent';
const PrivacyPage = () => {
  return (
    <div className="w-[100%] h-[100%]">
      {/* for header */}
      <Header />
      {/* for nav items */}
      <NavBar />

      <PrivacyPolicyContent />

      {/* for footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPage;
