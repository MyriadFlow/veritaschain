"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Placeholder interfaces - will be updated when we test with actual massa-web3 API
interface MassaProvider {
  name(): string;
  accounts(): Promise<MassaAccount[]>;
}

interface MassaAccount {
  address(): string;
  publicKey(): string;
}

interface Web3ContextType {
  provider: MassaProvider | null;
  account: MassaAccount | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  loading: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  account: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
  loading: false,
  error: null,
});

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [provider, setProvider] = useState<MassaProvider | null>(null);
  const [account, setAccount] = useState<MassaAccount | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if running in browser
      if (typeof window === "undefined") {
        throw new Error("Web3 connection only available in browser");
      }

      // For now, we'll implement a basic connection flow
      // This will be updated once we test with the actual massa-web3 API

      // Simulate wallet connection
      console.log("Attempting to connect to Massa wallet...");

      // TODO: Replace with actual massa-web3 API calls
      // const { getProviders } = await import('@massalabs/wallet-provider');
      // const availableProviders = await getProviders();

      // For now, just set a mock connection
      setIsConnected(true);
      console.log("Mock wallet connection established");
    } catch (err: unknown) {
      console.error("Failed to connect wallet:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect wallet";
      setError(errorMessage);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setProvider(null);
    setAccount(null);
    setIsConnected(false);
    setError(null);

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("massa-wallet-connected");
    }
  };

  // Auto-connect if previously connected
  useEffect(() => {
    if (typeof window !== "undefined") {
      const wasConnected = localStorage.getItem("massa-wallet-connected");
      if (wasConnected === "true") {
        connect();
      }
    }
  }, []);

  // Save connection state
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("massa-wallet-connected", isConnected.toString());
    }
  }, [isConnected]);

  const value: Web3ContextType = {
    provider,
    account,
    isConnected,
    connect,
    disconnect,
    loading,
    error,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
