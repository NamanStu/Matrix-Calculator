#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <json-c/json.h>

// Function to multiply matrices
void multiply_matrices(int** matrixA, int** matrixB, int** result, 
                      int rowsA, int colsA, int colsB) {
    for(int i = 0; i < rowsA; i++) {
        for(int j = 0; j < colsB; j++) {
            result[i][j] = 0;
            for(int k = 0; k < colsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
}

int main() {
    char buffer[4096];
    fgets(buffer, sizeof(buffer), stdin);
    
    struct json_object *parsed_json;
    struct json_object *matrixA_json;
    struct json_object *matrixB_json;
    
    parsed_json = json_tokener_parse(buffer);
    json_object_object_get_ex(parsed_json, "matrixA", &matrixA_json);
    json_object_object_get_ex(parsed_json, "matrixB", &matrixB_json);
    
    // Get dimensions
    int rowsA = json_object_array_length(matrixA_json);
    int colsA = json_object_array_length(json_object_array_get_idx(matrixA_json, 0));
    int colsB = json_object_array_length(json_object_array_get_idx(matrixB_json, 0));
    
    // Allocate matrices
    int **matrixA = malloc(rowsA * sizeof(int*));
    int **matrixB = malloc(colsA * sizeof(int*));
    int **result = malloc(rowsA * sizeof(int*));
    
    // Initialize matrices
    for(int i = 0; i < rowsA; i++) {
        matrixA[i] = malloc(colsA * sizeof(int));
        result[i] = malloc(colsB * sizeof(int));
    }
    for(int i = 0; i < colsA; i++) {
        matrixB[i] = malloc(colsB * sizeof(int));
    }
    
    // Fill matrices from JSON
    // ... (fill matrices from JSON input)
    
    // Multiply matrices
    multiply_matrices(matrixA, matrixB, result, rowsA, colsA, colsB);
    
    // Output result as JSON
    printf("[\n");
    for(int i = 0; i < rowsA; i++) {
        printf("  [");
        for(int j = 0; j < colsB; j++) {
            printf("%d%s", result[i][j], j < colsB - 1 ? "," : "");
        }
        printf("]%s\n", i < rowsA - 1 ? "," : "");
    }
    printf("]\n");
    
    // Free memory
    // ... (free allocated memory)
    
    return 0;
}
