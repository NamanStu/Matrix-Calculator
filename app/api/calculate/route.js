import { NextResponse } from 'next/server';
import { execFile } from 'child_process';
import path from 'path';

export async function POST(req) {
  const { num1, num2 } = await req.json();

  const exePath = path.join(process.cwd(), 'public', 'calculator');

  return new Promise((resolve) => {
    execFile(exePath, [num1, num2], (error, stdout, stderr) => {
      if (error) {
        resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ output: stdout.trim() }));
      }
    });
  });
}