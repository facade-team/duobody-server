module.exports = {
  apps: [
    {
      name: 'duobody-server',
      script: './dist/app.js',
      watch: false,
      instances: 0,
      exec_mode: 'cluster',
      env: {
        DEVELOPMENT: true,
      },
      env_production: {
        PRODUCTION: true,
      },
    },
  ],
}
