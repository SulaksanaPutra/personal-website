import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

function caseStudyDevPlugin() {
    return {
        name: 'case-study-dev-plugin',
        configureServer(server: any) {
            server.middlewares.use((req: any, res: any, next: any) => {
                if (req.url === '/__dev/save-article' && req.method === 'POST') {
                    let body = '';
                    req.on('data', (chunk: any) => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        try {
                            const data = JSON.parse(body);
                            const articleId = data.id;
                            const filepath = path.resolve(
                                __dirname,
                                `src/modules/case-studies/data/articles/${articleId}.ts`
                            );
                            if (fs.existsSync(filepath)) {
                                let content = fs.readFileSync(filepath, 'utf-8');
                                
                                // Replace the "en: { ... }" block before "id:"
                                const regex = /en:\s*\{[\s\S]*?\}(?=\s*,\s*id:)/;
                                content = content.replace(regex, `en: ${JSON.stringify(data, null, 4)}`);
                                
                                fs.writeFileSync(filepath, content);
                                
                                try {
                                    execSync(`npx prettier --write ${filepath}`, { stdio: 'ignore' });
                                } catch (e) {
                                    console.error('Prettier formatting failed:', e);
                                }
                                
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ success: true }));
                            } else {
                                res.statusCode = 404;
                                res.end(JSON.stringify({ error: 'File not found' }));
                            }
                        } catch (e: any) {
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: e.message }));
                        }
                    });
                } else {
                    next();
                }
            });
        },
    };
}

export default defineConfig({
    plugins: [vue(), caseStudyDevPlugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        environment: 'happy-dom',
        globals: true,
        pool: 'threads',
        setupFiles: ['./tests/unit/setup.ts'],
        include: ['tests/unit/**/*.test.ts'],
        css: true,
    },
});
