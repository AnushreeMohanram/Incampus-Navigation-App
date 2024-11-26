#include <stdio.h>

struct Process {
    int id;         // Process ID
    int burst;      // Burst time
    int remaining;  // Remaining time
};

// Function to perform Round Robin scheduling
void roundRobin(struct Process proc[], int n, int quantum) {
    int t = 0; // Current time
    int complete = 0; // Count of completed processes

    while (complete < n) {
        for (int i = 0; i < n; i++) {
            // If process has remaining time
            if (proc[i].remaining > 0) {
                if (proc[i].remaining > quantum) {
                    t += quantum; // Increment time by quantum
                    proc[i].remaining -= quantum; // Reduce remaining time
                } else {
                    // Process completes
                    t += proc[i].remaining; // Increment time by remaining time
                    proc[i].remaining = 0; // Mark process as completed
                    complete++; // Increment completed process count
                    printf("Process %d completed at time %d\n", proc[i].id, t);
                }
            }
        }
    }
}

int main() {
    int n, quantum;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    struct Process proc[n];

    // Input process details
    for (int i = 0; i < n; i++) {
        proc[i].id = i + 1; // Assigning process ID
        printf("Enter burst time for process %d: ", proc[i].id);
        scanf("%d", &proc[i].burst);
        proc[i].remaining = proc[i].burst; // Initialize remaining time
    }

    printf("Enter time quantum: ");
    scanf("%d", &quantum);

    roundRobin(proc, n, quantum);

    return 0;
}