# Playwright UI Smoke - SauceDemo (JavaScript)

Proyecto de automatización **UI Smoke** con **Playwright Test** para https://www.saucedemo.com/.

## Requisitos
- Node.js 18+

## Setup
1) Instalar dependencias:
```bash
npm install
```

2) Crear tu archivo `.env` (copia el ejemplo):
```bash
cp .env.example .env
```

## Ejecutar pruebas
Headless:
```bash
npm test
```

Con UI (headed):
```bash
npm run test:headed
```

UI runner:
```bash
npm run test:ui
```

## Reporte
Después de correr tests:
```bash
npm run report
```

## Notas de autenticación
- Se usa `globalSetup` para iniciar sesión 1 vez y guardar el estado en `.auth/storageState.json`.
- El spec `tests/smoke.login.spec.js` **no** usa `storageState` para validar el login real.
