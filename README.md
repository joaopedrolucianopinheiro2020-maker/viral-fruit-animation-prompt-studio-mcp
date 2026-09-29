# Viral Fruit Animation Prompt Studio — MCP Server

Servidor MCP remoto para a interface interativa do Viral Fruit Animation Prompt Studio.

## Endpoint

Depois do deploy, o endpoint será:

`https://SEU-SERVICO.onrender.com/mcp`

## UI

A ferramenta `show_start_screen` abre a interface com:

- ▶ INICIAR
- 🎬 Criar uma história
- 🍓 Criar personagem
- ⚡ Criar Short viral
- 🧩 Adaptar prompt

## Deploy

Este projeto está preparado para um Web Service Node.js no Render.

1. Conecte este repositório ao Render.
2. Use o Build Command: `npm install`
3. Use o Start Command: `npm start`
4. Após o deploy, teste `/mcp`.
5. Registre a URL HTTPS do endpoint no ambiente MCP do ChatGPT.

O servidor escuta `0.0.0.0` e usa a variável `PORT` fornecida pela hospedagem.
