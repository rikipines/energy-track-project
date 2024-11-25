This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Device Management System

This is a React-based application for managing devices, calculating their daily, weekly, and monthly costs based on power usage. The system allows users to add new devices, update their power consumption and usage hours, and view the associated cost calculations.

# Energy Usage Manager 📊⚡

Welcome to the **Energy Usage Manager**!  
This application is designed to help users track energy consumption for their household devices, calculate costs, and make informed decisions to optimize power usage. By simply entering device details and usage hours, you can get an instant breakdown of daily, weekly, and monthly costs.

---

## 🌟 Features

- **Add and Manage Devices**: Easily add, update, or delete devices from the tracking list.
- **Real-Time Cost Calculations**: See immediate updates to costs as you adjust daily usage hours.
- **User-Friendly Interface**: Minimalistic and responsive design for an intuitive experience.
- **Detailed Insights**: Breakdowns of energy usage and costs by day, week, and month.

---

## 🛠️ Technologies

The system leverages the following technologies for a seamless user experience and robust backend:

- **Frontend**: React with TypeScript
- **Backend**: Node.js and Express.js
- **Database**: MongoDB Atlas
- **UI Framework**: Tailwind CSS
- **Data Handling**: SWR for efficient server synchronization
- **Alerts**: SweetAlert2 for interactive notifications

---

## 📊 Cost Calculation Overview

The application calculates energy costs using the following formulas:

1. **Daily Cost**:  
   \[
   \text{Daily Cost} = \text{Power (W)} \times \text{Daily Usage Hours} \times 0.001 \times \text{Electricity Rate (₪/kWh)}
   \]

2. **Weekly Cost**:  
   \[
   \text{Weekly Cost} = \text{Daily Cost} \times 7
   \]

3. **Monthly Cost**:  
   \[
   \text{Monthly Cost} = \text{Daily Cost} \times 30
   \]

- **Electricity Rate** is configurable via environment variables and defaults to **0.5 ₪/kWh**.

---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/) or a local MongoDB instance

### Installation

1. **Clone the Repository**;
   ```bash
   git clone https://github.com/YourUsername/Energy-Usage-Manager.git
   cd Energy-Usage-Manager
2. **Install Dependencies**:
   npm install
3. **Set Up Environment Variables**:
Create a .env file in the root folder and configure the following:
 env
Copy code
    ```bash
     MONGODB_URI=mongodb+srv://rivka0556787531:P8HZdq2cwZ8OyJC0@rivka-project-db.imszo.mongodb.net/?retryWrites=true&w=majority
4. **Run the Application**:
Start the backend server:
    ```bash  
    npm run server
Start the frontend application:
    ```bash
    npm run dev
5. **Access the Application**:

Frontend: http://localhost:3000
API Endpoints: http://localhost:5000/api



### 🖥️ Application Usage
**Adding a New Device**
1. Open the application and click "Add Device."
2. Enter the following details:
 Name: Descriptive name for the device (e.g., "Air Conditioner").
 Power (W): The power consumption of the device in watts.
 Daily Usage Hours: The number of hours the device operates daily.
 Click "Add" to include the device in the list.
**Updating a Device**
1. Locate the device in the table.
2. Edit the Daily Usage Hours directly.
3. All costs (daily, weekly, monthly) will update instantly.
**Deleting a Device**
1. Click the delete button next to the device.
2. Confirm the action in the pop-up alert.

### 📂 Project Structure
/Energy-Usage-Manager
├── /components        # Reusable React components
├── /models            # TypeScript models (e.g., Device)
├── /pages             # Main application pages
├── /api               # Backend API routes
├── /utils             # Utility functions (e.g., cost calculations)
├── /styles            # Tailwind CSS and global styles
└── .env               # Environment variables
**Key Files**
DeviceTable.tsx: Displays all devices and cost calculations.
AddDevicePopup.tsx: Modal for adding new devices.
api/devices.ts: CRUD operations for device data.
utils/calculations.ts: Handles all cost calculations.
### 📊 API Endpoints
Method	Endpoint	Description
GET	/api/devices	Fetch all devices
POST	/api/devices	Add a new device
PUT	/api/devices	Update an existing device
DELETE	/api/devices	Delete a device
### 🌟 Contributing
  We welcome contributions to this project! To contribute:
1. Fork the Repository: Fork this repository.
2. Create a Branch:
  ```bash
  v Copy code
   git checkout -b feature-name
3. Make Changes and Commit
   ```bash
    git commit -m "Add your feature"
4. Push to Your Fork:
    ```bash
    git push origin feature-name
5. Submit a Pull Request.
### 📜 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.

### 🛡️ Acknowledgments
React for frontend framework
MongoDB Atlas for database storage
Tailwind CSS for styling
SWR for efficient data fetching
SweetAlert2 for user-friendly alerts
markdown
Copy code



