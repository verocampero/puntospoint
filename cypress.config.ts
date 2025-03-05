import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/integration/**/*.spec.js',
    supportFile: false,  // Desactiva el archivo de soporte

  }
});