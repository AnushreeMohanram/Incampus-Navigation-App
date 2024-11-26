#include <stdio.h>

struct Process {
    int id;         // Process ID
    int arrival;    // Arrival time
    int burst;      // Burst time
    int priority;   // Priority of the process
    int waiting;    // Waiting time
    int turnaround; // Turnaround time
};

// Function to calculate waiting time and turnaround time
void calculateTimes(struct Process proc[], int n) {
    int totalWaiting = 0, totalTurnaround = 0;

    // Sort processes by priority and arrival time
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (proc[i].priority > proc[j].priority || 
                (proc[i].priority == proc[j].priority && proc[i].arrival > proc[j].arrival)) {
                struct Process temp = proc[i];
                proc[i] = proc[j];
                proc[j] = temp;
            }
        }
    }

    // Calculate waiting time and turnaround time
    for (int i = 0; i < n; i++) {
        if (i == 0) {
            proc[i].waiting = 0; // First process has no waiting time
        } else {
            proc[i].waiting = proc[i - 1].waiting + proc[i - 1].burst;
        }
        proc[i].turnaround = proc[i].waiting + proc[i].burst;
        totalWaiting += proc[i].waiting;
        totalTurnaround += proc[i].turnaround;
    }

    printf("Process ID\tArrival Time\tBurst Time\tPriority\tWaiting Time\tTurnaround Time\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t\t%d\t\t%d\t\t%d\t\t%d\t\t%d\n", 
               proc[i].id, proc[i].arrival, proc[i].burst, 
               proc[i].priority, proc[i].waiting, proc[i].turnaround);
    }

    printf("\nAverage Waiting Time: %.2f\n", (float)totalWaiting / n);
    printf("Average Turnaround Time: %.2f\n", (float)totalTurnaround / n);
}

int main() {
    int n;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    struct Process proc[n];

    // Input process details
    for (int i = 0; i < n; i++) {
        proc[i].id = i + 1; // Assigning process ID
        printf("Enter arrival time, burst time, and priority for process %d: ", proc[i].id);
        scanf("%d %d %d", &proc[i].arrival, &proc[i].burst, &proc[i].priority);
        proc[i].waiting = 0; // Initialize waiting time
        proc[i].turnaround = 0; // Initialize turnaround time
    }

    
    calculateTimes(proc, n);

    return 0;
}