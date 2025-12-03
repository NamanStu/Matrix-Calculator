#include <stdio.h> // printf, scanf
#include <stdlib.h> // malloc -> allocated memory and free -> frees up memory
#include <math.h> // fabs() -> gives absolute value of floating number

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) // This means if the function fails to take input or n <= 0 then this will give this error message.
    {
        fprintf(stderr, "Invalid matrix size\n"); // so this fprintf helps us to give a specific output stream to print the output and stderr is the standard error stream for the output.
        return 2;
        // this return 2 is used to give the memory allocation error.
    }

    double *data = (double *)malloc((size_t)n * n * sizeof(double));
    // this allocates the space to the data entered.
    if (!data) {
        fprintf(stderr, "Memory allocation failed\n");
        return 2;
    } // this checks if the data is successfully added or not, if not then error.

    for (int i = 0; i < n * n; i++) {
        if (scanf("%lf", &data[i]) != 1) {
            fprintf(stderr, "Failed to read matrix element\n");
            free(data); // if not done not frees up the memory allocated.
            return 2;
        }
    } // this takes the inputs for the element in the matrix and if its fails then it returns an error.

    // Macro for row-major 2D indexing
    #define A(i, j) data[(i) * n + (j)]
    // it replaces all A(i, j) with data[(i) * n + (j)].

    double det = 1.0; // this variable contains the value of determinant.
    int swaps = 0; // This contains the count like how many times the rows are swapped as it will multiply the number with -1 and then multiply this to det later.

    // Gaussian elimination with partial pivoting
    for (int col = 0; col < n; col++) {
        // Find pivot
        int pivot = col;   // This assumes the row to be same as the column means it will target the diognal element.
        double maxval = fabs(A(col, col)); // this convert the value to positive.
        for (int r = col + 1; r < n; r++) {
            double val = fabs(A(r, col));
            if (val > maxval) {
                maxval = val;
                pivot = r;
            } // 
        }
        // 1.	Choose a pivot row.
	//     2.	Swap rows if necessary.
	//     3.	Eliminate entries below the pivot (make them zero).
	//     4.	Multiply det by the pivot element.

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
