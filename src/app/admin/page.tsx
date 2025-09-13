import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { getAllOrders, getAllUsers, getProducts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order } from "@/lib/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ChartConfig } from "@/components/ui/chart";
import { subDays, format, startOfWeek } from 'date-fns';

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


export default async function AdminDashboardPage() {
  const [orders, users, products] = await Promise.all([
    getAllOrders(),
    getAllUsers(),
    getProducts()
  ]);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalSales = orders.length;
  const totalCustomers = users.length;
  const totalProducts = products.length;

  const recentOrders = getRecentOrders(orders, 5);
  const weeklyChartData = processChartData(orders);

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
