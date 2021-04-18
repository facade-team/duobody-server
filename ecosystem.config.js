module.exports = {
  apps: [
    {
      name: 'duobody-server',
      script: 'dist/app.js',
      watch: true,
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs/', 'dist/'],
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
