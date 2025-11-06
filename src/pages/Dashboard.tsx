import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, Mail, GraduationCap, Shield, LogOut, CheckCircle } from "lucide-react";

interface UserData {
  did: string;
  account: string;
  nama: string;
  email: string;
  nim: string;
  registeredAt: string;
}

/**
 * Halaman Dashboard
 * Menampilkan informasi user yang sudah login
 * Verifikasi session dari localStorage
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check apakah user sudah login
    const currentUser = localStorage.getItem("currentUser");
    
    if (!currentUser) {
      // Jika belum login, redirect ke login page
      toast.error("Anda belum login!", {
        description: "Silakan login terlebih dahulu.",
      });
      navigate("/login");
      return;
    }

    // Load user data dari localStorage
    const storedUserData = localStorage.getItem(`user_${currentUser}`);
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    setIsLoading(false);
  }, [navigate]);

  // Handler logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Logout berhasil!", {
      description: "Sampai jumpa lagi!",
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Selamat datang kembali!</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Success Badge */}
        <div className="mb-6 flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg border border-primary/20">
          <CheckCircle className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Autentikasi berhasil dengan Decentralized Identity (DID)
          </span>
        </div>

        {/* User Info Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* DID Card */}
          <Card className="shadow-card border-border/50 col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Decentralized Identity (DID)</CardTitle>
              </div>
              <CardDescription>Identitas terdesentralisasi berbasis Ethereum</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gradient-to-br from-primary/5 to-primary-glow/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-muted-foreground mb-2">DID:</p>
                <p className="font-mono text-sm break-all text-foreground">{userData.did}</p>
              </div>
              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Wallet Address:</p>
                <p className="font-mono text-xs break-all text-foreground mt-1">{userData.account}</p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info Card */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                <CardTitle>Informasi Pribadi</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nama Lengkap</p>
                <p className="font-medium text-foreground">{userData.nama}</p>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-foreground">{userData.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Info Card */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-secondary" />
                <CardTitle>Informasi Akademik</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">NIM</p>
                <p className="font-mono font-medium text-foreground">{userData.nim}</p>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">Terdaftar sejak</p>
                <p className="text-sm text-foreground mt-1">
                  {new Date(userData.registeredAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Box */}
        <Card className="mt-6 shadow-card border-accent/30 bg-gradient-to-r from-accent/5 to-secondary/5">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="mt-1">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  Sistem Autentikasi Terdesentralisasi
                </p>
                <p className="text-xs text-muted-foreground">
                  Login Anda diamankan dengan teknologi blockchain Ethereum. 
                  Tidak ada password yang disimpan di server - identitas Anda sepenuhnya terkontrol oleh Anda melalui wallet MetaMask.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
