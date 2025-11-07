// #include <stdio.h>
// #include <stdlib.h>
// #include <string.h>
// #include <json-c.h>

// int main(int argc, char *argv[]) {
//     if (argc < 2) {
//         printf("{\"error\":\"No input received\"}");
//         return 1;
//     }

//     struct json_object *parsed_json;
//     parsed_json = json_tokener_parse(argv[1]);

//     struct json_object *matrixA;
//     struct json_object *matrixB;
//     json_object_object_get_ex(parsed_json, "matrixA", &matrixA);
//     json_object_object_get_ex(parsed_json, "matrixB", &matrixB);

//     int rowsA = json_object_array_length(matrixA);
//     int colsA = json_object_array_length(json_object_array_get_idx(matrixA, 0));
//     int rowsB = json_object_array_length(matrixB);
//     int colsB = json_object_array_length(json_object_array_get_idx(matrixB, 0));

//     int result[10][10] = {0};

//     for (int i = 0; i < rowsA; i++) {
//         for (int j = 0; j < colsB; j++) {
//             for (int k = 0; k < colsA; k++) {
//                 result[i][j] += json_object_get_int(
//                     json_object_array_get_idx(json_object_array_get_idx(matrixA, i), k)
//                 ) * json_object_get_int(
//                     json_object_array_get_idx(json_object_array_get_idx(matrixB, k), j)
//                 );
//             }
//         }
//     }

//     printf("{\"result\":[");
//     for (int i = 0; i < rowsA; i++) {
//         printf("[");
//         for (int j = 0; j < colsB; j++) {
//             printf("%d", result[i][j]);
//             if (j < colsB - 1) printf(",");
//         }
//         printf("]");
//         if (i < rowsA - 1) printf(",");
//     }
//     printf("]}");

//     return 0;
// }

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#if defined(__has_include)
  #if __has_include(<json-c/json.h>)
    #include <json-c/json.h>
  #elif __has_include(<json.h>)
    #include <json.h>
  #else
    #error "json-c header not found"
  #endif
#else
  #include <json-c/json.h>
#endif

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("{\"error\":\"No input received\"}\n");
        return 1;
    }

    // Parse input JSON
    struct json_object *parsed_json = json_tokener_parse(argv[1]);
    if (!parsed_json) {
        printf("{\"error\":\"Invalid JSON input\"}\n");
        return 1;
    }

    // Get matrices from JSON
    struct json_object *matrixA, *matrixB;
    if (!json_object_object_get_ex(parsed_json, "matrixA", &matrixA) ||
        !json_object_object_get_ex(parsed_json, "matrixB", &matrixB)) {
        printf("{\"error\":\"Missing matrices in input\"}\n");
        json_object_put(parsed_json);
        return 1;
    }

    // Get dimensions
    int rowsA = json_object_array_length(matrixA);
    int colsA = json_object_array_length(json_object_array_get_idx(matrixA, 0));
    int rowsB = json_object_array_length(matrixB);
    int colsB = json_object_array_length(json_object_array_get_idx(matrixB, 0));

    // Verify matrix dimensions
    if (colsA != rowsB) {
        printf("{\"error\":\"Invalid matrix dimensions for multiplication\"}\n");
        json_object_put(parsed_json);
        return 1;
    }

    // Allocate result matrix
    int **result = (int **)malloc(rowsA * sizeof(int *));
    for (int i = 0; i < rowsA; i++) {
        result[i] = (int *)calloc(colsB, sizeof(int));
    }

    // Perform matrix multiplication
    for (int i = 0; i < rowsA; i++) {
        struct json_object *rowA = json_object_array_get_idx(matrixA, i);
        for (int j = 0; j < colsB; j++) {
            for (int k = 0; k < colsA; k++) {
                struct json_object *elemA = json_object_array_get_idx(rowA, k);
                struct json_object *rowB = json_object_array_get_idx(matrixB, k);
                struct json_object *elemB = json_object_array_get_idx(rowB, j);
                
                int valA = json_object_get_int(elemA);
                int valB = json_object_get_int(elemB);
                result[i][j] += valA * valB;
            }
        }
    }

    // Create JSON result
    printf("{\"result\":[");
    for (int i = 0; i < rowsA; i++) {
        printf("[");
        for (int j = 0; j < colsB; j++) {
            printf("%d", result[i][j]);
            if (j < colsB - 1) printf(",");
        }
        printf("]");
        if (i < rowsA - 1) printf(",");
    }
    printf("]}\n");

    // Clean up
    for (int i = 0; i < rowsA; i++) {
        free(result[i]);
    }
    free(result);
    json_object_put(parsed_json);

    return 0;
}