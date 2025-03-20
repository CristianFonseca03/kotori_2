# Kotori2 - Bot de Discord

Este es un bot de Discord básico creado con Node.js, TypeScript y Discord.js que implementa comandos de ping y reproducción de audio.

## Requisitos Previos

- Node.js (versión 22.14.0 o superior)
- npm (versión 10.2.4 o superior)
- Un bot de Discord registrado en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)

## Instalación en Ubuntu

1. Instalar las dependencias del sistema necesarias:

```bash
# Actualizar los repositorios
sudo apt update

# Instalar FFmpeg para la reproducción de audio
sudo apt install -y ffmpeg

# Instalar libopus-dev para la codificación de audio
sudo apt install -y libopus-dev

# Instalar libsodium-dev para la encriptación
sudo apt install -y libsodium-dev
```

2. Clona este repositorio:

```bash
git clone [URL_DEL_REPOSITORIO]
cd kotori2
```

3. Instala las dependencias de Node.js:

```bash
npm install
```

4. Crea un archivo `.env` en la raíz del proyecto y añade tu token de Discord:

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
│   ├── utils/
│   │   └── audioPlayer.ts # Utilidades para reproducción de audio
│   ├── assets/
│   │   └── audio/         # Archivos de audio
│   └── commands/
│       ├── ping.ts        # Comando de ping
│       └── play.ts        # Comando para reproducir audio
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
- `~play <archivo>`: Reproduce un archivo de audio en el canal de voz (ejemplo: `~play audio.mp3`)

## Reproducción de Audio

Para usar el comando de reproducción de audio:

1. Asegúrate de que el archivo de audio esté en la carpeta `src/assets/audio/`
2. El archivo debe estar en un formato compatible (mp3, wav, etc.)
3. El usuario debe estar en un canal de voz
4. Usa el comando `~play <nombre-del-archivo>`

## Solución de Problemas

Si encuentras errores relacionados con la reproducción de audio:

1. Verifica que FFmpeg está instalado correctamente:

```bash
ffmpeg -version
```

2. Verifica que las dependencias del sistema están instaladas:

```bash
sudo apt install -y ffmpeg libopus-dev libsodium-dev
```

3. Asegúrate de que el archivo de audio existe y tiene los permisos correctos:

```bash
ls -l src/assets/audio/
```

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
