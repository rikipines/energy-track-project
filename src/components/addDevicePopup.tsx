import React, { useState } from 'react';
import Device from '../models/device';
import { calculateDailyCost, calculateWeeklyCost, calculateMonthlyCost } from '../utils/calculations';

interface AddDevicePopupProps {
  onAddDevice: (newDevice: Device) => Promise<void>;
  onClose: () => void;
}

const AddDevicePopup: React.FC<AddDevicePopupProps> = ({ onClose, onAddDevice }) => {
  const [device, setDevice] = useState<Device>({
    name: '',
    power: 0,
    dailyUsageHours: 0,
    dailyCost: 0,
    weeklyCost: 0,
    monthlyCost: 0,
  });

  const handleAdd = async () => {
    const dailyCost = calculateDailyCost(device.power, device.dailyUsageHours);
    const weeklyCost = calculateWeeklyCost(dailyCost);
    const monthlyCost = calculateMonthlyCost(dailyCost);

    await onAddDevice({ ...device, dailyCost, weeklyCost, monthlyCost });
    onClose();
  };

  const isFormValid = device.name && device.power > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-indigo-100 p-6 rounded-lg shadow-lg w-full max-w-sm border border-indigo-300">
        <h2 className="text-indigo-700 text-lg font-semibold mb-4">Add New Device</h2>
        <input
          type="text"
          placeholder="Device Name"
          value={device.name}
          onChange={(e) => setDevice({ ...device, name: e.target.value })}
          className="border border-indigo-300 rounded p-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Power (W)"
          value={device.power}
          onChange={(e) => setDevice({ ...device, power: parseFloat(e.target.value) })}
          className="border border-indigo-300 rounded p-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Daily Usage Hours"
          value={device.dailyUsageHours}
          onChange={(e) => setDevice({ ...device, dailyUsageHours: parseFloat(e.target.value) })}
          className="border border-indigo-300 rounded p-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleAdd}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isFormValid}
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDevicePopup;
