"use client";

import { useEffect, useMemo, useState } from "react";

type Question = { prompt: string; choices: string[]; answer: number; explanation: string };

const questions: Question[] = [
{ prompt: "Which YAML structure stores key-value pairs?", choices: ["Mapping", "Sequence", "Comment", "Document marker"], answer: 0, explanation: "A mapping associates keys with values using a colon." },
    { prompt: "Which character introduces a sequence item?", choices: ["#", "-", "&", ":"], answer: 1, explanation: "A hyphen followed by a space introduces a sequence item." },
    { prompt: "What does indentation define in YAML?", choices: ["File encoding", "Parent-child structure", "Network access", "Variable scope"], answer: 1, explanation: "Indentation expresses nesting and parent-child relationships." },
    { prompt: "Which value is a boolean?", choices: ['"true"', "enabled", "true", "1.0"], answer: 2, explanation: "The unquoted YAML scalar true is a boolean value." },
    { prompt: "What is the purpose of an anchor and alias?", choices: ["Encrypt values", "Reuse a YAML node", "Validate a schema", "Start a new file"], answer: 1, explanation: "Anchors name reusable nodes and aliases refer to them." },
    { prompt: "In Learn YAML, what is the best way to handle mappings and sequences?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Learn YAML, what is the best way to handle scalar types and quoting?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Learn YAML, what is the best way to handle nested mappings?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Learn YAML, what is the best way to handle block strings?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Learn YAML, what is the best way to handle document separators?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "Which evidence is most useful when reviewing anchors and aliases?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing merge keys?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing list of objects?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing indentation?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing duplicate keys?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "A problem is reported involving null values. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving boolean values. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving numeric identifiers. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving flow collections. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving comments. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "Which practice improves reliability for YAML parser errors?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for multi-document streams?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for folded block scalars?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for explicit tags?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for portable YAML syntax?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
{ prompt: "What should you identify before editing a YAML file?", choices: ["Editor theme", "Consumer and expected schema", "File icon", "Screen size"], answer: 1, explanation: "The consuming tool and expected schema determine valid fields and types." },
    { prompt: "How should a focused edit be performed?", choices: ["Replace the entire file", "Change one logical section and review siblings", "Delete unknown fields", "Disable validation"], answer: 1, explanation: "Small, reviewed changes reduce accidental configuration damage." },
    { prompt: "Where should production credentials be stored?", choices: ["Plain YAML committed to Git", "Comments", "Approved secret manager", "Image tag"], answer: 2, explanation: "Use an approved secret manager or protected secret injection." },
    { prompt: "Why compare environment configurations?", choices: ["To find unintended differences", "To remove version control", "To skip tests", "To change indentation"], answer: 0, explanation: "Reviewing differences catches accidental production configuration drift." },
    { prompt: "What must be checked after rendering a template?", choices: ["Only template syntax", "Generated YAML output", "File color", "Editor font"], answer: 1, explanation: "A valid template can still generate invalid YAML or application configuration." },
    { prompt: "In YAML Editor, what is the best way to handle consumer schema and version?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In YAML Editor, what is the best way to handle small focused edits?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In YAML Editor, what is the best way to handle diff review?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In YAML Editor, what is the best way to handle environment overlays?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In YAML Editor, what is the best way to handle Helm rendered output?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "Which evidence is most useful when reviewing secret references?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing editor diagnostics?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing nested list editing?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing version-control recovery?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing configuration precedence?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "A problem is reported involving unknown fields. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving formatting consistency. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving emergency change records. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving concurrent edits. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving clean exports. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "Which practice improves reliability for template variables?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for protected values?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for review approvals?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for post-edit validation?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for change traceability?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
{ prompt: "What does a YAML parser prove when it succeeds?", choices: ["The cluster accepts the resource", "The document is syntactically parseable", "The application is healthy", "All policies pass"], answer: 1, explanation: "Parsing verifies YAML syntax, not API schema or runtime behavior." },
    { prompt: "Which command asks a Kubernetes API server to validate without persisting?", choices: ["kubectl get pods", "kubectl apply --dry-run=server -f file.yaml", "kubectl delete -f file.yaml", "kubectl logs"], answer: 1, explanation: "Server-side dry-run sends the object through API validation and admission without saving it." },
    { prompt: "What can schema validation detect?", choices: ["Missing required fields and wrong types", "Slow network packets", "Container CPU usage", "Git conflicts"], answer: 0, explanation: "Schemas define allowed fields, required properties, types and constraints." },
    { prompt: "A valid integer port is 70000. What kind of issue may this be?", choices: ["YAML indentation", "Semantic or schema constraint", "Comment syntax", "Sequence marker"], answer: 1, explanation: "The scalar parses as an integer but violates the valid port range." },
    { prompt: "Why inspect the previous line after a parser error?", choices: ["The original quote or indentation error may begin earlier", "Previous lines are ignored", "Kubernetes rewrites YAML", "It changes the schema"], answer: 0, explanation: "Parser locations can point where parsing failed, not where the mistake started." },
    { prompt: "In YAML Validator, what is the best way to handle syntax parsing?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In YAML Validator, what is the best way to handle schema validation?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In YAML Validator, what is the best way to handle server-side dry-run?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In YAML Validator, what is the best way to handle duplicate-key detection?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In YAML Validator, what is the best way to handle semantic constraints?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "Which evidence is most useful when reviewing kubectl explain?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing lint diagnostics?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing admission policies?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing runtime verification?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing multi-document validation?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "A problem is reported involving line and column errors. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving API version compatibility. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving kubectl diff. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving CRD schemas. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving warning severity. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "Which practice improves reliability for client versus server checks?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for selector relationships?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for resource field types?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for validation reports?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for revalidation?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
{ prompt: "What is a safe first step during a production configuration incident?", choices: ["Apply an unreviewed fix", "Collect evidence and assess impact", "Delete all Pods", "Disable monitoring"], answer: 1, explanation: "Evidence and impact assessment reduce risk and preserve diagnostic context." },
    { prompt: "Which probe determines whether a Pod should receive Service traffic?", choices: ["Liveness", "Readiness", "Startup only", "Exec shell"], answer: 1, explanation: "Readiness controls whether the Pod is considered ready for traffic." },
    { prompt: "What is the purpose of maxUnavailable: 0 in a rolling update?", choices: ["Allow all replicas to stop", "Avoid intentionally reducing available replicas during rollout", "Disable readiness", "Skip new Pods"], answer: 1, explanation: "It prevents the rollout controller from voluntarily taking existing available replicas below the configured availability target." },
    { prompt: "How should production secrets be handled?", choices: ["Commit them in values.yaml", "Use controlled secret management and least privilege", "Print them in logs", "Store in labels"], answer: 1, explanation: "Secret storage, access control and rotation must be managed explicitly." },
    { prompt: "When should rollback be initiated?", choices: ["Whenever a deployment starts", "When defined health or success criteria fail", "Before collecting evidence", "After deleting history"], answer: 1, explanation: "Predefined rollback criteria make recovery controlled and auditable." },
    { prompt: "In Production Scenarios, what is the best way to handle incident impact assessment?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Production Scenarios, what is the best way to handle readiness probes?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Production Scenarios, what is the best way to handle rolling update availability?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Production Scenarios, what is the best way to handle rollback criteria?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Production Scenarios, what is the best way to handle credential rotation?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "Which evidence is most useful when reviewing stalled rollout diagnosis?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing Service endpoints?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing Pending Pod scheduling?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing CrashLoopBackOff evidence?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing GitOps drift?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "A problem is reported involving dependency failures. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving node maintenance. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving secret version rollout. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving capacity constraints. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving rollout monitoring. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "Which practice improves reliability for known-good recovery?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for transient evidence capture?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for immutable selectors?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for post-incident verification?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for emergency change audit?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
{ prompt: "What is the first validation layer for a YAML document?", choices: ["Runtime test", "Syntax parsing", "Production rollout", "Load test"], answer: 1, explanation: "Syntax parsing establishes that the document can be read as YAML." },
    { prompt: "A Deployment selector does not match Pod template labels. What is the risk?", choices: ["Controller cannot select intended Pods", "YAML becomes JSON", "Image is automatically rebuilt", "Secret is rotated"], answer: 0, explanation: "The selector must match template labels for the Deployment to manage its Pods." },
    { prompt: "Which evidence is most useful for a CrashLoopBackOff investigation?", choices: ["Pod events and previous container logs", "Only the YAML filename", "Browser cache", "GitHub avatar"], answer: 0, explanation: "Events and previous logs reveal scheduling, startup and process failures." },
    { prompt: "What should a production review include?", choices: ["Only syntax", "Security, resources, health, rollout and rollback", "Only comments", "Only image name"], answer: 1, explanation: "Production readiness spans operational, security and recovery controls." },
    { prompt: "What makes an assessment result meaningful?", choices: ["Score without feedback", "Score, correct answers and explanations", "Random completion state", "Hidden answer key"], answer: 1, explanation: "Feedback helps learners understand gaps and improve." },
    { prompt: "In Quiz and Assessment, what is the best way to handle syntax versus application validity?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Quiz and Assessment, what is the best way to handle Deployment selector matching?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Quiz and Assessment, what is the best way to handle CrashLoopBackOff evidence?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Quiz and Assessment, what is the best way to handle production readiness?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "In Quiz and Assessment, what is the best way to handle assessment feedback?", choices: ["Apply the documented rule and verify the resulting configuration", "Ignore the consumer requirements", "Change unrelated settings", "Assume defaults always apply"], answer: 0, explanation: "The correct approach is to follow the consumer's requirements and verify the effective configuration." },
    { prompt: "Which evidence is most useful when reviewing scalar type correctness?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing safe delivery sequence?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing evidence-led incident response?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing Service endpoint selection?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "Which evidence is most useful when reviewing Pod event diagnosis?", choices: ["The relevant YAML, validation output and target-system state", "Only the file name", "Only editor appearance", "An unrelated application log"], answer: 0, explanation: "Review the configuration together with validation and target-system evidence." },
    { prompt: "A problem is reported involving probe responsibilities. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving secret handling. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving least-privilege decisions. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving Helm rendered manifests. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "A problem is reported involving GitOps desired state. What should you do first?", choices: ["Reproduce or inspect the issue and collect focused evidence", "Immediately delete the resource", "Disable all checks", "Change several values at once"], answer: 0, explanation: "Focused evidence helps identify the root cause while limiting additional risk." },
    { prompt: "Which practice improves reliability for rollout metrics?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for answer explanation review?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for authoritative API validation?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for static versus runtime checks?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." },
    { prompt: "Which practice improves reliability for practical assessment readiness?", choices: ["Use a small reviewed change with validation and a recovery plan", "Skip peer review", "Store credentials in plain text", "Deploy without checking the result"], answer: 0, explanation: "Reviewed, validated and reversible changes reduce operational risk." }
];
export default function YamlModuleAssessment({ moduleName }: { moduleName: string }) {
  const assessmentQuestions = questions;
  const storageKey = "devmavox-yaml-assessment-v2::Quiz and Assessment";
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loadedFor, setLoadedFor] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed && typeof parsed === "object") {
        const savedAnswers =
          parsed.answers && typeof parsed.answers === "object" && !Array.isArray(parsed.answers)
            ? parsed.answers as Record<string, unknown>
            : {};

        const restoredAnswers: Record<number, number> = {};

        Object.entries(savedAnswers).forEach(([rawIndex, rawChoice]) => {
          const questionIndex = Number(rawIndex);

          if (
            Number.isInteger(questionIndex) &&
            questionIndex >= 0 &&
            questionIndex < assessmentQuestions.length &&
            Number.isInteger(rawChoice) &&
            (rawChoice as number) >= 0 &&
            (rawChoice as number) < assessmentQuestions[questionIndex].choices.length
          ) {
            restoredAnswers[questionIndex] = rawChoice as number;
          }
        });

        setAnswers(restoredAnswers);
        setSubmitted(
          Boolean(parsed.submitted) &&
          Object.keys(restoredAnswers).length === assessmentQuestions.length
        );
      } else {
        setAnswers({});
        setSubmitted(false);
      }
      setLoadedFor(storageKey);
    } catch {
      setAnswers({});
      setSubmitted(false);
      setLoadedFor(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    if (loadedFor !== storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, submitted }));
    } catch {
      // Assessment remains usable when browser storage is unavailable.
    }
  }, [storageKey, answers, submitted, loadedFor]);

  const answeredCount = assessmentQuestions.reduce(
    (total, _question, index) =>
      total + (Number.isInteger(answers[index]) ? 1 : 0),
    0
  );
  const allQuestionsAnswered = answeredCount === assessmentQuestions.length;

  const score = useMemo(
    () => assessmentQuestions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0),
    [answers, questions]
  );

  if (!assessmentQuestions.length) return null;

  return (
    <section className="my-6 space-y-5 rounded-2xl border border-violet-900/70 bg-[#111326] p-5 sm:p-7" aria-labelledby="module-assessment-title">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Quiz and Assessment · 125 questions</p>
        <h3 id="module-assessment-title" className="mt-2 text-xl font-bold text-white">{moduleName} — Knowledge Assessment</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">Answer all 125 questions, submit once, then review the correct answers and explanations. Your attempt is saved in this browser.</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
          <span>{answeredCount} / {assessmentQuestions.length} answered</span>
          {submitted && <span className="font-semibold text-violet-200">Score: {score} / {assessmentQuestions.length} ({Math.round(score / assessmentQuestions.length * 100)}%)</span>}
        </div>
      </header>
      {assessmentQuestions.map((question, index) => (
        <fieldset key={question.prompt} className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <legend className="px-1 text-sm font-semibold text-white">{index + 1}. {question.prompt}</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {question.choices.map((choice, choiceIndex) => (
              <label key={choice} className={"flex min-w-0 cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm leading-6 " + (answers[index] === choiceIndex ? "border-violet-500 bg-violet-950/40 text-violet-100" : "border-slate-700 text-slate-300")}>
                <input type="radio" name={moduleName + "-assessment-" + index} checked={answers[index] === choiceIndex} disabled={submitted} onChange={() => setAnswers(current => ({ ...current, [index]: choiceIndex }))} className="mt-1 accent-violet-400" />
                <span className="min-w-0 break-words">{choice}</span>
              </label>
            ))}
          </div>
          {submitted && (
            <div className={"rounded-lg border p-3 text-sm " + (answers[index] === question.answer ? "border-emerald-800 bg-emerald-950/20 text-emerald-200" : "border-amber-800 bg-amber-950/20 text-amber-100")}>
              <p className="font-semibold">{answers[index] === question.answer ? "Correct" : "Review this answer"} · Correct answer: {question.choices[question.answer]}</p>
              <p className="mt-1 leading-6 text-slate-300">{question.explanation}</p>
            </div>
          )}
        </fieldset>
      ))}
      <div className="flex flex-wrap gap-3">
        {!submitted ? (
          <button type="button" disabled={!allQuestionsAnswered} onClick={() => { if (allQuestionsAnswered) setSubmitted(true); }} className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Submit assessment</button>
        ) : (
          <button type="button" onClick={() => { setAnswers({}); setSubmitted(false); }} className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200">Retake assessment</button>
        )}
      </div>
    </section>
  );
}
