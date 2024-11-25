// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "../../../src/utils/db";
// import { ObjectId } from "mongodb";


// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const db = await connectToDatabase();
//   const table = db.client.db("energy-consumption-track");
//   const dataDevices=table.collection("devices");

//   if (req.method === "GET") {
//     try{

//         console.log("GET request");
//         const allDevices = await dataDevices.find({}).toArray();
//         res.status(200).json(allDevices);
//     }
//     catch(error){
//         console.error("Error fetching devices:", error);
//         return res.json({ message: "Error fetching devices data", error });
//     }
   
//   }

//   if (req.method === "POST") {
//     const newDevice = req.body;
//     const allDevices = await dataDevices;
//     await allDevices.insertOne({
//       ...newDevice,
//       _id: new ObjectId(),
//     });

//     // const addDevice={
//     //   ...newDevice,
//     //   _id:Result.insertedId.toString()
//     // }

//     res.status(201).json(newDevice);
//   }

//   if(req.method==="PUT"){
//     const idDevice=req.body.id;
//     const bodyDevice=req.body;
//     try{
//       const result = await dataDevices.updateOne(
//         { _id: new ObjectId(idDevice) }, // המרת id ל-ObjectId
//         { $set: bodyDevice } // עדכון השדות שהתקבלו בבקשה
//       );
//       if (result.matchedCount === 0) {
//         return res.json({ message: "Device not found" });
//       }
  
//       return res.json({ message: 'Device updated successfully' });
//     }
//    catch(err){
//     console.error("Error updating device:", err);
//     return res.json({ message: "Error updating device", err });
//    }

//   }
// };
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/src/utils/db";
import { ObjectId } from "mongodb";

// GET method - Fetch all devices
export async function GET() {
  try {
    const db = await connectToDatabase();
    const table = db.client.db("energy-consumption-track");
    const dataDevices = table.collection("devices");

    const allDevices = await dataDevices.find({}).toArray();
    return NextResponse.json(allDevices, { status: 200 });
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json({ message: "Error fetching devices data", error }, { status: 500 });
  }
}

// POST method - Add a new device
export async function POST(req: Request) {
  try {
    const db = await connectToDatabase();
    const table = db.client.db("energy-consumption-track");
    const dataDevices = table.collection("devices");

    const newDevice = await req.json(); // Parse JSON body
    const result = await dataDevices.insertOne({
      ...newDevice,
      _id: new ObjectId(),
    });

    return NextResponse.json({ message: "Device added", data: result }, { status: 201 });
  } catch (error) {
    console.error("Error adding device:", error);
    return NextResponse.json({ message: "Error adding device", error }, { status: 500 });
  }
}

// PUT method - Update a device
export async function PUT(req: Request) {
  try {
    const db = await connectToDatabase();
    const table = db.client.db("energy-consumption-track");
    const dataDevices = table.collection("devices");

    const { id, ...bodyDevice } = await req.json(); // Extract id and update body
    const result = await dataDevices.updateOne(
      { _id: new ObjectId(id) }, // Match by ObjectId
      { $set: bodyDevice } // Update fields
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Device not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Device updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json({ message: "Error updating device", error }, { status: 500 });
  }
}
