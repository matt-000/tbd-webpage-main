import React from 'react';

type UserAddressContextType = {
  userAddress: String | null;
  updateUserAddress: () => void;
  chainID: string | null;
  nftIDGNSPool: string | null;
  updateNFTIDGNSPool: (nft_id: string) => Promise<void>
  fetti_address: string;
  dai_address: string;
  loaner_address: string;
  vault_address: string;
  gnsPool_address: string;
};

export const UserAddressContext = React.createContext<UserAddressContextType | null>(null);
