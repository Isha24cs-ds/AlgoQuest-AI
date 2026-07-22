import { executeCode } from "./piston.js";

export async function runCode(data) {
  const { language, version, code, stdin } = data;

  return await executeCode(
    language,
    version,
    code,
    stdin
  );
}