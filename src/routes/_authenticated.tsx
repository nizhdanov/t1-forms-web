import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getProfile } from '@/api/requests/v1/auth/me';
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/shared/ui/breadcrumb';
import { Separator } from '@/shared/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar';

import { AuthSidebar } from './-components/AuthSidebar';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    try {
      const profile = await getProfile();
      return {
        profile
      };
    } catch {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  }
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AuthSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              className='mr-2 data-[orientation=vertical]:h-4'
              orientation='vertical'
            />

            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink asChild>
                    <Link to='/'>
                      Пользователи
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className='hidden md:block' />

                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbPage>
                    Пользователи
                  </BreadcrumbPage>
                </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
