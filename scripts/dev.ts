import { execSync, spawn } from 'child_process';

const PORT = 3000;

function cleanup() {
    try {
        console.log(`Checking for processes on port ${PORT}...`);
        // Windows specific command to find PID on port
        const output = execSync(`netstat -ano | findstr :${PORT}`).toString();

        const lines = output.split('\n').filter(line => line.includes('LISTENING'));

        if (lines.length > 0) {
            lines.forEach(line => {
                const parts = line.trim().split(/\s+/);
                const pid = parts[parts.length - 1];

                if (pid && pid !== '0') {
                    console.log(`Killing process ${pid} on port ${PORT}...`);
                    execSync(`taskkill /F /PID ${pid}`);
                }
            });
            console.log(`Port ${PORT} cleaned.`);
        } else {
            console.log(`Port ${PORT} is free.`);
        }
    } catch (e) {
        // If netstat finds nothing or fails, it might throw. That's fine, means port is likely free.
        console.log(`Port ${PORT} appears free or check failed (ignoring).`);
    }
}

async function start() {
    cleanup();

    console.log('Starting Next.js dev server...');
    const child = spawn('npx', ['next', 'dev'], {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, PORT: String(PORT) }
    });

    child.on('close', (code) => {
        console.log(`Next.js process exited with code ${code}`);
        process.exit(code || 0);
    });
}

start();
