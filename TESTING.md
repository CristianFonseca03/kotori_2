# Guía de Pruebas - Kotori 2 NodeJS

## Índice

- [Introducción](#introducción)
- [Estructura de Pruebas](#estructura-de-pruebas)
- [Configuración del Entorno](#configuración-del-entorno)
- [Tipos de Pruebas](#tipos-de-pruebas)
- [Convenciones de Nombrado](#convenciones-de-nombrado)
- [Herramientas y Utilidades](#herramientas-y-utilidades)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Mejores Prácticas](#mejores-prácticas)
- [Estado Actual de Pruebas](#estado-actual-de-pruebas)

## Introducción

Este documento describe las prácticas y estándares de pruebas para el proyecto Kotori 2 NodeJS. Seguir estas guías asegura la consistencia y calidad del código a través del proyecto.

## Estructura de Pruebas

La estructura de pruebas refleja la estructura del código fuente:

```
tests/
├── commands/           # Pruebas para los comandos del bot
├── utils/              # Pruebas para las utilidades
├── types/              # Definiciones de tipos para pruebas
├── helpers/            # Utilidades de ayuda para pruebas
├── fixtures/           # Datos estáticos para pruebas
├── integration/        # Pruebas de integración
└── __mocks__/          # Mocks para módulos externos y APIs
    └── @discordjs/     # Mocks específicos para Discord.js
```

Cada archivo de prueba debe seguir el patrón: `[nombre-archivo].test.ts`

## Configuración del Entorno

### Requisitos Previos

- Node.js (versión especificada en `.nvmrc`: 22.14.0)
- npm o yarn

### Instalación

```bash
npm install
```

### Configuración de Jest

El proyecto utiliza Jest con la siguiente configuración:

- Cobertura mínima: 70%
- Entorno: Node.js
- Soporte para TypeScript
- Reportes de cobertura en `docs/coverage`

## Tipos de Pruebas

### 1. Pruebas Unitarias

- Prueban funciones y componentes individuales
- Ubicación: `tests/[módulo]/[componente].test.ts`
- Ejemplo de pruebas para comandos (PingCommand):

```typescript
describe('PingCommand', () => {
  it('debería responder inicialmente con "Ping..."', async () => {
    await command.execute(message);
    expect(message.reply).toHaveBeenNthCalledWith(1, 'Ping...');
  });

  it('debería calcular y mostrar la latencia correctamente', async () => {
    await command.execute(message);
    expect(message.reply).toHaveBeenNthCalledWith(2, 'Pong! 🏓\nLatencia: 100ms');
  });

  it('debería manejar latencia cero', async () => {
    // Configuración específica para latencia cero
    await command.execute(message);
    expect(message.reply).toHaveBeenNthCalledWith(2, 'Pong! 🏓\nLatencia: 0ms');
  });
});
```

Notas importantes para las pruebas de comandos:

- Usar `beforeEach` para configurar el entorno de pruebas
- Mockear timestamps para pruebas consistentes
- Verificar múltiples respuestas usando `toHaveBeenNthCalledWith`
- Probar casos límite (latencia cero, latencia alta)

### 2. Pruebas de Integración

- Prueban la interacción entre múltiples componentes
- Ubicación: `tests/integration/[flujo].test.ts`
- Actualmente en desarrollo

### 3. Pruebas de Snapshots

- Utilizadas para verificar cambios en estructuras de datos
- Ubicación: `tests/__snapshots__/`
- Pendiente de implementación

## Convenciones de Nombrado

### Archivos de Prueba

- Pruebas unitarias: `[nombre-archivo].test.ts`
- Pruebas de integración: `[nombre-flujo].integration.test.ts`
- Mocks: `[nombre-modulo].mock.ts`

### Descripciones de Pruebas

```typescript
describe('[Nombre de Clase/Función]', () => {
  describe('[método/funcionalidad]', () => {
    it('debería [resultado esperado] cuando [condición]', () => {
      // prueba
    });
  });
});
```

## Herramientas y Utilidades

### Helpers de Prueba

Ubicación: `tests/helpers/`

- **MockDiscord**: Proporciona funciones factory para crear objetos mock de Discord.js:
  - `createMockMessage()`: Crea mensajes mock con funcionalidades completas
  - `createMockGuildMember()`: Crea miembros del servidor mock
  - `createMockVoiceChannel()`: Crea canales de voz mock
  - `createMockVoiceState()`: Crea estados de voz mock

### Mocks para APIs Externas

Ubicación: `tests/__mocks__/`

- **@discordjs/voice**: Proporciona mocks para la API de voz de Discord:

  - `AudioPlayerStatus`: Enumeración de estados del reproductor
  - `VoiceConnectionStatus`: Enumeración de estados de conexión
  - `mockPlayer`: Objeto mock para AudioPlayer
  - `mockConnection`: Objeto mock para VoiceConnection

- **audioPlayer**: Proporciona un mock para el AudioPlayerManager

## Ejecución de Pruebas

### Comandos Principales

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas de un archivo específico
npm test -- [ruta-al-archivo]
```

### Depuración

Para depurar pruebas:

1. Agregar `debugger` en el código
2. Ejecutar: `npm run test:debug`
3. Abrir Chrome DevTools

## Mejores Prácticas

### 1. Estructura de Pruebas

- Una descripción clara del comportamiento
- Preparación (Arrange)
- Ejecución (Act)
- Verificación (Assert)

### 2. Mocking

```typescript
// Ejemplo de mock
jest.mock('../../src/utils/audioPlayer', () => ({
  AudioPlayerManager: mockAudioPlayerManager,
}));
```

### 3. Manejo de Asincronía

```typescript
it('debería manejar operaciones async', async () => {
  const resultado = await funcionAsincrona();
  expect(resultado).toBeDefined();
});
```

### 4. Cobertura de Código

- Mantener cobertura mínima del 70%
- Incluir casos positivos y negativos
- Probar casos límite

### 5. Limpieza

```typescript
beforeEach(() => {
  // Configuración antes de cada prueba
});

afterEach(() => {
  // Limpieza después de cada prueba
  jest.clearAllMocks();
});
```

## Estado Actual de Pruebas

### Comandos

- **ping.test.ts**: Completo (100%)

  - Verifica nombre y descripción
  - Prueba respuesta inicial
  - Prueba cálculo de latencia
  - Prueba casos límite (latencia cero y alta latencia)

- **help.test.ts**: Completo (~90%)

  - Verifica nombre y descripción
  - Prueba respuesta de ayuda general
  - Prueba respuesta de ayuda específica
  - Prueba manejo de comandos desconocidos

- **play.test.ts**: Completo (~85%)
  - Verifica nombre y descripción
  - Prueba requisito de canal de voz
  - Prueba requisito de archivo de audio
  - Prueba reproducción exitosa
  - Prueba manejo de errores

### Utilidades

- **audioPlayer.test.ts**: Parcial (~70%)
  - Prueba método `play()`
  - Prueba requisito de canal de voz
  - Prueba manejo de errores de reproducción
  - Prueba método `stop()`

### Pendiente de Implementación

- Pruebas para `audioManager.ts`
- Pruebas para `commandManager.ts`
- Pruebas para `logger.ts`
- Pruebas para `songs.ts`
- Pruebas de integración

## CI/CD

Las pruebas se ejecutan automáticamente en:

- Pull Requests
- Push a main/master
- Despliegues

Los reportes de cobertura se generan y almacenan en:

- `docs/coverage/` (local)
- GitHub Pages (en línea)
