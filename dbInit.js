import sequelize from './models/config.js'
import './models/sync.js'
import { Usuario } from './models/Usuario.js'
import { Rol } from './models/Rol.js'
import { MotivoDenuncia } from './models/MotivoDenuncia.js'

async function inicializarDB() {
    try {
        console.log("Sincronizando base de datos...");
       
        await sequelize.sync({force: true}); 

        console.log("Cargando roles...");

        await Rol.bulkCreate([
            { id: 1, nombre: 'validador',      descripcion: 'Validador de contenido' },
            { id: 2, nombre: 'usuario',        descripcion: 'Usuario estándar' },
            
        ], { ignoreDuplicates: false }); // si ya existen, no rompe
       
       
        await MotivoDenuncia.bulkCreate([
          { id: 1, nombre: 'spam',                 descripcion: 'Contenido no solicitado o repetitivo' },
          { id: 2, nombre: 'acoso',                descripcion: 'Comportamiento intimidatorio o acoso' },
          { id: 3, nombre: 'copyright',            descripcion: 'Uso no autorizado de material protegido' },
          { id: 4, nombre: 'contenido_inapropiado',descripcion: 'Contenido ofensivo o no apto' },
          { id: 5, nombre: 'otro',                 descripcion: 'Otro motivo no listado' },
        ], { ignoreDuplicates: true });


        console.log("Cargando usuarios de prueba...");

        await Usuario.bulkCreate([
            {
                nombre: 'Lucia',
                 apellido: 'Pérez',
                email: 'lucia@test.com',
                password: 'Password123',
                rol_id: 2,   // Usuario
                 activo: true
            },
            {
                nombre: 'Alejandra',
                 apellido: 'Diaz',
                email: 'alejandra@test.com',
                password: 'Password123',
                rol_id: 2,   // Usuario
                 activo: true
            },


            
            {
             
        nombre: 'Valeria',
        apellido: 'Validadora',
        email: 'validador@test.com',
        password: 'Password123',
         rol_id: 1,   // Validador
        activo: true}


        ], { individualHooks: true,
             

        });

        console.log("¡Base de datos inicializada correctamente!");
        process.exit();
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
        process.exit(1);
    }
}

inicializarDB();