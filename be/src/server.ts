
const corsOrigin = process?.env?.corsOrigin ?? "*";
const wsOrigin = process?.env?.wsOrigin ?? process?.env?.corsOrigin ?? "http://localhost:8080";
export const serverConfig = {
    port:3001,
    payloadLimit: process?.env?.bodyLimit ?? "8mb",
    debugLevel: process.env.output || "combined",
    jsonMaxSize: process.env.jsonMaxSize || "16mb",
    cwd: process.cwd(),
    corsOrigin,
    wsOrigin,
};
