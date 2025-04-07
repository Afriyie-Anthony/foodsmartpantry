"use client"
import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Sidebar from "@/components/ui/adminSideBar";

const initialInventory = [
  { id: 1, user: "John Doe", name: "Rice", quantity: 10, action: "Added", timestamp: "2025-03-18 10:00 AM" },
  { id: 2, user: "Jane Smith", name: "Tomatoes", quantity: 5, action: "Updated", timestamp: "2025-03-18 11:30 AM" },
];

export default function Inventory() {
  const [inventory] = useState(initialInventory);
  const [search, setSearch] = useState("");

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.user.toLowerCase().includes(search.toLowerCase()) ||
    item.action.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full flex flex-col items-center flex-1">
        <div className="w-full max-w-6xl">
          <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
          <Input 
            placeholder="Search inventory operations..." 
            value={search} 
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearch(e.target.value)} 
            className="mb-4 w-full p-2 border rounded-md"
          />
          
          <Card className="overflow-x-auto shadow-lg rounded-lg p-4 w-full">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100 text-left text-sm font-medium border-b">
                  <TableHead className="px-4 py-2 text-[#00FF00]">User</TableHead>
                  <TableHead className="px-4 py-2">Item Name</TableHead>
                  <TableHead className="px-4 py-2">Quantity</TableHead>
                  <TableHead className="px-4 py-2">Action</TableHead>
                  <TableHead className="px-4 py-2">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} className="border-b hover:bg-gray-50">
                    <TableCell className="px-4 py-2">{item.user}</TableCell>
                    <TableCell className="px-4 py-2">{item.name}</TableCell>
                    <TableCell className="px-4 py-2">{item.quantity}</TableCell>
                    <TableCell className="px-4 py-2">{item.action}</TableCell>
                    <TableCell className="px-4 py-2">{item.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
