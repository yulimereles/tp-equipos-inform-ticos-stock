import sequelize from "./connection";
import '../models/equipment.model'
import '../models/users'

const dbConnection = async() => {
    sequelize.authenticate()
    .then(() => {
        console.log("Conexion a la bases de datos con éxito");

        sequelize.sync({ force: false })
        .then(async() =>{
            console.log('Bases de datos sincronizado con éxito');
        })
    })
}
export default dbConnection;