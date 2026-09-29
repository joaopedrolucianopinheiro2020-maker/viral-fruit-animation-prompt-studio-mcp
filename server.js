import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";

const server = new McpServer({
  name: "viral-fruit-animation-prompt-studio",
  version: "0.5.1"
});

const widget = readFileSync(new URL("./public/start-widget.html", import.meta.url), "utf8");
const URI = "ui://viral-fruit/start/v1.html";

registerAppResource(
  server,
  "viral-fruit-start",
  URI,
  {},
  async () => ({
    contents: [{
      uri: URI,
      mimeType: RESOURCE_MIME_TYPE,
      text: widget,
      _meta: { ui: { prefersBorder: true } }
    }]
  })
);

registerAppTool(
  server,
  "show_start_screen",
  {
    title: "Abrir Viral Fruit Prompt Studio",
    description: "Mostra a tela inicial interativa do Viral Fruit Animation Prompt Studio.",
    inputSchema: {},
    _meta: { ui: { resourceUri: URI } }
  },
  async () => ({
    content: [{
      type: "text",
      text: "Tela inicial aberta. Clique em INICIAR para escolher um fluxo."
    }]
  })
);

const http = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, MCP-Protocol-Version, MCP-Session-Id",
      "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS"
    });
    res.end();
    return;
  }

  if (req.url !== "/mcp") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined
  });

  res.on("close", () => transport.close());

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("MCP error");
    }
  }
});

const port = Number(process.env.PORT || 8787);
http.listen(port, "0.0.0.0", () => {
  console.log(`Viral Fruit MCP listening on :${port}/mcp`);
});
