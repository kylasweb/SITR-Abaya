import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function PaymentsSettingsPage() {
  return (
     <div className="max-w-4xl mx-auto">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Payment Gateways</h1>
        <p className="mt-1 text-muted-foreground">
          Configure and manage your store's payment options.
        </p>
      </header>

      <div className="space-y-8">
        {/* Razorpay */}
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Razorpay</CardTitle>
                        <CardDescription>
                            Accept payments using Razorpay in India.
                        </CardDescription>
                    </div>
                    <Switch id="razorpay-enabled" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="razorpay-key-id">Key ID</Label>
                    <Input id="razorpay-key-id" placeholder="rzp_live_..." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="razorpay-key-secret">Key Secret</Label>
                    <Input id="razorpay-key-secret" type="password" placeholder="••••••••••••••••" />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save Razorpay Settings</Button>
            </CardFooter>
        </Card>

        {/* PhonePe */}
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>PhonePe</CardTitle>
                        <CardDescription>
                            Enable payments through the PhonePe gateway.
                        </CardDescription>
                    </div>
                    <Switch id="phonepe-enabled" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="phonepe-merchant-id">Merchant ID</Label>
                    <Input id="phonepe-merchant-id" placeholder="Your PhonePe Merchant ID" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phonepe-salt-key">Salt Key</Label>
                    <Input id="phonepe-salt-key" type="password" placeholder="••••••••••••••••" />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save PhonePe Settings</Button>
            </CardFooter>
        </Card>

        {/* Paytm */}
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Paytm</CardTitle>
                        <CardDescription>
                            Allow customers to pay using the Paytm gateway.
                        </CardDescription>
                    </div>
                    <Switch id="paytm-enabled" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="paytm-merchant-id">Merchant ID (MID)</Label>
                    <Input id="paytm-merchant-id" placeholder="Your Paytm Merchant ID" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="paytm-merchant-key">Merchant Key</Label>
                    <Input id="paytm-merchant-key" type="password" placeholder="••••••••••••••••" />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save Paytm Settings</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
