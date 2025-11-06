import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import WalletButton from "@/components/WalletButton";
import { toast } from "sonner";
import { Shield, ArrowLeft } from "lucide-react";

/**
 * Halaman Register
 * User connect wallet → input data (nama, email, NIM) → generate DID → save to localStorage
 */
const Register = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nim: "",
  });

  // Handler saat wallet berhasil terhubung
  const handleWalletConnect = (accountAddress: string) => {
    setWalletConnected(true);
    setAccount(accountAddress);
  };

  // Handler perubahan input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler submit registrasi
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input
    if (!formData.nama || !formData.email || !formData.nim) {
      toast.error("Semua field harus diisi!");
      return;
    }

    // Generate DID dari Ethereum address
    const did = `did:ethr:${account}`;

    // Simpan data ke localStorage
    const userData = {
      did,
      account,
      nama: formData.nama,
      email: formData.email,
      nim: formData.nim,
      registeredAt: new Date().toISOString(),
    };

    // Simpan ke localStorage (gunakan account sebagai key)
    localStorage.setItem(`user_${account}`, JSON.stringify(userData));

    toast.success("Pendaftaran berhasil!", {
      description: `DID kamu: ${did}`,
    });

    // Redirect ke login setelah 2 detik
    setTimeout(() => {
      navigate("/login");
    }, 2000);
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
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Daftar Akun
            </CardTitle>
            <CardDescription>
              Hubungkan wallet MetaMask untuk membuat DID Anda
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
                <div className="p-4 bg-muted rounded-lg border border-border animate-in fade-in slide-in-from-top-2 duration-500">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    DID Anda:
                  </p>
                  <p className="text-sm font-mono break-all text-foreground">
                    did:ethr:{account}
                  </p>
                </div>
              )}
            </div>

            {/* Step 2: Form Input (hanya muncul setelah wallet connected) */}
            {walletConnected && (
              <form onSubmit={handleRegister} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nim">NIM</Label>
                  <Input
                    id="nim"
                    name="nim"
                    type="text"
                    placeholder="Nomor Induk Mahasiswa"
                    value={formData.nim}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  Daftar Sekarang
                </Button>
              </form>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary hover:text-primary-glow font-medium transition-colors"
              >
                Login di sini
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
