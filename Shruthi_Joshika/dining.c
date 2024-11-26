#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h> // Include time.h for seeding random number generator

#define N 5 // Number of philosophers

// Philosopher states
enum { THINKING, HUNGRY, EATING } state[N];

// Function to check if a philosopher can eat
void test(int id) {
    if (state[id] == HUNGRY && 
        state[(id + 1) % N] != EATING && 
        state[(id + N - 1) % N] != EATING) {
        state[id] = EATING;
        printf("Philosopher %d picks up forks and starts eating.\n", id);
    }
}

// Philosopher actions
void think(int id) {
    printf("Philosopher %d is thinking...\n", id);
    sleep(rand() % 3 + 1); // Simulate thinking
}

void eat(int id) {
    printf("Philosopher %d is eating...\n", id);
    sleep(rand() % 2 + 1); // Simulate eating
}

// Pickup forks
void pickup_forks(int id) {
    printf("Philosopher %d is hungry...\n", id);
    state[id] = HUNGRY;
    test(id); // Check if philosopher can eat
}

// Put down forks
void putdown_forks(int id) { 
    if (state[id] == EATING) {
        printf("Philosopher %d puts down forks and starts thinking.\n", id);
        state[id] = THINKING;
        // Test neighbors to see if they can eat
        test((id + 1) % N);
        test((id + N - 1) % N);
    }
}

// Simulate the philosophers' activities
void simulate_philosophers() {
    while (1) {
        for (int i = 0; i < N; i++) {
            think(i); // Philosopher is thinking
            pickup_forks(i); // Philosopher tries to pick up forks
            if (state[i] == EATING) {
                eat(i); // Philosopher eats
                putdown_forks(i); // Philosopher puts down forks
            }
        }
    }
}

int main() {
    srand(time(NULL)); // Seed random number generator

    // Initialize all philosophers to THINKING state
    for (int i = 0; i < N; i++) {
        state[i] = THINKING;
    }

    // Simulate the philosophers' behavior
    simulate_philosophers();

    return 0;
}