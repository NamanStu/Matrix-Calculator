#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Function to calculate matrix rank using Gaussian elimination
int calculateRank(double *matrix, int rows, int cols) {
    // Create a copy of the matrix
    double *temp = (double *)malloc(rows * cols * sizeof(double));
    if (!temp) return -1;
    
    for (int i = 0; i < rows * cols; i++) {
        temp[i] = matrix[i];
    }
    
    int rank = 0;
    
    // Gaussian elimination
    for (int col = 0; col < cols && rank < rows; col++) {
        // Find pivot in current column
        int pivot_row = -1;
        double max_val = 1e-14;
        
        for (int r = rank; r < rows; r++) {
            double val = fabs(temp[r * cols + col]);
            if (val > max_val) {
                max_val = val;
                pivot_row = r;
            }
        }
        
        // If no pivot found, move to next column
        if (pivot_row == -1) {
            continue;
        }
        
        // Swap rows if needed
        if (pivot_row != rank) {
            for (int j = 0; j < cols; j++) {
                double tmp = temp[rank * cols + j];
                temp[rank * cols + j] = temp[pivot_row * cols + j];
                temp[pivot_row * cols + j] = tmp;
            }
        }
        
        // Eliminate below pivot
        for (int r = rank + 1; r < rows; r++) {
            double factor = temp[r * cols + col] / temp[rank * cols + col];
            for (int j = col; j < cols; j++) {
                temp[r * cols + j] -= factor * temp[rank * cols + j];
            }
        }
        
        rank++;
    }
    
    free(temp);
    return rank;
}

int main(void) {
    int rows, cols;
    
    // Read matrix dimensions
    if (scanf("%d %d", &rows, &cols) != 2 || rows <= 0 || cols <= 0) {
        fprintf(stderr, "Invalid dimensions\n");
        return 2;
    }
    
    // Allocate memory for matrix
    double *matrix = (double *)malloc(rows * cols * sizeof(double));
    
    if (!matrix) {
        fprintf(stderr, "Memory allocation failed\n");
        return 2;
    }
    
    // Read matrix elements
    for (int i = 0; i < rows * cols; i++) {
        if (scanf("%lf", &matrix[i]) != 1) {
            fprintf(stderr, "Failed to read matrix element\n");
            free(matrix);
            return 2;
        }
    }
    
    // Calculate rank
    int rank = calculateRank(matrix, rows, cols);
    
    if (rank < 0) {
        fprintf(stderr, "Error calculating rank\n");
        free(matrix);
        return 2;
    }
    
    // Output rank
    printf("%d\n", rank);
    
    free(matrix);
    return 0;
}
