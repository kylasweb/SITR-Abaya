'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Package, Loader2 } from "lucide-react";
import { getAllOrders, getAllUsers, getProducts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order, Product, UserData } from "@/lib/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { subDays, format } from 'date-fns';
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Helper to format price
const formatPrice = (price: number, currencyCode: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
};

// Helper to get recent orders
const getRecentOrders = (orders: Order[], count: number) => {
    return orders.slice(0, count);
}

// Chart data processing
const processChartData = (orders: Order[]) => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(new Date(), i));
    const weeklyData: { [key: string]: { revenue: number, sales: number } } = {};

    // Initialize weekly data with 0s for the last 7 days
    last7Days.reverse().forEach(day => {
        const dayKey = format(day, 'EEE'); // 'Mon', 'Tue', etc.
        weeklyData[dayKey] = { revenue: 0, sales: 0 };
    });
    
    orders.forEach(order => {
        const orderDate = order.createdAt;
        const now = new Date();
        // Check if the order was created in the last 7 days
        if (orderDate > subDays(now, 7)) {
            const dayKey = format(orderDate, 'EEE');
            if (weeklyData[dayKey]) {
                weeklyData[dayKey].revenue += order.total;
                weeklyData[dayKey].sales += 1;
            }
        }
    });

    return Object.entries(weeklyData).map(([day, data]) => ({
        day,
        revenue: data.revenue,
        sales: data.sales,
    }));
};

const chartConfig: ChartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
    },
    sales: {
        label: "Sales",
        color: "hsl(var(--chart-2))",
    },
};


export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        try {
            const [ordersData, usersData, productsData] = await Promise.all([
                getAllOrders(),
                getAllUsers(),
                getProducts()
            ]);
            setOrders(ordersData);
            setUsers(usersData);
            setProducts(productsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalSales = orders.length;
  const totalCustomers = users.length;
  const totalProducts = products.length;

  const recentOrders = getRecentOrders(orders, 5);
  const weeklyChartData = processChartData(orders);

   if (loading) {
    return (
      <div className="space-y-8">
        <header>
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-6" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-3 w-40 mt-1" />
                    </CardContent>
                </Card>
            ))}
        </div>
         <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            <Card className="lg:col-span-4">
                 <CardHeader>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-56 mt-1" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="min-h-[250px] w-full" />
                </CardContent>
            </Card>
             <Card className="lg:col-span-3">
                 <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48 mt-1" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-40 w-full" />
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">An overview of your store's performance.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">From all successful orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalSales}</div>
            <p className="text-xs text-muted-foreground">Total orders placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalCustomers}</div>
             <p className="text-xs text-muted-foreground">Total registered users</p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Total products in stock</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            <Card className="lg:col-span-4">
                 <CardHeader>
                    <CardTitle>Weekly Performance</CardTitle>
                    <CardDescription>Revenue and sales from the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                         <BarChart data={weeklyChartData} accessibilityLayer>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                             <YAxis
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                             <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

             <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>The last 5 orders placed in your store.</CardDescription>
                </CardHeader>
                <CardContent>
                     {recentOrders.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            <div className="font-medium">{order.customerName}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {order.shippingAddress.email}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{formatPrice(order.total, order.currency)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <h3 className="text-lg font-semibold">No Orders Yet</h3>
                            <p className="mt-1 text-muted-foreground">New orders will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
