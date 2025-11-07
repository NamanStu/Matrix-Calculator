import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req) {
    try {
        const { matrixA, matrixB } = await req.json();

        // Create input string for C program
        const input = JSON.stringify({
            matrixA: matrixA,
            matrixB: matrixB
        });

        // Execute C program with input
        const { stdout, stderr } = await execAsync(`echo '${input}' | ./matrix_multiply`);

        if (stderr) {
            throw new Error(stderr);
        }

        // Parse the result from C program
        const result = JSON.parse(stdout);

        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
