#include <stdio.h>
#include <stdlib.h>
#include <unistd.h> // For sleep()

#define BUFFER_SIZE 5 // Size of the buffer
#define NUM_ITEMS 10  // Total number of items to produce/consume

// Shared buffer and counters
int buffer[BUFFER_SIZE];
int in = 0; // Index for the next produced item
int out = 0; // Index for the next consumed item
int count = 0; // Count of items in the buffer

// Function to produce items
void produce(int item) {
    if (count < BUFFER_SIZE) {
        buffer[in] = item; // Place item in buffer
        printf("Produced: %d at index %d\n", item, in);
        in = (in + 1) % BUFFER_SIZE; // Move to the next index
        count++; // Increment count of items
    } else {
        printf("Buffer is full! Unable to produce %d\n", item);
    }
}

// Function to consume items
int consume() {
    if (count > 0) {
        int item = buffer[out]; // Get item from buffer
        printf("Consumed: %d from index %d\n", item, out);
        out = (out + 1) % BUFFER_SIZE; // Move to the next index
        count--; // Decrement count of items
        return item;
    } else {
        printf("Buffer is empty! Nothing to consume.\n");
        return -1; // Indicate that there's nothing to consume
    }
}

int main() {
    // Produce items
    for (int i = 0; i < NUM_ITEMS; i++) {
        int item = rand() % 100; // Produce a random item
        produce(item);
        sleep(1); // Simulate time taken to produce an item
    }

    // Consume items
    for (int i = 0; i < NUM_ITEMS; i++) {
        consume();
        sleep(1); // Simulate time taken to consume an item
    }

    return 0;
}