#include <stdio.h>

typedef struct process {
    int id;
    int arrival;
    int completion;
    int waiting;
    int burst;
    int turnaroundtime;
} proc;

void findwaitandturn(proc proc[], int n) {
    proc[0].waiting = 0; // First process always has zero waiting time

    for (int i = 1; i < n; i++) {
        proc[i].waiting = (proc[i - 1].waiting + proc[i - 1].burst) > proc[i].arrival
                          ? (proc[i - 1].waiting + proc[i - 1].burst) - proc[i].arrival
                          : 0;
    }

    for (int i = 0; i < n; i++) {
        proc[i].turnaroundtime = proc[i].burst + proc[i].waiting;
    }
}

void findavg(proc proc[], int n) {
    findwaitandturn(proc, n);

    int totalwait = 0;
    int totalturn = 0;

    for (int i = 0; i < n; i++) {
        totalwait += proc[i].waiting;
        totalturn += proc[i].turnaroundtime;
    }

    printf("The average waiting time is: %.2f\n", (float)totalwait / n);
    printf("The average turnaround time is: %.2f\n", (float)totalturn / n);
}

void sortbyburst(proc proc[], int n, int current_time) {
    for (int i = 1; i < n; i++) {
        for (int j = 1; j < n - i; j++) {
            if (proc[j].arrival <= current_time && proc[j].burst > proc[j + 1].burst) {
                struct process temp = proc[j];
                proc[j] = proc[j + 1];
                proc[j + 1] = temp;
            }
        }
    }
}

int main() {
    int n;
    printf("Enter the number of processes: ");
    scanf("%d", &n);

    proc proc[n];

    for (int i = 0; i < n; i++) {
        proc[i].id = i + 1;
        printf("Enter the arrival and burst time for Process %d: ", proc[i].id);
        scanf("%d %d", &proc[i].arrival, &proc[i].burst);
    }

    // Sort processes by arrival time
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (proc[j].arrival > proc[j + 1].arrival) {
                struct process temp = proc[j];
                proc[j] = proc[j + 1];
                proc[j + 1] = temp;
            }
        }
    }

    // Sort by burst time only after processes have arrived
    int current_time = proc[0].arrival;
    sortbyburst(proc, n, current_time);

    // Calculate averages
    findavg(proc, n);

    return 0;
}
