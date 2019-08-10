"use strict";

const Worker = require("../lib/workerlog.js");

const dsn =
  "https://cE0070046F0438F3c20F217FDc72F0281E188893@workerlog.dev/b350Fc2";
const worker = new Worker(dsn);

const main = async () => {
  try {
    const { status, data } = await worker.log("hello, worker", {
      name: "worker",
      module: "cloudflare"
    });
    console.log(status, data);
  } catch (error) {
    console.error(error);
  }
};

main();
