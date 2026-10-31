const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const dir = path.join(process.cwd(), "app", "notes & cheatsheest");
const dataFile = path.join(dir, "commands-data.ts");
const pageFile = path.join(dir, "page.tsx");

const source = fs.readFileSync(dataFile, "utf8");
const ast = ts.createSourceFile(dataFile, source, ts.ScriptTarget.Latest, true);

function propertyValue(obj, key) {
  const prop = obj.properties.find(p =>
    ts.isPropertyAssignment(p) &&
    ((ts.isIdentifier(p.name) && p.name.text === key) ||
     (ts.isStringLiteral(p.name) && p.name.text === key))
  );
  if (!prop) return null;
  if (ts.isStringLiteral(prop.initializer)) return prop.initializer.text;
  return null;
}

const declarations = ast.statements
  .filter(s => ts.isTypeAliasDeclaration(s) || ts.isInterfaceDeclaration(s))
  .map(s => source.slice(s.getFullStart(), s.end).trim())
  .join("\n\n");

if (!declarations.includes("DevOpsTool") || !declarations.includes("DevOpsCommand")) {
  throw new Error("Could not find DevOpsTool / DevOpsCommand type declarations.");
}

const variable = ast.statements
  .filter(ts.isVariableStatement)
  .flatMap(s => s.declarationList.declarations)
  .find(d => ts.isIdentifier(d.name) && d.name.text === "devOpsTools");

if (!variable || !variable.initializer || !ts.isArrayLiteralExpression(variable.initializer)) {
  throw new Error("Could not locate devOpsTools array.");
}

const tools = variable.initializer.elements.filter(ts.isObjectLiteralExpression);

if (tools.length !== 29) {
  throw new Error(`Expected 29 tool objects, found ${tools.length}. No files were changed.`);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(dir, `backup-before-split-${timestamp}`);
fs.mkdirSync(backupDir, { recursive: true });

fs.copyFileSync(dataFile, path.join(backupDir, "commands-data.ts"));
fs.copyFileSync(pageFile, path.join(backupDir, "page.tsx"));

for (const name of fs.readdirSync(dir)) {
  if (name.endsWith("-commands.ts") || name === "command-types.ts" || name === "devops-tools.ts") {
    fs.copyFileSync(path.join(dir, name), path.join(backupDir, name));
  }
}

fs.writeFileSync(
  path.join(dir, "command-types.ts"),
  declarations + "\n",
  "utf8"
);

const usedFiles = new Set();
const imports = [];
const exportNames = [];

for (const tool of tools) {
  const name = propertyValue(tool, "name");
  if (!name) throw new Error("A tool object has no string name.");

  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const fileName = `${slug}-commands.ts`;
  if (usedFiles.has(fileName)) throw new Error(`Duplicate tool filename: ${fileName}`);
  usedFiles.add(fileName);

  const exportName = slug.split("-").map((part, i) =>
    i === 0 ? part : part[0].toUpperCase() + part.slice(1)
  ).join("") + "Tool";

  const objectText = source.slice(tool.getStart(ast), tool.end);

  fs.writeFileSync(
    path.join(dir, fileName),
    `import type { DevOpsTool } from "./command-types";\n\nexport const ${exportName}: DevOpsTool = ${objectText};\n`,
    "utf8"
  );

  imports.push(`import { ${exportName} } from "./${slug}-commands";`);
  exportNames.push(exportName);
}

const aggregator =
  `import type { DevOpsTool } from "./command-types";\n` +
  imports.join("\n") +
  `\n\nexport const devOpsTools: DevOpsTool[] = [\n  ` +
  exportNames.join(",\n  ") +
  `\n];\n`;

fs.writeFileSync(path.join(dir, "devops-tools.ts"), aggregator, "utf8");

let page = fs.readFileSync(pageFile, "utf8");
const oldImport = /import\s*\{\s*devOpsTools\s*\}\s*from\s*["']\.\/commands-data["'];?/;

if (!oldImport.test(page)) {
  throw new Error('Could not find page.tsx import from "./commands-data". Backups were created; inspect page.tsx import.');
}

page = page.replace(oldImport, 'import { devOpsTools } from "./devops-tools";');
fs.writeFileSync(pageFile, page, "utf8");

console.log(`Successfully split ${tools.length} tools.`);
console.log(`Backup folder: ${backupDir}`);
console.log("commands-data.ts has NOT been deleted.");

