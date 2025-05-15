# Activity Tracker Application

This application tracks user activities in real-time. It consists of a Socket.IO server (producer) that receives activity data and a React client that displays these activities.

## Prerequisites

* **Node.js and npm:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [https://nodejs.org/](https://nodejs.org/).

## Installation

1.  **Navigate to the root folder**.
2.  **Install dependencies:** Run the following command:

    ```bash
    npm install
    ```

    This command will install all the necessary packages defined in the `package.json` file.

## Running the Activity Tracker

To run the application, you need to start the Socket.IO server (producer) first, followed by the React client.

### 1. Start the Socket.IO Server (Producer)

The Socket.IO server acts as the producer of activity events. It exposes an endpoint `/activity` where you can send POST requests containing activity data.

1.  **Start the server:** Run the command to start your Node.js server. For example:

    ```bash
    npx nx serve socket-server
    ```

2.  **Send Activity Data:** Once the server is running, you can send POST requests to the `/activity` endpoint with the following JSON structure:

    ```json
    {
        "activity": "user x loggedin at 3:45"
    }
    ```

### 2. Load the React App (Consumer)

The React app acts as the consumer, listening for activity events broadcasted by the Socket.IO server and displaying them in real-time.

1.  **Start the React app:** Run the command to start the development server for your React application:

    ```bash
    npx nx server activity-tracker
    ```

## Running the Product Catalog

1.  **Start the server:** Run the command to start your Node.js server. For example:

    ```bash
    npx nx serve product-catalog
    ```
