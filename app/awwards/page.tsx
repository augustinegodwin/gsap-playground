"use client"
import { useGSAP } from '@gsap/react';
import Navbar from '../components/awwards/navbar'
import FlavourSection from '../components/awwards/sections/flavourSection';
import HeroSection from '../components/awwards/sections/heroSection'
import MessageSection from '../components/awwards/sections/messageSection';
import './awwards.css'
import { Stack_Sans_Notch } from "next/font/google"
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/all';
import NutritionSection from '../components/awwards/sections/nutritionSection';
import BenefitSection from '../components/awwards/sections/benefitSection';
import TestimonialSection from '../components/awwards/sections/testimonialSection';

gsap.registerPlugin(ScrollSmoother)
export default function page() {
   useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });
  return (
     <main>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <FlavourSection />
          <NutritionSection/>

          <div>
            <BenefitSection/>
            <TestimonialSection/>
            
          </div>
          
        </div>
      </div>
    </main>
  )
}
