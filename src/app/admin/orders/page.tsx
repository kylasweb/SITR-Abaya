import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTable from "./order-table";
import { getAllOrders } from "@/lib/data";


export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-1">
            View and manage customer orders.
        </p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            A list of all orders placed in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <OrderTable orders={orders} />
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-semibold">No Orders Yet</h3>
              <p className="mt-1 text-muted-foreground">When customers place orders, they will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
