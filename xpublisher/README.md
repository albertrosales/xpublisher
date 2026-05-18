# XPublisher — @Mastv_hn

Publicador automático de noticias RSS → X (Twitter) para Más Televisión de Colón.

## Instalación local

```bash
npm install
cp .env.example .env
# Edita .env con tus credenciales
node index.js
```

Abre http://localhost:3000

## Despliegue en Render (gratis)

1. Sube este proyecto a un repositorio de GitHub (privado)
2. Ve a https://render.com → New → Web Service
3. Conecta el repositorio
4. Configuración:
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Free

5. En "Environment Variables" agrega:
   | Variable | Valor |
   |---|---|
   | CONSUMER_KEY | Tu API Key de X |
   | CONSUMER_SECRET | Tu API Key Secret de X |
   | ACCESS_TOKEN | Tu Access Token de X |
   | ACCESS_TOKEN_SECRET | Tu Access Token Secret de X |

6. Haz clic en "Create Web Service"

Render te dará una URL tipo `https://xpublisher-xxxx.onrender.com`

## Endpoints

- `GET /health` — Estado del servidor
- `GET /api/rss/fetch?url=...` — Proxy para leer feeds RSS
- `POST /api/tweet/publish` — Publicar un tweet
  - Body: `{ "text": "...", "imageUrl": "..." }`

## Estructura

```
xpublisher/
├── index.js          # Servidor Express
├── routes/
│   ├── tweet.js      # Publicación en X via OAuth 1.0a
│   └── rss.js        # Proxy RSS
├── public/
│   └── index.html    # Interfaz web
└── .env.example      # Variables de entorno de ejemplo
```
