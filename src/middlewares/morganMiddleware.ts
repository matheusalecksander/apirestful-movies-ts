import config from "config";
import morgan, { StreamOptions } from "morgan";

import Logger from "../../config/logger";

// Definindo um log para as requisições http em nosso projeto
const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

// Caso estejamos em ambiente de produção ele para os loggers do morgan
// Como podemos ter muitos logs nessa parte, não é tão interessante exibir sempre
// pois pode demandar muito processamento do computador e deixar o sistema lento
const skip = () => {
  const env = config.get<string>("env") || "development";
  return env !== "development";
};

// Middleware para utilizarmos em nossos logs
const morganMiddleware = morgan(
  // Padrão da mensagem exibida pelo morgan
  ":method :url :status :res[content-lenght] - :response-time ms",
  // Configurações que devem ser usadas
  { stream, skip }
);

export default morganMiddleware;
