const fs = require("fs");
const ts = require("typescript");

const master = "interview-qa-master.json";
const target = "app/notes-cheat-sheets/interview-revision/interview-qa.ts";

const tools = [
  "AWS","Docker","Kubernetes","Jenkins","Git","Terraform",
  "Ansible","Linux","ArgoCD","Helm","Prometheus","Grafana",
  "EKS","Maven","Nexus","Jira","Tomcat"
];

const data = JSON.parse(fs.readFileSync(master, "utf8"));

if (!Array.isArray(data) || data.length !== 119) {
  throw new Error("Master dataset must contain 119 tool/category sections.");
}

const counts = {
  "Basic Interview Questions": 35,
  "Intermediate Interview Questions": 40,
  "Advanced Interview Questions": 35,
  "Real-Time Production Scenario Questions": 40,
  "Troubleshooting-Based Questions": 40,
  "Scenario-Based Practical Questions": 35,
  "Frequently Asked Interview Questions": 25
};

let total = 0;
const seen = new Set();
const output = [];

for (const tool of tools) {
  for (const [category, required] of Object.entries(counts)) {
    const entry = data.find(x => x.tool === tool && x.category === category);

    if (!entry || !Array.isArray(entry.interviewQuestions) ||
        entry.interviewQuestions.length !== required) {
      throw new Error(`${tool} / ${category}: expected ${required} completed Q&A.`);
    }

    for (const qa of entry.interviewQuestions) {
      if (!qa.question?.trim() || !qa.answer?.trim()) {
        throw new Error(`Empty Q&A found in ${tool} / ${category}.`);
      }

      const key = qa.question.trim().toLowerCase();
      if (seen.has(key)) throw new Error(`Duplicate question: ${qa.question}`);
      seen.add(key);
      total++;
    }

    output.push({
      heading: `${tool} - ${category}`,
      explanation: `${category} for ${tool}, with practical DevOps concepts and examples.`,
      interviewQuestions: entry.interviewQuestions
    });
  }
}

if (total !== 4250) throw new Error(`Expected 4250 Q&A; found ${total}.`);

const oldSource = fs.readFileSync(target, "utf8");
const oldAst = ts.createSourceFile(
  target, oldSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS
);

if (!oldAst.statements.some(s =>
  ts.isExportAssignment(s) &&
  ts.isIdentifier(s.expression) &&
  s.expression.text === "data"
)) {
  throw new Error("Existing export default data not found. Aborting.");
}

const generated = "const data = " + JSON.stringify(output, null, 2) +
  ";\n\nexport default data;\n";

const generatedAst = ts.createSourceFile(
  target, generated, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS
);

if (generatedAst.parseDiagnostics.length) {
  throw new Error("Generated TypeScript syntax validation failed.");
}

const backup = `${target}.backup-${new Date().toISOString().replace(/[:.]/g, "-")}`;
fs.copyFileSync(target, backup);
fs.writeFileSync(target, generated, "utf8");

console.log("SUCCESS: 17 tools, 7 categories, 4,250 unique Q&A.");
console.log("Backup: " + backup);
console.log("Updated: " + target);
