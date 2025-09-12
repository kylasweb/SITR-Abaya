import { Logo } from "@/components/icons";
import AdminLoginForm from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 flex flex-col items-center">
            <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4">
                <Logo className="h-8 w-8" />
            </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">SITR Admin</h1>
          <p className="text-muted-foreground mt-2">Please enter the password to access the dashboard.</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
