#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <json-c/json.h> // This library for integrating frontend..

void matrixMultiply(int** matrixA, int** matrixB, int** result, 
                      int rowsA, int colsA, int colsB) {
    // Using these int** for defining a matrix with rows and cols.  
    
    // MAIN MULTIPLICATION CODE...  
    for(int a = 0; a < rowsA; a++) {
        for(int b = 0; b < colsB; b++) {
            result[a][b] = 0;
            for(int c = 0; c < colsA; c++) {
                result[a][b] += matrixA[a][c] * matrixB[c][b];
            }
        }
    }
}

int main() {
    // This code is making a memory space of 4096 to store text and Storing the text in that.
    char buffer[4096];
    fgets(buffer, sizeof(buffer), stdin);
    
    struct json_object *parsed_json;
    struct json_object *matrixA_json;
    struct json_object *matrixB_json;
    // These are used to store json objects after parsing..
    
    parsed_json = json_tokener_parse(buffer); // Converts the json text to structured json object..
    json_object_object_get_ex(parsed_json, "matrixA", &matrixA_json);
    json_object_object_get_ex(parsed_json, "matrixB", &matrixB_json);
    // These are taking the matrix A and matrix B from the json and storing them into variable.

    // This calculates the no. of rows and columns does these matrices have...
    int rowsA = json_object_array_length(matrixA_json);
    int colsA = json_object_array_length(json_object_array_get_idx(matrixA_json, 0));
    int colsB = json_object_array_length(json_object_array_get_idx(matrixB_json, 0));
    
    // This allocates memory to the matrices..
    int **matrixA = malloc(rowsA * sizeof(int*));
    int **matrixB = malloc(colsA * sizeof(int*));
    int **result = malloc(rowsA * sizeof(int*));
    
    // This allocates space for each row and column..
    for(int i = 0; i < rowsA; i++) {
        matrixA[i] = malloc(colsA * sizeof(int));
        result[i] = malloc(colsB * sizeof(int));
    }
    for(int i = 0; i < colsA; i++) {
        matrixB[i] = malloc(colsB * sizeof(int));
    }
    
    // Calling the Multiply matrices function to calculate the multiplication after getting all the values from the frontend..
    matrixMultiply(matrixA, matrixB, result, rowsA, colsA, colsB);
    
    // This is converting output result to JSON..
    printf("[\n");
    for(int i = 0; i < rowsA; i++) {
        printf("  [");
        for(int j = 0; j < colsB; j++) {
            printf("%d%s", result[i][j], j < colsB - 1 ? "," : "");
        }
        printf("]%s\n", i < rowsA - 1 ? "," : "");
    }
    printf("]\n");
    
    return 0;
}
