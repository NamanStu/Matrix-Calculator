import { NextResponse } from "next/server";
import { spawnSync } from "child_process";
import path from "path";

export async function POST(req) {
  try {
    const { matrix } = await req.json();

    if (!Array.isArray(matrix) || matrix.length === 0) {
      return NextResponse.json({ error: "Invalid matrix" }, { status: 400 });
    }

    const rows = matrix.length;
    const cols = matrix[0]?.length || 0;

    // Validate matrix dimensions
    for (let i = 0; i < rows; i++) {
      if (!Array.isArray(matrix[i]) || matrix[i].length !== cols) {
        return NextResponse.json(
          { error: "Matrix rows must have consistent column count" },
          { status: 400 }
        );
      }
    }

    // Serialize matrix to simple text format
    const inputLines = [`${rows} ${cols}`];
    for (let i = 0; i < rows; i++) {
      inputLines.push(matrix[i].map((v) => Number(v)).join(" "));
    }
    const inputStr = inputLines.join("\n") + "\n";

    // Execute C binary
    const binaryPath = path.join(process.cwd(), "matrix_rank");
    const proc = spawnSync(binaryPath, {
      input: inputStr,
      encoding: "utf8",
      timeout: 5000,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (proc.error) {
      if (proc.error.code === 'ENOENT') {
        return NextResponse.json({ 
          error: "Matrix rank binary not found. Please compile first." 
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
    const rank = parseInt(stdout);

    if (isNaN(rank)) {
      return NextResponse.json(
        { error: "Invalid output from rank program" },
        { status: 500 }
      );
    }

    return NextResponse.json({ rank });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
