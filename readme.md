# Fotaza 2 - Trabajo Integrador Web II

Aplicación web para compartir fotografías desarrollada con Node.js, Express y PostgreSQL.

##  Producción

https://trabajointegrador.onrender.com

##  Instalación local

1. Clonar el repositorio
git clone https://github.com/gabrielaballerini-sketch/TrabajoIntegrador.git

2. Instalar dependencias
npm install

3. Configurar variables de entorno
cp .env.example .env

# Completar los valores en el archivo .env

4. Inicializar la base de datos
npm run db:init

5. Iniciar el servidor
npm start

La app queda disponible en http://localhost:3000

## Usuarios de prueba

 Lucia Pérez | lucia@test.com | Password123 | usuario |
 Alejandra Diaz | alejandra@test.com | Password123 | usuario |

##  Tecnologías

- Node.js + Express
- PostgreSQL + Sequelize
- Pug (motor de plantillas)
- Bootstrap

## Problemas encontrados durante el desarrollo

Fue necesario realizar varios ajustes en las relaciones de Sequelize para modelar correctamente usuarios, publicaciones, etiquetas y seguidores.
La implementación de la carga de imágenes evolucionó durante el desarrollo hasta adoptar una solución basada en Multer y almacenamiento binario.
La vista principal fue refactorizada y modularizada mediante mixins de Pug para mejorar su mantenimiento.
Durante el despliegue en Render se resolvieron problemas relacionados con variables de entorno, configuración SSL para Neon y sincronización de Sequelize en producción.