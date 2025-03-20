# Kotori2 - Bot de Discord

Este es un bot de Discord básico creado con Node.js, TypeScript y Discord.js que implementa comandos de ping y reproducción de audio.

## Requisitos Previos

- Ubuntu (versión 20.04 o superior)
- Node.js (versión 22.14.0 o superior)
- npm (versión 10.2.4 o superior)
- FFmpeg para la reproducción de audio
- libopus-dev para la codificación de audio
- libsodium-dev para la encriptación
- Un bot de Discord registrado en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)

## Instalación en Ubuntu

1. Instalar las dependencias del sistema necesarias:

   ```bash
   # Actualizar los repositorios
   sudo apt update
   ```

   ```bash
   # Instalar FFmpeg para la reproducción de audio
   sudo apt install -y ffmpeg
   ```

   ```bash
   # Instalar libopus-dev para la codificación de audio
   sudo apt install -y libopus-dev
   ```

   ```bash
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
   COMMAND_PREFIX=~  # Prefijo por defecto para los comandos
   ```

   > **Nota sobre el prefijo de comandos:**
   >
   > - El prefijo por defecto es `~` (tilde)
   > - Puedes cambiarlo modificando la variable `COMMAND_PREFIX` en el archivo `.env`
   > - Si no se especifica en el `.env`, se usará el prefijo por defecto `~`
   > - Ejemplo: `COMMAND_PREFIX=!` para usar `!` como prefijo

## Estructura del Proyecto

```
kotori2/
├── src/
│   ├── index.ts                 # Punto de entrada principal
│   ├── config.ts                # Configuración del bot
│   ├── types/
│   │   ├── Command.ts           # Interfaces compartidas
│   │   ├── BaseCommand.ts       # Clase base para todos los comandos
│   │   └── PlayerData.ts        # Interfaz para datos del reproductor
│   ├── utils/
│   │   ├── audioPlayer.ts       # Utilidades para reproducción de audio
│   │   ├── audioManager.ts      # Gestión de archivos de audio
│   │   ├── commandManager.ts    # Gestión de comandos
│   │   └── logger.ts            # Sistema de registro
│   ├── assets/
│   │   └── audio/               # Archivos de audio
│   └── commands/
│       ├── ping.ts              # Comando de ping
│       ├── play.ts              # Comando para reproducir audio
│       ├── songs.ts             # Comando para listar canciones
│       └── help.ts              # Comando de ayuda
├── dist/                        # Código compilado
├── .env                         # Variables de entorno
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración de TypeScript
├── .eslintrc.json               # Configuración de ESLint
├── .prettierrc                  # Configuración de Prettier
├── .vscode/                     # Configuración de VSCode
│   ├── extensions.json          # Extensiones recomendadas
│   └── launch.json              # Configuración de lanzamiento
├── README.md                    # Este archivo
└── COMANDOS.md                  # Documentación de comandos
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
```

```bash
npm start
```

## Assets de Audio

Para usar el comando de reproducción de audio:

1. Asegúrate de que el archivo de audio esté en la carpeta `src/assets/audio/`
2. El archivo debe estar en un formato compatible (mp3, wav, ogg)
3. El usuario debe estar en un canal de voz
4. Usa el comando `songs` para ver la lista de canciones disponibles
5. Usa `play` o `p` seguido del número o nombre del archivo

El prefijo de los comandos se puede configurar en el archivo `.env` usando la variable `COMMAND_PREFIX`. Por defecto es `~`.

## Solución de Problemas

Si encuentras algún problema, asegúrate de:

1. Tener todas las dependencias del sistema instaladas
2. Tener el token de Discord correctamente configurado en el archivo `.env`
3. Tener los permisos necesarios en el servidor de Discord
4. Tener los archivos de audio en el formato correcto

## Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Extensiones Recomendadas

Para mejorar la experiencia de desarrollo, se recomienda instalar las extensiones listadas en el archivo `.vscode/extensions.json`.

## Estructura de Comandos

Todos los comandos heredan de la clase `BaseCommand`, que proporciona un método común para manejar el logging y las respuestas.

### BaseCommand

- **Propósito**: Centralizar el manejo de logs y respuestas.
- **Método Principal**: `logAndReply(message: Message, response: string)`

### Comandos Disponibles

Para ver la lista completa de comandos disponibles, consulta el archivo [COMANDOS.md](./src/commands/COMANDOS.md).

Cada comando implementa su lógica específica en el método `execute`, pero utiliza `logAndReply` para enviar respuestas y registrar logs.
