import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Wallet, ArrowRight, CheckCircle } from "lucide-react";

/**
 * Landing Page / Home
 * Menampilkan informasi tentang DID Auth dan navigasi ke Register/Login
 */
const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Terdesentralisasi",
      description: "Identitas Anda tidak dikontrol oleh server pusat, tetapi oleh Anda sendiri melalui blockchain Ethereum.",
    },
    {
      icon: Lock,
      title: "Aman & Private",
      description: "Tidak ada password yang disimpan. Autentikasi menggunakan cryptographic signature dari wallet Anda.",
    },
    {
      icon: Wallet,
      title: "MetaMask Integration",
      description: "Login dengan mudah menggunakan wallet MetaMask yang sudah Anda percaya.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-6 shadow-glow animate-in zoom-in duration-500">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700">
            DID Auth System
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-100">
            Sistem autentikasi modern menggunakan{" "}
            <span className="font-semibold text-foreground">Decentralized Identity (DID)</span> berbasis Ethereum.
            Login tanpa password dengan teknologi Web3.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300 text-lg px-8"
            >
              Mulai Daftar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              size="lg"
              className="text-lg px-8 border-2 hover:bg-accent/10 hover:border-accent transition-all duration-300"
            >
              Login
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-card border-border/50 hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Cara Kerja</h2>
          <Card className="shadow-card border-border/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Connect Wallet",
                    desc: "Hubungkan wallet MetaMask Anda ke aplikasi",
                  },
                  {
                    step: "2",
                    title: "Generate DID",
                    desc: "Sistem membuat DID unik dari Ethereum address Anda: did:ethr:0x...",
                  },
                  {
                    step: "3",
                    title: "Sign Message",
                    desc: "Saat login, Anda menandatangani pesan verifikasi menggunakan private key",
                  },
                  {
                    step: "4",
                    title: "Verify & Login",
                    desc: "Sistem memverifikasi signature dan memberikan akses jika valid",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Siap mencoba autentikasi Web3?
          </p>
          <Button
            onClick={() => navigate("/register")}
            size="lg"
            className="bg-gradient-to-r from-accent to-secondary hover:shadow-glow transition-all duration-300"
          >
            Daftar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
