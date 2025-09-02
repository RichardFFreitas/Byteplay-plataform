"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Crown, Lock, AlertCircle, Gamepad2 } from "lucide-react"
import Link from "next/link"

// --- ESTRUTURA DE DADOS DOS PLANOS E EMULADORES ---

const emulatorsByPlan = {
  pixel: ["NES", "SNES", "Mega Drive", "Fliperamas (MAME)"],
  turbo: ["PlayStation 1", "Game Boy Advance", "Nintendo 64"],
  ultra: ["Dreamcast", "PlayStation 2", "GameCube", "PSP", "Xbox", "Xbox 360", "PS3"],
}

// Simulação de dados do usuário (Mantenha a sua lógica real aqui)
const userData = {
  name: "João Silva",
  email: "joao@email.com",
  plan: "Ultra", // Mude aqui para "Pixel", "Turbo" ou "Ultra" para testar
  planColor: "from-pink-500 to-purple-600",
}

const planHierarchy = {
  pixel: 1,
  turbo: 2,
  ultra: 3,
}

// --- FUNÇÕES AUXILIARES ---

const getEmulatorsForPlan = (planName: string): string[] => {
    const planLevel = planHierarchy[planName.toLowerCase() as keyof typeof planHierarchy];
    let accessibleEmulators: string[] = [];

    if (planLevel >= planHierarchy.pixel) {
        accessibleEmulators = [...accessibleEmulators, ...emulatorsByPlan.pixel];
    }
    if (planLevel >= planHierarchy.turbo) {
        accessibleEmulators = [...accessibleEmulators, ...emulatorsByPlan.turbo];
    }
    if (planLevel >= planHierarchy.ultra) {
        accessibleEmulators = [...accessibleEmulators, ...emulatorsByPlan.ultra];
    }

    return accessibleEmulators;
};

// --- GERAÇÃO DOS DADOS DE DOWNLOAD PARA TODOS OS PLANOS ---

// Agora criamos um item de download para CADA plano existente.
const allLaunchers = Object.keys(planHierarchy).map((planKey) => {
    const planName = planKey as keyof typeof planHierarchy;
    return {
        id: planHierarchy[planName],
        name: `BytePlay Launcher ${planName.charAt(0).toUpperCase() + planName.slice(1)}`,
        description: `O pacote completo de emuladores para a experiência do plano ${planName}.`,
        size: "6.8 GB", // Pode ser dinâmico se os tamanhos variarem
        version: "1.0.0",
        requiredPlan: planName,
        available: true,
        featured: planName === 'turbo', // Destaca o plano Turbo
        downloadUrl: "https://drive.google.com/file/d/139n_8hJ8BSgKKqWzwxAxFtCJgcs_kYVL/view?usp=drive_link", // Idealmente, um link diferente por plano
        emulators: getEmulatorsForPlan(planName),
    };
});

const availableDownloads = {
  launcher: allLaunchers,
};


// --- COMPONENTE REACT ---

export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState("launcher")

  // A função agora compara o plano do usuário com o plano REQUERIDO pelo item de download.
  const canDownload = (requiredPlan: string) => {
    const userPlanLevel = planHierarchy[userData.plan.toLowerCase() as keyof typeof planHierarchy];
    const requiredPlanLevel = planHierarchy[requiredPlan.toLowerCase() as keyof typeof planHierarchy];
    return userPlanLevel >= requiredPlanLevel;
  }

  const handleDownload = (item: any) => {
    if (!canDownload(item.requiredPlan)) {
      alert(`Este conteúdo requer o plano ${item.requiredPlan.charAt(0).toUpperCase() + item.requiredPlan.slice(1)} ou superior. Faça upgrade para acessar!`);
      return;
    }

    if (!item.available) {
      alert("Este download não está disponível no momento.");
      return;
    }
    
    if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank');
    } else {
      alert("O link de download não foi encontrado. Por favor, entre em contato com o suporte.");
      console.error("URL de download não encontrada para o item:", item.name);
    }
  }

  const renderDownloadItem = (item: any) => {
    const hasAccess = canDownload(item.requiredPlan);

    return (
      <Card
        key={item.id}
        className={`bg-gray-800/50 border-gray-700 ${!hasAccess ? "opacity-60" : "hover:border-gray-600"} transition-all`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start justify-between">
            <div className="flex-1 mb-4 sm:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                {item.featured && <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Popular</Badge>}
                {!hasAccess && <Badge className="bg-gray-600 text-gray-300"><Lock className="w-3 h-3 mr-1" />Requer Plano {item.requiredPlan.charAt(0).toUpperCase() + item.requiredPlan.slice(1)}</Badge>}
              </div>
              <p className="text-gray-400 mb-4">{item.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>📦 {item.size}</span>
                {item.version && <span>🏷️ v{item.version}</span>}
              </div>
            </div>
            <div className="ml-0 sm:ml-4">
              <Button
                onClick={() => handleDownload(item)}
                disabled={!hasAccess || !item.available}
                className={`${
                  hasAccess && item.available
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {!hasAccess ? (
                  <><Lock className="w-4 h-4 mr-2" />Bloqueado</>
                ) : !item.available ? (
                  <><AlertCircle className="w-4 h-4 mr-2" />Indisponível</>
                ) : (
                  <><Download className="w-4 h-4 mr-2" />Baixar</>
                )}
              </Button>
            </div>
          </div>
          {item.emulators && item.emulators.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Emuladores Inclusos neste Pacote
                </h4>
                <div className="flex flex-wrap gap-2">
                    {item.emulators.map((emulator: string) => (
                        <Badge key={emulator} variant="secondary" className="bg-gray-700 text-gray-300">
                            {emulator}
                        </Badge>
                    ))}
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Downloads</h1>
          <p className="text-gray-400">
            Seu plano atual é o <span className={`font-bold bg-clip-text text-transparent bg-gradient-to-r ${userData.planColor}`}>{userData.plan}</span>. Baixe o launcher correspondente ou faça um upgrade.
          </p>
        </div>
        
        <div className="space-y-4">
          {(availableDownloads[activeCategory as keyof typeof availableDownloads] || []).map(renderDownloadItem)}
        </div>

        {userData.plan.toLowerCase() !== "ultra" && (
          <Card className="mt-12 bg-black border-gray-600">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Quer mais poder de emulação?</CardTitle>
              <CardDescription className="text-gray-300">Faça upgrade do seu plano e desbloqueie consoles mais poderosos.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center"><div className="text-2xl font-bold text-cyan-400">1000+</div><div className="text-gray-400 text-sm">ROMs Adicionais</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-purple-400">5+</div><div className="text-gray-400 text-sm">Consoles Extras</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-pink-400">Premium</div><div className="text-gray-400 text-sm">Suporte VIP</div></div>
              </div>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"><Crown className="w-4 h-4 mr-2" />Fazer Upgrade</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
