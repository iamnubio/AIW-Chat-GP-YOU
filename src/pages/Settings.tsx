import React from 'react';

export function Settings() {
  return (
    <div className="bg-teal-900/50 rounded-lg backdrop-blur-sm border border-teal-600/50 shadow-xl p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-teal-900 to-teal-600 bg-clip-text text-transparent">
        Settings
      </h1>
      <div className="space-y-6">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-teal-600/30">
          <h2 className="text-xl font-semibold mb-3 text-teal-600">General Settings</h2>
          <p className="text-gray-200">No settings available</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-teal-600/30">
          <h2 className="text-xl font-semibold mb-3 text-teal-600">Account Settings</h2>
          <p className="text-gray-200">No account settings available</p>
        </div>
      </div>
    </div>
  );
}