'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration.scope)
        })
        .catch((error) => {
          console.log('SW registration failed:', error)
        })
    }

    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) return
    // Check if dismissed this session
    if (sessionStorage.getItem('pwa-prompt-dismissed')) return

    // Listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Show prompt after a short delay for better UX
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Listen for app installed event
    const onInstalled = () => {
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setShowPrompt(false)
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }, [deferredPrompt])

  const handleDismiss = useCallback(() => {
    setShowPrompt(false)
    sessionStorage.setItem('pwa-prompt-dismissed', 'true')
  }, [])

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-[100] sm:left-auto sm:right-4 sm:max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl shadow-foundation-green-900/20 border border-foundation-green-200 p-5 overflow-hidden relative">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-foundation-green-500 to-foundation-green-600" />

            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-foundation-green-100 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 text-foundation-green-400" />
            </button>

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-foundation-green-500 to-foundation-green-600 flex items-center justify-center shrink-0 shadow-lg shadow-foundation-green-500/30">
                <Smartphone className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foundation-green-900 text-sm">
                  Instalar en tu celular
                </h3>
                <p className="text-xs text-foundation-green-600/70 mt-1 leading-relaxed">
                  Accede rápidamente a la fundación desde tu pantalla de inicio, incluso sin internet.
                </p>

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleInstall}
                    size="sm"
                    className="bg-gradient-to-r from-foundation-green-500 to-foundation-green-600 hover:from-foundation-green-600 hover:to-foundation-green-700 text-white shadow-md shadow-foundation-green-500/20 flex-1"
                  >
                    <Download className="w-4 h-4 mr-1.5" />
                    Instalar
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    size="sm"
                    variant="ghost"
                    className="text-foundation-green-500 hover:text-foundation-green-700"
                  >
                    Ahora no
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
