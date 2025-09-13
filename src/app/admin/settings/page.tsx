import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Palette, Route, Brush, CreditCard, Home, Landmark } from 'lucide-react';

const settingsLinks = [
  {
    href: '/admin/settings/general',
    title: 'General Settings',
    description: 'Manage site title, URL, and timezone.',
    icon: <Settings className="h-8 w-8 text-primary" />,
  },
  {
    href: '/admin/settings/appearance',
    title: 'Appearance',
    description: 'Customize your site’s look, theme, and colors.',
    icon: <Palette className="h-8 w-8 text-primary" />,
  },
  {
    href: '/admin/settings/navigation',
    title: 'Navigation',
    description: 'Control your site’s menus and navigation.',
    icon: <Route className="h-8 w-8 text-primary" />,
  },
  {
    href: '/admin/settings/homepage',
    title: 'Homepage Content',
    description: 'Manage content sections on the homepage.',
    icon: <Home className="h-8 w-8 text-primary" />,
  },
   {
    href: '/admin/settings/theme',
    title: 'Theme Editor',
    description: 'Visually edit your theme colors.',
    icon: <Brush className="h-8 w-8 text-primary" />,
  },
  {
    href: '/admin/settings/payments',
    title: 'Payment Gateways',
    description: 'Connect and manage payment providers.',
    icon: <CreditCard className="h-8 w-8 text-primary" />,
  },
    {
    href: '/admin/accounting',
    title: 'Accounting',
    description: 'Manage expenses, and view financial reports.',
    icon: <Landmark className="h-8 w-8 text-primary" />,
  },
];

export default function SettingsPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Configure and customize your e-commerce store.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            <Card className="hover:border-primary hover:bg-muted/50 transition-all h-full">
              <CardHeader className="flex flex-row items-start gap-4">
                 <div className="mt-1">{link.icon}</div>
                <div>
                    <CardTitle className="font-headline">{link.title}</CardTitle>
                    <CardDescription className="mt-1">{link.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
