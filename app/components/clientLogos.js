import React from 'react';

const ClientLogos = () => {
  return (
    <section className="py-8 overflow-x-hidden logos bg-gradient-to-b from-blue-50">
      <div className="grid grid-cols-2 gap-4 mx-auto justify-center items-center md:flex md:gap-8">
        <img src="https://spp.co/images/customer-logos/seobros.png" alt="SEObros logo" />
        <img src="https://spp.co/images/customer-logos/amw.png" alt="AMW logo" />
        <img src="https://spp.co/images/customer-logos/loganix.png" alt="Loganix logo" />
        <img src="https://spp.co/images/customer-logos/podblade.png" alt="Podblade logo" />
        <img src="https://spp.co/images/customer-logos/ranked.png" alt="Ranked.ai logo" />
      </div>
    </section>
  );
};

export default ClientLogos;