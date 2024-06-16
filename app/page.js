import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { PaymentStatusProvider } from '@/contexts/PaymentStatusContext';
import Image from "next/image";

// Dynamic imports for components
const Header = dynamic(() => import('./components/Header'), { suspense: true });
const Homepage = dynamic(() => import('./components/Home'), { suspense: true });
const IntroSection = dynamic(() => import('./components/Intro'), { suspense: true });
const Owner = dynamic(() => import('./components/Owner'), { suspense: true });
const TabComponent = dynamic(() => import('./components/tabContent'), { suspense: true });
const CTA = dynamic(() => import('./components/CTA'), { suspense: true });
const Footer = dynamic(() => import('./components/Footer'), { suspense: true });
const PaymentCard = dynamic(() => import('./components/paymentCard'), { suspense: true });
const Map = dynamic(() => import('./components/Map'), { suspense: true });
const ClientSlider = dynamic(() => import('./components/ClientSlider'), { suspense: true });

export default function Home() {
  return (
    <PaymentStatusProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Homepage />
        <IntroSection />
        <TabComponent />
        <CTA />
        <Map />
        {/* <Owner /> */}
        <ClientSlider />
        <PaymentCard />
        <Footer />
      </Suspense>
    </PaymentStatusProvider>
  );
}
