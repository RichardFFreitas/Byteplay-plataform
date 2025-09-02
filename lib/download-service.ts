// Serviço para gerenciar downloads protegidos com URLs assinadas

export interface DownloadItem {
  id: number
  name: string
  filePath: string
  requiredPlan: "pixel" | "turbo" | "ultra"
  fileSize: number
  fileType: "launcher" | "roms" | "emulator" | "theme"
}

export interface UserPlan {
  type: "pixel" | "turbo" | "ultra"
  expiresAt: Date
  isActive: boolean
}

class DownloadService {
  private readonly planHierarchy = {
    pixel: 1,
    turbo: 2,
    ultra: 3,
  }

  /**
   * Verifica se o usuário pode baixar um arquivo baseado no seu plano
   */
  canUserDownload(userPlan: UserPlan, item: DownloadItem): boolean {
    if (!userPlan.isActive || userPlan.expiresAt < new Date()) {
      return false
    }

    return this.planHierarchy[userPlan.type] >= this.planHierarchy[item.requiredPlan]
  }

  /**
   * Gera uma URL assinada temporária para download
   * Em produção, isso seria feito no backend com Supabase Storage ou Cloudflare R2
   */
  async generateSignedUrl(
    userId: string,
    itemId: number,
    userPlan: UserPlan,
  ): Promise<{ url: string; expiresIn: number } | null> {
    try {
      // Buscar informações do arquivo
      const item = await this.getDownloadItem(itemId)
      if (!item) {
        throw new Error("Arquivo não encontrado")
      }

      // Verificar permissões
      if (!this.canUserDownload(userPlan, item)) {
        throw new Error("Usuário não tem permissão para baixar este arquivo")
      }

      // Registrar tentativa de download
      await this.logDownloadAttempt(userId, itemId)

      // Gerar URL assinada (simulação - em produção seria com Supabase/R2)
      const signedUrl = await this.createSignedUrl(item.filePath, userId)

      return {
        url: signedUrl,
        expiresIn: 3600, // 1 hora
      }
    } catch (error) {
      console.error("Erro ao gerar URL assinada:", error)
      return null
    }
  }

  /**
   * Simula a criação de uma URL assinada
   * Em produção, isso seria feito com:
   * - Supabase: supabase.storage.from('bucket').createSignedUrl()
   * - Cloudflare R2: R2 presigned URLs
   */
  private async createSignedUrl(filePath: string, userId: string): Promise<string> {
    // Simular delay de geração
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Em produção, seria algo como:
    // const { data, error } = await supabase.storage
    //   .from('byteplay-files')
    //   .createSignedUrl(filePath, 3600)

    // Por enquanto, retornamos uma URL simulada
    const timestamp = Date.now()
    const signature = btoa(`${userId}-${filePath}-${timestamp}`)

    return `https://cdn.byteplay.com/secure/${filePath}?signature=${signature}&expires=${timestamp + 3600000}&user=${userId}`
  }

  /**
   * Busca informações de um arquivo de download
   */
  private async getDownloadItem(itemId: number): Promise<DownloadItem | null> {
    // Em produção, isso seria uma consulta ao banco de dados
    // Por enquanto, simulamos com dados estáticos
    const mockItems: DownloadItem[] = [
      {
        id: 1,
        name: "BytePlay Launcher v2.1.0",
        filePath: "launcher/byteplay-v2.1.0.zip",
        requiredPlan: "pixel",
        fileSize: 47185920,
        fileType: "launcher",
      },
      {
        id: 3,
        name: "NES ROMs Collection",
        filePath: "roms/nes/nes-collection.zip",
        requiredPlan: "pixel",
        fileSize: 125829120,
        fileType: "roms",
      },
      {
        id: 5,
        name: "PlayStation 1 ROMs",
        filePath: "roms/ps1/ps1-collection.zip",
        requiredPlan: "turbo",
        fileSize: 2199023255552,
        fileType: "roms",
      },
    ]

    return mockItems.find((item) => item.id === itemId) || null
  }

  /**
   * Registra tentativa de download para auditoria
   */
  private async logDownloadAttempt(userId: string, itemId: number): Promise<void> {
    // Em produção, isso salvaria no banco de dados
    console.log(`Download attempt logged: User ${userId} requested item ${itemId}`)

    // Exemplo de como seria em produção:
    // await supabase
    //   .from('user_downloads')
    //   .insert({
    //     user_id: userId,
    //     download_id: itemId,
    //     ip_address: req.ip,
    //     user_agent: req.headers['user-agent'],
    //   })
  }

  /**
   * Verifica se o usuário atingiu o limite de downloads
   */
  async checkDownloadLimit(userId: string, userPlan: UserPlan): Promise<boolean> {
    // Limites por plano
    const limits = {
      pixel: 50,
      turbo: 100,
      ultra: -1, // Ilimitado
    }

    if (limits[userPlan.type] === -1) {
      return true // Ilimitado
    }

    // Em produção, consultaria o banco para contar downloads do mês atual
    // Por enquanto, simulamos
    const currentMonthDownloads = 47 // Simulado

    return currentMonthDownloads < limits[userPlan.type]
  }

  /**
   * Inicia o processo de download
   */
  async initiateDownload(
    userId: string,
    itemId: number,
    userPlan: UserPlan,
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      // Verificar limite de downloads
      const canDownload = await this.checkDownloadLimit(userId, userPlan)
      if (!canDownload) {
        return {
          success: false,
          error: "Limite de downloads atingido para este mês",
        }
      }

      // Gerar URL assinada
      const signedUrlData = await this.generateSignedUrl(userId, itemId, userPlan)
      if (!signedUrlData) {
        return {
          success: false,
          error: "Erro ao gerar link de download",
        }
      }

      return {
        success: true,
        url: signedUrlData.url,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }
}

export const downloadService = new DownloadService()
