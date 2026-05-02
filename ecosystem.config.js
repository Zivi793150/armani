module.exports = {
  apps: [
    {
      name: 'armani',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 4445',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
