const http = require("node:http");
const crypto = require("node:crypto");
const { spawn } = require("node:child_process");
const { WebSocketServer } = require("ws");

const PORT = Number(process.env.PORT || 7681);
const TOKEN = process.env.LAB_TERMINAL_TOKEN;
if (!TOKEN || TOKEN.length < 32) throw new Error("LAB_TERMINAL_TOKEN must be a random secret of at least 32 characters");

const server = http.createServer((req, res) => {
  if (req.url === "/health") { res.writeHead(200, {"content-type":"application/json"}); res.end(JSON.stringify({status:"ok"})); return; }
  res.writeHead(404); res.end("not found");
});
const wss = new WebSocketServer({ noServer: true, maxPayload: 4096 });
server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url, "http://localhost");
  const supplied = url.searchParams.get("token") || "";
  const a = Buffer.from(supplied), b = Buffer.from(TOKEN);
  if (url.pathname !== "/terminal" || a.length !== b.length || !crypto.timingSafeEqual(a,b)) { socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n"); socket.destroy(); return; }
  wss.handleUpgrade(req, socket, head, ws => wss.emit("connection", ws, req));
});
wss.on("connection", ws => {
  const child = spawn("/bin/bash", ["--noprofile", "--norc", "-i"], {cwd:"/workspace",env:{...process.env,TERM:"dumb",PS1:"student@devmavox:~/workspace$ "},stdio:["pipe","pipe","pipe"]});
  const send = chunk => { if (ws.readyState === ws.OPEN) ws.send(chunk.toString()); };
  child.stdout.on("data", send); child.stderr.on("data", send);
  child.on("close", code => { if(ws.readyState===ws.OPEN) ws.send("\r\n[terminal exited: "+code+"]\r\n"); ws.close(); });
  ws.on("message", data => {
    const input=data.toString();
    if(input.length>2048) return;
    child.stdin.write(input);
  });
  ws.on("close",()=>child.kill("SIGTERM"));
});
server.listen(PORT,"0.0.0.0",()=>console.log("DevMavox lab terminal listening on "+PORT));
