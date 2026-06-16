#!/usr/bin/env node

const { createRequire } = require('node:module')
const { join } = require('node:path')

function loadPlaywright() {
  try {
    return require('playwright')
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error
    return createRequire(join(__dirname, '..', 'frontend', 'package.json'))('playwright')
  }
}

const { chromium } = loadPlaywright()

const TARGET_URL = process.env.TARGET_URL || process.argv[2] || 'http://localhost:4177/mgenetica/'
const OUT_DIR = process.env.PLAYWRIGHT_OUT_DIR || '/tmp/mgenetica-learner-qa'
const HEADLESS = process.env.PLAYWRIGHT_HEADLESS !== '0'

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 820, height: 1100 },
  { name: 'mobile', width: 390, height: 844 }
]

const assetPaths = [
  'course-assets/manifest.json',
  'course-assets/module-01/genotipo-alelo.svg',
  'course-assets/module-03/calculator.html',
  'course-assets/module-15/dep-ebv-ranking.html',
  'course-assets/module-21/pipeline-selecao.svg'
]

function urlFor(pathOrHash) {
  const base = new URL(TARGET_URL.endsWith('/') ? TARGET_URL : `${TARGET_URL}/`)
  if (pathOrHash.startsWith('#')) {
    base.hash = pathOrHash.slice(1)
    return base.toString()
  }
  return new URL(pathOrHash, base).toString()
}

async function assertVisible(page, selector, label) {
  const locator = page.locator(selector).first()
  await locator.waitFor({ state: 'visible', timeout: 10000 })
  console.log(`OK visible ${label}`)
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const root = document.documentElement
    return root.scrollWidth - root.clientWidth
  })
  if (overflow > 2) throw new Error(`${label} horizontal overflow: ${overflow}px`)
  console.log(`OK no horizontal overflow ${label}`)
}

async function assertAsset(page, path) {
  const response = await page.request.get(urlFor(path))
  if (!response.ok()) throw new Error(`${path} returned ${response.status()}`)
  console.log(`OK asset ${path}`)
}

async function fontSize(page, selector) {
  return page.locator(selector).first().evaluate((node) => {
    return Number.parseFloat(window.getComputedStyle(node).fontSize)
  })
}

async function assertFontAtLeast(page, largerSelector, smallerSelector, label, tolerance = 0.2) {
  const larger = await fontSize(page, largerSelector)
  const smaller = await fontSize(page, smallerSelector)
  if (larger + tolerance < smaller) {
    throw new Error(`${label} font hierarchy failed: ${largerSelector}=${larger}px < ${smallerSelector}=${smaller}px`)
  }
  console.log(`OK font hierarchy ${label}: ${larger.toFixed(1)}px >= ${smaller.toFixed(1)}px`)
}

async function assertReadableLabel(page, selector, label, minimumPx = 14) {
  const size = await fontSize(page, selector)
  if (size < minimumPx) {
    throw new Error(`${label} too small: ${selector}=${size}px`)
  }
  console.log(`OK label size ${label}: ${size.toFixed(1)}px`)
}

async function box(page, selector) {
  return page.locator(selector).first().boundingBox()
}

async function assertBoxBetween(page, selector, label, minWidth, maxWidth, minHeight, maxHeight) {
  const rect = await box(page, selector)
  if (!rect) throw new Error(`${label} missing: ${selector}`)
  if (rect.width < minWidth || rect.width > maxWidth || rect.height < minHeight || rect.height > maxHeight) {
    throw new Error(`${label} size out of range: ${selector}=${rect.width.toFixed(1)}x${rect.height.toFixed(1)}px`)
  }
  console.log(`OK size ${label}: ${rect.width.toFixed(1)}x${rect.height.toFixed(1)}px`)
}

(async () => {
  const fs = require('node:fs')
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: HEADLESS })
  const page = await browser.newPage()

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 20000 })
    await assertVisible(page, '#main-content', `${viewport.name} main`)
    await assertVisible(page, '.hero-headline, h1', `${viewport.name} headline`)
    await assertNoHorizontalOverflow(page, viewport.name)
    await assertBoxBetween(page, '.brand-logo img', `${viewport.name} header logo`, viewport.name === 'mobile' ? 52 : 60, 64, viewport.name === 'mobile' ? 52 : 60, 64)
    await assertBoxBetween(page, '.app-header', `${viewport.name} header`, 300, viewport.width, 82, viewport.name === 'mobile' ? 250 : 104)
    await assertBoxBetween(page, '.header-actions .btn, .hero-cta .btn', `${viewport.name} action button`, 42, 260, 42, 58)
    await assertFontAtLeast(page, '.benefit-card strong', '.benefit-card p', `${viewport.name} benefit card`)
    await assertFontAtLeast(page, '.visual-caption strong', '.visual-caption p', `${viewport.name} proof card`)
    // Eyebrow and metric labels are uppercase heavy-weight badges (≥800),
    // readable at smaller sizes than prose text; use 12px minimum.
    await assertReadableLabel(page, '.hero-eyebrow', `${viewport.name} hero eyebrow`, 12)
    await assertReadableLabel(page, '.hero-proof-metrics span', `${viewport.name} metric label`, 12)
    await page.screenshot({ path: `${OUT_DIR}/${viewport.name}-home.png`, fullPage: true })
  }

  await page.goto(urlFor('#auth'), { waitUntil: 'networkidle', timeout: 20000 })
  await assertVisible(page, 'form input[name="email"]', 'auth email field')
  await assertVisible(page, 'form input[name="password"]', 'auth password field')
  await assertNoHorizontalOverflow(page, 'auth')
  await page.screenshot({ path: `${OUT_DIR}/auth.png`, fullPage: true })

  await page.goto(urlFor('#course/module-03'), { waitUntil: 'networkidle', timeout: 20000 })
  await assertVisible(page, '#main-content', 'protected course route guard')
  await assertVisible(page, 'form input[name="email"], .auth-card', 'course route auth guard')
  await assertNoHorizontalOverflow(page, 'protected course route guard')
  await assertFontAtLeast(page, '.auth-title', '.auth-note', 'auth title')
  await assertReadableLabel(page, '.field label', 'auth field label')

  for (const path of assetPaths) {
    await assertAsset(page, path)
  }

  await browser.close()
  console.log(`mgenetica-course-assets browser QA OK: ${TARGET_URL}`)
  console.log(`Screenshots: ${OUT_DIR}`)
})().catch(async (error) => {
  console.error(error.message)
  process.exit(1)
})
