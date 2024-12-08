import { Button } from '@/components/ui/button'
import useToggle from '@/hooks/useToggle'
import { cn } from '@/lib/utils'
import { CookieIcon } from 'lucide-react'
import { FC, useCallback, useEffect } from 'react'

type CookieConsentProps = {
  demo?: boolean
  onAcceptCallback?: () => void
  onDeclineCallback?: () => void
}

const COOKIE_NAME = 'cookieConsent'
const COOKIE_VALUE = 'true'
const COOKIE_EXPIRES = 'Fri, 31 Dec 9999 23:59:59 GMT'
const HIDE_DELAY = 700 // milliseconds

const setCookieConsent = () => {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; expires=${COOKIE_EXPIRES}`
}

const hasCookieConsent = () => {
  if (typeof document === 'undefined') return false
  return document.cookie.includes(`${COOKIE_NAME}=${COOKIE_VALUE}`)
}

const CookieConsent: FC<CookieConsentProps> = ({
  demo = false,
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
}) => {
  const [isOpen, setIsOpen] = useToggle(false)
  const [isHidden, setIsHidden] = useToggle(false)

  const hideConsent = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setIsHidden(true)
    }, HIDE_DELAY)
  }, [setIsHidden, setIsOpen])

  const accept = useCallback(() => {
    setCookieConsent()
    hideConsent()
    onAcceptCallback()
  }, [hideConsent, onAcceptCallback])

  const decline = useCallback(() => {
    hideConsent()
    onDeclineCallback()
  }, [hideConsent, onDeclineCallback])

  useEffect(() => {
    if (typeof document === 'undefined') return

    setIsOpen(true)

    if (hasCookieConsent() && !demo) {
      hideConsent()
    }
  }, [demo, hideConsent, setIsOpen])

  if (isHidden) return null

  return (
    <div
      className={cn(
        'fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700',
        !isOpen
          ? 'transition-[opacity,transform] translate-y-8 opacity-0'
          : 'transition-[opacity,transform] translate-y-0 opacity-100',
      )}
    >
      <div className="m-3 rounded-md border border-border bg-background shadow-lg dark:bg-card">
        <div className="grid gap-2">
          <div className="flex h-14 items-center justify-between border-b border-border p-4">
            <h1 className="text-lg font-medium">Cookies</h1>
            <CookieIcon className="size-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-start text-sm font-normal">
              On utilise des cookies pour stocker votre token de connexion !
              C&apos;est tout !
              <br />
              <br />
              <span className="text-xs">
                En cliquant sur &quot;
                <span className="font-medium opacity-80">Accepter</span>
                &quot;, vous acceptez l&apos;utilisation des cookies.
              </span>
              <br />
              <a className="text-xs underline" href="#">
                En savoir plus
              </a>
            </p>
          </div>
          <div className="flex gap-2 border-t border-border p-4 py-5 dark:bg-background/20">
            <Button className="w-full" onClick={accept}>
              Accepter
            </Button>
            <Button className="w-full" variant="secondary" onClick={decline}>
              Refuser
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
