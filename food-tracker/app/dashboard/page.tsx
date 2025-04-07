"use client"

import { useState } from "react"
import Link from "next/link"
import { format, addDays, isBefore, parseISO } from "date-fns"
import {
  AlertCircle,
  BarChart3,
  Calendar,
  Clock,
  Download,
  Plus,
  Search,
  ShoppingBasket,
  Trash2,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MobileNav } from "@/components/mobile-nav"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Footer } from "@/components/footer"

// Sample data for demonstration
const initialItems = [
  {
    id: 1,
    name: "Milk",
    category: "Dairy",
    expiryDate: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    quantity: 1,
    unit: "gallon",
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Meat",
    expiryDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    quantity: 2,
    unit: "lbs",
  },
  {
    id: 3,
    name: "Spinach",
    category: "Vegetables",
    expiryDate: format(addDays(new Date(), 4), "yyyy-MM-dd"),
    quantity: 1,
    unit: "bag",
  },
  {
    id: 4,
    name: "Apples",
    category: "Fruits",
    expiryDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    quantity: 6,
    unit: "pieces",
  },
  {
    id: 5,
    name: "Yogurt",
    category: "Dairy",
    expiryDate: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    quantity: 4,
    unit: "cups",
  },
]

export default function Dashboard() {
  const { toast } = useToast()
  const [items, setItems] = useState(initialItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const expiringSoon = filteredItems.filter((item) => {
    const expiryDate = parseISO(item.expiryDate)
    const threeDaysFromNow = addDays(new Date(), 3)
    return isBefore(expiryDate, threeDaysFromNow)
  })

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your inventory.",
    })
  }

  const getDaysUntilExpiry = (dateString: string) => {
    const today = new Date()
    const expiryDate = parseISO(dateString)
    const diffTime = expiryDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getExpiryStatusColor = (days: number) => {
    if (days < 0) return "text-red-500 dark:text-red-400"
    if (days <= 2) return "text-amber-500 dark:text-amber-400"
    return "text-emerald-600 dark:text-emerald-500"
  }

  const getProgressColor = (days: number) => {
    if (days < 0) return "bg-red-500 dark:bg-red-400"
    if (days <= 2) return "bg-amber-500 dark:bg-amber-400"
    return "bg-emerald-600 dark:bg-emerald-500"
  }

  // Calculate statistics
  const totalItems = items.length
  const totalExpiringSoon = expiringSoon.length
  const wastePercentage = Math.round((totalExpiringSoon / totalItems) * 100) || 0
  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  // Export inventory as CSV
  const exportInventory = () => {
    const headers = ["Name", "Category", "Quantity", "Unit", "Expiry Date"]
    const csvData = [
      headers.join(","),
      ...items.map((item) => [item.name, item.category, item.quantity, item.unit, item.expiryDate].join(",")),
    ].join("\n")

    const blob = new Blob([csvData], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `freshtrack-inventory-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Inventory exported",
      description: "Your inventory has been exported as a CSV file.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-30">
        <Link className="flex items-center justify-center" href="/">
          <ShoppingBasket className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">FreshTrack</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium text-emerald-600 dark:text-emerald-500 hover:underline underline-offset-4"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="/recipes"
          >
            Recipes
          </Link>
          <Link
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="/shopping-list"
          >
            Shopping List
          </Link>
          <Link
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="/profile"
          >
            Profile
          </Link>
        </nav>
        <MobileNav />
      </header>
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Food Inventory</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Track and manage your food items to reduce waste
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={exportInventory}
                        className="text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export inventory as CSV</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                        className="text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle view mode</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link href="/dashboard/add">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search items by name or category..."
                  className="pl-8 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Tabs defaultValue="all">
              <TabsList className="mb-4 bg-white dark:bg-gray-900">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-500"
                >
                  All Items
                </TabsTrigger>
                <TabsTrigger
                  value="expiring"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-500"
                >
                  Expiring Soon
                  {expiringSoon.length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {expiringSoon.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 overflow-hidden"
                      >
                        {viewMode === "grid" ? (
                          <>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-gray-900 dark:text-white">{item.name}</CardTitle>
                                  <CardDescription className="text-gray-600 dark:text-gray-400">
                                    {item.category}
                                  </CardDescription>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                  {item.quantity} {item.unit}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  Expires: {format(parseISO(item.expiryDate), "MMM d, yyyy")}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span
                                  className={`text-sm font-medium ${getExpiryStatusColor(getDaysUntilExpiry(item.expiryDate))}`}
                                >
                                  {getDaysUntilExpiry(item.expiryDate)} days left
                                </span>
                              </div>
                              <Progress
                                className="mt-2"
                                value={Math.max(0, Math.min(100, getDaysUntilExpiry(item.expiryDate) * 10))}
                                indicatorClassName={getProgressColor(getDaysUntilExpiry(item.expiryDate))}
                              />
                            </CardContent>
                            <CardFooter>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 ml-auto border-gray-200 dark:border-gray-700"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </CardFooter>
                          </>
                        ) : (
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-2 h-full rounded-full ${getProgressColor(getDaysUntilExpiry(item.expiryDate))}`}
                              ></div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.category}</span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {item.quantity} {item.unit}
                                  </span>
                                  <span
                                    className={`text-xs font-medium ${getExpiryStatusColor(getDaysUntilExpiry(item.expiryDate))}`}
                                  >
                                    {getDaysUntilExpiry(item.expiryDate)} days left
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        )}
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <ShoppingBasket className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">No items found</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">
                        {searchQuery ? "Try a different search term" : "Add some items to your inventory"}
                      </p>
                      {!searchQuery && (
                        <Link href="/dashboard/add">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="expiring">
                <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                  {expiringSoon.length > 0 ? (
                    expiringSoon.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 overflow-hidden"
                      >
                        {viewMode === "grid" ? (
                          <>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-gray-900 dark:text-white">{item.name}</CardTitle>
                                  <CardDescription className="text-gray-600 dark:text-gray-400">
                                    {item.category}
                                  </CardDescription>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                  {item.quantity} {item.unit}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  Expires: {format(parseISO(item.expiryDate), "MMM d, yyyy")}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                <span
                                  className={`text-sm font-medium ${getExpiryStatusColor(getDaysUntilExpiry(item.expiryDate))}`}
                                >
                                  Expiring in {getDaysUntilExpiry(item.expiryDate)} days!
                                </span>
                              </div>
                              <Progress
                                className="mt-2"
                                value={Math.max(0, Math.min(100, getDaysUntilExpiry(item.expiryDate) * 10))}
                                indicatorClassName={getProgressColor(getDaysUntilExpiry(item.expiryDate))}
                              />
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <Link href="/recipes">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                  Find Recipes
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 border-gray-200 dark:border-gray-700"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </CardFooter>
                          </>
                        ) : (
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-2 h-full rounded-full ${getProgressColor(getDaysUntilExpiry(item.expiryDate))}`}
                              ></div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.category}</span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {item.quantity} {item.unit}
                                  </span>
                                  <span
                                    className={`text-xs font-medium ${getExpiryStatusColor(getDaysUntilExpiry(item.expiryDate))}`}
                                  >
                                    Expiring in {getDaysUntilExpiry(item.expiryDate)} days!
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link href="/recipes">
                                <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                                  Find Recipes
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">No items expiring soon</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        All your items have more than 3 days until expiry
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Inventory Summary</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Overview of your food items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Items</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{items.length}</span>
                    </div>
                    <Progress
                      value={items.length * 10}
                      max={100}
                      className="bg-gray-100 dark:bg-gray-800"
                      indicatorClassName="bg-emerald-600 dark:bg-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expiring Soon</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{expiringSoon.length}</span>
                    </div>
                    <Progress
                      value={expiringSoon.length * 20}
                      max={100}
                      className="bg-gray-100 dark:bg-gray-800"
                      indicatorClassName="bg-amber-500 dark:bg-amber-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Waste Risk</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{wastePercentage}%</span>
                    </div>
                    <Progress
                      value={wastePercentage}
                      max={100}
                      className="bg-gray-100 dark:bg-gray-800"
                      indicatorClassName={
                        wastePercentage > 30 ? "bg-red-500 dark:bg-red-500" : "bg-emerald-600 dark:bg-emerald-500"
                      }
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
                    <div className="space-y-2">
                      {Object.entries(categoryCounts).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                          <Badge
                            variant="outline"
                            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/add" className="w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Item
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* New card for food waste insights */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Food Waste Insights</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Track your progress in reducing waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Savings</p>
                      <p className="text-xl font-bold text-emerald-600 dark:text-emerald-500">$24.50</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Waste Reduction Tips</p>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1 mt-0.5">
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-500" />
                        </div>
                        <span>Use oldest ingredients first when cooking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1 mt-0.5">
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-500" />
                        </div>
                        <span>Freeze items that you won't use before they expire</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-1 mt-0.5">
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-500" />
                        </div>
                        <span>Plan meals around expiring ingredients</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  View Detailed Analytics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer/>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-900 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 FreshTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500 hover:underline underline-offset-4"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  )
}

