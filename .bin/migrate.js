"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// contentful space import --space-id 0a3h3ibm2v2z --environment-id dev --content-file export.json
var commander_1 = require("commander");
var program = new commander_1.Command();
program.version("1.0.0").description("A simple CLI app using Commander.js");
program
    .command("migrate <env:dev|main>")
    .description("Migrate from <env>")
    .action(function (env) {
    console.log("Hello, ".concat(env, "!"));
});
program.parse(process.argv);
