import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WalletButton from "@/components/WalletButton";
import { toast } from "sonner";
import { LogIn, ArrowLeft } from "lucide-react";
import { ethers } from "ethers";

/**
 * Halaman Login
 * User connect wallet → sign message (nonce) → verify signature → login berhasil
 */
const Login = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Handler saat wallet berhasil terhubung
  const handleWalletConnect = (accountAddress: string) => {
    setWalletConnected(true);
    setAccount(accountAddress);
  };

  // Handler login dengan signature verification
  const handleLogin = async () => {
    // Check apakah user sudah terdaftar
    const userData = localStorage.getItem(`user_${account}`);
    if (!userData) {
      toast.error("Akun tidak ditemukan!", {
        description: "Silakan daftar terlebih dahulu.",
      });
      return;
    }

    setIsVerifying(true);

    try {
      // Generate nonce (pesan acak untuk ditandatangani)
      const did = `did:ethr:${account}`;
      const message = `Login verification for DID: ${did}\nNonce: ${Date.now()}`;

      // Minta user untuk sign message dengan MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      // Verify signature
      const recoveredAddress = ethers.verifyMessage(message, signature);

      // Check apakah recovered address sama dengan account yang login
      if (recoveredAddress.toLowerCase() === account.toLowerCase()) {
        // Login berhasil - simpan session
        localStorage.setItem("currentUser", account);

        toast.success("Login berhasil!", {
          description: "Anda akan dialihkan ke dashboard...",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error("Verifikasi gagal!", {
          description: "Signature tidak cocok dengan wallet address.",
        });
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      
      // Handle different error cases
      if (error.code === 4001) {
        toast.error("Login dibatalkan", {
          description: "Anda menolak untuk menandatangani pesan.",
        });
      } else {
        toast.error("Login gagal", {
          description: error.message || "Terjadi kesalahan saat verifikasi.",
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        <Card className="shadow-card border-border/50">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-glow">
              <LogIn className="h-8 w-8 text-accent-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Login
            </CardTitle>
            <CardDescription>
              Hubungkan wallet untuk login dengan DID Anda
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Connect Wallet */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <WalletButton
                  onConnect={handleWalletConnect}
                  connected={walletConnected}
                  account={account}
                />
              </div>

              {walletConnected && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      DID Anda:
                    </p>
                    <p className="text-sm font-mono break-all text-foreground">
                      did:ethr:{account}
                    </p>
                  </div>

                  {/* Step 2: Sign & Verify */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleLogin}
                      disabled={isVerifying}
                      className="w-full bg-gradient-to-r from-accent to-secondary hover:shadow-glow transition-all duration-300"
                      size="lg"
                    >
                      {isVerifying ? "Memverifikasi..." : "Sign & Login"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Anda akan diminta untuk menandatangani pesan verifikasi
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-primary hover:text-primary-glow font-medium transition-colors"
              >
                Daftar di sini
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
