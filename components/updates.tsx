"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gamepad2, Calendar, Star, Zap, Bug, Megaphone, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

type Update = {
  id: number
  version: string
  title: string
  description: string
  date: string
  type: "update" | "feature" | "bugfix" | "announcement"
  content: string
  color: string
  bgColor: string
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "update":
      return <Zap className="w-4 h-4" />
    case "feature":
      return <Star className="w-4 h-4" />
    case "bugfix":
      return <Bug className="w-4 h-4" />
    case "announcement":
      return <Megaphone className="w-4 h-4" />
    default:
      return <Calendar className="w-4 h-4" />
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "update":
      return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Atualização</Badge>
    case "feature":
      return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Novo Recurso</Badge>
    case "bugfix":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Correção</Badge>
    case "announcement":
      return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Anúncio</Badge>
    default:
      return <Badge>Atualização</Badge>
  }
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  useEffect(() => {
    const fetchUpdates = async () => {
      const res = await fetch("/api/release")
      const data = await res.json()

      const formatted: Update[] = data.map((release: any, i: number) => {
        // Detecta o tipo da release com base no nome
        let type: Update["type"] = "update"
        if (/fix|bug/i.test(release.name)) type = "bugfix"
        else if (/feat|feature/i.test(release.name)) type = "feature"
        else if (/launch|release|v1.0/i.test(release.name)) type = "announcement"

        const colors = {
          update: { border: "border-cyan-500", bg: "from-cyan-500/10 to-cyan-600/10" },
          feature: { border: "border-purple-500", bg: "from-purple-500/10 to-purple-600/10" },
          bugfix: { border: "border-red-500", bg: "from-red-500/10 to-red-600/10" },
          announcement: { border: "border-orange-500", bg: "from-orange-500/10 to-orange-600/10" },
        }

        return {
          id: release.id,
          version: release.tag_name || release.name,
          title: release.name,
          description: release.body.split("\n")[0]?.replace(/^#+/, "").trim() || "Veja os detalhes dessa atualização.",
          content: release.body
            .split('\n')
            .map((line: string) => line.trim())
            .join('\n\n'),
          date: new Date(release.published_at).toLocaleDateString("pt-BR"),
          type,
          color: colors[type].border,
          bgColor: colors[type].bg,
        }
      })

      setUpdates(formatted)
      console.log(formatted)
    }

    fetchUpdates()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Atualizações do BytePlay
          </h1>
          <p className="text-gray-400 text-lg">
            Fique por dentro de todas as novidades, melhorias e correções da plataforma
          </p>
        </div>

        <div className="space-y-8">
          <Accordion type="single" collapsible className="w-full">
            {updates.map((update, index) => (
              <AccordionItem key={update.id} value={String(update.id)} className="bg-gray-800/50 border-gray-700 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                      {getTypeIcon(update.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-white border-gray-600">
                          {update.version}
                        </Badge>
                        {getTypeBadge(update.type)}
                      </div>
                      <CardTitle className="text-white text-left text-xl truncate">{update.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm min-w-fit">
                      <Calendar className="w-4 h-4" />
                      {update.date}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{update.content}</ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
