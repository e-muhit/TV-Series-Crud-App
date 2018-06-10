const promise = require("bluebird");
const monitor = require("pg-monitor");

let initOptions = {};

if (process.NODE_ENV !== "production") {
    promise.config({
        longStackTraces: true
    });
    initOptions = {
        promiseLib: promise
    };
}

monitor.attach(initOptions, ["query", "error"]);

const pgp = require("pg-promise")(initOptions);

let connectionConfig;

if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    connectionConfig = `postgres://localhost:5432/series`;
} else if (process.env.NODE_ENV === "production") {
    connectionConfig = process.env.DATABASE_URL;
}

const db = pgp(connectionConfig);

module.exports = db;