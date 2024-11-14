'use client'

import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Button } from '@shadcn/ui';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Filter, Truck, XCircle, ChevronRight } from 'lucide-react';

// Workaround for Leaflet marker icon issue in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});


// Mock data for vehicles
const vehicles = [
  { id: '1', name: 'Truck 001', status: 'Active', location: { lat: 51.505, lng: -0.09 } },
  { id: '2', name: 'Van 002', status: 'Inactive', location: { lat: 51.51, lng: -0.1 } },
  { id: '3', name: 'Car 003', status: 'Active', location: { lat: 51.515, lng: -0.09 } },
]

export default function FleetManagementApp() {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fleet Management</h1>
        <Button size="icon">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add vehicle</span>
        </Button>
      </header>

      <main className="flex-grow relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {vehicles.map((vehicle) => (
            <Marker key={vehicle.id} position={[vehicle.location.lat, vehicle.location.lng]}>
              <Popup>{vehicle.name} - {vehicle.status}</Popup>
            </Marker>
          ))}
        </MapContainer>

        <Card className="absolute bottom-0 left-0 right-0 rounded-t-xl max-h-[50%] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Fleet</CardTitle>
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter vehicles</span>
            </Button>
          </CardHeader>
          <CardContent>
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`flex items-center p-4 border-b last:border-b-0 ${
                  selectedVehicle?.id === vehicle.id ? 'bg-secondary' : ''
                }`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                {vehicle.status === 'Active' ? (
                  <Truck className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <div className="ml-4 flex-grow">
                  <p className="font-semibold">{vehicle.name}</p>
                  <p className="text-sm text-gray-500">{vehicle.status}</p>
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white shadow-sm p-4 flex justify-between items-center">
        <Input type="text" placeholder="Search vehicles..." className="max-w-sm" />
        <p className={`text-sm ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </p>
      </footer>
    </div>
  )
}
              