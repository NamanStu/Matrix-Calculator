import { NextResponse } from "next/server";
import { spawnSync } from "child_process";
import path from "path";

export async function POST(req) {
  try {
    const { matrix } = await req.json();

    if (!Array.isArray(matrix) || matrix.length === 0) {
      return NextResponse.json({ error: "Invalid matrix" }, { status: 400 });
    }

    const n = matrix.length;

    // Validate square matrix
    for (let i = 0; i < n; i++) {
      if (!Array.isArray(matrix[i]) || matrix[i].length !== n) {
        return NextResponse.json(
          { error: "Matrix must be square" },
          { status: 400 }
        );
      }
    }

    // Serialize matrix to simple text format
    const inputLines = [String(n)];
    for (let i = 0; i < n; i++) {
      inputLines.push(matrix[i].map((v) => Number(v)).join(" "));
    }
    const inputStr = inputLines.join("\n") + "\n";

    // Execute C binary
    const binaryPath = path.join(process.cwd(), "matrix_inverse");
    const proc = spawnSync(binaryPath, {
      input: inputStr,
      encoding: "utf8",
      timeout: 5000,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (proc.error) {
      return NextResponse.json({ error: String(proc.error) }, { status: 500 });
    }

    if (proc.status !== 0) {
      return NextResponse.json(
        { error: proc.stderr || `Process exited with code ${proc.status}` },
        { status: 500 }
      );
    }

    const stdout = (proc.stdout || "").trim();
    
    // Parse the inverse matrix from output
    try {
      const inverse = JSON.parse(stdout);
      return NextResponse.json({ inverse });
    } catch (parseErr) {
      console.error("Parse error:", parseErr);
      console.error("Output was:", stdout);
      return NextResponse.json(
        { error: "Invalid output format from inverse program" },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
