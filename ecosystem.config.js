module.exports = {
  apps: [
    {
      name: "backend",
      script: "./server.js",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3002
      }
    }
  ]
};

