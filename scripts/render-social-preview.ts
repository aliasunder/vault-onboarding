// Renders .github/social-preview.svg to .github/social-preview.png using
// Puppeteer's pinned Chrome for Testing build (installed on demand by the npm
// script — `npm ci` skips the download via the `puppeteer.skipDownload` key in
// package.json). Embeds JetBrains Mono SemiBold (wordmark) and DejaVu Sans
// (body text) via @font-face for deterministic rendering regardless of host
// system fonts. Ported from vault-cortex's scripts/render-social-preview.ts.
//
// Usage: npm run render:social-preview

import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

import puppeteer from "puppeteer"

const repoRoot = new URL("..", import.meta.url)

const resolvePath = (repoRelative: string): string =>
  fileURLToPath(new URL(repoRelative, repoRoot))

const WIDTH = 1280
const HEIGHT = 640

const commandAvailable = (command: string): boolean => {
  try {
    execFileSync("which", [command], { stdio: "pipe" })
    return true
  } catch {
    return false
  }
}

const optimizePng = (pngPath: string): void => {
  if (commandAvailable("optipng")) {
    console.log("optimizing with optipng...")
    try {
      execFileSync("optipng", ["-o7", "-strip", "all", pngPath], {
        stdio: "inherit",
      })
      return
    } catch {
      console.warn("⚠  optipng failed — PNG saved without optimization")
      return
    }
  }

  console.warn(
    "⚠  optipng not found — PNG saved without optimization\n" +
      "   install via: brew install optipng (macOS) or apt-get install optipng (Linux)",
  )
}

const fontFace = (family: string, weight: number, base64: string): string => `
  @font-face {
    font-family: "${family}";
    src: url("data:font/ttf;base64,${base64}") format("truetype");
    font-weight: ${weight};
    font-style: normal;
  }`

const renderSocialPreview = async (): Promise<void> => {
  // Clear env vars that override Puppeteer's cached-browser resolution
  // (some systems set PUPPETEER_EXECUTABLE_PATH or PUPPETEER_SKIP_DOWNLOAD globally)
  delete process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
  delete process.env.PUPPETEER_SKIP_DOWNLOAD
  delete process.env.PUPPETEER_EXECUTABLE_PATH

  const svgPath = resolvePath(".github/social-preview.svg")
  const monoFontPath = resolvePath(".github/fonts/JetBrainsMono-SemiBold.ttf")
  const sansFontPath = resolvePath(".github/fonts/DejaVuSans.ttf")
  const outputPath = resolvePath(".github/social-preview.png")

  if (!existsSync(svgPath)) {
    console.error("✕  .github/social-preview.svg not found")
    process.exit(1)
  }

  for (const [fontPath, source] of [
    [monoFontPath, "https://github.com/JetBrains/JetBrainsMono"],
    [sansFontPath, "https://dejavu-fonts.github.io"],
  ]) {
    if (!existsSync(fontPath)) {
      console.error(`✕  ${fontPath} not found — download from ${source}`)
      process.exit(1)
    }
  }

  const svgContent = readFileSync(svgPath, "utf-8")
  const monoBase64 = readFileSync(monoFontPath).toString("base64")
  const sansBase64 = readFileSync(sansFontPath).toString("base64")

  // HTML with embedded @font-face ensures both faces are available regardless
  // of host system fonts. The SVG is inlined directly (no blob URL) to avoid
  // Chrome's canvas UTF-8 encoding bug with non-ASCII characters like · (U+00B7).
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<style>${fontFace("JetBrains Mono", 600, monoBase64)}${fontFace("DejaVu Sans", 400, sansBase64)}
  * { margin: 0; padding: 0; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
  }
</style>
</head>
<body>${svgContent}</body>
</html>`

  console.log("launching Chromium...")
  const browser = await puppeteer.launch({ headless: true })

  try {
    const page = await browser.newPage()
    await page.setViewport({
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
    })
    await page.setContent(htmlContent, { waitUntil: "load" })

    // Wait for the embedded @font-face to finish loading before screenshotting
    await page.waitForFunction("document.fonts.status === 'loaded'")

    const screenshotBuffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    })

    writeFileSync(outputPath, screenshotBuffer)
    console.log("✓  rendered social-preview.png")
  } finally {
    await browser.close()
  }

  optimizePng(outputPath)

  const outputBytes = statSync(outputPath).size
  console.log(`✓  social-preview.png (${outputBytes.toLocaleString()} bytes)`)
}

renderSocialPreview().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`✕  ${message}`)
  process.exit(1)
})
