# Mercurio Passenger

Base Expo/React Native para la app de pasajeros.

## Stack

- Expo
- React Native
- TypeScript
- Expo Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- i18next

## Arranque

1. Crea un archivo `.env` a partir de `.env.example`
2. Instala dependencias con `npm install`
3. Ejecuta `npm run start`

## Variables necesarias

- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_OFFICE_PHONE`
- `EXPO_PUBLIC_OFFICE_SMS_PHONE`
- `EXPO_PUBLIC_DEFAULT_COUNTRY`

## Estructura

- `app/`: rutas y pantallas
- `src/api/`: cliente HTTP y endpoints
- `src/features/`: dominio de pasajero
- `src/components/`: UI compartida
- `src/i18n/`: idiomas
- `src/theme/`: paleta y tipografía
- `src/utils/`: formateo, errores y validaciones
