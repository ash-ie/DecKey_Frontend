import { Outlet } from '@tanstack/react-router'
import { getCookie } from '../../lib/cookies'
import { SearchProvider } from '../../context/search-provider'
import { LayoutProvider } from '../../context/layout-provider'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { SkipToMain } from '../skip-to-main'
import { AppSidebar } from './app-sidebar'
import { cn } from '../../lib/utils'
import { Footer } from './footer'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  return (
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <AppSidebar />
          <SidebarInset
            className={cn(
              // Set content container, so we can use container queries
              '@container/content',

              // If layout is fixed, set the height
              // to 100svh to prevent overflow
              'has-data-[layout=fixed]:h-svh',

              // If layout is fixed and sidebar is inset,
              // set the height to 100svh - spacing (total margins) to prevent overflow
              'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
            )}
          >
            <div className='flex min-h-0 flex-1 flex-col'>
              {children ?? <Outlet />}
            </div>
            <Footer />
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}
