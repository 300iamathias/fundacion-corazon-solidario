'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Heart,
  HandHeart,
  Gift,
  Stethoscope,
  Users,
  Shield,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Palette,
  TreePine,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

/* ─────────── Counter Animation Hook ─────────── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return { count, ref }
}

/* ─────────── Donation Dialog ─────────── */
function DonationDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foundation-green-800 flex items-center gap-2">
            <Heart className="w-5 h-5 text-foundation-red-500 fill-foundation-red-500" />
            Tu Donación Transforma Vidas
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            {['$5', '$10', '$25', '$50', '$100', 'Otro'].map((amt) => (
              <Button
                key={amt}
                variant="outline"
                className="border-foundation-green-200 hover:bg-foundation-green-50 hover:text-foundation-green-700 hover:border-foundation-green-400"
              >
                {amt}
              </Button>
            ))}
          </div>
          <div className="bg-foundation-green-50 rounded-xl p-4 border border-foundation-green-100">
            <p className="text-sm text-foundation-green-700">
              <CheckCircle2 className="w-4 h-4 inline mr-1 text-foundation-green-600" />
              Tu donación es <strong>100% deducible de impuestos</strong>
            </p>
            <p className="text-sm text-foundation-green-700 mt-1">
              <Shield className="w-4 h-4 inline mr-1 text-foundation-green-600" />
              Fundación reconocida por el Estado
            </p>
          </div>
          <Button className="w-full bg-gradient-to-r from-foundation-green-600 to-foundation-green-700 hover:from-foundation-green-700 hover:to-foundation-green-800 text-white shadow-lg text-lg py-6">
            <Heart className="w-5 h-5 mr-2 fill-white" />
            Confirmar Donación
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* ─────────── Navbar ─────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Nosotros', href: '#about' },
    { label: 'Programas', href: '#programs' },
    { label: 'Impacto', href: '#impact' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Contacto', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-foundation-green-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Fundación Sembrando Esperanzas y Amor"
              className="w-12 h-12 rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-foundation-green-800 leading-tight tracking-tight">
                Fundación
              </span>
              <span className="text-[10px] font-semibold text-foundation-green-600 leading-tight">
                Sembrando Esperanzas y Amor
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-foundation-green-800/70 hover:text-foundation-green-600 rounded-lg hover:bg-foundation-green-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <DonationDialog>
              <Button className="hidden sm:flex bg-gradient-to-r from-foundation-green-600 to-foundation-green-700 hover:from-foundation-green-700 hover:to-foundation-green-800 text-white shadow-lg hover:shadow-foundation-green-500/30 transition-all">
                <Heart className="w-4 h-4 mr-2 fill-white" />
                Donar Ahora
              </Button>
            </DonationDialog>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-foundation-green-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-foundation-green-800" />
              ) : (
                <Menu className="w-6 h-6 text-foundation-green-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-foundation-green-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-foundation-green-800 hover:bg-foundation-green-50 rounded-lg font-medium transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <DonationDialog>
                <Button className="w-full mt-3 bg-gradient-to-r from-foundation-green-600 to-foundation-green-700 hover:from-foundation-green-700 hover:to-foundation-green-800 text-white shadow-lg">
                  <Heart className="w-4 h-4 mr-2 fill-white" />
                  Donar Ahora
                </Button>
              </DonationDialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ─────────── Hero Section ─────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image - REAL photo of kids with toys */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Niños de la fundación recibiendo regalos con alegría"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foundation-green-900/90 via-foundation-green-900/70 to-foundation-green-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foundation-green-900/60 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-foundation-gold-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-foundation-green-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-foundation-green-500/20 text-foundation-green-200 border-foundation-green-400/30 px-4 py-1.5 text-sm backdrop-blur-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Fundación Reconocida por el Estado
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
          >
            Sembrando{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-gold-300 to-foundation-gold-400">
              esperanzas
            </span>{' '}
            y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-red-300 to-foundation-red-400">
              amor
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-foundation-green-100/80 max-w-2xl leading-relaxed"
          >
            Llevamos medicinas, juguetes, talleres y alegría a los niños y
            familias que más lo necesitan. Somos manos que siembran, corazones
            que sirven y voluntad que no se rinde.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <DonationDialog>
              <Button
                size="lg"
                className="bg-gradient-to-r from-foundation-green-600 to-foundation-green-700 hover:from-foundation-green-700 hover:to-foundation-green-800 text-white shadow-2xl shadow-foundation-green-500/30 text-lg px-8 py-7 animate-pulse-glow"
              >
                <Heart className="w-5 h-5 mr-2 fill-white" />
                Quiero Donar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </DonationDialog>

            <Button
              size="lg"
              className="bg-white/15 border-2 border-white/50 text-white hover:bg-white/25 hover:border-white/80 backdrop-blur-sm text-lg px-8 py-7 shadow-lg shadow-black/10"
              asChild
            >
              <a href="#programs">
                <HandHeart className="w-5 h-5 mr-2" />
                Conoce Nuestros Programas
              </a>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-6 text-foundation-green-200/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-foundation-gold-400" />
              <span>Reconocida por el Estado</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-foundation-gold-400" />
              <span>100% Sin Fines de Lucro</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine className="w-4 h-4 text-foundation-gold-400" />
              <span>Sembrando futuro</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </section>
  )
}

/* ─────────── About Section ─────────── */
function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-foundation-green-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-foundation-gold-50 rounded-full blur-3xl opacity-50" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Logo + Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-foundation-green-200/50 bg-foundation-green-50">
              <img
                src="/images/logo.png"
                alt="Logo Fundación Sembrando Esperanzas y Amor"
                className="w-full aspect-square object-contain p-8"
              />
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-foundation-green-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-foundation-green-500 to-foundation-green-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foundation-green-800">Reconocida</p>
                  <p className="text-xs text-foundation-green-500">por el Estado</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="secondary" className="bg-foundation-green-50 text-foundation-green-700 border-foundation-green-200 mb-4">
              Sobre Nosotros
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foundation-green-900 leading-tight">
              Una fundación que nació para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-green-500 to-foundation-green-600">
                sembrar
              </span>
            </h2>
            <p className="mt-6 text-lg text-foundation-green-700/70 leading-relaxed">
              La <strong>Fundación Sembrando Esperanzas y Amor</strong> nació con
              una misión clara: llevar ayuda real a quienes más lo necesitan. Somos
              una organización sin fines de lucro, legalmente constituida y reconocida
              por el Estado, que trabaja incansablemente por el bienestar de las
              comunidades más vulnerables.
            </p>
            <p className="mt-4 text-lg text-foundation-green-700/70 leading-relaxed">
              Cada año entregamos medicinas a familias que no pueden acceder a
              tratamientos, llevamos juguetes y alegría a cientos de niños en
              Navidad, y organizamos talleres y actividades recreativas que
              transforman comunidades enteras. Nuestro compromiso es con la vida,
              la dignidad y la esperanza.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: 'Sin fines de lucro', desc: '100% transparente' },
                { icon: Shield, label: 'Legalmente constituida', desc: 'Reconocida por el Estado' },
                { icon: Users, label: '+500 familias', desc: 'Beneficiadas al año' },
                { icon: TreePine, label: 'Sembrando futuro', desc: 'Cada día, cada acción' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-foundation-green-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-foundation-green-100 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-foundation-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foundation-green-800">{item.label}</p>
                    <p className="text-xs text-foundation-green-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Programs Section ─────────── */
function ProgramsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const programs = [
    {
      icon: Stethoscope,
      image: '/images/medicine.jpg',
      title: 'Medicinas para Todos',
      description:
        'Proveemos medicamentos esenciales a familias que no pueden costear sus tratamientos. Trabajamos para que la salud no sea un privilegio sino un derecho accesible para todos.',
      color: 'from-foundation-red-500 to-foundation-red-600',
      items: [
        'Distribución de medicamentos',
        'Cobertura de tratamientos crónicos',
        'Alianzas con farmacias y laboratorios',
      ],
    },
    {
      icon: Gift,
      image: '/images/gifts.jpg',
      title: 'Regalos con Amor',
      description:
        'Cada fin de año, convertimos la Navidad en un momento mágico. Entregamos juguetes, ropa y alegría para que ningún niño se quede sin sonreír en estas fechas tan especiales.',
      color: 'from-foundation-gold-500 to-foundation-gold-600',
      items: [
        'Juguetes para niños en Navidad',
        'Ropa y calzado para la temporada',
        'Eventos con payasos y entretenimiento',
      ],
    },
    {
      icon: Palette,
      image: '/images/workshop.jpg',
      title: 'Talleres y Actividades',
      description:
        'Organizamos talleres de dibujo, manualidades y actividades recreativas donde los niños desarrollan su creatividad mientras reciben amor y atención de nuestros voluntarios.',
      color: 'from-foundation-green-500 to-foundation-green-600',
      items: [
        'Talleres de dibujo y pintura',
        'Actividades recreativas y lúdicas',
        'Acompañamiento y formación integral',
      ],
    },
  ]

  return (
    <section
      id="programs"
      className="py-20 md:py-28 bg-gradient-to-b from-foundation-green-50/50 to-white relative"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="bg-foundation-green-100 text-foundation-green-700 border-foundation-green-200 mb-4">
            Nuestros Programas
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foundation-green-900">
            Manos que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-green-500 to-foundation-green-600">
              siembran
            </span>
            , corazones que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-red-500 to-foundation-red-600">
              aman
            </span>
          </h2>
          <p className="mt-4 text-lg text-foundation-green-600/70">
            Cada programa está diseñado para impactar directamente en la calidad de
            vida de quienes más lo necesitan
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * (i + 1) }}
            >
              <Card className="group overflow-hidden border-0 shadow-lg shadow-foundation-green-200/30 hover:shadow-xl hover:shadow-foundation-green-300/40 transition-all duration-300 h-full">
                {/* Image - REAL photos */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div
                    className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg`}
                  >
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foundation-green-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-foundation-green-600/70 text-sm leading-relaxed mb-5">
                    {program.description}
                  </p>
                  <ul className="space-y-2">
                    {program.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-foundation-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-foundation-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Stat Card Component ─────────── */
function StatCard({
  stat,
  index,
  parentInView,
}: {
  stat: { icon: React.ElementType; value: number; suffix: string; label: string; color: string }
  index: number
  parentInView: boolean
}) {
  const { count, ref } = useCounter(stat.value)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={parentInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
      ref={ref}
    >
      <Card className="bg-white/5 backdrop-blur-sm border-foundation-green-400/10 hover:bg-white/10 transition-colors h-full">
        <CardContent className="p-6 md:p-8 text-center">
          <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            {count.toLocaleString()}
            <span className="text-foundation-gold-400">{stat.suffix}</span>
          </div>
          <p className="text-foundation-green-200/60 text-sm font-medium">
            {stat.label}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/* ─────────── Impact/Stats Section ─────────── */
function ImpactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { icon: Users, value: 2500, suffix: '+', label: 'Familias Beneficiadas', color: 'text-foundation-gold-400' },
    { icon: Gift, value: 3800, suffix: '+', label: 'Regalos Entregados', color: 'text-foundation-red-400' },
    { icon: Stethoscope, value: 12000, suffix: '+', label: 'Medicinas Distribuidas', color: 'text-foundation-green-400' },
    { icon: Heart, value: 150, suffix: '+', label: 'Voluntarios Activos', color: 'text-foundation-gold-300' },
  ]

  return (
    <section
      id="impact"
      className="py-20 md:py-28 bg-gradient-to-br from-foundation-green-800 via-foundation-green-900 to-foundation-green-900 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-foundation-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-foundation-gold-500/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="bg-foundation-green-500/20 text-foundation-green-200 border-foundation-green-400/30 mb-4">
            <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
            Nuestro Impacto
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Números que reflejan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-gold-300 to-foundation-gold-400">
              esperanza
            </span>
          </h2>
          <p className="mt-4 text-lg text-foundation-green-200/60">
            Cada número representa una vida transformada, una sonrisa recuperada,
            una comunidad fortalecida
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} parentInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Gallery Section ─────────── */
function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const photos = [
    {
      src: '/images/clown.jpg',
      alt: 'Payaso entreteniendo a los niños en evento comunitario',
      caption: 'Eventos llenos de alegría',
    },
    {
      src: '/images/volunteers.jpg',
      alt: 'Voluntarias guiando a niños en actividades de dibujo',
      caption: 'Voluntarios que transforman',
    },
    {
      src: '/images/community.jpg',
      alt: 'Jornada comunitaria con donaciones y actividades para niños',
      caption: 'Donaciones que llegan al corazón',
    },
    {
      src: '/images/workshop.jpg',
      alt: 'Niños participando en talleres de manualidades',
      caption: 'Talleres que despiertan talentos',
    },
  ]

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="bg-foundation-green-50 text-foundation-green-700 border-foundation-green-200 mb-4">
            Galería
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foundation-green-900">
            Momentos que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-red-500 to-foundation-red-600">
              siembran
            </span>{' '}
            sonrisas
          </h2>
          <p className="mt-4 text-lg text-foundation-green-600/70">
            Cada foto cuenta una historia de amor, esperanza y solidaridad
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.caption}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foundation-green-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-semibold">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Testimonials Section ─────────── */
function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const testimonials = [
    {
      name: 'María Fernanda López',
      role: 'Madre de familia beneficiaria',
      quote:
        'Gracias a la fundación, mi hijo pudo recibir su tratamiento completo. No tengo palabras para expresar mi agradecimiento. Ellos no solo nos dieron medicinas, nos devolvieron la esperanza.',
      stars: 5,
    },
    {
      name: 'Carlos Andrés Mendoza',
      role: 'Voluntario desde 2018',
      quote:
        'Ver la sonrisa de un niño cuando recibe su regalo en Navidad es algo que no se puede describir, hay que vivirlo. Ser parte de Sembrando Esperanzas y Amor cambió mi vida.',
      stars: 5,
    },
    {
      name: 'Rosa Elena Vargas',
      role: 'Abuela beneficiaria del programa de medicinas',
      quote:
        'Pensé que ya no podría pagar mis medicinas. La fundación llegó justo cuando más lo necesitaba. Son ángeles que Dios puso en mi camino, sembrando amor donde más hace falta.',
      stars: 5,
    },
  ]

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-gradient-to-b from-white to-foundation-green-50/30 relative overflow-hidden"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="bg-foundation-green-50 text-foundation-green-700 border-foundation-green-200 mb-4">
            Testimonios
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foundation-green-900">
            Voces que nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-green-500 to-foundation-green-600">
              inspiran
            </span>
          </h2>
          <p className="mt-4 text-lg text-foundation-green-600/70">
            Historias reales de vidas que han sido transformadas gracias a tu apoyo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * (i + 1) }}
            >
              <Card className="h-full border-foundation-green-100 hover:border-foundation-green-200 shadow-lg shadow-foundation-green-100/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 text-foundation-gold-400 fill-foundation-gold-400"
                      />
                    ))}
                  </div>
                  <p className="text-foundation-green-700/80 leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-foundation-green-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-foundation-green-400 to-foundation-green-600 flex items-center justify-center text-white font-bold text-sm">
                      {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foundation-green-800">{t.name}</p>
                      <p className="text-xs text-foundation-green-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── CTA Section ─────────── */
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/cta.jpg"
          alt="Eventos comunitarios de la fundación"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foundation-green-900/95 to-foundation-green-800/90" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foundation-green-500/20 mb-8"
          >
            <Heart className="w-8 h-8 text-foundation-red-300 fill-foundation-red-300" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Tu generosidad puede cambiar
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-gold-300 to-foundation-gold-400">
              el mundo de una familia
            </span>
          </h2>

          <p className="mt-6 text-lg text-foundation-green-200/70 max-w-2xl mx-auto">
            Cada donación, por pequeña que sea, tiene el poder de transformar una
            vida. Únete a nuestra misión y sé parte de quienes siembran esperanzas
            y amor donde más hace falta.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <DonationDialog>
              <Button
                size="lg"
                className="bg-gradient-to-r from-foundation-green-600 to-foundation-green-700 hover:from-foundation-green-700 hover:to-foundation-green-800 text-white shadow-2xl shadow-foundation-green-500/30 text-lg px-10 py-7"
              >
                <Heart className="w-5 h-5 mr-2 fill-white" />
                Donar Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </DonationDialog>

            <Button
              size="lg"
              className="bg-white/15 border-2 border-white/50 text-white hover:bg-white/25 hover:border-white/80 backdrop-blur-sm text-lg px-10 py-7 shadow-lg shadow-black/10"
              asChild
            >
              <a href="#contact">
                <HandHeart className="w-5 h-5 mr-2" />
                Ser Voluntario
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────── Contact Section ─────────── */
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-gradient-to-b from-white to-foundation-green-50/50 relative"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="bg-foundation-green-50 text-foundation-green-700 border-foundation-green-200 mb-4">
            Contáctanos
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foundation-green-900">
            Estamos aquí para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foundation-green-500 to-foundation-green-600">
              escucharte
            </span>
          </h2>
          <p className="mt-4 text-lg text-foundation-green-600/70">
            ¿Quieres ser voluntario, hacer una donación o simplemente saber más?
            Escríbenos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-foundation-green-900 mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: 'Dirección', value: 'Guayaquil sector Norte' },
                  { icon: Phone, label: 'Teléfono', value: '0998608231' },
                  { icon: Mail, label: 'Email', value: 'fundacsembrandoesperanzasyamor@hotmail.com' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-foundation-green-100 hover:border-foundation-green-300 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-foundation-green-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-foundation-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-foundation-green-500 font-medium">{item.label}</p>
                      <p className="text-foundation-green-800 font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-foundation-green-50 to-foundation-green-100/50 rounded-2xl p-6 border border-foundation-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-foundation-green-600" />
                <h4 className="font-bold text-foundation-green-800">Reconocimiento Legal</h4>
              </div>
              <p className="text-sm text-foundation-green-700/70 leading-relaxed">
                Fundación Sembrando Esperanzas y Amor está legalmente constituida y
                reconocida por el Estado conforme a la ley. Todas las donaciones
                son deducibles de impuestos.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-foundation-green-100 shadow-lg shadow-foundation-green-100/50">
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-foundation-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-foundation-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foundation-green-800 mb-2">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-foundation-green-600/70">
                      Te responderemos lo antes posible. Gracias por tu interés.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foundation-green-700 mb-1.5 block">Nombre</label>
                        <Input
                          placeholder="Tu nombre"
                          className="border-foundation-green-200 focus:border-foundation-green-400 focus:ring-foundation-green-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foundation-green-700 mb-1.5 block">Apellido</label>
                        <Input
                          placeholder="Tu apellido"
                          className="border-foundation-green-200 focus:border-foundation-green-400 focus:ring-foundation-green-400"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foundation-green-700 mb-1.5 block">Email</label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        className="border-foundation-green-200 focus:border-foundation-green-400 focus:ring-foundation-green-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foundation-green-700 mb-1.5 block">
                        ¿En qué te interesa participar?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Donar', 'Ser Voluntario', 'Patrocinar', 'Colaborar'].map((opt) => (
                          <Badge
                            key={opt}
                            variant="outline"
                            className="cursor-pointer border-foundation-green-200 text-foundation-green-600 hover:bg-foundation-green-50 hover:text-foundation-green-800 hover:border-foundation-green-400 transition-colors px-3 py-1"
                          >
                            {opt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foundation-green-700 mb-1.5 block">Mensaje</label>
                      <Textarea
                        placeholder="Cuéntanos cómo quieres ayudar..."
                        className="border-foundation-green-200 focus:border-foundation-green-400 focus:ring-foundation-green-400 min-h-[120px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-foundation-green-600 to-foundation-green-700 hover:from-foundation-green-700 hover:to-foundation-green-800 text-white shadow-lg shadow-foundation-green-500/20 py-6 text-lg"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Enviar Mensaje
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="bg-foundation-green-900 text-foundation-green-200/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div>
                <p className="text-lg font-bold text-white leading-tight">Fundación</p>
                <p className="text-xs font-semibold text-foundation-green-400 leading-tight">
                  Sembrando Esperanzas y Amor
                </p>
              </div>
            </div>
            <p className="text-foundation-green-300/50 max-w-sm text-sm leading-relaxed">
              Una organización sin fines de lucro dedicada a llevar medicinas,
              regalos, talleres y esperanza a las comunidades más necesitadas.
              Legalmente constituida y reconocida por el Estado.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Badge className="bg-foundation-green-500/10 text-foundation-green-400 border-foundation-green-500/20 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Reconocida por el Estado
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Enlaces</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Inicio', href: '#hero' },
                { label: 'Nosotros', href: '#about' },
                { label: 'Programas', href: '#programs' },
                { label: 'Impacto', href: '#impact' },
                { label: 'Contacto', href: '#contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-foundation-green-300/50 hover:text-foundation-green-300 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-foundation-green-400 shrink-0" />
                Guayaquil sector Norte
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-foundation-green-400 shrink-0" />
                0998608231
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-foundation-green-400 shrink-0" />
                fundacsembrandoesperanzasyamor@hotmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-foundation-green-800 flex flex-col items-center gap-3">
          <p className="text-xs text-foundation-green-400/50">
            © {new Date().getFullYear()} Fundación Sembrando Esperanzas y Amor. Todos los derechos reservados.
          </p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-foundation-green-300/60">
              Hecho por{' '}
              <a
                href="https://jimbra.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-foundation-gold-400 hover:text-foundation-gold-300 transition-colors underline underline-offset-2 decoration-foundation-gold-400/30 hover:decoration-foundation-gold-300"
              >
                Jimbra
              </a>
            </p>
            <p className="text-[10px] text-foundation-gold-400/50 italic tracking-wide">
              Todo lo que necesitas
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────── Main Page ─────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <ImpactSection />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
