import { Link } from '@tanstack/react-router';
import { LayoutDashboardIcon, UserRoundPlusIcon, UsersRoundIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/shared/ui/sidebar';

const sidebarNavigationLinks = [
  {
    to: '/',
    icon: <UsersRoundIcon />,
    label: 'Пользователи'
  },
  {
    to: '/user/create',
    icon: <UserRoundPlusIcon />,
    label: 'Создать'
  }
] as const;

export function AuthSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground' size='lg'>
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <LayoutDashboardIcon className='size-4' />
              </div>
              <span className='truncate font-medium'>Admin Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          {sidebarNavigationLinks.map(({ icon, label, to }) => (
            <SidebarMenu key={to}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={label}>
                  <Link to={to}>
                    {icon}
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}

        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
