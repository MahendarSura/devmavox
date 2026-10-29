const fs = require("fs");

const file = "app/notes-cheat-sheets/commands-data.ts";
const source = fs.readFileSync(file, "utf8");

const tools = [...source.matchAll(
  /\{\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*commands:\s*\[([\s\S]*?)\]\s*\}/g
)];

console.log("\nCURRENT DEVOPS COMMAND LIBRARY\n");

for (const tool of tools) {
  const commands = [...tool[3].matchAll(
    /\{\s*command:\s*"/g
  )].length;

  console.log(
    `${tool[1].padEnd(26)} ${String(commands).padStart(4)} commands  |  ${tool[2]}`
  );
}

console.log(`\nTools detected: ${tools.length}`);
