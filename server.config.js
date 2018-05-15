const baseAbsPath = __dirname + '/';
module.exports = {
  apps : [{
    name: "server",
    script: "./server.js",
    exec_mode: "cluster_mode",
    watch: false,
    instances: 4,
    out_file: baseAbsPath + "/logs/out.log", // Piping stdout.
    error_file: baseAbsPath + "/logs/err.log", // Piping stderr.
    merge_logs: true,
    log_date_format: "YYYY-MM-DD HH:mm Z",
    log_file: baseAbsPath + "/logs/merged.log", // Piping "stdout+stderr".
    env_test: {
      "TESTING": "true",
      "NODE_ENV": "development",
    },
    env_development: {
      "NODE_ENV": "development",
    },
    env_staging: {
      "NODE_ENV": "staging",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  }]
}

