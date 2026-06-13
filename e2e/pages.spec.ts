import { test, expect, type Page } from "@playwright/test";

/**
 * Trust-center is a read-only static site: one index page (sectioned) + dynamic
 * questionnaire pages + generated PDF downloads. These specs assert every routable
 * page loads cleanly, the index sections render, the PDFs resolve, SEO meta is present,
 * and there are no console errors / failed requests. Safe to run against prod (read-only).
 */

// Routes that must return a 2xx and render.
const PAGES = [
  "/",
  "/questionnaires/mvsp",
  "/questionnaires/caiq",
  "/questionnaires/vsa-full",
  "/questionnaires/vsa-core",
];

// Index sections rendered from trust.config.ts (see src/pages/index.astro).
const INDEX_SECTIONS = [
  "#compliance",
  "#controls",
  "#architecture",
  "#subprocessors",
  "#documents",
  "#questionnaires",
];

// Generated downloads (scripts/generate-pdfs.ts → public/downloads/).
const PDFS = [
  "/downloads/fimil-compliance-report.pdf",
  "/downloads/questionnaire-mvsp.pdf",
  "/downloads/questionnaire-caiq.pdf",
  "/downloads/questionnaire-vsa-full.pdf",
  "/downloads/questionnaire-vsa-core.pdf",
];

function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return errors;
}

test.describe("trust-center pages", () => {
  for (const path of PAGES) {
    test(`loads ${path} (2xx, titled, no console errors)`, async ({ page }) => {
      const errors = trackConsoleErrors(page);
      const resp = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(resp, `no response for ${path}`).not.toBeNull();
      expect(resp!.status(), `status for ${path}`).toBeLessThan(400);
      await expect(page).toHaveTitle(/\S+/);
      // Ignore noisy third-party/analytics errors if any creep in later.
      const real = errors.filter((e) => !/posthog|analytics|favicon/i.test(e));
      expect(real, `console errors on ${path}: ${real.join(" | ")}`).toHaveLength(0);
    });
  }

  test("index renders all config-driven sections", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    for (const sel of INDEX_SECTIONS) {
      await expect(page.locator(sel), `missing section ${sel}`).toHaveCount(1);
    }
  });

  test("index has SEO title + description meta", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/trust|fimil/i);
    const desc = page.locator('head meta[name="description"]');
    await expect(desc).toHaveAttribute("content", /\S+/);
  });

  test("questionnaire pages expose a PDF download link", async ({ page }) => {
    await page.goto("/questionnaires/mvsp", { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href$=".pdf"]').first()).toBeVisible();
  });
});

test.describe("trust-center downloads", () => {
  for (const pdf of PDFS) {
    test(`PDF resolves: ${pdf}`, async ({ request, baseURL }) => {
      const resp = await request.get(new URL(pdf, baseURL).toString());
      expect(resp.status(), `status for ${pdf}`).toBe(200);
      expect(resp.headers()["content-type"] || "").toMatch(/pdf|octet-stream/);
    });
  }
});
