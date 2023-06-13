import React from 'react';

type UserAddressContextType = {
  userAddress: String | null;
  updateUserAddress: () => void;
  fetti_address: string;
  dai_address: string;
  loaner_address: string;
  vault_address: string;
  gnsPool_address: string;
};

export const UserAddressContext = React.createContext<UserAddressContextType | null>(null);
