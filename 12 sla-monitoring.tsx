import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  Activity, AlertCircle, Server, Database, 
  Users, Api, Clock, Shield, AlertTriangle 
} from 'lucide-react';

const SLADashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const performanceData = [
    { time: '00:00', apiLatency: 120, dbLatency: 15, appLatency: 85, users: 450 },
    { time: '04:00', apiLatency: 135, dbLatency: 18, appLatency: 90, users: 280 },
    { time: '08:00', apiLatency: 180, dbLatency: 25, appLatency: 110, users: 890 },
    { time: '12:00', apiLatency: 220, dbLatency: 30, appLatency: 150, users: 1200 },
    { time: '16:00', apiLatency: 190, dbLatency: 22, appLatency: 120, users: 980 },
    { time: '20:00', apiLatency: 150, dbLatency: 17, appLatency: 95, users: 670 }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Level Agreements</h1>
          <p className="text-gray-600">Performance Monitoring and SLA Tracking</p>
        </div>

        <div className="flex space-x-4">
          <select
            className="border rounded-md px-3 py-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* SLA Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Infrastructure SLA */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Server className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="font-semibold">Infrastructure SLA</h3>
            </div>
            <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
              99.99%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uptime</span>
              <span className="font-medium">99.99%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Response Time</span>
              <span className="font-medium">120ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Error Rate</span>
              <span className="font-medium">0.01%</span>
            </div>
          </div>
        </div>

        {/* Database SLA */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Database className="w-5 h-5 text-purple-500 mr-2" />
              <h3 className="font-semibold">Database SLA</h3>
            </div>
            <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
              99.95%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Query Performance</span>
              <span className="font-medium">15ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Connection Pool</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Replication Lag</span>
              <span className="font-medium">50ms</span>
            </div>
          </div>
        </div>

        {/* Application SLA */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="font-semibold">Application SLA</h3>
            </div>
            <span className="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
              99.90%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Response Time</span>
              <span className="font-medium">85ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Error Rate</span>
              <span className="font-medium">0.05%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Success Rate</span>
              <span className="font-medium">99.95%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Latency Overview */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">System Latency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="apiLatency" stroke="#8884d8" name="API" />
              <Line type="monotone" dataKey="dbLatency" stroke="#82ca9d" name="Database" />
              <Line type="monotone" dataKey="appLatency" stroke="#ffc658" name="Application" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Activity */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Usage Table */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Top Usage Analysis</h3>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500">
                <th className="pb-3">Resource</th>
                <th className="pb-3">Usage</th>
                <th className="pb-3">Response Time</th>
                <th className="pb-3">SLA Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">
                  <div className="flex items-center">
                    <Api className="w-4 h-4 mr-2 text-blue-500" />
                    <span>/api/v1/alerts</span>
                  </div>
                </td>
                <td>15,234 calls</td>
                <td>125ms avg</td>
                <td>
                  <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    Met
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-purple-500" />
                    <span>Law Enforcement Portal</span>
                  </div>
                </td>
                <td>8,567 sessions</td>
                <td>250ms avg</td>
                <td>
                  <span className="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                    Warning
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SLA Violations */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Recent SLA Violations</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <div>
                  <h4 className="font-medium">Database Response Time Exceeded</h4>
                  <p className="text-sm text-gray-600">Query latency spike detected</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <div>
                  <h4 className="font-medium">API Rate Limit Warning</h4>
                  <p className="text-sm text-gray-600">Approaching threshold for /api/v1/alerts</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLADashboard;
