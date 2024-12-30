import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  MessageCircle, Mail, Phone, Settings, 
  AlertTriangle, CheckCircle, RefreshCw,
  Facebook, Twitter, Send, MessageSquare,
  Globe, BarChart2
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const CommunicationGatewayDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - would be replaced with real API data
  const gatewayStatus = {
    sms: { status: 'operational', latency: '150ms', success_rate: 99.8 },
    email: { status: 'operational', latency: '220ms', success_rate: 99.9 },
    whatsapp: { status: 'operational', latency: '180ms', success_rate: 99.7 },
    facebook: { status: 'degraded', latency: '350ms', success_rate: 95.5 },
    twitter: { status: 'operational', latency: '200ms', success_rate: 99.6 },
    telegram: { status: 'operational', latency: '170ms', success_rate: 99.8 },
    imo: { status: 'operational', latency: '190ms', success_rate: 99.5 },
    discord: { status: 'operational', latency: '160ms', success_rate: 99.7 }
  };

  const messageStats = [
    { name: 'SMS', sent: 15000, failed: 30, pending: 120 },
    { name: 'Email', sent: 25000, failed: 150, pending: 200 },
    { name: 'WhatsApp', sent: 8000, failed: 40, pending: 80 },
    { name: 'Facebook', sent: 5000, failed: 250, pending: 150 },
    { name: 'Twitter', sent: 3000, failed: 20, pending: 50 },
    { name: 'Telegram', sent: 6000, failed: 30, pending: 70 },
    { name: 'IMO', sent: 2000, failed: 15, pending: 40 },
    { name: 'Discord', sent: 4000, failed: 25, pending: 60 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getGatewayIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'sms':
        return <MessageCircle className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'whatsapp':
        return <MessageSquare className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'telegram':
        return <Send className="w-5 h-5" />;
      case 'imo':
        return <MessageCircle className="w-5 h-5" />;
      case 'discord':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication Gateway Manager</h1>
          <p className="text-gray-600">Manage and monitor all communication channels</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <RefreshCw className="w-4 h-4" />
          Refresh Status
        </button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Gateway Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Object.entries(gatewayStatus).map(([gateway, data]) => (
              <Card key={gateway}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center space-x-2">
                    {getGatewayIcon(gateway)}
                    <CardTitle className="text-sm font-medium capitalize">
                      {gateway}
                    </CardTitle>
                  </div>
                  <span className={getStatusColor(data.status)}>⬤</span>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Latency</p>
                      <p className="text-sm font-medium">{data.latency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Success Rate</p>
                      <p className="text-sm font-medium">{data.success_rate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Message Statistics */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Message Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={messageStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sent" fill="#22c55e" name="Sent" />
                    <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                    <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Facebook Message Gateway Degraded Performance</AlertTitle>
                  <AlertDescription>
                    Higher than normal latency detected in Facebook message delivery.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Twitter Gateway Restored</AlertTitle>
                  <AlertDescription>
                    Twitter message gateway has recovered from earlier disruption.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual Gateway Settings */}
        {['sms', 'email', 'whatsapp', 'facebook', 'twitter', 'telegram', 'imo', 'discord'].map((gateway) => (
          <TabsContent key={gateway} value={gateway}>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {getGatewayIcon(gateway)}
                  <div>
                    <CardTitle className="capitalize">{gateway} Gateway Settings</CardTitle>
                    <CardDescription>Configure your {gateway} integration settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* API Configuration */}
                  <div className="grid gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">API Configuration</h3>
                      <div className="grid gap-2">
                        <div>
                          <label className="text-sm font-medium">API Key</label>
                          <input 
                            type="password"
                            className="w-full p-2 border rounded-md"
                            value="************************"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">API Endpoint</label>
                          <input 
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="https://api.example.com/v1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Enable delivery notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Enable failure alerts</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span>Enable rate limit warnings</span>
                        </label>
                      </div>
                    </div>

                    {/* Rate Limiting */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Rate Limiting</h3>
                      <div className="grid gap-2">
                        <div>
                          <label className="text-sm font-medium">Messages per second</label>
                          <input 
                            type="number"
                            className="w-full p-2 border rounded-md"
                            placeholder="100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Burst limit</label>
                          <input 
                            type="number"
                            className="w-full p-2 border rounded-md"
                            placeholder="500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Template Management */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Message Templates</h3>
                      <div className="border rounded-md p-4">
                        <p className="text-sm text-gray-500 mb-2">
                          Manage and create message templates for quick sending
                        </p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                          Manage Templates
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Save Settings Button */}
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                      Save Changes
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        {/* Global Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Global Gateway Settings</CardTitle>
              <CardDescription>Configure global settings for all communication channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Failover Configuration */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Failover Configuration</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Enable automatic failover</span>
                    </label>
                    <div>
                      <label className="text-sm font-medium">Failover timeout (seconds)</label>
                      <input 
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="30"
                      />
                    </div>
                  </div>
                </div>

                {/* Global Rate Limits */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Global Rate Limits</h3>
                  <div className="grid gap-2">
                    <div>
                      <label className="text-sm font-medium">Total messages per minute</label>
                      <input 
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="1000"
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Admin Notifications</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Email notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>SMS alerts for critical issues</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Webhook notifications</span>
                    </label>
                    <div>
                      <label className="text-sm font-medium">Alert email addresses</label>
                      <input 
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="admin@example.com, alerts@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Queue Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Message Queue Configuration</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Queue Type</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="redis">Redis</option>
                        <option value="rabbitmq">RabbitMQ</option>
                        <option value="kafka">Apache Kafka</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Queue Connection String</label>
                      <input 
                        type="password"
                        className="w-full p-2 border rounded-md"
                        placeholder="redis://localhost:6379"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Message Retention (days)</label>
                      <input 
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="30"
                      />
                    </div>
                  </div>
                </div>

                {/* Logging and Monitoring */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Logging and Monitoring</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Log Level</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="debug">Debug</option>
                        <option value="info">Info</option>
                        <option value="warn">Warning</option>
                        <option value="error">Error</option>
                      </select>
                    </div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Enable detailed message tracking</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Store message content in logs</span>
                    </label>
                    <div>
                      <label className="text-sm font-medium">Monitoring Integration</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="prometheus">Prometheus</option>
                        <option value="datadog">Datadog</option>
                        <option value="newrelic">New Relic</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Security Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Encryption Level</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="tls1.2">TLS 1.2</option>
                        <option value="tls1.3">TLS 1.3</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">IP Whitelist</label>
                      <textarea 
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter IP addresses, one per line"
                        rows="3"
                      ></textarea>
                    </div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Enable message encryption at rest</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Enable API key rotation</span>
                    </label>
                  </div>
                </div>

                {/* Backup and Recovery */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Backup and Recovery</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Backup Schedule</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Retention Period (days)</label>
                      <input 
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="90"
                      />
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Backup Now
                    </button>
                  </div>
                </div>

                {/* Save Settings */}
                <div className="flex justify-end space-x-4">
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Reset to Defaults
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                    Save Global Settings
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationGatewayDashboard;
