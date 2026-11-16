import { parseAllDocuments } from "yaml";

type ParsedYaml = {
  valid: boolean;
  documents: unknown[];
};

function normalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalize);
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return Object.keys(record).sort().reduce<Record<string, unknown>>(
      (result, key) => {
        result[key] = normalize(record[key]);
        return result;
      },
      {}
    );
  }

  return value;
}

function equalYaml(left: unknown, right: unknown): boolean {
  return JSON.stringify(normalize(left)) ===
    JSON.stringify(normalize(right));
}

function parseYaml(source: string): ParsedYaml {
  try {
    const documents = parseAllDocuments(source);

    if (
      documents.length === 0 ||
      documents.some((document) => document.errors.length > 0)
    ) {
      return { valid: false, documents: [] };
    }

    return {
      valid: true,
      documents: documents.map((document) => normalize(document.toJS())),
    };
  } catch {
    return { valid: false, documents: [] };
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value);
}

/*
 * Check every field changed by the scenario's reference repair.
 * Unchanged fields may be customized by the learner.
 * Changed arrays and scalar values must match the repaired reference.
 */
function changedFieldsMatch(
  current: unknown,
  broken: unknown,
  fixed: unknown
): boolean {
  if (equalYaml(broken, fixed)) {
    return true;
  }

  if (isObject(broken) && isObject(fixed) && isObject(current)) {
    const keys = new Set([
      ...Object.keys(broken),
      ...Object.keys(fixed),
    ]);

    for (const key of keys) {
      const wasPresent = Object.prototype.hasOwnProperty.call(broken, key);
      const shouldBePresent = Object.prototype.hasOwnProperty.call(fixed, key);
      const isPresent = Object.prototype.hasOwnProperty.call(current, key);

      if (!shouldBePresent) {
        if (isPresent) return false;
        continue;
      }

      if (!isPresent) return false;

      if (!wasPresent) {
        if (!equalYaml(current[key], fixed[key])) return false;
        continue;
      }

      if (!changedFieldsMatch(current[key], broken[key], fixed[key])) {
        return false;
      }
    }

    return true;
  }

  return equalYaml(current, fixed);
}

export function validatePracticalLabYaml(
  currentYaml: string,
  brokenYaml: string,
  fixedYaml: string
): boolean {
  const current = parseYaml(currentYaml);
  const broken = parseYaml(brokenYaml);
  const fixed = parseYaml(fixedYaml);

  if (!current.valid || !broken.valid || !fixed.valid) {
    return false;
  }

  if (current.documents.length !== fixed.documents.length) {
    return false;
  }

  let repairExists = broken.documents.length !== fixed.documents.length;

  for (let index = 0; index < fixed.documents.length; index++) {
    const currentDoc = current.documents[index];
    const fixedDoc = fixed.documents[index];

    if (index >= broken.documents.length) {
      repairExists = true;
      if (!equalYaml(currentDoc, fixedDoc)) return false;
      continue;
    }

    const brokenDoc = broken.documents[index];

    if (!equalYaml(brokenDoc, fixedDoc)) {
      repairExists = true;
    }

    if (!changedFieldsMatch(currentDoc, brokenDoc, fixedDoc)) {
      return false;
    }
  }

  return repairExists &&
    !equalYaml(current.documents, broken.documents);
}