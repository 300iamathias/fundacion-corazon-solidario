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
  Award,
  Clock,
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
    { label: 'Testimonios', href: '#testimonials' },
    { label: 'Contacto', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-warm-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warm-500 to-warm-600 flex items-center justify-center shadow-lg group-hover:shadow-warm-500/40 transition-shadow">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-warm-800 leading-tight tracking-tight">
                Fundación
              </span>
              <span className="text-xs font-semibold text-warm-500 leading-tight -mt-0.5">
                Corazón Solidario
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-warm-800/70 hover:text-warm-600 rounded-lg hover:bg-warm-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hidden sm:flex bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-lg hover:shadow-warm-500/30 transition-all">
                  <Heart className="w-4 h-4 mr-2 fill-white" />
                  Donar Ahora
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-warm-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-warm-500 fill-warm-500" />
                    Tu Donación Transforma Vidas
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-3 gap-3">
                    { ['$5', '$10', '$25', '$50', '$100', 'Otro'].map((amt) => (
                      <Button
                        key={amt}
                        variant="outline"
                        className="border-warm-200 hover:bg-warm-50 hover:text-warm-700 hover:border-warm-400"
                      >
                        {amt}
                      </Button>
                    ))}
                  </div>
                  <div className="bg-warm-50 rounded-xl p-4 border border-warm-100">
                    <p className="text-sm text-warm-700">
                      <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-600" />
                      Tu donación es <strong>100% deducible de impuestos</strong>
                    </p>
                    <p className="text-sm text-warm-700 mt-1">
                      <Shield className="w-4 h-4 inline mr-1 text-emerald-600" />
                      Fundación reconocida por el Estado
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-lg text-lg py-6">
                    <Heart className="w-5 h-5 mr-2 fill-white" />
                    Confirmar Donación
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-warm-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-warm-800" />
              ) : (
                <Menu className="w-6 h-6 text-warm-800" />
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
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-warm-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-warm-800 hover:bg-warm-50 rounded-lg font-medium transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-3 bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-lg">
                    <Heart className="w-4 h-4 mr-2 fill-white" />
                    Donar Ahora
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-warm-800 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-warm-500 fill-warm-500" />
                      Tu Donación Transforma Vidas
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-3 gap-3">
                      {['$5', '$10', '$25', '$50', '$100', 'Otro'].map(
                        (amt) => (
                          <Button
                            key={amt}
                            variant="outline"
                            className="border-warm-200 hover:bg-warm-50 hover:text-warm-700 hover:border-warm-400"
                          >
                            {amt}
                          </Button>
                        )
                      )}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-lg text-lg py-6">
                      <Heart className="w-5 h-5 mr-2 fill-white" />
                      Confirmar Donación
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Voluntarios ayudando a la comunidad"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-900/90 via-warm-900/70 to-warm-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-warm-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-warm-500/20 text-warm-200 border-warm-400/30 px-4 py-1.5 text-sm backdrop-blur-sm mb-6">
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
            Cada acto de amor{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-300 to-warm-400">
              transforma
            </span>{' '}
            una vida
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-warm-100/80 max-w-2xl leading-relaxed"
          >
            Llevamos medicinas, esperanza y alegría a quienes más lo necesitan.
            Somos manos que curan, corazones que sirven y voluntad que no se rinde.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-2xl shadow-warm-500/30 text-lg px-8 py-7 animate-pulse-glow"
                >
                  <Heart className="w-5 h-5 mr-2 fill-white" />
                  Quiero Donar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-warm-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-warm-500 fill-warm-500" />
                    Tu Donación Transforma Vidas
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['$5', '$10', '$25', '$50', '$100', 'Otro'].map((amt) => (
                      <Button
                        key={amt}
                        variant="outline"
                        className="border-warm-200 hover:bg-warm-50 hover:text-warm-700 hover:border-warm-400"
                      >
                        {amt}
                      </Button>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-lg text-lg py-6">
                    <Heart className="w-5 h-5 mr-2 fill-white" />
                    Confirmar Donación
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-7"
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
            className="mt-12 flex flex-wrap items-center gap-6 text-warm-200/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Reconocida por el Estado</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Sin Fines de Lucro</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>+15 Años de Servicio</span>
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
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-warm-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-warm-200/50">
              <img
                src="/images/about.png"
                alt="Manos unidas en comunidad"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-900/30 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-warm-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-warm-800">Reconocida</p>
                  <p className="text-xs text-warm-500">por el Estado</p>
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
            <Badge
              variant="secondary"
              className="bg-warm-50 text-warm-700 border-warm-200 mb-4"
            >
              Sobre Nosotros
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-warm-900 leading-tight">
              Una fundación que nació del{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-500 to-warm-600">
                corazón
              </span>
            </h2>
            <p className="mt-6 text-lg text-warm-700/70 leading-relaxed">
              La <strong>Fundación Corazón Solidario</strong> nació con una misión
              clara: llevar ayuda real a quienes más lo necesitan. Somos una
              organización sin fines de lucro, legalmente constituida y reconocida
              por el Estado, que trabaja incansablemente por el bienestar de las
              comunidades más vulnerables.
            </p>
            <p className="mt-4 text-lg text-warm-700/70 leading-relaxed">
              Cada año entregamos medicinas a familias que no pueden acceder a
              tratamientos, y en temporada navideña llevamos regalos y sonrisas a
              cientos de niños. Nuestro compromiso es con la vida, la dignidad y
              la esperanza.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: 'Sin fines de lucro', desc: '100% transparente' },
                { icon: Shield, label: 'Legalmente constituida', desc: 'Reconocida por el Estado' },
                { icon: Users, label: '+500 familias', desc: 'Beneficiadas al año' },
                { icon: Clock, label: '+15 años', desc: 'De servicio continuo' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-warm-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-warm-100 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-warm-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-800">
                      {item.label}
                    </p>
                    <p className="text-xs text-warm-500">{item.desc}</p>
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
      image: '/images/medicine.png',
      title: 'Medicinas para Todos',
      description:
        'Proveemos medicamentos esenciales a familias que no pueden costear sus tratamientos. Cada mes distribuimos cientos de tratamientos que salvan vidas y alivian el sufrimiento.',
      color: 'from-rose-500 to-warm-500',
      bgLight: 'bg-rose-50',
      textColor: 'text-rose-700',
      items: [
        'Distribución mensual de medicamentos',
        'Cobertura de tratamientos crónicos',
        'Alianzas con farmacias y laboratorios',
      ],
    },
    {
      icon: Gift,
      image: '/images/children-gifts.png',
      title: 'Regalos con Amor',
      description:
        'Cada fin de año, convertimos la Navidad en un momento mágico para cientos de niños. Entregamos juguetes, ropa y alimentos para que ningún niño se quede sin sonreír.',
      color: 'from-warm-500 to-amber-500',
      bgLight: 'bg-warm-50',
      textColor: 'text-warm-700',
      items: [
        'Juguetes para niños en Navidad',
        'Ropa y calzado para la temporada',
        'Alimentos y canastas navideñas',
      ],
    },
    {
      icon: Users,
      image: '/images/community.png',
      title: 'Apoyo Comunitario',
      description:
        'Brindamos acompañamiento integral a las comunidades más vulnerables: desde apoyo alimentario hasta orientación legal y psicológica para familias en situación de riesgo.',
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      items: [
        'Asistencia alimentaria permanente',
        'Orientación legal y psicológica',
        'Programas de capacitación comunitaria',
      ],
    },
  ]

  return (
    <section
      id="programs"
      className="py-20 md:py-28 bg-gradient-to-b from-warm-50/50 to-white relative"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge
            variant="secondary"
            className="bg-warm-100 text-warm-700 border-warm-200 mb-4"
          >
            Nuestros Programas
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-warm-900">
            Manos que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-500 to-warm-600">
              ayudan
            </span>
            , corazones que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
              sirven
            </span>
          </h2>
          <p className="mt-4 text-lg text-warm-600/70">
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
              <Card className="group overflow-hidden border-0 shadow-lg shadow-warm-200/30 hover:shadow-xl hover:shadow-warm-300/40 transition-all duration-300 h-full">
                {/* Image */}
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
                  <h3 className="text-xl font-bold text-warm-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-warm-600/70 text-sm leading-relaxed mb-5">
                    {program.description}
                  </p>
                  <ul className="space-y-2">
                    {program.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-warm-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
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
      <Card className="bg-white/5 backdrop-blur-sm border-warm-400/10 hover:bg-white/10 transition-colors h-full">
        <CardContent className="p-6 md:p-8 text-center">
          <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            {count.toLocaleString()}
            <span className="text-warm-400">{stat.suffix}</span>
          </div>
          <p className="text-warm-200/60 text-sm font-medium">{stat.label}</p>
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
    { icon: Users, value: 2500, suffix: '+', label: 'Familias Beneficiadas', color: 'text-warm-600' },
    { icon: Gift, value: 3800, suffix: '+', label: 'Regalos Entregados', color: 'text-rose-500' },
    { icon: Stethoscope, value: 12000, suffix: '+', label: 'Medicinas Distribuidas', color: 'text-emerald-600' },
    { icon: Heart, value: 150, suffix: '+', label: 'Voluntarios Activos', color: 'text-warm-500' },
  ]

  return (
    <section
      id="impact"
      className="py-20 md:py-28 bg-gradient-to-br from-warm-800 via-warm-900 to-warm-900 relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-warm-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="bg-warm-500/20 text-warm-200 border-warm-400/30 mb-4">
            <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
            Nuestro Impacto
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Números que reflejan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-300 to-warm-400">
              esperanza
            </span>
          </h2>
          <p className="mt-4 text-lg text-warm-200/60">
            Cada número representa una vida transformada, una sonrisa recuperada,
            una comunidad fortalecida
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              parentInView={isInView}
            />
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
        'Ser parte de esta fundación cambió mi vida. Ver la sonrisa de un niño cuando recibe su regalo en Navidad es algo que no se puede describir, hay que vivirlo.',
      stars: 5,
    },
    {
      name: 'Rosa Elena Vargas',
      role: 'Abuela beneficiaria del programa de medicinas',
      quote:
        'Pensé que ya no podría pagar mis medicinas. La fundación llegó justo cuando más lo necesitaba. Son ángeles que Dios puso en mi camino.',
      stars: 5,
    },
  ]

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      <div className="absolute -top-40 right-0 w-80 h-80 bg-warm-50 rounded-full blur-3xl opacity-50" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge
            variant="secondary"
            className="bg-warm-50 text-warm-700 border-warm-200 mb-4"
          >
            Testimonios
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-warm-900">
            Voces que nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-500 to-warm-600">
              inspiran
            </span>
          </h2>
          <p className="mt-4 text-lg text-warm-600/70">
            Historias reales de vidas que han sido transformadas gracias a tu
            apoyo
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * (i + 1) }}
            >
              <Card className="h-full border-warm-100 hover:border-warm-200 shadow-lg shadow-warm-100/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-warm-700/80 leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-warm-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warm-400 to-warm-600 flex items-center justify-center text-white font-bold text-sm">
                      {t.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-warm-800">
                        {t.name}
                      </p>
                      <p className="text-xs text-warm-500">{t.role}</p>
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/cta.png"
          alt="Manos unidas en comunidad"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-900/95 to-warm-800/90" />
      </div>

      <div
        ref={ref}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-500/20 mb-8"
          >
            <Heart className="w-8 h-8 text-warm-300 fill-warm-300" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Tu generosidad puede cambiar
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-300 to-amber-300">
              el mundo de una familia
            </span>
          </h2>

          <p className="mt-6 text-lg text-warm-200/70 max-w-2xl mx-auto">
            Cada donación, por pequeña que sea, tiene el poder de transformar una
            vida. Únete a nuestra misión y sé parte del cambio que queremos ver
            en el mundo.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-2xl shadow-warm-500/30 text-lg px-10 py-7"
                >
                  <Heart className="w-5 h-5 mr-2 fill-white" />
                  Donar Ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-warm-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-warm-500 fill-warm-500" />
                    Tu Donación Transforma Vidas
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['$5', '$10', '$25', '$50', '$100', 'Otro'].map((amt) => (
                      <Button
                        key={amt}
                        variant="outline"
                        className="border-warm-200 hover:bg-warm-50 hover:text-warm-700 hover:border-warm-400"
                      >
                        {amt}
                      </Button>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-lg text-lg py-6">
                    <Heart className="w-5 h-5 mr-2 fill-white" />
                    Confirmar Donación
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-10 py-7"
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
      className="py-20 md:py-28 bg-gradient-to-b from-white to-warm-50/50 relative"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge
            variant="secondary"
            className="bg-warm-50 text-warm-700 border-warm-200 mb-4"
          >
            Contáctanos
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-warm-900">
            Estamos aquí para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-500 to-warm-600">
              escucharte
            </span>
          </h2>
          <p className="mt-4 text-lg text-warm-600/70">
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
              <h3 className="text-xl font-bold text-warm-900 mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    label: 'Dirección',
                    value: 'Av. Principal #123, Centro',
                  },
                  {
                    icon: Phone,
                    label: 'Teléfono',
                    value: '+593 99 123 4567',
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'info@corazonsolidario.org',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-warm-100 hover:border-warm-300 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-warm-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-warm-600" />
                    </div>
                    <div>
                      <p className="text-xs text-warm-500 font-medium">
                        {item.label}
                      </p>
                      <p className="text-warm-800 font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Recognition */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-emerald-600" />
                <h4 className="font-bold text-emerald-800">
                  Reconocimiento Legal
                </h4>
              </div>
              <p className="text-sm text-emerald-700/70 leading-relaxed">
                Fundación Corazón Solidario está legalmente constituida y
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
            <Card className="border-warm-100 shadow-lg shadow-warm-100/50">
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-warm-800 mb-2">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-warm-600/70">
                      Te responderemos lo antes posible. Gracias por tu interés.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-warm-700 mb-1.5 block">
                          Nombre
                        </label>
                        <Input
                          placeholder="Tu nombre"
                          className="border-warm-200 focus:border-warm-400 focus:ring-warm-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-warm-700 mb-1.5 block">
                          Apellido
                        </label>
                        <Input
                          placeholder="Tu apellido"
                          className="border-warm-200 focus:border-warm-400 focus:ring-warm-400"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-warm-700 mb-1.5 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        className="border-warm-200 focus:border-warm-400 focus:ring-warm-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-warm-700 mb-1.5 block">
                        ¿En qué te interesa participar?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Donar', 'Ser Voluntario', 'Patrocinar', 'Colaborar'].map(
                          (opt) => (
                            <Badge
                              key={opt}
                              variant="outline"
                              className="cursor-pointer border-warm-200 text-warm-600 hover:bg-warm-50 hover:text-warm-800 hover:border-warm-400 transition-colors px-3 py-1"
                            >
                              {opt}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-warm-700 mb-1.5 block">
                        Mensaje
                      </label>
                      <Textarea
                        placeholder="Cuéntanos cómo quieres ayudar..."
                        className="border-warm-200 focus:border-warm-400 focus:ring-warm-400 min-h-[120px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white shadow-lg shadow-warm-500/20 py-6 text-lg"
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
    <footer className="bg-warm-900 text-warm-200/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-warm-500 to-warm-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-tight">
                  Fundación
                </p>
                <p className="text-xs font-semibold text-warm-400 leading-tight">
                  Corazón Solidario
                </p>
              </div>
            </div>
            <p className="text-warm-300/50 max-w-sm text-sm leading-relaxed">
              Una organización sin fines de lucro dedicada a llevar medicinas,
              regalos y esperanza a las comunidades más necesitadas. Legalmente
              constituida y reconocida por el Estado.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Reconocida por el Estado
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Enlaces
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Inicio', href: '#hero' },
                { label: 'Nosotros', href: '#about' },
                { label: 'Programas', href: '#programs' },
                { label: 'Impacto', href: '#impact' },
                { label: 'Contacto', href: '#contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-warm-300/50 hover:text-warm-300 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-warm-400 shrink-0" />
                Av. Principal #123, Centro
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-warm-400 shrink-0" />
                +593 99 123 4567
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-warm-400 shrink-0" />
                info@corazonsolidario.org
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-warm-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-400/50">
            © {new Date().getFullYear()} Fundación Corazón Solidario. Todos los
            derechos reservados.
          </p>
          <p className="text-xs text-warm-400/50 flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-warm-500 fill-warm-500" />{' '}
            para quienes más lo necesitan
          </p>
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
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
