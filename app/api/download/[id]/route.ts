import { type NextRequest, NextResponse } from "next/server"
import { downloadService } from "@/lib/download-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemId = Number.parseInt(params.id)

    // Em produção, você obteria essas informações da sessão/JWT
    // Por enquanto, simulamos um usuário logado
    const userId = "user-123" // Seria obtido da sessão
    const userPlan = {
      type: "turbo" as const,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
      isActive: true,
    }

    // Iniciar processo de download
    const result = await downloadService.initiateDownload(userId, itemId, userPlan)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      downloadUrl: result.url,
      message: "Link de download gerado com sucesso",
    })
  } catch (error) {
    console.error("Erro na API de download:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
