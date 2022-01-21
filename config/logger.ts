import config from "config";
import winston from "winston";

// Levels dos logs para o winston identificá-los
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Forma como o winston irá exibir os logs à nós, se for em produção será
// um warn, em desenvolvimento será debug
const level = () => {
  const env = config.get<string>("env") || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

// Cores dos logs, pode ser customizado conforme documentação, porém essas
// são as cores padrões para cada log
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Informando ao winston quais cores deve utilizar
winston.addColors(colors);

// Formatando as mensagens que serão exibidas no console
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), // Padrão de data
  winston.format.colorize({ all: true }), // Todas as mensagens coloridas
  winston.format.printf(
    // Customizando como a mensagem será exibida
    (info) => `${info.timestamp} - ${info.level} - ${info.message}`
  )
);

// Constante para criação dos arquivos de log, irei criar um para cada tipo de log e um geral
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "logs/warn.log",
    level: "warn",
  }),
  new winston.transports.File({
    filename: "logs/info.log",
    level: "info",
  }),
  new winston.transports.File({
    filename: "logs/http.log",
    level: "http",
  }),
  new winston.transports.File({
    filename: "logs/debug.log",
    level: "debug",
  }),
  new winston.transports.File({
    filename: "logs/all.log",
  }),
];

// Criando nosso logger com as configurações que definimos
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
