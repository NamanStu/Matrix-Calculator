import { NextResponse } from "next/server";
import { spawnSync } from "child_process";
import path from "path";

export async function POST(req) {
  try {
    const { matrix, vector } = await req.json();

    if (!Array.isArray(matrix) || !Array.isArray(vector)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
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

    if (vector.length !== n) {
      return NextResponse.json(
        { error: "Vector size must match matrix dimension" },
        { status: 400 }
      );
    }

    // Serialize to simple text format
    const inputLines = [String(n)];
    for (let i = 0; i < n; i++) {
      inputLines.push(matrix[i].map((v) => Number(v)).join(" "));
    }
    inputLines.push(vector.map((v) => Number(v)).join(" "));
    
    const inputStr = inputLines.join("\n") + "\n";

    // Execute C binary
    const binaryPath = path.join(process.cwd(), "cramer_rule");
    const proc = spawnSync(binaryPath, {
      input: inputStr,
      encoding: "utf8",
      timeout: 5000,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (proc.error) {
      if (proc.error.code === 'ENOENT') {
        return NextResponse.json({ 
          error: "Cramer's Rule binary not found. Please compile first." 
        }, { status: 500 });
      }
      return NextResponse.json({ error: String(proc.error) }, { status: 500 });
    }

    if (proc.status !== 0) {
      return NextResponse.json(
        { error: proc.stderr || `Process exited with code ${proc.status}` },
        { status: 500 }
      );
    }

    const stdout = (proc.stdout || "").trim();
    
    // Check if output contains error message
    if (stdout.includes("error")) {
      try {
        const errorObj = JSON.parse(stdout);
        return NextResponse.json({ error: errorObj.error }, { status: 400 });
      } catch (e) {
        return NextResponse.json({ error: stdout }, { status: 400 });
      }
    }
    
    try {
      const result = JSON.parse(stdout);
      return NextResponse.json({ solution: result });
    } catch (parseErr) {
      console.error("Parse error:", parseErr);
      console.error("Output was:", stdout);
      return NextResponse.json(
        { error: "Invalid output from cramer program: " + stdout },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
