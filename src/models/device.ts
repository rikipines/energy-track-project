// import mongoose from 'mongoose';

// const DeviceSchema = new mongoose.Schema({
//   name: String,
//   power: Number,
//   dailyUsageHours: Number,

// });

// const Device = mongoose.models.Device || mongoose.model('Device', DeviceSchema);

// export default Device;

import { ObjectId } from "mongodb";

// src/types/device.ts
 interface Device {
    _id?: ObjectId | string;
    name: string;
    power: number;
    dailyUsageHours: number;
    dailyCost: number;
    weeklyCost: number;
    monthlyCost: number;
}
  export default Device;    

