import { App } from "./app";

const { app } = new App();

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running");
});
