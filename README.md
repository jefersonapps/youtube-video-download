# Frontend - App de Download de Vídeos

Este é o frontend de um aplicativo de download de vídeos construído com React. Ele se comunica com a API backend [https://github.com/jefersonapps/youtube-downloader.git](https://github.com/jefersonapps/youtube-downloader.git) para fornecer as seguintes funcionalidades:

- **Baixar Vídeos:** Insira a URL de um vídeo e inicie o download.
- **Acompanhar Progresso:** Monitore o progresso de cada download em tempo real.
- **Listar Downloads Concluídos:** Veja uma lista dos vídeos baixados com sucesso.
- **Baixar Arquivos:** Baixe os arquivos de vídeo para o seu dispositivo.
- **Limpar Downloads:** Apague os arquivos baixados e limpe a lista de downloads.

## Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jefersonapps/youtube-video-download.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd youtube-video-download
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   Isso geralmente inicia o aplicativo em `http://localhost:5173/`.

## Estrutura do Projeto

O projeto segue a estrutura:

- **`public/`:** Contém arquivos estáticos.
- **`src/`:** Contém o código-fonte do aplicativo.
  - **`components/`:** Componentes React reutilizáveis.
  - **`http/`:** Funções para interagir com a API backend.
  - **`app.tsx`:** Componente principal do aplicativo.
- **`index.html`:** Ponto de entrada principal do aplicativo.

## Uso

1. **Insira a URL do Vídeo:** Cole a URL do vídeo que deseja baixar no campo de entrada.
2. **Clique em "Baixar":** O download será iniciado e você verá o progresso na lista de downloads.
3. **Baixe o Arquivo:** Quando o download for concluído, clique no botão de download para salvar o arquivo.
4. **Limpar Downloads:** Use o botão "Limpar Downloads" para remover os arquivos baixados e limpar a lista.

## Dependências

- React
- Lucide React (para ícones)
- Sonner (para notificações)

## Notas

- Certifique-se de que a API backend esteja em execução antes de iniciar o frontend.
- A URL da API backend é definida na variável de ambiente `VITE_APP_API_URL`.

## Licença

MIT
