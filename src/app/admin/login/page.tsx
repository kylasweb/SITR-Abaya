import { Logo } from "@/components/icons";
import AdminLoginForm from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6 flex flex-col items-center">
            <div className="bg-sidebar-background text-sidebar-foreground p-4 rounded-full mb-4">
                <Logo className="h-8 w-8" />
            </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">SITR Admin</h1>
        </div>
        <AdminLoginForm />
        {process.env.NODE_ENV !== 'production' && (
           <p className="mt-6 text-center text-xs text-gray-500">
            Development password: <code className="font-mono font-semibold text-gray-700 dark:text-gray-300">{process.env.ADMIN_PASSWORD || '(not set)'}</code>
          </p>
        )}
      </div>
    </div>
  );
}
