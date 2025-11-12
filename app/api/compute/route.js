import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { matrixA, matrixB } = await req.json();

        // Basic validation
        if (!matrixA || !matrixB || !matrixA.length || !matrixB.length) {
            throw new Error('Invalid matrix dimensions');
        }

        // Matrix multiplication implementation
        const result = multiplyMatrices(matrixA, matrixB);
        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    
    // Initialize result matrix with zeros
    const result = Array(rowsA).fill().map(() => Array(colsB).fill(0));
    
    // Perform multiplication
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    
    return result;
}
