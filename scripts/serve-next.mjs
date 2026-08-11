import http from "node:http";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";

const publicPort = 6000;
const nextPort = 6001;
const command = process.argv[2] ?? "dev";
const nextArgs = process.argv.slice(3);
const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

const nextProcess = spawn(
  process.execPath,
  [nextBin, command, "--port", String(nextPort), ...nextArgs],
  { env: process.env, stdio: "inherit" },
);

const proxy = http.createServer((request, response) => {
  const upstream = http.request(
    {
      hostname: "127.0.0.1",
      port: nextPort,
      path: request.url,
      method: request.method,
      headers: request.headers,
    },
    (upstreamResponse) => {
      response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
      upstreamResponse.pipe(response);
    },
  );

  upstream.on("error", () => {
    if (!response.headersSent) {
      response.writeHead(502);
      response.end("Next.js is not ready yet.");
    } else {
      response.destroy();
    }
  });

  request.pipe(upstream);
});

proxy.on("upgrade", (request, socket, head) => {
  const upstream = http.request({
    hostname: "127.0.0.1",
    port: nextPort,
    path: request.url,
    method: request.method,
    headers: request.headers,
  });

  upstream.on("upgrade", (response, upstreamSocket, upstreamHead) => {
    socket.write("HTTP/1.1 101 Switching Protocols\r\n");
    for (const [key, value] of Object.entries(response.headers)) {
      if (value !== undefined) socket.write(`${key}: ${value}\r\n`);
    }
    socket.write("\r\n");
    if (upstreamHead.length) upstreamSocket.write(upstreamHead);
    if (head.length) upstreamSocket.write(head);
    upstreamSocket.pipe(socket).pipe(upstreamSocket);
  });

  upstream.on("error", () => socket.destroy());
  upstream.end();
});

let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  nextProcess.kill("SIGINT");
  proxy.close(() => process.exit(exitCode));
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());
nextProcess.on("exit", (code) => shutdown(code ?? 0));

proxy.listen(publicPort, "127.0.0.1", () => {
  console.log(`Public ${command} server: http://localhost:${publicPort}`);
});
