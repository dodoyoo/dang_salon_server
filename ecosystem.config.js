module.exports = {
    apps: [
        {
            name: 'dang_salon_dev',
            script: 'npm',
            args: 'run start',
            cwd: '.',
            watch: false,
            autorestart: true,
            ignore_watch: ['node_modules', 'logs'],
            // interpreter: 'ts-node',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
            output: './logs/pm2/console.log',
            error: './logs/pm2/consoleError.log',
        },
    ],
};
