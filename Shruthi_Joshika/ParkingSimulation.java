import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

abstract class Vehicle {
    protected String vehicleNumber, ownerName;
    protected int parkingHours;
    public Vehicle(String vehicleNumber, String ownerName, int parkingHours) {
        this.vehicleNumber = vehicleNumber;
        this.ownerName = ownerName;
        this.parkingHours = parkingHours;
    }
    public abstract double calculateParkingFee();
    public String displayInfo() {
        return "Vehicle Number: " + vehicleNumber + "\n" +
               "Owner Name: " + ownerName + "\n" +
               "Parking Hours: " + parkingHours;
    }
}

class Car extends Vehicle {
    public Car(String vehicleNumber, String ownerName, int parkingHours) {
        super(vehicleNumber, ownerName, parkingHours);
    }
    @Override
    public double calculateParkingFee() {
        return parkingHours * 20;
    }
}

class Bike extends Vehicle {
    public Bike(String vehicleNumber, String ownerName, int parkingHours) {
        super(vehicleNumber, ownerName, parkingHours);
    }
    @Override
    public double calculateParkingFee() {
        return parkingHours * 5;
    }
}

class ParkingLot {
    private Map<String, Vehicle> vehicleMap = new ConcurrentHashMap<>();

    public void parkVehicle(String id, Vehicle vehicle) {
        vehicleMap.put(id, vehicle);
        System.out.println("Vehicle parked with ID: " + id + "\n" + vehicle.displayInfo() +
                           "\nParking Fee: " + vehicle.calculateParkingFee() + " units\n");
    }

    public void leaveParking(String id) {
        Vehicle vehicle = vehicleMap.remove(id);
        if (vehicle != null) {
            System.out.println("Vehicle with ID: " + id + " has left the parking lot.\n");
        } else {
            System.out.println("Vehicle with ID: " + id + " not found in parking lot.\n");
        }
    }
}

class VehicleThread extends Thread {
    private ParkingLot parkingLot;
    private String id;
    private Vehicle vehicle;
    private int stayDuration;

    public VehicleThread(ParkingLot parkingLot, String id, Vehicle vehicle, int stayDuration) {
        this.parkingLot = parkingLot;
        this.id = id;
        this.vehicle = vehicle;
        this.stayDuration = stayDuration;
    }

    @Override
    public void run() {
        parkingLot.parkVehicle(id, vehicle); // Vehicle parks
        try {
            Thread.sleep(stayDuration * 1000); // Simulate parking duration in seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        parkingLot.leaveParking(id); // Vehicle leaves
    }
}

public class ParkingSimulation {
    public static void main(String[] args) {
        ParkingLot parkingLot = new ParkingLot();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter number of vehicles to simulate:");
        int numberOfVehicles = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        List<VehicleThread> vehicleThreads = new ArrayList<>();

        for (int i = 1; i <= numberOfVehicles; i++) {
            System.out.println("Enter details for vehicle " + i);

            System.out.print("Vehicle Type (Car/Bike): ");
            String type = scanner.nextLine();

            System.out.print("Vehicle Number: ");
            String vehicleNumber = scanner.nextLine();

            System.out.print("Owner Name: ");
            String ownerName = scanner.nextLine();

            System.out.print("Parking Hours: ");
            int parkingHours = scanner.nextInt();

            System.out.print("Stay Duration (seconds, to simulate parking duration): ");
            int stayDuration = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            Vehicle vehicle;
            if (type.equalsIgnoreCase("Car")) {
                vehicle = new Car(vehicleNumber, ownerName, parkingHours);
            } else if (type.equalsIgnoreCase("Bike")) {
                vehicle = new Bike(vehicleNumber, ownerName, parkingHours);
            } else {
                System.out.println("Invalid vehicle type. Skipping vehicle.");
                continue;
            }

            String id = "V" + i;
            VehicleThread vehicleThread = new VehicleThread(parkingLot, id, vehicle, stayDuration);
            vehicleThreads.add(vehicleThread);
        }

        // Start all vehicle threads
        for (VehicleThread vt : vehicleThreads) {
            vt.start();
        }

        // Wait for all threads to complete
        for (VehicleThread vt : vehicleThreads) {
            try {
                vt.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("Parking simulation complete.");
        scanner.close();
    }
}
