"use client";

import { useEffect, useState } from "react";
import { parseAllDocuments } from "yaml";

type ValidationResult = {
  errors: string[];
  warnings: string[];
  documents: number;
};

type Lesson = {
  purpose: string;
  objectives: string[];
  sections: { title: string; explanation: string }[];
  example: string;
  walkthrough: string[];
  practice: { task: string; hint: string; solution: string }[];
  mistakes: { wrong: string; correct: string; reason: string }[];
  scenario: string;
  questions: { question: string; answer: string }[];
};

const lessons: Record<string, Lesson> = {
  "Syntax and Structure": {
    purpose: "Understand how YAML represents configuration as readable structured data, and learn how a YAML document is built from keys, values, mappings, sequences and document markers.",
    objectives: [
      "Recognize YAML key-value pairs and mapping relationships.",
      "Understand how spaces represent nesting.",
      "Distinguish a YAML document from a collection of documents.",
      "Read a real Kubernetes manifest from top to bottom."
    ],
    sections: [
      {
        title: "1. What YAML is and why DevOps uses it",
        explanation: "YAML is a human-readable data serialization format. It is not a programming language: it describes data and desired configuration. DevOps tools read YAML and convert that data into actions. Kubernetes reads resource manifests, GitHub Actions reads workflow definitions, Docker Compose reads service definitions, and Ansible reads playbooks. The tool interpreting the file determines what each key means. YAML itself only defines the structure and values."
      },
      {
        title: "2. Key-value pairs and mappings",
        explanation: "A mapping associates a key with a value using a colon followed by a space. In `name: nginx`, the key is `name` and the string value is `nginx`. A mapping can contain another mapping. For example, `metadata` can contain `name`, `namespace`, and `labels`. These nested relationships are represented by indentation, not curly braces. Keys should be unique within the same mapping because duplicate keys can cause ambiguous or rejected configuration."
      },
      {
        title: "3. YAML documents and document boundaries",
        explanation: "A YAML stream can contain one or more documents. The marker `---` starts a new document. Kubernetes commonly accepts multiple resource documents in one file separated by `---`, such as a Deployment followed by a Service. The marker `...` can explicitly end a document, but it is not required in ordinary configuration files. Each document must still be structurally valid."
      },
      {
        title: "4. Comments and readability",
        explanation: "A `#` begins a comment when it is outside a quoted scalar. Comments help explain operational intent, ownership, ports, and environment-specific decisions. They are not values and are not passed to the application as configuration data. Use comments to explain why a setting exists, not merely repeat the key name. Keep comments accurate when configuration changes."
      },
      {
        title: "5. From YAML structure to a DevOps resource",
        explanation: "A Kubernetes resource typically uses top-level keys such as `apiVersion`, `kind`, `metadata`, and `spec`. `kind` identifies the resource type, `metadata` identifies the object, and `spec` describes the desired state. YAML syntax can be valid while a Kubernetes field is unsupported or semantically incorrect. Syntax parsing and API schema validation are separate checks."
      }
    ],
    example: `# A simple Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: learning
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: nginx
          image: nginx:1.27
          ports:
            - containerPort: 80
---
# A separate Kubernetes Service
apiVersion: v1
kind: Service
metadata:
  name: web-service
  namespace: learning
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP`,
    walkthrough: [
      "`apiVersion` selects the Kubernetes API group and version.",
      "`kind` tells Kubernetes which resource is described.",
      "`metadata` is a nested mapping containing the resource name and namespace.",
      "`spec` contains the desired configuration for this Deployment.",
      "`replicas: 2` is a numeric value, not a quoted string.",
      "`containers` is a sequence because a Pod can contain multiple containers.",
      "`---` separates the Deployment and Service into two YAML documents."
    ],
    practice: [
      {
        task: "Create a ConfigMap document with apiVersion v1, kind ConfigMap, metadata.name app-settings, and data containing LOG_LEVEL: info.",
        hint: "Use four top-level keys. The data mapping must be nested below data.",
        solution: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-settings
data:
  LOG_LEVEL: info`
      },
      {
        task: "Add a second YAML document containing a Service named app-service. Separate it from the first document with the document start marker.",
        hint: "A Service uses apiVersion v1 and kind Service.",
        solution: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-settings
data:
  LOG_LEVEL: info
---
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80`
      }
    ],
    mistakes: [
      {
        wrong: "metadata:\nname: web",
        correct: "metadata:\n  name: web",
        reason: "The name key must be nested under metadata. Indentation expresses the parent-child relationship."
      },
      {
        wrong: "replicas 2",
        correct: "replicas: 2",
        reason: "A mapping entry requires a colon separator between its key and value."
      },
      {
        wrong: "kind: Deployment\nkind: Service",
        correct: "Use separate YAML documents with ---.",
        reason: "A mapping must not contain duplicate keys. Two resources need two documents."
      }
    ],
    scenario: "A team stores a Deployment and Service in one file. The YAML parser reports a mapping error after the second resource was pasted directly below the first. Diagnose the missing document boundary, separate the resources using `---`, and validate each document independently.",
    questions: [
      { question: "What does indentation represent in YAML?", answer: "It represents nesting and parent-child relationships between mappings and sequences." },
      { question: "What does --- do?", answer: "It marks the beginning of another YAML document in a stream." },
      { question: "Does valid YAML guarantee a valid Kubernetes resource?", answer: "No. Kubernetes API schema and semantic validation are separate from YAML syntax parsing." }
    ]
  },

  "Data Types": {
    purpose: "Learn how YAML represents strings, integers, floating-point values, booleans, null values and explicit types, and understand why incorrect types can break DevOps configurations.",
    objectives: [
      "Identify common YAML scalar types.",
      "Understand quoted and unquoted strings.",
      "Recognize boolean and null values.",
      "Avoid accidental type conversion in configuration files."
    ],
    sections: [
      {
        title: "1. Scalar values",
        explanation: "A scalar is a single value rather than a mapping or sequence. Examples include a string such as `nginx`, an integer such as `3`, a decimal such as `0.75`, a boolean such as `true`, and a null value. Scalars are used throughout DevOps files for image names, replica counts, ports, feature flags, timeouts and resource settings."
      },
      {
        title: "2. Strings and quoting",
        explanation: "Strings can often be written without quotes, but quoting is useful when a value contains special characters, leading or trailing spaces, a colon followed by a space, or text that could be interpreted as another type. Single quotes preserve most characters literally. Double quotes support escape sequences such as `\\n` and `\\t`. For example, quote a version-like value or an identifier with leading zeroes when exact text preservation matters."
      },
      {
        title: "3. Integers and floating-point values",
        explanation: "Numeric values should remain numeric when the consuming tool expects numbers. `replicas: 3` is an integer. `threshold: 0.85` is a floating-point value. Writing `replicas: \"3\"` produces a string instead. A YAML parser can accept both, but a Kubernetes API field expecting an integer may reject the string. Match the type required by the application or API schema."
      },
      {
        title: "4. Boolean and null values",
        explanation: "Use `true` and `false` for boolean values. Use `null` or `~` for an explicit null value. An empty value after a colon is also interpreted as null by YAML parsers. Do not assume that the text `yes`, `no`, `on`, or `off` is handled identically by every YAML version and parser. Prefer explicit true and false for portable configuration."
      },
      {
        title: "5. Type mistakes in production",
        explanation: "A configuration can parse successfully and still fail when a consuming system receives a value of the wrong type. Common examples include a quoted replica count, a boolean written as text, a port stored as a string, or a missing value that becomes null. Always validate against the schema of the tool that consumes the YAML, not only against the YAML grammar."
      }
    ],
    example: `application:
  name: "orders-api"
  replicas: 3
  cpuThreshold: 0.85
  enabled: true
  maintenanceMode: false
  optionalDescription: null
  releaseCode: "007"
  endpoint: "https://example.internal"
  message: "Deployment is ready"`,
    walkthrough: [
      "`name` is a string.",
      "`replicas` is an integer.",
      "`cpuThreshold` is a floating-point number.",
      "`enabled` and `maintenanceMode` are booleans.",
      "`optionalDescription` is explicitly null.",
      "`releaseCode` is quoted so its leading zeroes remain part of a string."
    ],
    practice: [
      {
        task: "Write an application configuration with name payments-api, replicas 4, enabled true, timeoutSeconds 30, and optionalNote null.",
        hint: "Use a string for the name, integers for counts and timeout, a boolean for enabled, and null for the optional note.",
        solution: `application:
  name: payments-api
  replicas: 4
  enabled: true
  timeoutSeconds: 30
  optionalNote: null`
      },
      {
        task: "Preserve the release identifier 00042 as text, not as a number.",
        hint: "Quote the identifier.",
        solution: `release:
  identifier: "00042"`
      }
    ],
    mistakes: [
      {
        wrong: "replicas: \"4\"",
        correct: "replicas: 4",
        reason: "The quoted value is a string. Numeric API fields expect a number."
      },
      {
        wrong: "enabled: \"true\"",
        correct: "enabled: true",
        reason: "The quoted value is text, not a boolean."
      },
      {
        wrong: "releaseId: 00042",
        correct: "releaseId: \"00042\"",
        reason: "Identifiers are often strings. Quoting preserves the intended exact representation."
      }
    ],
    scenario: "A Deployment manifest parses, but the Kubernetes API rejects its replica field because the value was quoted. Inspect the parsed type, remove the quotes around the integer, and validate the resource schema again.",
    questions: [
      { question: "What is the type of replicas: 3?", answer: "Integer." },
      { question: "What is the type of enabled: \"true\"?", answer: "String, because the value is quoted." },
      { question: "How can you preserve a code such as 00042?", answer: "Quote it so it is treated as a string." }
    ]
  },

  "Lists": {
    purpose: "Understand YAML sequences, their ordering, list items, nested structures and how DevOps tools use lists for containers, ports, environment variables, pipeline steps and access rules.",
    objectives: [
      "Create block-style sequences using hyphens.",
      "Understand ordered list items.",
      "Create lists of mappings.",
      "Recognize nested sequences and mappings."
    ],
    sections: [
      {
        title: "1. What a sequence is",
        explanation: "A YAML sequence represents an ordered collection of values. Each item in a block-style sequence begins with a hyphen followed by a space. A sequence can contain strings, numbers, mappings, other sequences or a mixture of supported node types. The order is preserved, which matters for pipeline steps and command arguments."
      },
      {
        title: "2. Simple lists",
        explanation: "A simple list contains scalar items such as environment names or allowed ports. Each item aligns at the same indentation level. Do not use commas to separate block-style list items. A list item is a separate YAML node and should be indented consistently beneath its parent key."
      },
      {
        title: "3. Lists of mappings",
        explanation: "DevOps configurations frequently use a list where each item is an object with multiple fields. Kubernetes containers are a common example: each list item has a name, image and ports. The hyphen begins the item, and its properties are indented below it. A second container is another hyphen at the same sequence level."
      },
      {
        title: "4. Nested lists and mappings",
        explanation: "A mapping can contain a sequence, and a sequence item can contain another mapping or sequence. Kubernetes volume mounts, command arguments and CI pipeline steps use these combinations. Read the indentation from the parent key to the list marker and then to the item's properties. Every indentation level communicates a structural relationship."
      },
      {
        title: "5. Flow-style sequences",
        explanation: "A short sequence can also use square brackets, for example `ports: [80, 443]`. This is called flow style. Block style is usually easier to review in large configuration files. Use one style consistently within a section and prefer block style when list items contain multiple fields."
      }
    ],
    example: `services:
  - name: frontend
    image: nginx:1.27
    ports:
      - 8080
      - 8443
  - name: backend
    image: node:22
    ports:
      - 3000

pipeline:
  steps:
    - name: Install dependencies
      command: npm ci
    - name: Run tests
      command: npm test
    - name: Build application
      command: npm run build`,
    walkthrough: [
      "`services` is a sequence containing two service mappings.",
      "Each hyphen starts one service item.",
      "`ports` is a nested sequence inside each service mapping.",
      "`pipeline.steps` is another sequence.",
      "The order of pipeline steps is preserved."
    ],
    practice: [
      {
        task: "Create a list named environments with dev, qa and production in that order.",
        hint: "Use one hyphen per environment.",
        solution: `environments:
  - dev
  - qa
  - production`
      },
      {
        task: "Create two containers named web and worker, each with an image field.",
        hint: "Each container must be a separate mapping item in the containers sequence.",
        solution: `containers:
  - name: web
    image: nginx:1.27
  - name: worker
    image: busybox:1.36`
      }
    ],
    mistakes: [
      {
        wrong: "ports:\n- 80\n  - 443",
        correct: "ports:\n  - 80\n  - 443",
        reason: "Items in the same sequence must align at the same indentation level."
      },
      {
        wrong: "containers:\n  - name: web\n  image: nginx",
        correct: "containers:\n  - name: web\n    image: nginx",
        reason: "The image field belongs to the mapping item and must be indented below it."
      },
      {
        wrong: "environments: dev, qa, production",
        correct: "environments:\n  - dev\n  - qa\n  - production",
        reason: "Comma-separated text is one scalar, not a YAML sequence."
      }
    ],
    scenario: "A Pod specification needs a main application container and a log-forwarder sidecar. The developer accidentally placed the second container's fields under the first item. Separate the two mappings using correctly aligned hyphens and validate the list structure.",
    questions: [
      { question: "Which character begins a block sequence item?", answer: "A hyphen followed by a space." },
      { question: "Does YAML preserve sequence order?", answer: "Yes. Sequence items are ordered." },
      { question: "Can a sequence contain mappings?", answer: "Yes. A list item can be an object containing multiple key-value fields." }
    ]
  },

  "Objects": {
    purpose: "Learn YAML mappings as structured objects, including nested objects, sibling keys, object collections and the relationships used in Kubernetes and CI/CD configuration.",
    objectives: [
      "Create mappings with unique keys.",
      "Build nested objects.",
      "Understand parent and child keys.",
      "Read object structures in real configuration files."
    ],
    sections: [
      {
        title: "1. Mapping fundamentals",
        explanation: "A YAML mapping stores relationships between keys and values. It is commonly used to represent objects such as metadata, application settings, resource specifications and environment configuration. Each key maps to one value. Keys at the same indentation level are siblings. A key indented beneath another mapping belongs to that parent."
      },
      {
        title: "2. Nested objects",
        explanation: "A nested object is a mapping used as the value of another mapping key. For example, `metadata` can contain `labels`, and `labels` can contain `app` and `team`. The indentation communicates the nesting. This structure helps organize complex configuration into logical groups without repeating long key names."
      },
      {
        title: "3. Sibling keys and hierarchy",
        explanation: "Keys aligned at the same indentation level are siblings. A key indented farther to the right is a child of the preceding parent mapping. Misplacing one key by two spaces can change the structure even if the file still parses. Always inspect the resulting hierarchy when a configuration behaves unexpectedly."
      },
      {
        title: "4. Objects inside sequences",
        explanation: "A YAML sequence can contain several mappings. Kubernetes uses this for containers, volumes, ports and environment variables. Each object represents one item with its own fields. The sequence marker belongs to the list level, while the item's keys belong beneath that marker."
      },
      {
        title: "5. Object structure and schema expectations",
        explanation: "A syntactically valid mapping is not necessarily a valid application configuration. A tool may expect a key under `spec` but reject it under `metadata`, or require a nested object with specific fields. Learn the expected schema of the consuming tool and verify the location, name and type of each field."
      }
    ],
    example: `application:
  metadata:
    name: payments-api
    labels:
      app: payments
      team: platform
  runtime:
    replicas: 3
    container:
      image: nginx:1.27
      resources:
        requests:
          cpu: 100m
          memory: 128Mi
        limits:
          cpu: 500m
          memory: 512Mi`,
    walkthrough: [
      "`application` is the root mapping.",
      "`metadata` and `runtime` are sibling mappings.",
      "`name` and `labels` are children of metadata.",
      "`replicas` and `container` are children of runtime.",
      "`resources` contains nested requests and limits mappings."
    ],
    practice: [
      {
        task: "Create an object named database with host, port and credentials.username fields.",
        hint: "credentials must be a nested mapping.",
        solution: `database:
  host: postgres.internal
  port: 5432
  credentials:
    username: app_user`
      },
      {
        task: "Add labels app: checkout and owner: platform under metadata for a resource named checkout-api.",
        hint: "labels is a child of metadata, not a sibling of it.",
        solution: `metadata:
  name: checkout-api
  labels:
    app: checkout
    owner: platform`
      }
    ],
    mistakes: [
      {
        wrong: "metadata:\n  name: app\nlabels:\n  team: platform",
        correct: "metadata:\n  name: app\n  labels:\n    team: platform",
        reason: "The labels mapping must be nested under metadata when that is the intended structure."
      },
      {
        wrong: "database:\n  host: db\n    port: 5432",
        correct: "database:\n  host: db\n  port: 5432",
        reason: "host and port are sibling keys and must use the same indentation."
      },
      {
        wrong: "metadata:\n  name: app\n  name: worker",
        correct: "Use one unique name key or separate resource documents.",
        reason: "Duplicate keys in the same mapping create ambiguity and should be rejected."
      }
    ],
    scenario: "A Kubernetes manifest contains labels at the wrong hierarchy level. The Deployment selector no longer matches the Pod template labels. Compare the intended object tree, move labels under the correct metadata object, and verify that selector and template labels match.",
    questions: [
      { question: "What is a YAML mapping?", answer: "A collection of key-value pairs." },
      { question: "How are nested objects represented?", answer: "By placing child keys at a consistent deeper indentation level." },
      { question: "Can two sibling keys use different indentation?", answer: "They should align at the same indentation level." }
    ]
  },

  "Indentation": {
    purpose: "Master YAML whitespace rules and diagnose indentation errors that commonly break Kubernetes manifests, Helm values, Docker Compose files and CI/CD pipelines.",
    objectives: [
      "Use spaces consistently instead of tabs.",
      "Understand indentation-based nesting.",
      "Recognize incorrect list and mapping alignment.",
      "Debug indentation errors using line and column information."
    ],
    sections: [
      {
        title: "1. Why indentation matters",
        explanation: "YAML uses indentation to define structure. Unlike JSON, it does not rely on braces to show nested objects. A child key is indented beneath its parent. Two sibling keys align at the same level. Therefore, whitespace is part of the data model, not merely visual formatting. Changing indentation can change the parsed structure or make the document invalid."
      },
      {
        title: "2. Spaces versus tabs",
        explanation: "Use spaces for YAML indentation. Tabs are not permitted as indentation in YAML block structure and can produce parser errors. Most teams standardize on two spaces per nesting level, especially for Kubernetes manifests, but the important rule is consistent indentation. Configure editors to insert spaces when the Tab key is pressed."
      },
      {
        title: "3. Mapping indentation",
        explanation: "Mapping keys that belong to the same parent must align. If `name` and `namespace` are both children of `metadata`, they must use the same indentation. If a key is accidentally moved farther right, the parser may treat it as a child of the previous key's value or report an indentation error."
      },
      {
        title: "4. Sequence indentation",
        explanation: "Sequence markers must align with other items in the same list. Fields belonging to one list item must be nested beneath that item. Nested sequences require another consistent indentation level. Carefully compare the hyphen position with the parent key and with the fields inside each item."
      },
      {
        title: "5. Debugging indentation in an editor",
        explanation: "When a parser reports a line and column, inspect the reported line and the lines immediately above it. The real mistake may be the indentation of the parent key or previous list item. Enable visible whitespace, use a YAML-aware formatter, and compare the hierarchy. Formatting can help only after syntax is valid; it cannot always infer the intended structure."
      }
    ],
    example: `apiVersion: v1
kind: Pod
metadata:
  name: web
  labels:
    app: web
spec:
  containers:
    - name: nginx
      image: nginx:1.27
      ports:
        - containerPort: 80`,
    walkthrough: [
      "Top-level keys start at column one.",
      "`name` and `labels` are children of metadata.",
      "`app` is nested under labels.",
      "`containers` is nested under spec.",
      "The hyphen starts a container item.",
      "`name`, `image` and `ports` belong to that container mapping."
    ],
    practice: [
      {
        task: "Correct the indentation so metadata contains both name and namespace.",
        hint: "Both child keys must align.",
        solution: `metadata:
  name: web
  namespace: learning`
      },
      {
        task: "Correct the container list so image is a field of the nginx container.",
        hint: "The image key must be indented below the list item.",
        solution: `spec:
  containers:
    - name: nginx
      image: nginx:1.27`
      }
    ],
    mistakes: [
      {
        wrong: "metadata:\n name: web\n  namespace: learning",
        correct: "metadata:\n  name: web\n  namespace: learning",
        reason: "Sibling mapping keys must align."
      },
      {
        wrong: "containers:\n  - name: nginx\n  image: nginx",
        correct: "containers:\n  - name: nginx\n    image: nginx",
        reason: "The image field belongs inside the container mapping item."
      },
      {
        wrong: "spec:\n\tcontainers: []",
        correct: "spec:\n  containers: []",
        reason: "Tabs must not be used for YAML indentation."
      }
    ],
    scenario: "A CI pipeline configuration fails after a developer edits a nested step. The parser points to a line containing `run`, but the actual issue is that the step's `name` and `run` fields no longer align beneath the same list item. Inspect the surrounding indentation, correct the hierarchy, and run the parser again.",
    questions: [
      { question: "Can tabs be used for YAML indentation?", answer: "No. Use spaces." },
      { question: "How should sibling mapping keys align?", answer: "They should start at the same indentation level." },
      { question: "Where should you look when an indentation error is reported?", answer: "Inspect the reported line and nearby parent or preceding lines because the structural mistake may begin earlier." }
    ]
  }
};

export default function YamlFundamentalsWorkspace({
  topic,
  tab
}: {
  topic: string;
  tab: string;
}) {
  const lesson = lessons[topic];
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [draft, setDraft] = useState(lesson?.example ?? "");
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  useEffect(() => {
    setDraft(lesson?.example ?? "");
    setValidation(null);
  }, [topic, lesson?.example]);

  function validateYaml() {
    try {
      if (!draft.trim()) {
        setValidation({
          errors: ["YAML input is empty. Enter a YAML document and try again."],
          warnings: [],
          documents: 0
        });
        return;
      }

      const documents = parseAllDocuments(draft, { uniqueKeys: true });

      const errors = documents.flatMap((document, documentIndex) =>
        document.errors.map((error) => {
          const position = error.linePos?.[0];
          const location = position
            ? ` (line ${position.line}, column ${position.col})`
            : "";

          return `Document ${documentIndex + 1}${location}: ${error.message}`;
        })
      );

      const warnings = documents.flatMap((document, documentIndex) =>
        document.warnings.map((warning) => {
          const position = warning.linePos?.[0];
          const location = position
            ? ` (line ${position.line}, column ${position.col})`
            : "";

          return `Document ${documentIndex + 1}${location}: ${warning.message}`;
        })
      );

      if (documents.length === 0 && errors.length === 0) {
        errors.push("No YAML documents were detected.");
      }

      setValidation({
        errors,
        warnings,
        documents: documents.length
      });
    } catch (error) {
      setValidation({
        errors: [
          error instanceof Error
            ? error.message
            : "An unexpected YAML parsing error occurred."
        ],
        warnings: [],
        documents: 0
      });
    }
  }

  if (!lesson) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-[#0d1523] p-6">
        <h3 className="text-lg font-bold text-white">{topic}</h3>
        <p className="mt-2 text-sm leading-7 text-rose-300">
          This topic is not registered in the YAML Fundamentals lesson catalog.
          Please check the topic name and curriculum route.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-cyan-900/60 bg-gradient-to-br from-cyan-950/30 to-[#0d1523] p-5 sm:p-7">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
          YAML Fundamentals · {tab} workspace
        </div>
        <h3 className="mt-2 text-2xl font-bold text-white">{topic}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.purpose}</p>
        <div className="mt-5">
          <h4 className="text-sm font-bold text-white">What you will learn</h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {lesson.objectives.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-6 text-slate-300">
                <span className="text-cyan-300">✓</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(tab === "Learn" || tab === "Examples") && (
        <>
          {lesson.sections.map((section, index) => (
            <article key={section.title} className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
              <div className="text-xs font-bold text-cyan-400">CONCEPT {String(index + 1).padStart(2, "0")}</div>
              <h4 className="mt-2 text-base font-bold text-white">{section.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">{section.explanation}</p>
            </article>
          ))}
          <article className="overflow-hidden rounded-xl border border-slate-800 bg-[#0d1523]">
            <div className="border-b border-slate-800 px-5 py-3">
              <h4 className="font-bold text-white">Complete YAML example</h4>
              <p className="mt-1 text-xs text-slate-400">Study the structure before changing it in the editor.</p>
            </div>
            <pre className="overflow-x-auto bg-[#070c14] p-5 text-xs leading-6 text-emerald-300"><code>{lesson.example}</code></pre>
            <div className="space-y-2 p-5">
              <h5 className="text-sm font-bold text-white">Read the example step by step</h5>
              {lesson.walkthrough.map((line, index) => (
                <p key={line} className="text-xs leading-6 text-slate-300">
                  <span className="mr-2 text-cyan-400">{index + 1}.</span>{line}
                </p>
              ))}
            </div>
          </article>
        </>
      )}

      {(tab === "Practice" || tab === "Examples") && (
        <article className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
          <h4 className="text-lg font-bold text-white">Hands-on practice exercises</h4>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Try each task in the YAML editor below. Reveal the reference solution only after attempting it.
          </p>
          <div className="mt-4 space-y-4">
            {lesson.practice.map((item, index) => (
              <div key={item.task} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <div className="text-xs font-bold text-cyan-300">CHALLENGE {index + 1}</div>
                <p className="mt-2 text-sm leading-6 text-white">{item.task}</p>
                <label className="mt-3 block text-xs text-slate-400">Your approach / notes</label>
                <textarea
                  value={answers[index] ?? ""}
                  onChange={(event) => setAnswers((old) => ({ ...old, [index]: event.target.value }))}
                  placeholder="Write what you changed or what you learned..."
                  className="mt-2 min-h-20 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 outline-none focus:border-cyan-600"
                />
                <p className="mt-2 text-xs text-amber-300">Hint: {item.hint}</p>
                <button
                  type="button"
                  onClick={() => setRevealed((old) => ({ ...old, [index]: !old[index] }))}
                  className="mt-3 rounded-lg border border-cyan-800 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-950/40"
                >
                  {revealed[index] ? "Hide reference solution" : "Reveal reference solution"}
                </button>
                {revealed[index] && (
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-[#070c14] p-3 text-xs leading-6 text-emerald-300"><code>{item.solution}</code></pre>
                )}
              </div>
            ))}
          </div>
        </article>
      )}
      {tab === "Debug" && (
        <article className="rounded-xl border border-rose-900/50 bg-[#0d1523] p-5">
          <h4 className="text-lg font-bold text-white">Find and fix common mistakes</h4>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Compare incorrect YAML with the corrected structure. Use the Validate workspace
            to test your own configuration and inspect actual parser diagnostics.
          </p>
          <div className="mt-4 space-y-4">
            {lesson.mistakes.map((item, index) => (
              <div key={item.wrong} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="text-xs font-bold text-rose-300">ISSUE {index + 1} · INCORRECT</div>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-[#070c14] p-3 text-xs leading-6 text-rose-300"><code>{item.wrong}</code></pre>
                <div className="mt-3 text-xs font-bold text-emerald-300">CORRECTED</div>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-[#070c14] p-3 text-xs leading-6 text-emerald-300"><code>{item.correct}</code></pre>
                <p className="mt-2 text-xs leading-6 text-slate-300">{item.reason}</p>
              </div>
            ))}
          </div>
        </article>
      )}

      {tab === "Validate" && (
        <article className="space-y-4 rounded-xl border border-cyan-900/50 bg-[#0d1523] p-5">
          <div>
            <h4 className="text-lg font-bold text-white">Interactive YAML Syntax Validator</h4>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Edit the YAML configuration, then run the local parser. It checks YAML syntax,
              duplicate mapping keys, and multiple YAML documents. It does not validate
              Kubernetes API schemas or application-specific configuration rules.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="fundamentals-yaml-editor" className="text-sm font-semibold text-cyan-300">
              YAML configuration editor
            </label>
            <button
              type="button"
              onClick={() => {
                setDraft(lesson.example);
                setValidation(null);
              }}
              className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
            >
              Restore lesson example
            </button>
          </div>

          <textarea
            id="fundamentals-yaml-editor"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setValidation(null);
            }}
            spellCheck={false}
            rows={20}
            className="w-full rounded-xl border border-slate-700 bg-[#070c14] p-4 font-mono text-xs leading-6 text-emerald-300 outline-none focus:border-cyan-500"
            aria-label="Editable YAML configuration"
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={validateYaml}
              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-600"
            >
              Validate YAML
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft("");
                setValidation(null);
              }}
              className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm text-slate-200 hover:bg-slate-800"
            >
              Clear editor
            </button>
          </div>

          {validation && (
            <section className="space-y-3 rounded-xl border border-slate-700 bg-slate-950 p-4" aria-live="polite">
              <h5 className="font-bold text-white">Validation results</h5>

              {validation.errors.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-300">
                    YAML syntax validation passed.
                  </p>
                  <p className="text-xs text-slate-300">
                    Successfully parsed {validation.documents} YAML document(s).
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-rose-300">
                    Found {validation.errors.length} parsing error(s).
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-xs leading-6 text-rose-200">
                    {validation.errors.map((error, index) => (
                      <li key={`${index}-${error}`}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validation.warnings.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-amber-300">
                    Parser warnings: {validation.warnings.length}
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-xs leading-6 text-amber-200">
                    {validation.warnings.map((warning, index) => (
                      <li key={`${index}-${warning}`}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="border-t border-slate-800 pt-3 text-xs leading-5 text-slate-400">
                A successful YAML parse confirms syntax only. Validate the configuration
                against the schema and rules of the actual system that consumes it.
              </p>
            </section>
          )}
        </article>
      )}
      {tab === "Scenarios" && (
        <article className="rounded-xl border border-amber-900/50 bg-[#0d1523] p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-300">DevOps troubleshooting scenario</div>
          <h4 className="mt-2 text-lg font-bold text-white">Production-style investigation</h4>
          <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.scenario}</p>
          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-xs font-semibold text-white">Your investigation checklist</p>
            <ul className="mt-2 space-y-2 text-xs leading-6 text-slate-300">
              <li>1. Identify the YAML structure involved.</li>
              <li>2. Reproduce the configuration in the editor.</li>
              <li>3. Inspect parser errors and line/column details.</li>
              <li>4. Correct the structure and validate again.</li>
              <li>5. Explain why the original configuration failed.</li>
            </ul>
          </div>
        </article>
      )}

      {tab === "Quiz" && (
        <article className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
          <h4 className="text-lg font-bold text-white">Knowledge check</h4>
          <p className="mt-2 text-xs text-slate-400">Try answering before revealing the explanation.</p>
          <div className="mt-4 space-y-4">
            {lesson.questions.map((item, index) => (
              <div key={item.question} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-white">{index + 1}. {item.question}</p>
                <button
                  type="button"
                  onClick={() => setRevealed((old) => ({ ...old, [index + 20]: !old[index + 20] }))}
                  className="mt-3 rounded-lg border border-cyan-800 px-3 py-2 text-xs text-cyan-300"
                >
                  {revealed[index + 20] ? "Hide answer" : "Show answer"}
                </button>
                {revealed[index + 20] && (
                  <p className="mt-3 rounded-lg bg-slate-950 p-3 text-xs leading-6 text-emerald-300">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
