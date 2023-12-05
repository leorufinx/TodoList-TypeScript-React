import App from "./server/app";
const port = 8080;

new App().server.listen(port);

console.log(`server rodando na porta:${port}`);
