import {
  LoginButton,
  LogoutButton,
} from '@/components/common/Buttons/AuthButtons'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShadCNModeToggle } from '@/containers/ShadCN/mode-toggle'
import useToggle from '@/hooks/useToggle'
import useUserStore from '@/stores/userStore'
import { Link } from '@mui/material'
import { ChevronsDown, Menu } from 'lucide-react'
import { useEffect } from 'react'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: '/ui#testimonials',
    label: 'Témoinages',
  },
  {
    href: '/ui#pricing',
    label: 'Pricing',
  },
  {
    href: '/ui#faq',
    label: 'FAQ',
  },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useToggle(false)
  const { user } = useUserStore()

  const ButtonToDisplay = () => {
    if (user) {
      return <LogoutButton />
    }

    return <LoginButton />
  }

  /**
   * When navigating to /ui#hash, scroll to the element with the id of hash
   * The hash can be #pricing, #faq, #testimonials...
   */
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash

      if (hash) {
        const element = document.querySelector(hash)

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)

    // On component mount, handle the current hash
    handleHashChange()

    // Cleanup listener on unmount
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <header className="sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-secondary bg-card p-2 shadow-inner md:w-[70%] lg:w-3/4 lg:max-w-screen-xl">
      <Link
        className="flex items-center text-lg font-bold"
        color="inherit"
        href="/"
        underline="none"
      >
        <ChevronsDown className="mr-2 size-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white" />
        InfoCompanies
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              className="cursor-pointer lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
          </SheetTrigger>

          <SheetContent
            className="flex flex-col justify-between rounded-r-2xl border-secondary bg-card"
            side="left"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link
                    className="flex items-center"
                    color="inherit"
                    href="/"
                    underline="none"
                  >
                    <ChevronsDown className="mr-2 size-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white" />
                    InfoCompanies
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    asChild
                    className="justify-start text-base"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      className="text-foreground hover:text-primary"
                      color="inherit"
                      href={href}
                      underline="none"
                    >
                      {label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col items-start justify-start gap-4 sm:flex-col">
              <Separator className="mb-2" />

              <ShadCNModeToggle />
              <ButtonToDisplay />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="mx-auto hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link
                  className="px-2 text-base"
                  color="inherit"
                  href={href}
                  underline="hover"
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden gap-4 lg:flex">
        <ShadCNModeToggle />

        <ButtonToDisplay />
      </div>
    </header>
  )
}
