#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Function to calculate matrix inverse using Gaussian elimination
int calculateInverse(double *matrix, double *inverse, int n) {
    // Create augmented matrix [A | I]
    double *augmented = (double *)malloc(2 * n * n * sizeof(double));
    if (!augmented) {
        fprintf(stderr, "Memory allocation failed\n");
        return -1;
    }
    
    #define AUG(i, j) augmented[(i) * (2 * n) + (j)]
    #define MAT(i, j) matrix[(i) * n + (j)]
    
    // Copy matrix to left side and identity to right side
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            AUG(i, j) = MAT(i, j);
            AUG(i, n + j) = (i == j) ? 1.0 : 0.0;
        }
    }
    
    // Gaussian elimination with partial pivoting
    for (int col = 0; col < n; col++) {
        // Find pivot
        int pivot = col;
        double maxval = fabs(AUG(col, col));
        for (int r = col + 1; r < n; r++) {
            double val = fabs(AUG(r, col));
            if (val > maxval) {
                maxval = val;
                pivot = r;
            }
        }
        
        // Check for singular matrix
        if (maxval < 1e-14) {
            free(augmented);
            return 0; // Singular matrix
        }
        
        // Swap rows if needed
        if (pivot != col) {
            for (int j = 0; j < 2 * n; j++) {
                double tmp = AUG(col, j);
                AUG(col, j) = AUG(pivot, j);
                AUG(pivot, j) = tmp;
            }
        }
        
        // Scale pivot row
        double pivotVal = AUG(col, col);
        for (int j = 0; j < 2 * n; j++) {
            AUG(col, j) /= pivotVal;
        }
        
        // Eliminate column
        for (int r = 0; r < n; r++) {
            if (r != col) {
                double factor = AUG(r, col);
                for (int j = 0; j < 2 * n; j++) {
                    AUG(r, j) -= factor * AUG(col, j);
                }
            }
        }
    }
    
    // Extract inverse from right side
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            inverse[i * n + j] = AUG(i, n + j);
        }
    }
    
    free(augmented);
    #undef AUG
    #undef MAT
    return 1; // Success
}

int main(void) {
    int n;
    
    // Read matrix size
    if (scanf("%d", &n) != 1 || n <= 0) {
        fprintf(stderr, "Invalid matrix size\n");
        return 2;
    }
    
    // Allocate memory for matrix
    double *matrix = (double *)malloc(n * n * sizeof(double));
    double *inverse = (double *)malloc(n * n * sizeof(double));
    
    if (!matrix || !inverse) {
        fprintf(stderr, "Memory allocation failed\n");
        free(matrix);
        free(inverse);
        return 2;
    }
    
    // Read matrix elements row by row
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (scanf("%lf", &matrix[i * n + j]) != 1) {
                fprintf(stderr, "Failed to read matrix element at [%d][%d]\n", i, j);
                free(matrix);
                free(inverse);
                return 2;
            }
        }
    }
    
    // Calculate inverse
    int result = calculateInverse(matrix, inverse, n);
    
    if (result == 0) {
        // Singular matrix
        printf("{\"error\":\"Matrix is singular and cannot be inverted\"}\n");
        free(matrix);
        free(inverse);
        return 0;
    } else if (result < 0) {
        printf("{\"error\":\"Calculation failed\"}\n");
        free(matrix);
        free(inverse);
        return 2;
    }
    
    // Output result as JSON array
    printf("[\n");
    for (int i = 0; i < n; i++) {
        printf("  [");
        for (int j = 0; j < n; j++) {
            double val = inverse[i * n + j];
            // Round to nearest integer if very close
            if (fabs(val - round(val)) < 1e-9) {
                printf("%.0f%s", round(val), j < n - 1 ? "," : "");
            } else {
                printf("%.3f%s", val, j < n - 1 ? "," : "");
            }
        }
        printf("]%s\n", i < n - 1 ? "," : "");
    }
    printf("]\n");
    
    free(matrix);
    free(inverse);
    return 0;
}
