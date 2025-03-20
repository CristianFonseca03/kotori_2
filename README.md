# Kotori2 - Bot de Discord

Este es un bot de Discord básico creado con Node.js y Discord.js que implementa un comando simple de ping.

## Requisitos Previos

- Node.js (versión 22.14.0 o superior)
- npm (versión 10.2.4 o superior)
- Un bot de Discord registrado en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)

## Configuración

1. Clona este repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd discord-bot
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
discord-bot/
├── src/
│   ├── index.js           # Punto de entrada principal
│   ├── config.js          # Configuración del bot
│   └── commands/
│       └── ping.js        # Comando de ping
├── .env                   # Variables de entorno
├── package.json          # Dependencias y scripts
└── README.md            # Este archivo
```

## Uso

Para iniciar el bot en modo desarrollo:
```bash
npm run dev
```

Para iniciar el bot en modo producción:
```bash
npm start
```

## Comandos Disponibles

- `~ping`: Responde con "Pong!" y muestra la latencia del bot

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 