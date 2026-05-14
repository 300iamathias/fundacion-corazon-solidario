# 🚀 Fundación Corazón Solidario - Guía de Despliegue

## 📦 Opción 1: Descargar ZIP

El archivo ZIP está disponible para descargar. Contiene todo el proyecto sin `node_modules`.

---

## 🐙 Subir a GitHub

### Paso 1: Crear repositorio en GitHub
1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repo: `fundacion-corazon-solidario`
3. Marca como **Public** o **Private**
4. NO marques "Initialize with README"
5. Click **Create repository**

### Paso 2: Subir el código (desde tu computadora)

```bash
# Descomprimir el ZIP
unzip fundacion-corazon-solidario.zip -d fundacion-corazon-solidario
cd fundacion-corazon-solidario

# Instalar dependencias
npm install

# Inicializar Git
git init
git add .
git commit -m "🏠 Landing page Fundación Corazón Solidario"

# Conectar a GitHub (cambia TU-USUARIO por tu usuario)
git remote add origin https://github.com/TU-USUARIO/fundacion-corazon-solidario.git
git branch -M main
git push -u origin main
```

---

## ▲ Desplegar en Vercel

### Paso 1: Conectar Vercel con GitHub
1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Click **"Add New" → "Project"**
3. Selecciona el repositorio `fundacion-corazon-solidario`
4. Click **Import**

### Paso 2: Configurar el proyecto
- **Framework Preset**: Next.js ✅ (se detecta automáticamente)
- **Root Directory**: `./` (dejar por defecto)
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Paso 3: Variables de entorno (si aplica)
No se necesitan variables de entorno para este proyecto.

### Paso 4: Desplegar
Click **"Deploy"** 🎉

Vercel te dará una URL como: `fundacion-corazon-solidario.vercel.app`

---

## 🌐 Conectar dominio personalizado

1. En Vercel, ve a **Settings → Domains**
2. Agrega tu dominio, ej: `fundacioncorazonsolidario.org`
3. En tu proveedor de dominio, agrega los DNS que Vercel te indica:
   - Tipo `A` → `76.76.21.21`
   - Tipo `CNAME` → `cname.vercel-dns.com`

---

## ✅ Checklist post-despliegue

- [ ] El sitio carga correctamente
- [ ] Las imágenes se ven bien
- [ ] Los botones de donación funcionan
- [ ] El formulario de contacto funciona
- [ ] El sitio es responsive (móvil + desktop)
- [ ] El dominio personalizado apunta correctamente

---

## 🔧 Personalización rápida

### Cambiar nombre de la fundación
Busca y reemplaza "Fundación Corazón Solidario" en `src/app/page.tsx`

### Cambiar colores
Edita las variables CSS en `src/app/globals.css` (sección `:root`)

### Reemplazar imágenes
Sube las fotos reales a `public/images/` manteniendo los mismos nombres:
- `hero.png`
- `about.png`
- `medicine.png`
- `children-gifts.png`
- `community.png`
- `cta.png`

### Cambiar información de contacto
Busca "Av. Principal #123" y "+593 99 123 4567" en `src/app/page.tsx`

---

## 📁 Estructura del proyecto

```
fundacion-corazon-solidario/
├── public/
│   └── images/          # Imágenes generadas con IA
├── src/
│   ├── app/
│   │   ├── globals.css  # Estilos y paleta de colores
│   │   ├── layout.tsx   # Metadata y configuración
│   │   └── page.tsx     # Landing page completa
│   ├── components/ui/   # Componentes shadcn/ui
│   └── lib/             # Utilidades
├── package.json
├── next.config.ts
└── tailwind.config.ts
```

---

Hecho con ❤️ para quienes más lo necesitan
