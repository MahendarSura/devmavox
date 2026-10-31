const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const base = path.resolve(
  "app/notes-cheat-sheets/troubleshooting"
);

const sourcePath = path.join(base, "docker-troubleshooting.ts");
const source = fs.readFileSync(sourcePath, "utf8");

const sourceFile = ts.createSourceFile(
  sourcePath,
  source,
  ts.ScriptTarget.Latest,
  true
);

const mapping = {
  1: "fundamentals",
  2: "fundamentals",
  3: "installation",
  4: "dockerfile",
  5: "images",
  6: "containers",
  7: "containers",
  8: "networking",
  9: "volumes",
  10: "compose",
  11: "registry",
  12: "security",
  13: "performance",
  14: "performance",
  15: "containers",
  16: "dockerfile",
  17: "performance",
  18: "performance",
  19: "production",
  20: "production",
  21: "production",
  22: "registry",
  23: "volumes",
  24: "production",
  25: "production"
};

let sectionsArray = null;
let originalData = null;

function visit(node) {
  if (ts.isVariableDeclaration(node) &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)) {

    const sectionsProperty = node.initializer.properties.find(
      p => ts.isPropertyAssignment(p) &&
      p.name &&
      p.name.getText(sourceFile).replace(/["']/g, "") === "sections"
    );

    if (sectionsProperty &&
        ts.isArrayLiteralExpression(sectionsProperty.initializer)) {
      sectionsArray = sectionsProperty.initializer;
      originalData = node.initializer;
    }
  }

  ts.forEachChild(node, visit);
}

visit(sourceFile);

if (!sectionsArray || !originalData) {
  throw new Error("Could not locate Docker sections array. No files written.");
}

const groups = {};

for (const section of sectionsArray.elements) {
  if (!ts.isObjectLiteralExpression(section)) {
    throw new Error("Unexpected section format. Migration stopped.");
  }

  const headingProperty = section.properties.find(
    p => ts.isPropertyAssignment(p) &&
    p.name &&
    p.name.getText(sourceFile).replace(/["']/g, "") === "heading"
  );

  if (!headingProperty || !ts.isStringLiteral(headingProperty.initializer)) {
    throw new Error("Could not read a section heading. Migration stopped.");
  }

  const heading = headingProperty.initializer.text;
  const match = heading.match(/^(\d+)\./);

  if (!match) {
    throw new Error("Missing section number: " + heading);
  }

  const number = Number(match[1]);
  const topic = mapping[number];

  if (!topic) {
    throw new Error("No topic mapping for section " + number);
  }

  if (!groups[topic]) groups[topic] = [];
  groups[topic].push(section.getText(sourceFile));
}

const expected = Object.keys(mapping).length;
const actual = sectionsArray.elements.length;

if (actual !== expected) {
  throw new Error(
    `Expected ${expected} sections, found ${actual}. No files written.`
  );
}

const topicsDir = path.join(base, "docker", "topics");

for (const [topic, sections] of Object.entries(groups)) {
  const title = topic
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const output = `import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker ${title}",
  description: "Detailed Docker ${title.toLowerCase()} notes, practical steps, commands, root causes and solutions.",
  sections: [
${sections.map(s => "    " + s).join(",\n")}
  ]
};

export default data;
`;

  const destination = path.join(topicsDir, `${topic}.ts`);

  fs.writeFileSync(destination, output, "utf8");
  console.log(`Created ${topic}.ts (${sections.length} sections)`);
}

console.log(`\nSUCCESS: ${actual} sections distributed across ${Object.keys(groups).length} topic files.`);
