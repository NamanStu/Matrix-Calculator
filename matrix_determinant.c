#include <stdio.h> // printf, scanf
#include <stdlib.h> // fopens(), fclose()
#include <math.h> //

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) {
        fprintf(stderr, "Invalid matrix size\n");
        return 2;
    }

    double *data = (double *)malloc((size_t)n * n * sizeof(double));
    if (!data) {
        fprintf(stderr, "Memory allocation failed\n");
        return 2;
    }

    for (int i = 0; i < n * n; i++) {
        if (scanf("%lf", &data[i]) != 1) {
            fprintf(stderr, "Failed to read matrix element\n");
            free(data);
            return 2;
        }
    }

    // Macro for row-major 2D indexing
    #define A(i, j) data[(i) * n + (j)]

    double det = 1.0;
    int swaps = 0;

    // Gaussian elimination with partial pivoting
    for (int col = 0; col < n; col++) {
        // Find pivot
        int pivot = col;
        double maxval = fabs(A(col, col));
        for (int r = col + 1; r < n; r++) {
            double val = fabs(A(r, col));
            if (val > maxval) {
                maxval = val;
                pivot = r;
            }
        }

        // Check for singular matrix
        if (maxval < 1e-14) {
            det = 0.0;
            break;
        }

        // Swap rows if needed
        if (pivot != col) {
            for (int j = col; j < n; j++) {
                double tmp = A(col, j);
                A(col, j) = A(pivot, j);
                A(pivot, j) = tmp;
            }
            swaps++;
        }

        // Accumulate determinant
        det *= A(col, col);

        // Eliminate below pivot
        for (int r = col + 1; r < n; r++) {
            double factor = A(r, col) / A(col, col);
            for (int j = col; j < n; j++) {
                A(r, j) -= factor * A(col, j);
            }
        }
    }

    // Adjust for row swaps
    if (swaps % 2 == 1) {
        det = -det;
    }

    printf("%.12g\n", det);

    free(data);
    return 0;
}
