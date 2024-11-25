'use client';

import React, { useState } from 'react';
import useDeviceData from '../hooks/useDeviceSwr'; // Custom hook for fetching data
import AddDevicePopup from './addDevicePopup'; // Component for adding new devices
import '../styles/globals.css';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ObjectId } from 'mongodb';
import { calculateDailyCost, calculateWeeklyCost, calculateMonthlyCost } from '../utils/calculations';
import Swal from 'sweetalert2';

type Device = {
  _id?: ObjectId | string;
  name: string;
  power: number;
  dailyUsageHours: number;
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
};

const DeviceTable = () => {
  const { data: allDevices, mutate } = useDeviceData();
  const [isAddDevicePopupOpen, setIsAddDevicePopupOpen] = useState(false);

  const handleAddDevice = async (newDevice: Device) => {
    try {
      const response = await fetch('/api/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDevice),
      });

      if (response.ok) {
        await mutate();
        setIsAddDevicePopupOpen(false);
      } else {
        const errorData = await response.json();
        Swal.fire('Error!', errorData.message || 'Failed to add device.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'There was an error adding the device.', 'error');
    }
  };

  const handleDailyUsageChange = async (deviceId: string, newUsage: number) => {
    const deviceToUpdate = allDevices?.find((d) => d._id === deviceId);
    if (!deviceToUpdate) return;

    const updatedDailyCost = calculateDailyCost(deviceToUpdate.power, newUsage);
    const updatedWeeklyCost = calculateWeeklyCost(updatedDailyCost);
    const updatedMonthlyCost = calculateMonthlyCost(updatedDailyCost);

    const updatedDevice = {
      ...deviceToUpdate,
      dailyUsageHours: newUsage,
      dailyCost: updatedDailyCost,
      weeklyCost: updatedWeeklyCost,
      monthlyCost: updatedMonthlyCost,
    };

    // עדכון מקומי מיידי
    mutate(
      (current) =>
        current?.map((device) =>
          device._id === deviceId ? updatedDevice : device
        ) || [],
      false // מניעת רענון מיותר
    );

    try {
      // שליחת השינויים לשרת
      const response = await fetch(`/api/devices`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: deviceId,
          dailyUsageHours: newUsage,
          dailyCost: updatedDailyCost,
          weeklyCost: updatedWeeklyCost,
          monthlyCost: updatedMonthlyCost,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update device');
      }
    } catch (error) {
      console.error('Error updating device:', error);
      Swal.fire('Error!', 'Failed to update device. Please try again.', 'error');
    }
  };

  const columnHelper = createColumnHelper<Device>();
  const columns = [
    columnHelper.accessor('name', { header: 'Device Name' }),
    columnHelper.accessor('power', { header: 'Power (W)' }),
    columnHelper.accessor('dailyUsageHours', {
      header: 'Daily Usage Hours',
      cell: ({ row }) => (
        <input
          type="number"
          defaultValue={row.original.dailyUsageHours || 0}
          onChange={(e) =>
            handleDailyUsageChange(row.original._id as string, parseFloat(e.target.value))
          }
          className="border rounded-lg p-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      ),
    }),
    columnHelper.accessor('dailyCost', {
      header: 'Daily Cost',
      cell: ({ row }) => (
        <span>₪ {row.original.dailyCost != null ? row.original.dailyCost.toFixed(2) : '0.00'}</span>
      ),
    }),
    columnHelper.accessor('weeklyCost', {
      header: 'Weekly Cost',
      cell: ({ row }) => (
        <span>₪ {row.original.weeklyCost != null ? row.original.weeklyCost.toFixed(2) : '0.00'}</span>
      ),
    }),
    columnHelper.accessor('monthlyCost', {
      header: 'Monthly Cost',
      cell: ({ row }) => (
        <span>₪ {row.original.monthlyCost != null ? row.original.monthlyCost.toFixed(2) : '0.00'}</span>
      ),
    }),
  ];

  const table = useReactTable({
    data: allDevices || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <button
        onClick={() => setIsAddDevicePopupOpen(true)}
        className="mb-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition"
      >
        Add Device
      </button>
      {isAddDevicePopupOpen && (
        <AddDevicePopup onAddDevice={handleAddDevice} onClose={() => setIsAddDevicePopupOpen(false)} />
      )}

      <table className="min-w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-sm">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.original._id as string} className="hover:bg-gray-50 transition">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-t px-6 py-4 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
