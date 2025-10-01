const fs = require("fs-extra");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { execSync } = require("child_process");

const ROOT = __dirname;
const CSV_PATH = path.join(ROOT, "websites.csv");
const TEMPLATE_DIR = path.join(ROOT, "react-template");
const BUILD_DIR = path.join(ROOT, "build");

// [[A|B|C]] random pick per site
function resolveBracketAlternatives(text) {
  return text.replace(/\[\[\s*([^\]]+)\s*\]\]/g, (m, inner) => {
    const parts = inner.split('|').map(p => p.trim()).filter(Boolean);
    return parts.length ? parts[Math.floor(Math.random() * parts.length)] : '';
  });
}

async function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error("Error: websites.csv not found in project root.");
    process.exit(1);
  }

  const csvText = await fs.readFile(CSV_PATH, "utf8");
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
  });

  await fs.remove(BUILD_DIR);
  await fs.ensureDir(BUILD_DIR);

  for (const rec of records) {
    const domain = (rec.domain || "").trim();
    if (!domain) continue;

    const outDir = path.join(BUILD_DIR, domain);
    await fs.copy(TEMPLATE_DIR, outDir);

    // Hero text random pick
    const heroTextRaw = "[[ Quick | Fast | Speedy ]] delivery service in Dhaka.";
    const heroText = resolveBracketAlternatives(heroTextRaw);

    // make props.js
    const props = {
      ...rec,
      heroText,
      address: (rec.address || "").replace(/\r?\n/g, ", ").replace(/,\s*,/g, ",").trim()
    };

    const propsJsContent = `export default ${JSON.stringify(props, null, 2)};`;
    await fs.writeFile(path.join(outDir, "src/props.js"), propsJsContent, "utf8");

    // Install dependencies এবং production build (Vite)
    console.log(`Installing & building React site for ${domain}...`);
    execSync("npm install", { cwd: outDir, stdio: "inherit" });
    // execSync("npm run build", { cwd: outDir, stdio: "inherit" });

    console.log(`✅ Built React site for ${domain} at ${outDir}`);
  }

  console.log("🎉 All done. Check build/<domain>/ for each site.");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
