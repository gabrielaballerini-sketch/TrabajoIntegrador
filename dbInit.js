import sequelize from './models/config.js'
import './models/sync.js'
import { Usuario } from './models/Usuario.js'

async function inicializarDB() {
    try {
        console.log("Sincronizando base de datos...");
       
        await sequelize.sync({ force: true }); 

        console.log("Cargando usuarios de prueba...");

        await Usuario.bulkCreate([
            {
                nombre: 'Lucia', apellido: 'Pérez',
                email: 'lucia@test.com',
                password: 'Password123',
                rol: 'usuario', activo: true
            },
            {
                nombre: 'Alejandra', apellido: 'Diaz',
                email: 'alejandra@test.com',
                password: 'Password123',
                rol: 'usuario', activo: true
            }
        ], { individualHooks: true });

        console.log("¡Base de datos inicializada correctamente!");
        process.exit();
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
        process.exit(1);
    }
}

inicializarDB();