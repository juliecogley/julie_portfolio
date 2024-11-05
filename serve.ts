import Server from "lume/core/server.ts";
import { basicAuth } from "https://deno.land/x/lume@v2.3.2/middlewares/basic_auth.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

// Set the var in your Deno Deploy project environment variables.
const myUSER_1_PASS = Deno.env.get("USER_1_PASS");
const middleware = basicAuth({
  users: {
    "guest": `${myUSER_1_PASS}`,
  },
  errorMessage: "401 Unauthorized, contact site owner for access.",
});

server.use((req, next) => {
  if (isProtected(req)) {
    return middleware(req, next);
  }
  return next(req);
});

function isProtected(req) {
  const url = new URL(req.url);
  return url.pathname.includes("/private/");
}

server.start();

console.log("Listening on http://localhost:8000");
