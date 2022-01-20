import config from "config";
import mongoose from "mongoose";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    console.log("DB Conectado");
  } catch (error) {
    console.log("Não foi possível conectar ao DB");
    console.log(error);
  }
}

export default connect;
