# E-Commerce App – Client (React + Vite)

Dieses Repository enthält den **Frontend/Client** der E‑Commerce‑App mit **Shop‑Bereich** (User) und **Admin‑Panel** (Admin).
Der Client kommuniziert mit einem separaten Backend (Node/Express + MongoDB) über REST‑Endpoints.

> **Wichtig:** Das eigentliche Vite‑Projekt liegt im Ordner **`client/`**.  
> Installieren/Starten/Build passiert daher im Normalfall **immer** in `client/`.

---

## Inhalt

- [Features](#features)
- [Rollen & Zugriff](#rollen--zugriff)
- [Tech‑Stack](#tech-stack)
- [Projektstruktur](#projektstruktur)
- [Routen](#routen)
- [API‑Endpoints (erwartet)](#api-endpoints-erwartet)
- [Installation & Start](#installation--start)
- [Konfiguration (.env)](#konfiguration-env)
- [Build & Deployment](#build--deployment)
- [Troubleshooting (häufige Fehler)](#troubleshooting-häufige-fehler)

---

## Features

### Authentifizierung
- Registrierung & Login
- Session/Cookie‑basierte Authentifizierung (Axios `withCredentials`)
- Profilcheck beim App‑Start (`/api/auth/profile`)
- Rollenbasiertes Routing über `CheckAuth`:
    - **Admin** → `/admin/*`
    - **User** → `/shop/*`
    - Unautorisierter Zugriff → `/unauth-page`

### Shop (User)
- Produktliste mit **Filtern** & **Sortierung**
- Produktdetails
- Warenkorb:
    - Produkt hinzufügen/entfernen
    - Menge ändern
    - Cart‑Badge/Notification im Header möglich (Item‑Count)
- Adressen:
    - Add / Update / Delete
- Checkout & Bestellung:
    - Order erstellen
    - PayPal Weiterleitung via `approvalURL`
    - Capture/Finalize Payment
- Bestellübersicht & Bestelldetails (User)
- Reviews:
    - Review hinzufügen
    - Reviews pro Produkt laden
- Suche (Search‑Slice vorhanden)

### Admin
- Produkte:
    - Produkt erstellen / bearbeiten / löschen
    - Bild‑Upload (Cloudinary via Backend Endpoint)
- Feature Images:
    - Feature‑Bilder hochladen & anzeigen
- Orders:
    - Bestellungen abrufen
    - Order‑Status aktualisieren
- Users:
    - User‑Liste abrufen

---

## Rollen & Zugriff

Im Client wird typischerweise anhand von `user.role` unterschieden (Logik liegt im Component **`src/components/common/Check-Auth`**).

- **Admin‑Routen:** `/admin/...`
- **Shop‑Routen:** `/shop/...`

---

## Tech‑Stack

Aus `client/package.json`:

- **React 19**, **Vite 6**
- **React Router Dom 7**
- **Redux Toolkit** + **react-redux**
- **Axios**
- **TailwindCSS v4** (+ `@tailwindcss/vite`)
- **shadcn/ui** (Radix UI Components) + **lucide-react**
- **react-toastify**

---

## Projektstruktur

```
E-Commerce-Client/
  static.json                 # SPA rewrite config (z.B. Render static)
  client/
    .env                      # API Base URLs
    vite.config.js            # Alias "@" -> ./src
    src/
      App.jsx                 # Routing
      components/
        admin-view/
        shopping-view/
        common/
        ui/                   # shadcn/ui Komponenten
      pages/
        auth/
        admin-view/
        shopping-view/
        un-auth/
      store/
        auth-slice/
        admin/
        shop/
        common-slice/
```

Alias:
- `@` zeigt auf `client/src` (siehe `client/vite.config.js`)

---

## Routen

### Basis
- `/` → redirect zu `/auth/login` (aktuell)

### Auth
- `/auth/login`
- `/auth/register`

### Admin
- `/admin/products`
- `/admin/features`
- `/admin/orders`
- `/admin/users`

> Hinweis: `/admin/dashboard` ist in `App.jsx` aktuell auskommentiert.  
> Wenn irgendwo noch `/admin/dashboard` angesteuert wird, gibt es:  
> `No routes matched location "/admin/dashboard"`  
> Lösung: entweder Route wieder aktivieren oder auf `/admin/products` umleiten (Index‑Route/Redirect).

Empfohlenes Default‑Routing für `/admin`:
```jsx
<Route index element={<Navigate to="products" replace />} />
```

### Shop
- `/shop/home`
- `/shop/products`
- `/shop/checkout`
- `/shop/account`

---

## API‑Endpoints (erwartet)

Die Endpoints sind aus den Redux Slices abgeleitet (Client erwartet diese URLs).

### Auth (`src/store/auth-slice`)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET  /api/auth/profile`

### Shop – Products (`src/store/shop/products-slice`)
- `GET /api/shop/products/get?{filters}&sortBy=...`
- `GET /api/shop/products/get/:id`

### Shop – Cart (`src/store/shop/cart-slice`)
- `POST   /api/shop/cart/add`
- `GET    /api/shop/cart/get/:userId`
- `PUT    /api/shop/cart/update-cart`
- `DELETE /api/shop/cart/:userId/:productId`

### Shop – Address (`src/store/shop/address-slice`)
- `POST   /api/shop/address/add`
- `GET    /api/shop/address/get/:userId`
- `PUT    /api/shop/address/update/:userId/:addressId`
- `DELETE /api/shop/address/delete/:userId/:addressId`

### Shop – Orders/PayPal (`src/store/shop/order-slice`)
- `POST /api/shop/order/create` → liefert `approvalURL` + `orderId`
- `POST /api/shop/order/capture`
- `GET  /api/shop/order/list/:userId`
- `GET  /api/shop/order/details/:id`

### Shop – Reviews (`src/store/shop/review-slice`)
- `POST /api/shop/review/add`
- `GET  /api/shop/review/:productId`

### Admin – Products (`src/store/admin/products-slice`)
- `POST /api/admin/products/add`
- `GET  /api/admin/products/fetch`
- `PUT  /api/admin/products/edit/:id`
- `DELETE /api/admin/products/delete/:id` *(siehe Troubleshooting: URL Bug im Slice)*

### Admin – Orders (`src/store/admin/order-sclice`)
- `GET /api/admin/orders/get`
- `GET /api/admin/orders/details/:id` *(siehe Troubleshooting: URL Bug im Slice)*
- `PUT /api/admin/orders/update/:id`

### Admin – Users (`src/store/admin/users`)
- `GET /api/admin/users/get`

### Common – Feature Images (`src/store/common-slice`)
- `GET  /api/common/feature/get`
- `POST /api/common/feature/add`

---

## Installation & Start

### Voraussetzungen
- Node.js **18+** (empfohlen 20+)
- npm

### Setup
```bash
cd client
npm install
```

### Dev Server
```bash
npm run dev
```
Standard: `http://localhost:5173`

---

## Konfiguration (.env)

Die Datei liegt unter `client/.env`:

```env
VITE_API_BASE_URL_DEV=http://localhost:<port>
VITE_API_BASE_URL=<https://your-backend-url>
```

Im Code wird die URL so gewählt:
- Dev: `VITE_API_BASE_URL_DEV`
- Build/Prod: `VITE_API_BASE_URL`

> Hinweis: In `src/App.jsx` ist zusätzlich `axios.defaults.baseURL = "https://..."` gesetzt.  
> Empfehlung: **eine** Strategie wählen (entweder globaler Axios‑Default oder überall `baseURL` aus `.env`), um Inkonsistenzen zu vermeiden.

Backend muss für Cookies/CORS:
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Origin` korrekt setzen (nicht `*`)

---

## Build & Deployment

### Build lokal
```bash
cd client
npm run build
npm run preview
```

### SPA‑Fallback (Render/Static Hosting)
Im Repo liegt `static.json`:
```json
{
  "root": "dist/",
  "routes": { "/**": "index.html" }
}
```

Damit funktionieren Deep‑Links wie `/shop/products` auch nach Reload.
