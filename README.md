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

## Features
- **Add New Device**: Users can add new devices with their name, power consumption, and daily usage hours.
- **Automatic Cost Calculations**: The system automatically calculates the daily, weekly, and monthly costs for each device based on the provided data.
- **Editable Device Information**: Users can update the daily usage hours for a device, which will automatically update the associated costs.
- **Persistent Data**: Data is stored and updated on the server, with the UI automatically refreshing after updates.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, MongoDB (for storing device data)
- **Data Fetching**: SWR (for server-side data fetching)
- **State Management**: React hooks
- **Cost Calculations**: Custom utility functions for calculating daily, weekly, and monthly costs
- **Popup UI**: Custom popup for adding and editing devices
- **Notifications**: SweetAlert2 for error and success messages

## Installation

To get started with this project locally, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/rikipines/energy-track-project.git


