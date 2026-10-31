const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const sourcePath = path.resolve("app/notes-cheat-sheets/troubleshooting/kubernetes-troubleshooting.ts");
const outputDir = path.resolve("app/notes-cheat-sheets/troubleshooting/kubernetes/topics");

const source = fs.readFileSync(sourcePath, "utf8");
const sf = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

let sectionArray = null;

function visit(node) {
  if (
    ts.isPropertyAssignment(node) &&
    node.name.getText(sf).replace(/["']/g, "") === "sections" &&
    ts.isArrayLiteralExpression(node.initializer)
  ) {
    const hasHeading = node.initializer.elements.some(element =>
      ts.isObjectLiteralExpression(element) &&
      element.properties.some(p =>
        ts.isPropertyAssignment(p) &&
        p.name.getText(sf).replace(/["']/g, "") === "heading"
      )
    );

    if (hasHeading && (!sectionArray || node.initializer.elements.length > sectionArray.elements.length)) {
      sectionArray = node.initializer;
    }
  }

  ts.forEachChild(node, visit);
}

visit(sf);

if (!sectionArray) {
  throw new Error("Could not locate the original sections array.");
}

const sections = sectionArray.elements;

if (sections.length !== 28) {
  throw new Error(`Expected 28 sections, but found ${sections.length}. No files were written.`);
}

const mapping = {
  "fundamentals": [1],
  "architecture": [2],
  "installation-cluster-access": [3],
  "pods": [4, 13, 21, 22],
  "deployments": [5],
  "services": [6, 24],
  "networking": [7],
  "dns": [8, 26],
  "ingress": [9],
  "configmaps-secrets": [10],
  "storage": [11],
  "scheduling": [12, 23],
  "security": [14, 17],
  "autoscaling": [15],
  "statefulsets-daemonsets": [16],
  "monitoring": [18],
  "helm": [19],
  "production": [20, 25, 28],
  "troubleshooting-command-reference": [27]
};

const used = Object.values(mapping).flat().sort((a, b) => a - b);
const expected = Array.from({ length: 28 }, (_, i) => i + 1);

if (JSON.stringify(used) !== JSON.stringify(expected)) {
  throw new Error("Mapping validation failed: sections are missing or duplicated. No files were written.");
}

const labels = {
  "fundamentals": "Kubernetes Fundamentals",
  "architecture": "Kubernetes Architecture",
  "installation-cluster-access": "Installation and Cluster Access",
  "pods": "Pods and Pod Troubleshooting",
  "deployments": "Deployments",
  "services": "Services",
  "networking": "Kubernetes Networking",
  "dns": "Kubernetes DNS",
  "ingress": "Ingress",
  "configmaps-secrets": "ConfigMaps and Secrets",
  "storage": "Persistent Storage",
  "scheduling": "Scheduling",
  "security": "Kubernetes Security and RBAC",
  "autoscaling": "Resource Management and Autoscaling",
  "statefulsets-daemonsets": "StatefulSets, DaemonSets and Jobs",
  "monitoring": "Monitoring and Logging",
  "helm": "Helm",
  "production": "Production Deployment and Incidents",
  "troubleshooting-command-reference": "Troubleshooting Command Reference"
};

for (const [slug, numbers] of Object.entries(mapping)) {
  const selected = numbers.map(number => {
    const node = sections[number - 1];
    return source.slice(node.getStart(sf), node.end);
  });

  const title = labels[slug];
  const description = `Detailed Kubernetes notes covering ${title.toLowerCase()}, practical operations, troubleshooting and production scenarios.`;

  const output = [
    'import type { NoteData } from "../../types";',
    "",
    "const data: NoteData = {",
    `  title: ${JSON.stringify(title)},`,
    `  description: ${JSON.stringify(description)},`,
    "  sections: [",
    selected.map(section => "    " + section.replace(/\n/g, "\n    ")).join(",\n"),
    "  ]",
    "};",
    "",
    "export default data;",
    ""
  ].join("\n");

  fs.writeFileSync(path.join(outputDir, `${slug}.ts`), output, "utf8");
  console.log(`Created ${slug}.ts — original sections: ${numbers.join(", ")}`);
}

console.log(`\nSUCCESS: ${used.length} original sections migrated into ${Object.keys(mapping).length} topic files.`);
console.log("Original Kubernetes source file was not modified.");
