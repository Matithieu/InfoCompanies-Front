import { Separator } from '@/components/ui/separator'
import { Link } from '@mui/material'
import { ChevronsDownIcon } from 'lucide-react'

export const FooterSection = () => {
  return (
    <footer className="container py-12 sm:py-16" id="footer">
      <div className="rounded-2xl border border-secondary bg-card p-10">
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              className="flex items-center font-bold"
              color="inherit"
              href="#"
              underline="none"
            >
              <ChevronsDownIcon className="mr-2 size-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary" />
              <h3 className="text-2xl">InfoCompanies</h3>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-3">
            <div>
              <h3 className="text-lg font-bold">Contact</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    className="opacity-60 hover:opacity-100"
                    color="inherit"
                    href="#"
                    underline="none"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    className="opacity-60 hover:opacity-100"
                    color="inherit"
                    href="#"
                    underline="none"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">Help</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    className="opacity-60 hover:opacity-100"
                    color="inherit"
                    href="#"
                    underline="none"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="opacity-60 hover:opacity-100"
                    color="inherit"
                    href="#"
                    underline="none"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    className="opacity-60 hover:opacity-100"
                    color="inherit"
                    href="#"
                    underline="none"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            &copy; 2024 Designed and developed by{' '}
            <Link
              className="ml-1 border-primary text-primary transition-all hover:border-b-2"
              color="inherit"
              href="https://github.com/Matithieu"
              target="_blank"
              underline="none"
            >
              Mathieu Yahia-Amar
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  )
}
