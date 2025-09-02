import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Gamepad2, Shield, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const plans = [
    {
      name: "Pixel",
      price: "R$ 4,99",
      period: "/mês",
      description: "Perfeito para começar sua jornada retrô",
      features: [
        "Consoles 8-bit e 16-bit",
        "NES, SNES, Mega Drive e Fliperamas",
        "BytePlay Launcher",
        "Suporte por Whatsapp",
        "Atualizações Mensais",
      ],
      popular: false,
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "Turbo",
      price: "R$ 9,99",
      period: "/mês",
      description: "A escolha mais popular dos gamers",
      features: [
        "Tudo do plano Pixel",
        "Consoles 32-bit",
        "PlayStation 1, GBA, N64",
        "Themes exclusivos",
        "Suporte prioritário",
      ],
      popular: true,
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "Ultra",
      price: "R$ 14,99",
      period: "/mês",
      description: "Experiência completa sem limites",
      features: [
        "Acesso total à biblioteca",
        "Dreamcast, PS2, GameCube e mais!",
        "Lançamentos em primeira mão",
        "Configurações personalizadas",
        "Suporte VIP 24/7",
      ],
      popular: false,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              BytePlay
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Recursos
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Planos
            </Link>
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
              Começar Agora
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10" />
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}
        />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 mb-8 border border-gray-700">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">
              Pré-venda com 50% de desconto
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Reviva os Clássicos
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A plataforma definitiva para jogos retrô. Acesse milhares de ROMs,
            emuladores configurados e uma experiência de jogo perfeita em
            qualquer dispositivo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="#pricing">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-lg px-8 py-3"
              >
                <Download className="w-5 h-5 mr-2" />
                Baixar BytePlay
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">10.000+</div>
              <div className="text-gray-400">ROMs Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">10+</div>
              <div className="text-gray-400">Consoles Suportados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">24/7</div>
              <div className="text-gray-400">Suporte Técnico</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Por que escolher o BytePlay?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Desenvolvido por gamers, para gamers. Uma experiência única e sem
              complicações.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">
                  Launcher Inteligente
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Interface moderna com configurações automáticas para cada jogo
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Downloads Seguros</CardTitle>
                <CardDescription className="text-gray-400">
                  Todos os arquivos verificados e livres de malware
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-orange-500/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">
                  Atualizações Automáticas
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Sempre tenha a versão mais recente dos emuladores
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Escolha seu plano
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Acesso ilimitado aos melhores jogos retrô. Cancele quando quiser.
            </p>
          </div>

          <div
            id="valores"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all ${
                  plan.popular ? "ring-2 ring-cyan-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-400 mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                BytePlay
              </span>
            </div>

            <div className="flex items-center gap-6 text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Termos
              </Link>
              <Link
                href="/support"
                className="hover:text-white transition-colors"
              >
                Suporte
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 BytePlay. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
