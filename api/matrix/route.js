import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { matrixA, matrixB } = await request.json();

    // Create JSON input string for C program
    const input = JSON.stringify({
      matrixA: matrixA,
      matrixB: matrixB
    });

    // Execute C program with the input
    const result = await new Promise((resolve, reject) => {
      exec(`/Users/namangoyal/Documents/Test-Cal/test_cal/matrix "${input}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        resolve(stdout);
      });
    });

    // Parse the C program output
    const parsedResult = JSON.parse(result);
    return NextResponse.json(parsedResult);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}