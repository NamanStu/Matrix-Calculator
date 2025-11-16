#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Function to calculate determinant using Gaussian elimination
double calculateDeterminant(double *matrix, int n) {
    double *temp = (double *)malloc(n * n * sizeof(double));
    if (!temp) return 0;
    
    // Copy matrix
    for (int i = 0; i < n * n; i++) {
        temp[i] = matrix[i];
    }
    
    double det = 1.0;
    int swaps = 0;
    
    // Gaussian elimination
    for (int col = 0; col < n; col++) {
        // Find pivot
        int pivot = col;
        double maxval = fabs(temp[col * n + col]);
        for (int r = col + 1; r < n; r++) {
            if (fabs(temp[r * n + col]) > maxval) {
                maxval = fabs(temp[r * n + col]);
                pivot = r;
            }
        }
        
        if (maxval < 1e-14) {
            free(temp);
            return 0;
        }
        
        // Swap rows
        if (pivot != col) {
            for (int j = 0; j < n; j++) {
                double tmp = temp[col * n + j];
                temp[col * n + j] = temp[pivot * n + j];
                temp[pivot * n + j] = tmp;
            }
            swaps++;
        }
        
        det *= temp[col * n + col];
        
        // Eliminate below
        for (int r = col + 1; r < n; r++) {
            double factor = temp[r * n + col] / temp[col * n + col];
            for (int j = col; j < n; j++) {
                temp[r * n + j] -= factor * temp[col * n + j];
            }
        }
    }
    
    if (swaps % 2 == 1) det = -det;
    
    free(temp);
    return det;
}

int main(void) {
    int n;
    
    if (scanf("%d", &n) != 1 || n <= 0) {
        fprintf(stderr, "Invalid size\n");
        return 2;
    }
    
    // Read coefficient matrix
    double *matrix = (double *)malloc(n * n * sizeof(double));
    double *vector = (double *)malloc(n * sizeof(double));
    double *solution = (double *)malloc(n * sizeof(double));
    
    if (!matrix || !vector || !solution) {
        fprintf(stderr, "Memory allocation failed\n");
        free(matrix);
        free(vector);
        free(solution);
        return 2;
    }
    
    for (int i = 0; i < n * n; i++) {
        if (scanf("%lf", &matrix[i]) != 1) {
            fprintf(stderr, "Failed to read matrix\n");
            free(matrix);
            free(vector);
            free(solution);
            return 2;
        }
    }
    
    for (int i = 0; i < n; i++) {
        if (scanf("%lf", &vector[i]) != 1) {
            fprintf(stderr, "Failed to read vector\n");
            free(matrix);
            free(vector);
            free(solution);
            return 2;
        }
    }
    
    // Calculate determinant of A
    double det_A = calculateDeterminant(matrix, n);
    
    if (fabs(det_A) < 1e-14) {
        printf("{\"error\":\"Determinant of the main matrix is zero\"}\n");
        free(matrix);
        free(vector);
        free(solution);
        return 0;
    }
    
    // For each variable, calculate determinant of A_i
    for (int i = 0; i < n; i++) {
        double *temp_matrix = (double *)malloc(n * n * sizeof(double));
        if (!temp_matrix) {
            free(matrix);
            free(vector);
            free(solution);
            return 2;
        }
        
        // Copy matrix and replace column i with vector b
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                if (col == i) {
                    temp_matrix[row * n + col] = vector[row];
                } else {
                    temp_matrix[row * n + col] = matrix[row * n + col];
                }
            }
        }
        
        double det_Ai = calculateDeterminant(temp_matrix, n);
        solution[i] = det_Ai / det_A;
        
        free(temp_matrix);
    }
    
    // Output solution as JSON
    printf("[\n");
    for (int i = 0; i < n; i++) {
        double val = solution[i];
        if (fabs(val - round(val)) < 1e-9) {
            printf("  %.0f%s\n", round(val), i < n - 1 ? "," : "");
        } else {
            printf("  %.3f%s\n", val, i < n - 1 ? "," : "");
        }
    }
    printf("]\n");
    
    free(matrix);
    free(vector);
    free(solution);
    
    return 0;
}
