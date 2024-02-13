'use client'
import React, { createContext, useContext, useState } from 'react';

const PaymentStatusContext = createContext();

export const usePaymentStatus = () => useContext(PaymentStatusContext);

export const PaymentStatusProvider = ({ children }) => {
  const [paidPlans, setPaidPlans] = useState([]);

  const markPlanAsPaid = (priceId) => {
    setPaidPlans((currentPlans) => [...currentPlans, priceId]);
  };

  return (
    <PaymentStatusContext.Provider value={{ paidPlans, markPlanAsPaid }}>
      {children}
    </PaymentStatusContext.Provider>
  );
};