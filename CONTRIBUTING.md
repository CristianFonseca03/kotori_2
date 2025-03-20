# Reglas de GitFlow

1. **Rama principal**: `master` contiene el código en producción.
2. **Rama de desarrollo**: Usa `develop` para integrar nuevas features y fixes.
3. **Ramas temporales**:
   - `feature/<nombre>` para nuevas funcionalidades.
   - `fix/<nombre>` para correcciones de bugs.

## Flujo de trabajo

1. Crea una rama desde `develop`:
   ```bash
   git checkout -b feature/<nombre>
   ```
2. Realiza los cambios y haz commits.
3. Fusiona la rama en `develop` mediante un Pull Request.
4. Incrementa la versión del proyecto:
   - Para fixes: `npm run release:patch`
   - Para nuevas features: `npm run release:minor`
   - Para cambios importantes: `npm run release:major`
5. Asegúrate de que el tag se haya creado y subido:
   ```bash
   git tag
   git push --tags
   ```
