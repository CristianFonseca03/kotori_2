# Kotori2 - Bot de Discord

Este es un bot de Discord básico creado con Node.js, TypeScript y Discord.js que implementa un comando simple de ping.

## Requisitos Previos

- Node.js (versión 22.14.0 o superior)
- npm (versión 10.2.4 o superior)
- Un bot de Discord registrado en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)

## Configuración

1. Clona este repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd kotori2
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y añade tu token de Discord:
```
DISCORD_TOKEN=tu_token_aquí
```

## Estructura del Proyecto

```
kotori2/
├── src/
│   ├── index.ts           # Punto de entrada principal
│   ├── config.ts          # Configuración del bot
│   ├── types/
│   │   └── Command.ts     # Interfaces compartidas
│   └── commands/
│       └── ping.ts        # Comando de ping
├── dist/                  # Código compilado
├── .env                   # Variables de entorno
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
├── .eslintrc.json       # Configuración de ESLint
├── .prettierrc          # Configuración de Prettier
└── README.md            # Este archivo
```

## Scripts Disponibles

- `npm run dev`: Inicia el bot en modo desarrollo con hot-reload
- `npm run build`: Compila el código TypeScript a JavaScript
- `npm start`: Inicia el bot en modo producción
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código con Prettier

## Uso

Para desarrollo:
```bash
npm run dev
```

Para producción:
```bash
npm run build
npm start
```

## Comandos Disponibles

- `~ping`: Responde con "Pong!" y muestra la latencia del bot

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 