import React from 'react';
import '../App.css';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import MiddleNav from '../components/MiddleNav';
import Products from '../components/Products';
import WhoAreWe from '../components/WhoAreWe';
import WhyChooseUs from '../components/WhyChooseUs';
import HomeContact from '../components/HomeContact';


function Home() {
  return (
    <div>
     <MiddleNav/>
     <Banner/>
     <WhoAreWe/>
     <Products/>
     <WhyChooseUs/>
     <HomeContact/>
     <Footer/>
    </div>
  )
}

export default Home