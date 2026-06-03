import { sequelize } from './app.js'


async function inicializarDB() {
    try {
        console.log("Sincronizando base de datos...");
       
       
        await sequelize.sync({ force: true }); 
        console.log("¡Base de datos inicializada correctamente!");
        process.exit();
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
        process.exit(1);
    }
}

inicializarDB();