import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://bayuaksana.com';
const PUBLIC_DIR = path.resolve('public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

const routes = [
  '/',
  '/systems',
  '/case-studies',
  '/writing',
  '/skills',
  '/contact',
];

// Scan for writing articles
const writingArticlesDir = path.resolve('src/modules/writings/data/articles');
const writingFiles = fs.readdirSync(writingArticlesDir);
writingFiles.forEach(file => {
  if (file.endsWith('.ts')) {
    const id = file.replace('.ts', '');
    routes.push(`/writing/${id}`);
  }
});

// Scan for case studies
const caseStudyArticlesDir = path.resolve('src/modules/case-studies/data/articles');
if (fs.existsSync(caseStudyArticlesDir)) {
  const caseFiles = fs.readdirSync(caseStudyArticlesDir);
  caseFiles.forEach(file => {
    if (file.endsWith('.ts')) {
      const filePath = path.join(caseStudyArticlesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Step 1: Find all IDs in the file
      const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
      
      // Step 2: The actual article ID is usually the one that:
      // - Is NOT 'case-studies' (used in backlinks)
      // - Is NOT a section ID (like 'context', 'problem', etc.)
      const reservedIds = [
        'case-studies', 'writing', 'systems', 'skills', 'contact',
        'context', 'problem', 'the-problem', 'solution', 'outcome', 
        'reflection', 'constraints', 'impact', 'trigger', 'decision', 
        'implementation', 'decision-and-approach', 'risk-management-and-verification'
      ];
      
      const articleId = idMatches
        .map(m => m[1])
        .find(id => !reservedIds.includes(id));
      
      // Step 3: Extract system IDs (can be multi-line)
      const systemsMatch = content.match(/systemIds:\s*\[([\s\S]*?)\]/);
      
      if (articleId && systemsMatch) {
        const systemIds = systemsMatch[1]
          .split(',')
          .map(s => s.trim().replace(/['"]/g, ''))
          .filter(s => s.length > 0 && !s.includes('\n'));
          
        systemIds.forEach(systemId => {
          routes.push(`/case-studies/${systemId}/${articleId}`);
        });
      }
    }
  });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : (route.includes('/writing/') || route.includes('/case-studies/')) ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(SITEMAP_PATH, sitemap);
console.log(`Sitemap generated with ${routes.length} URLs at ${SITEMAP_PATH}`);
