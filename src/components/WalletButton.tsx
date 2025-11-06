import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

interface WalletButtonProps {
  onConnect: (account: string) => void;
  connected?: boolean;
  account?: string;
}

/**
 * Komponen tombol untuk connect ke MetaMask wallet
 * Menangani deteksi MetaMask, request accounts, dan error handling
 */
const WalletButton = ({ onConnect, connected, account }: WalletButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check jika sudah ada wallet connected saat component mount
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          onConnect(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    // Check apakah MetaMask terinstall
    if (typeof window.ethereum === "undefined") {
      toast.error("MetaMask tidak terdeteksi!", {
        description: "Silakan install MetaMask extension terlebih dahulu.",
      });
      return;
    }

    setIsConnecting(true);
    try {
      // Request accounts dari MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        onConnect(accounts[0]);
        toast.success("Wallet terhubung!", {
          description: `Alamat: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast.error("Gagal menghubungkan wallet", {
        description: error.message || "Terjadi kesalahan",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button
      onClick={connectWallet}
      disabled={connected || isConnecting}
      size="lg"
      className="wallet-connect-btn relative overflow-hidden bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
    >
      <Wallet className="mr-2 h-5 w-5" />
      {isConnecting
        ? "Menghubungkan..."
        : connected
        ? `${account?.slice(0, 6)}...${account?.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
};

export default WalletButton;

// Tambahkan type declaration untuk window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
