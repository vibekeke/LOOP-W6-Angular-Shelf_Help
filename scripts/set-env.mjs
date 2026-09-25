// Generates src/environments/environment.ts from the API_KEY env var.
// Runs automatically before `npm run build` (see the "prebuild" script).
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';

const target = 'src/environments/environment.ts';
const apiKey = process.env.API_KEY;

if (!apiKey) {
  if (existsSync(target)) {
    console.log(`API_KEY not set - keeping existing ${target}`);
    process.exit(0);
  }
  console.error(`API_KEY is not set and ${target} does not exist. Refusing to build.`);
  process.exit(1);
}

mkdirSync('src/environments', { recursive: true });
writeFileSync(target, `export const environment = {
  production: true,
  apiKey: '${apiKey}',
};
`);
console.log(`Wrote ${target} from API_KEY`);
