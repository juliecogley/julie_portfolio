import Server from "lume/core/server.ts";
import { basicAuth } from "lume/middlewares/basic_auth.ts"
import precompress from "lume/middlewares/precompress.ts";
import expires from "lume/middlewares/expires.ts";
import csp from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/csp/mod.ts";

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

// assumes you are precompressing, say with the brotli plugin
server.use(precompress());
server.use(expires());
// pass your preferred security header options:
server.use(csp({
  "Strict-Transport-Security": {
    maxAge: DEFAULT_MAX_AGE,
    includeSubDomains: true,
    preload: true,
  },
  "Referrer-Policy": ["no-referrer", "strict-origin-when-cross-origin"],
  "X-Frame-Options": true,
  "X-Content-Type-Options": true,
  "X-XSS-Protection": true,
  "X-Permitted-Cross-Domain-Policies": true,
  "X-Powered-By": true,
});

server.use(async (request, next) => {
  const response = await next(request);

  // Add additional headers to the request
  response.headers.set("X-Powered-By", "Lume and sweat, blood, and tears");

  return response;
});

server.start();

console.log("Listening on http://localhost:8000");
