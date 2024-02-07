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

export default function Home() {
  return (
    <main>
      <Header />
      <Homepage />
      <ClientLogos />
      <IntroSection />
      <TabComponent />
      <Map />
      <PaymentCard />
      <Owner />
      <Footer />
    </main>
  );
}
