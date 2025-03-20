# Kotori2 - Bot de Discord

[![Cobertura de Pruebas](https://img.shields.io/badge/cobertura-70%25-brightgreen.svg)](https://usuario.github.io/kotori_2_nodejs/coverage/)
[![Pruebas](https://img.shields.io/badge/pruebas-jest-blue.svg)](https://jestjs.io/)

Este es un bot de Discord básico creado con Node.js, TypeScript y Discord.js que implementa comandos de ping y reproducción de audio.

## Mejoras Planificadas

Para conocer las mejoras planificadas y oportunidades de desarrollo, consulta el archivo [Revisión Versión 1.0.0](./review_prompts/v1.0.0.md).

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
- `npm run check`: Ejecuta todas las verificaciones del proyecto:
  - Ejecuta el linter
  - Compila el proyecto
  - Ejecuta las pruebas
  - Útil para verificar que todo está correcto antes de hacer commit o deploy
- `npm test`: Ejecuta las pruebas unitarias con Jest
- `npm run test:coverage`: Ejecuta las pruebas y genera informes de cobertura
- `npm run test:watch`: Ejecuta las pruebas en modo watch
- `npm run deploy:coverage`: Genera y copia los informes de cobertura para GitHub Pages
- `npm run deploy`: Prepara el proyecto para despliegue en GitHub Pages

## Pruebas y Cobertura

El proyecto utiliza Jest como framework de pruebas. Las pruebas se encuentran en archivos con sufijo `.test.ts` junto a los archivos de implementación.

### Ejecución de pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con generación de informes de cobertura
npm run test:coverage

# Ejecutar pruebas en modo watch (útil durante el desarrollo)
npm run test:watch
```

### Cobertura de pruebas

El proyecto tiene establecido un objetivo mínimo de cobertura del 70% para:

- Líneas de código
- Funciones
- Ramas
- Declaraciones

Puedes ver los informes de cobertura actualizados en:

- Local: `docs/coverage/index.html` (después de ejecutar `npm run test:coverage`)
- En línea: [https://usuario.github.io/kotori_2_nodejs/coverage/](https://usuario.github.io/kotori_2_nodejs/coverage/)

## Despliegue en GitHub Pages

El proyecto está configurado para desplegar automáticamente la documentación y los informes de cobertura en GitHub Pages.

### Pasos para desplegar:

1. Ejecuta las pruebas y genera informes de cobertura:

   ```bash
   npm run test:coverage
   ```

2. Prepara los archivos para GitHub Pages:

   ```bash
   npm run deploy:coverage
   ```

3. Sube los cambios a la rama principal en GitHub:

   ```bash
   git add .
   git commit -m "Actualizar informes de cobertura"
   git push
   ```

4. Configura GitHub Pages para usar la carpeta `/docs`:
   - Ve a la configuración del repositorio en GitHub
   - Navega a la sección "Pages"
   - Selecciona la rama principal y la carpeta `/docs` como origen

## Despliegue de Documentación

El proyecto está configurado para desplegar la documentación en GitHub Pages utilizando la carpeta `docs/` como base.

### Pasos para desplegar:

1. Asegúrate de que los archivos de documentación estén actualizados en la carpeta `docs/`.
2. Ejecuta el siguiente comando para desplegar la documentación:
   ```bash
   npm run deploy:docs
   ```
3. Configura GitHub Pages para usar la carpeta `docs/` como origen:
   - Ve a la configuración del repositorio en GitHub.
   - Navega a la sección "Pages".
   - Selecciona la rama principal y la carpeta `/docs` como origen.

Una vez completado, la documentación estará disponible en la URL proporcionada por GitHub Pages.

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

Para verificar el estado del proyecto:

```bash
npm run check
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

### Directrices para contribuciones:

- Seguir el estilo de código establecido
- Añadir pruebas para cualquier nueva funcionalidad
- Mantener o aumentar el porcentaje de cobertura de pruebas
- Documentar el código y actualizar el README si es necesario

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

## Política de Versionado

Este proyecto sigue el [Versionado Semántico](https://semver.org/lang/es/):

- **MAJOR (X.0.0)**: Cambios incompatibles con versiones anteriores
- **MINOR (0.X.0)**: Nuevas funcionalidades que mantienen compatibilidad
- **PATCH (0.0.X)**: Correcciones de errores que mantienen compatibilidad

## Despliegue

Para desplegar el bot en un entorno de producción:

1. Asegúrate de tener Node.js instalado (versión >=22.14.0)
2. Clona el repositorio
3. Instala las dependencias: `npm install --production`
4. Configura las variables de entorno en un archivo `.env`:
   ```
   DISCORD_TOKEN=tu_token_aquí
   COMMAND_PREFIX=tu_prefijo_aquí  # Por defecto es ~
   ```
5. Compila el proyecto: `npm run build`
6. Inicia el bot: `npm start`
