import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerTable from "./customer-table";
import { getAllUsers } from "@/lib/data";


export default async function AdminCustomersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground mt-1">
            A list of all registered users in your store.
        </p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            View and manage your customer accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <CustomerTable users={users} />
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-semibold">No Customers Yet</h3>
              <p className="mt-1 text-muted-foreground">When users sign up, they will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
