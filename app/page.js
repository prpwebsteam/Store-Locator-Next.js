import Image from "next/image";
import Header from "./components/Header";
import Homepage from "./components/Home";
import IntroSection from "./components/Intro";
import Owner from "./components/Owner";
import TabComponent from "./components/tabContent";
import ClientLogos from "./components/clientLogos";
import Footer from "./components/Footer";
import PaymentCard from "./components/paymentCard";
import Map from "./components/Map";
import { PaymentStatusProvider } from '@/contexts/PaymentStatusContext'; 

export default function Home() {
  return (
    <PaymentStatusProvider>
      <Header />
      <Homepage />
      <ClientLogos />
      <IntroSection />
      <TabComponent />
      <Map />
      <PaymentCard />
      <Owner />
      <Footer />
    </PaymentStatusProvider>
  );
}
