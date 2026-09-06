import { executeCode as executeWithJDoodle } from "./jdoodle.js";

export async function runCode({ code, language, stdin = "" }) {
  return await executeWithJDoodle({
    code,
    language,
    stdin,
  });
}