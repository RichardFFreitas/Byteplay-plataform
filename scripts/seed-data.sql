-- Dados iniciais para o BytePlay

-- Inserir downloads disponíveis
INSERT INTO public.downloads (name, description, file_path, file_size, file_type, console_type, required_plan, version) VALUES
-- Launcher
('BytePlay Launcher', 'Launcher principal do BytePlay com interface moderna', '/byteplay-launcher/BytePlay-v2.1.0.zip', 47185920, 'launcher', NULL, 'pixel', '2.1.0'),

-- ROMs 8-bit e 16-bit (Plano Pixel)
('NES ROMs Collection', 'Coleção completa de ROMs do Nintendo Entertainment System', '/roms/nes/nes-collection.zip', 125829120, 'roms', 'NES', 'pixel', '1.0'),
('SNES ROMs Collection', 'Coleção de ROMs do Super Nintendo Entertainment System', '/roms/snes/snes-collection.zip', 356515840, 'roms', 'SNES', 'pixel', '1.0'),
('Mega Drive ROMs Collection', 'Coleção de ROMs do Sega Mega Drive/Genesis', '/roms/megadrive/megadrive-collection.zip', 298844160, 'roms', 'Mega Drive', 'pixel', '1.0'),
('Game Boy ROMs Collection', 'Coleção de ROMs do Nintendo Game Boy', '/roms/gameboy/gameboy-collection.zip', 89128960, 'roms', 'Game Boy', 'pixel', '1.0'),

-- ROMs 32-bit (Plano Turbo)
('PlayStation 1 ROMs Collection', 'Coleção de ROMs do Sony PlayStation 1', '/roms/ps1/ps1-collection.zip', 2199023255552, 'roms', 'PlayStation 1', 'turbo', '1.0'),
('Game Boy Advance ROMs Collection', 'Coleção de ROMs do Nintendo Game Boy Advance', '/roms/gba/gba-collection.zip', 445644800, 'roms', 'GBA', 'turbo', '1.0'),
('Nintendo 64 ROMs Collection', 'Coleção de ROMs do Nintendo 64', '/roms/n64/n64-collection.zip', 1073741824, 'roms', 'N64', 'turbo', '1.0'),

-- ROMs avançados (Plano Ultra)
('Dreamcast ROMs Collection', 'Coleção de ROMs do Sega Dreamcast', '/roms/dreamcast/dreamcast-collection.zip', 1932735283, 'roms', 'Dreamcast', 'ultra', '1.0'),
('PlayStation 2 ROMs Collection', 'Coleção de ROMs do Sony PlayStation 2', '/roms/ps2/ps2-collection.zip', 4398046511104, 'roms', 'PS2', 'ultra', '1.0'),
('GameCube ROMs Collection', 'Coleção de ROMs do Nintendo GameCube', '/roms/gamecube/gamecube-collection.zip', 3221225472, 'roms', 'GameCube', 'ultra', '1.0'),

-- Themes
('Pixel Theme Pack', 'Pack de temas retrô com estética pixel art', '/themes/pixel-theme-pack.zip', 52428800, 'theme', NULL, 'pixel', '1.0'),
('Neon Theme Pack', 'Pack de temas com estética neon cyberpunk', '/themes/neon-theme-pack.zip', 67108864, 'theme', NULL, 'turbo', '1.0'),
('Premium Theme Pack', 'Pack completo de temas premium exclusivos', '/themes/premium-theme-pack.zip', 104857600, 'theme', NULL, 'ultra', '1.0');

-- Inserir atualizações/changelog
INSERT INTO public.updates (version, title, description, content, type, is_published, published_at) VALUES
('2.1.0', 'Nova Interface do Launcher', 'Redesenhamos completamente a interface do BytePlay', 
'# BytePlay v2.1.0 - Nova Interface

## 🎨 Interface Redesenhada
- Visual completamente renovado com tema escuro moderno
- Navegação mais intuitiva entre consoles e jogos
- Animações suaves e responsivas

## 🚀 Melhorias de Performance
- Carregamento 40% mais rápido dos jogos
- Otimização de memória para dispositivos mais antigos
- Cache inteligente para ROMs frequentemente acessadas

## 🎮 Novos Recursos
- Suporte a controles Bluetooth
- Sistema de favoritos aprimorado
- Histórico de jogos recentes

## 🐛 Correções
- Corrigido problema de áudio em jogos do SNES
- Resolvido crash ao alternar entre telas
- Melhorada compatibilidade com Windows 11', 
'update', true, '2024-01-15 10:00:00+00'),

('2.0.5', 'Suporte ao PlayStation 2', 'Adicionamos suporte completo ao PS2 para usuários do plano Ultra',
'# BytePlay v2.0.5 - PlayStation 2

## 🎮 Novo Console Suportado
- **PlayStation 2** agora disponível para usuários Ultra
- Mais de 200 jogos clássicos do PS2
- Emulação otimizada com upscaling HD

## 🔧 Configurações Avançadas
- Controles personalizáveis para cada jogo
- Opções de filtros gráficos
- Suporte a memory cards virtuais

## 📦 Biblioteca Expandida
- God of War, Shadow of the Colossus, GTA San Andreas
- Final Fantasy X, Kingdom Hearts, Tekken 5
- E muito mais!', 
'feature', true, '2024-01-08 14:30:00+00'),

('2.0.0', 'Lançamento Oficial do BytePlay', 'BytePlay sai da versão beta com mais de 1000 ROMs disponíveis',
'# BytePlay v2.0.0 - Lançamento Oficial! 🎉

## 🚀 Saímos da Beta!
Após meses de desenvolvimento e testes, o BytePlay está oficialmente lançado!

## 📊 Números Impressionantes
- **1000+** ROMs disponíveis
- **15** consoles suportados
- **3** planos flexíveis
- **24/7** suporte técnico

## 🎯 Planos Disponíveis
### Pixel (R$ 19,90/mês)
- Consoles 8-bit e 16-bit
- NES, SNES, Mega Drive, Game Boy

### Turbo (R$ 39,90/mês)
- Tudo do Pixel +
- PlayStation 1, GBA, N64

### Ultra (R$ 59,90/mês)
- Acesso completo
- Dreamcast, PS2, GameCube

## 🙏 Agradecimentos
Obrigado a todos os beta testers que nos ajudaram a chegar até aqui!', 
'announcement', true, '2024-01-01 00:00:00+00');
