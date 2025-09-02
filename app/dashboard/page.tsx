"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Gamepad2, User, Crown, Calendar, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import DownloadsPage from "../../components/downloads"
import UpdatesPage from "@/components/updates"

// Simulação de dados do usuário
const userData = {
  name: "João Silva",
  email: "joao@email.com",
  plan: "Ultra",
  planColor: "from-cyan-500 to-blue-600",
  downloads: 47,
  maxDownloads: 100,
}

const consolesByPlan = {
  Pixel: ["NES", "SNES", "Mega Drive", "Game Boy"],
  Turbo: ["NES", "SNES", "Mega Drive", "Game Boy", "PlayStation 1", "GBA", "N64"],
  Ultra: ["NES", "SNES", "Mega Drive", "Game Boy", "PlayStation 1", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "GBA", "N64", "Dreamcast", "GameCube", "Switch"],
}

const availableDownloads = [
  { name: "BytePlay Launcher", size: "45 MB", type: "launcher", available: true },
  { name: "NES ROMs Pack", size: "120 MB", type: "roms", console: "NES", available: true },
  { name: "SNES ROMs Pack", size: "340 MB", type: "roms", console: "SNES", available: true },
  { name: "PlayStation 1 ROMs", size: "2.1 GB", type: "roms", console: "PS1", available: true },
  { name: "Dreamcast ROMs", size: "1.8 GB", type: "roms", console: "Dreamcast", available: false },
  { name: "PS2 ROMs Pack", size: "4.2 GB", type: "roms", console: "PS2", available: false },
]

const consoleLogos: Record<string, React.ReactNode> = {
  "NES": <img src="/consoles/nes.png" alt="NES" />,
  "SNES": <img src="/consoles/snes.png" alt="SNES" />,
  "Mega Drive": <img src="/consoles/megadrive.png" alt="Mega Drive" />,
  "Game Boy": <img src="/consoles/gameboy.png" alt="Game Boy" />,
  "PlayStation 1": <img src="/consoles/ps1.png" alt="PlayStation 1" />,
  "PlayStation 2": <img src="/consoles/ps2.png" alt="PlayStation 2" />,
  "PlayStation 3": <img src="/consoles/ps3.png" alt="PlayStation 3" />,
  "PlayStation 4": <img src="/consoles/ps4.svg" alt="PlayStation 4" />,
  "PlayStation 5": <img src="/consoles/ps5.png" alt="PlayStation 5" />,
  "GBA": <img src="/consoles/gba.png" alt="GBA" />,
  "N64": <img src="/consoles/n64.png" alt="N64" />,
  "Dreamcast": <img src="/consoles/dreamcast.png" alt="Dreamcast" />,
  "GameCube": <img src="/consoles/gamecube.png" alt="GameCube" />,
  "Switch": <img src="/consoles/switch.png" alt="Switch" />,
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleDownload = (item: (typeof availableDownloads)[0]) => {
    if (!item.available) {
      alert("Este conteúdo não está disponível no seu plano atual. Faça upgrade para acessar!")
      return
    }

    // Aqui será implementada a lógica de download com URLs assinadas
    console.log(`Iniciando download de: ${item.name}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              BytePlay
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Badge className={`bg-gradient-to-r ${userData.planColor} text-white`}>
              <Crown className="w-3 h-3 mr-1" />
              Plano {userData.plan}
            </Badge>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, {userData.name}! 👋</h1>
          <p className="text-gray-400">Bem-vindo de volta à sua biblioteca de jogos retrô</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="downloads" className="data-[state=active]:bg-gray-700">
              Downloads
            </TabsTrigger>
            <TabsTrigger value="updates" className="data-[state=active]:bg-gray-700">
                Atualizações
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Plano Atual</CardTitle>
                  <Crown className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{userData.plan}</div>
                  <p className="text-xs text-gray-400 mt-1">
                    Acesso a {consolesByPlan[userData.plan as keyof typeof consolesByPlan].length} consoles
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Consoles Disponíveis</CardTitle>
                <CardDescription className="text-gray-400">
                  Consoles que você pode acessar com o plano {userData.plan}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
                  {consolesByPlan[userData.plan as keyof typeof consolesByPlan].map((console, index) => (
                    <div key={index} className="flex flex-col items-center justify-center gap-2 p-3 bg-white rounded-lg">
                      {consoleLogos[console] || <Gamepad2 className="w-8 h-8 text-cyan-400" />}
                      <span className="text-black text-xs mt-1">{console}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-6">
            <DownloadsPage />
          </TabsContent>

          <TabsContent value="updates" className="space-y-6">
            <UpdatesPage />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Configurações da Conta</CardTitle>
                <CardDescription className="text-gray-400">
                  Gerencie suas informações pessoais e preferências
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Informações Pessoais</h3>
                    <p className="text-gray-400 text-sm">{userData.email}</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 bg-transparent">
                    <User className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Plano Atual</h3>
                    <p className="text-gray-400 text-sm">Plano {userData.plan} - Renovação automática</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 bg-transparent">
                    <Crown className="w-4 h-4 mr-2" />
                    Gerenciar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
