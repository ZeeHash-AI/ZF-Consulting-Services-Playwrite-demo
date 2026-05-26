/**
 * Author: Zee Hashmi
 */

import { exec } from "child_process";
import path from "path";

export async function POST() {
  const projectRoot = process.cwd();

  return new Promise((resolve) => {
    exec("npx playwright test --reporter=list", { cwd: projectRoot }, (error, stdout, stderr) => {
      const result = {
        logs: [
          "Playwright execution started on backend",
          stdout || "",
          stderr || "",
          error ? `FAILED: ${error.message}` : "SUCCESS",
        ],
      };

      resolve(new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      }));
    });
  });
}
