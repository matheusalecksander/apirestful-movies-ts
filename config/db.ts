import config from "config";
import mongoose from "mongoose";

import Logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    Logger.info("DB Conectado");
  } catch (error) {
    Logger.error("Não foi possível conectar ao DB");
    Logger.error(`erro: ${error}`);
    process.exit(1);
  }
}

export default connect;
