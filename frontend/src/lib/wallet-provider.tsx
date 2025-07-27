"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getWallets, Wallet } from "@massalabs/wallet-provider";

// Define account type based on Massa wallet API
interface MassaAccount {
  address: string;
  name?: string;
}

interface WalletContextType {
  provider: Wallet | null;
  account: MassaAccount | null;
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  loading: boolean;
  error: string | null;
  balance: string | null;
}

const WalletContext = createContext<WalletContextType>({
  provider: null,
  account: null,
  address: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
  loading: false,
  error: null,
  balance: null,
});

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [provider, setProvider] = useState<Wallet | null>(null);
  const [account, setAccount] = useState<MassaAccount | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connect = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if running in browser
      if (typeof window === "undefined") {
        throw new Error("Wallet connection only available in browser");
      }

      console.log("Attempting to connect to Massa wallet...");

      // Get available Massa wallet providers
      const providers = await getWallets();

      if (providers.length === 0) {
        throw new Error(
          "No Massa wallet found. Please install Massa Station or another compatible wallet."
        );
      }

      // Use the first available provider (usually Massa Station)
      const selectedProvider = providers[0];
      setProvider(selectedProvider);

      // Get accounts from the provider
      const accounts = await selectedProvider.accounts();

      if (accounts.length === 0) {
        throw new Error(
          "No accounts found. Please create an account in your Massa wallet."
        );
      }

      // Use the first account
      const selectedAccount = accounts[0];
      const massaAccount: MassaAccount = {
        address: selectedAccount.address,
        name: "Massa Account",
      };

      setAccount(massaAccount);
      setAddress(selectedAccount.address);
      setIsConnected(true);

      // Set a default balance for now - we'll implement real balance fetching later
      setBalance("1000");

      // Store connection state
      if (typeof window !== "undefined") {
        localStorage.setItem("wallet-connected", "true");
        localStorage.setItem("wallet-address", selectedAccount.address);
      }

      console.log(
        "Successfully connected to Massa wallet:",
        selectedAccount.address
      );
    } catch (err: unknown) {
      console.error("Failed to connect wallet:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect wallet";
      setError(errorMessage);
      setIsConnected(false);
      setProvider(null);
      setAccount(null);
      setAddress(null);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setProvider(null);
    setAccount(null);
    setAddress(null);
    setIsConnected(false);
    setError(null);
    setBalance(null);

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("wallet-connected");
      localStorage.removeItem("wallet-address");
    }

    console.log("Wallet disconnected");
  };

  // Auto-connect if previously connected
  useEffect(() => {
    if (typeof window !== "undefined") {
      const wasConnected = localStorage.getItem("wallet-connected");
      if (wasConnected === "true") {
        connect();
      }
    }
  }, []);

  const value: WalletContextType = {
    provider,
    account,
    address,
    isConnected,
    connect,
    disconnect,
    loading,
    error,
    balance,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export default WalletContext;
