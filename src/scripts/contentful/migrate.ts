import { exec } from "child_process";

const isDev = process.argv[2] === "dev";

const switcher = isDev
  ? { from: "dev", to: "main" }
  : { from: "main", to: "dev" };

const run = async (command: string) => {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command);

    childProcess?.stdout?.on("data", (data) => {
      console.log(data.toString());
    });

    childProcess?.stderr?.on("data", (data) => {
      console.error(data.toString());
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve(null);
      } else {
        reject(new Error(`Command exited with code ${code}`));
      }
    });
  });
};

const runCommand = async () => {
  if (!process.argv[2]) {
    throw new Error("Usage: migrate [environment]");
  }

  await run(
    `contentful space export --space-id 0a3h3ibm2v2z --environment-id ${switcher.from} --content-file contentful-${switcher.from}.json`,
  );
  await run(
    `contentful space import --space-id 0a3h3ibm2v2z --environment-id ${switcher.to} --content-file contentful-${switcher.from}.json`,
  );
  await run(`rm contentful-${switcher.from}.json`);
};

runCommand()
  .then(() => {
    console.log(
      `Successfully migrated from:${switcher.from}} to: ${switcher.to}`,
    );
  })
  .catch((e) => {
    console.log(e.message);
  });
