"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function AddItem() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    notes: "",
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // In a real app, this would save to a database
    console.log("Submitted:", formData)
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingBasket className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold">FreshTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {/* <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link> */}
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/recipes">
            Recipes
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="mx-auto max-w-md">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Add New Item</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Enter the details of the food item you want to track.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Milk, Chicken, Apples"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dairy">Dairy</SelectItem>
                      <SelectItem value="Meat">Meat</SelectItem>
                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                      <SelectItem value="Fruits">Fruits</SelectItem>
                      <SelectItem value="Grains">Grains & Cereals</SelectItem>
                      <SelectItem value="Bakery">Bakery</SelectItem>
                      <SelectItem value="Canned">Canned Goods</SelectItem>
                      <SelectItem value="Frozen">Frozen Foods</SelectItem>
                      <SelectItem value="Snacks">Snacks</SelectItem>
                      <SelectItem value="Condiments">Condiments</SelectItem>
                      <SelectItem value="Beverages">Beverages</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="0.1"
                      step="0.1"
                      placeholder="1"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select required onValueChange={(value) => handleSelectChange("unit", value)}>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="oz">Ounces (oz)</SelectItem>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="gallon">Gallon</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                        <SelectItem value="ml">Milliliter (ml)</SelectItem>
                        <SelectItem value="cup">Cup</SelectItem>
                        <SelectItem value="bag">Bag</SelectItem>
                        <SelectItem value="box">Box</SelectItem>
                        <SelectItem value="can">Can</SelectItem>
                        <SelectItem value="bottle">Bottle</SelectItem>
                        <SelectItem value="package">Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      className="pl-8"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any additional information about this item"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Add to Inventory
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 FreshTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

