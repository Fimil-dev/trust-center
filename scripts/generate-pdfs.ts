/**
 * Build-time PDF generation for trust center.
 * Generates downloadable PDFs for each questionnaire and an overall compliance report.
 *
 * Run: npx tsx scripts/generate-pdfs.ts
 */

import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Import questionnaire data
import { allQuestionnaires } from '../src/questionnaires/index.js';
import type { Questionnaire } from '../src/questionnaires/types.js';

// Import config
import config from '../trust.config.js';
import type { TrustConfig } from '../src/config/schema.js';

const typedConfig: TrustConfig = config;

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'downloads');

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

const PRIMARY_COLOR = hexToRgb(typedConfig.theme.colors.primary);
const DARK_TEXT: [number, number, number] = [31, 41, 55];
const MUTED_TEXT: [number, number, number] = [107, 114, 128];
const GREEN: [number, number, number] = [16, 185, 129];
const AMBER: [number, number, number] = [245, 158, 11];
const RED: [number, number, number] = [239, 68, 68];
const GRAY: [number, number, number] = [156, 163, 175];

const companyName = typedConfig.company.legalName || typedConfig.company.name;
const companyWebsite = typedConfig.company.website ?? '';
const securityEmail = typedConfig.company.securityEmail;

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function safePct(n: number, total: number, decimals: number = 1): string {
  return total > 0 ? ((n / total) * 100).toFixed(decimals) : '0';
}

function answerColor(answer: string): [number, number, number] {
  switch (answer) {
    case 'yes':
      return GREEN;
    case 'partial':
      return AMBER;
    case 'no':
      return RED;
    default:
      return GRAY;
  }
}

function addHeader(doc: jsPDF, title: string) {
  doc.setFontSize(8);
  doc.setTextColor(...MUTED_TEXT);
  doc.text(companyName, 14, 10);
  doc.text(title, doc.internal.pageSize.width - 14, 10, { align: 'right' });
  doc.setDrawColor(230, 230, 230);
  doc.line(14, 13, doc.internal.pageSize.width - 14, 13);
}

function addFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(7);
  doc.setTextColor(...MUTED_TEXT);
  doc.text(`Generated from ${companyWebsite}`, 14, pageHeight - 8);
  doc.text(today, doc.internal.pageSize.width / 2, pageHeight - 8, {
    align: 'center',
  });
  doc.text(`Page ${pageNum} of ${totalPages}`, doc.internal.pageSize.width - 14, pageHeight - 8, {
    align: 'right',
  });
}

function addHeadersAndFooters(doc: jsPDF, title: string) {
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    if (i > 1) addHeader(doc, title);
    addFooter(doc, i, totalPages);
  }
}

function addCoverPage(
  doc: jsPDF,
  title: string,
  subtitle: string,
  classification: string = 'CONFIDENTIAL',
) {
  const pageWidth = doc.internal.pageSize.width;
  const centerX = pageWidth / 2;

  // Purple accent bar
  doc.setFillColor(...PRIMARY_COLOR);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // Logo
  const logoPath = path.join(process.cwd(), 'public', 'logo-icon.png');
  let logoBase64: string | null = null;
  try {
    const logoData = fs.readFileSync(logoPath);
    logoBase64 = logoData.toString('base64');
  } catch {
    console.warn(`  Warning: Logo not found at ${logoPath}, skipping logo in PDF`);
  }

  if (logoBase64) {
    const logoSize = 24;
    doc.addImage(
      `data:image/png;base64,${logoBase64}`,
      'PNG',
      centerX - logoSize / 2,
      30,
      logoSize,
      logoSize,
    );
  }

  // Company name below logo
  doc.setFontSize(14);
  doc.setTextColor(...MUTED_TEXT);
  doc.text(companyName.toUpperCase(), centerX, 62, { align: 'center' });

  // Title
  doc.setFontSize(28);
  doc.setTextColor(...DARK_TEXT);
  doc.text(title, centerX, 80, { align: 'center', maxWidth: pageWidth - 40 });

  // Subtitle
  doc.setFontSize(12);
  doc.setTextColor(...MUTED_TEXT);
  doc.text(subtitle, centerX, 100, {
    align: 'center',
    maxWidth: pageWidth - 40,
  });

  // Date
  doc.setFontSize(10);
  doc.text(today, centerX, 120, { align: 'center' });

  // Classification badge
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(classification, centerX, 140, { align: 'center' });

  // Bottom info
  doc.setFontSize(8);
  doc.setTextColor(...MUTED_TEXT);
  doc.text(companyWebsite, centerX, 270, { align: 'center' });
  doc.text(securityEmail, centerX, 276, { align: 'center' });
}

function generateQuestionnairePDF(q: Questionnaire): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const title = `${q.name}${q.version ? ` v${q.version}` : ''}`;

  // Cover page
  addCoverPage(doc, title, q.description, 'Security Questionnaire Response');

  // Summary page
  doc.addPage();
  let y = 20;

  doc.setFontSize(18);
  doc.setTextColor(...DARK_TEXT);
  doc.text('Response Summary', 14, y);
  y += 12;

  // Calculate stats
  const allQuestions = q.sections.flatMap((s) => s.questions);
  const total = allQuestions.length;
  const yesCount = allQuestions.filter((q) => q.answer === 'yes').length;
  const partialCount = allQuestions.filter((q) => q.answer === 'partial').length;
  const noCount = allQuestions.filter((q) => q.answer === 'no').length;
  const naCount = allQuestions.filter((q) => q.answer === 'na').length;

  // Stats table
  autoTable(doc, {
    startY: y,
    head: [['Answer', 'Count', 'Percentage']],
    body: [
      ['Yes', yesCount.toString(), `${safePct(yesCount, total)}%`],
      ['Partial', partialCount.toString(), `${safePct(partialCount, total)}%`],
      ['No', noCount.toString(), `${safePct(noCount, total)}%`],
      ['N/A', naCount.toString(), `${safePct(naCount, total)}%`],
      ['Total', total.toString(), '100%'],
    ],
    theme: 'grid',
    headStyles: { fillColor: PRIMARY_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold' } },
    margin: { left: 14, right: 14 },
    didParseCell: (data: any) => {
      if (data.section === 'body' && data.column.index === 0) {
        const answer = data.cell.raw?.toString().toLowerCase();
        if (answer === 'yes') data.cell.styles.textColor = GREEN;
        else if (answer === 'partial') data.cell.styles.textColor = AMBER;
        else if (answer === 'no') data.cell.styles.textColor = RED;
        else if (answer === 'n/a') data.cell.styles.textColor = GRAY;
      }
    },
  });

  // Section-by-section responses
  for (const section of q.sections) {
    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.text(section.name, 14, 20);

    const sectionYes = section.questions.filter((q) => q.answer === 'yes').length;
    doc.setFontSize(9);
    doc.setTextColor(...MUTED_TEXT);
    doc.text(`${sectionYes}/${section.questions.length} controls satisfied`, 14, 27);

    autoTable(doc, {
      startY: 32,
      head: [['ID', 'Question', 'Answer', 'Explanation']],
      body: section.questions.map((q) => [
        q.id,
        q.question,
        q.answer.toUpperCase(),
        q.explanation || '-',
      ]),
      theme: 'striped',
      headStyles: { fillColor: PRIMARY_COLOR, fontSize: 8 },
      bodyStyles: { fontSize: 7, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 14 },
        1: { cellWidth: 52 },
        2: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
        3: { cellWidth: 87 },
      },
      margin: { left: 14, right: 14 },
      didParseCell: (data: any) => {
        if (data.section === 'body' && data.column.index === 2) {
          const answer = data.cell.raw?.toString().toLowerCase();
          data.cell.styles.textColor = answerColor(answer);
        }
      },
    });
  }

  addHeadersAndFooters(doc, title);

  const filePath = path.join(OUTPUT_DIR, `questionnaire-${q.slug}.pdf`);
  fs.writeFileSync(filePath, Buffer.from(doc.output('arraybuffer')));
  console.log(`  Generated: ${filePath}`);
}

function generateComplianceReport(): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Cover page
  addCoverPage(
    doc,
    'Compliance & Security Report',
    'Comprehensive overview of security controls, compliance frameworks, and data protection practices.',
    'CONFIDENTIAL',
  );

  // Frameworks
  doc.addPage();
  doc.setFontSize(18);
  doc.setTextColor(...DARK_TEXT);
  doc.text('Compliance Frameworks', 14, 20);

  autoTable(doc, {
    startY: 28,
    head: [['Framework', 'Status', 'Description']],
    body: typedConfig.frameworks.map((f) => [
      f.name,
      f.status.replace('-', ' ').toUpperCase(),
      f.description || '-',
    ]),
    theme: 'striped',
    headStyles: { fillColor: PRIMARY_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 35, fontStyle: 'bold' },
      1: { cellWidth: 25, halign: 'center' },
      2: { cellWidth: 115 },
    },
    margin: { left: 14, right: 14 },
    didParseCell: (data: any) => {
      if (data.section === 'body' && data.column.index === 1) {
        const status = data.cell.raw?.toString().toLowerCase();
        if (status === 'certified') data.cell.styles.textColor = GREEN;
        else if (status === 'in progress' || status === 'in-progress')
          data.cell.styles.textColor = AMBER;
        else data.cell.styles.textColor = MUTED_TEXT;
      }
    },
  });

  // Security Controls by Domain
  for (const domain of typedConfig.controls) {
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.text(domain.domain, 14, 20);

    const implemented = domain.items.filter((i) => i.status === 'implemented').length;
    doc.setFontSize(9);
    doc.setTextColor(...MUTED_TEXT);
    doc.text(`${implemented}/${domain.items.length} controls implemented`, 14, 27);

    autoTable(doc, {
      startY: 32,
      head: [['Control', 'Status', 'Description']],
      body: domain.items.map((item) => [item.title, item.status.toUpperCase(), item.description]),
      theme: 'striped',
      headStyles: { fillColor: PRIMARY_COLOR, fontSize: 9 },
      bodyStyles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 22, halign: 'center' },
        2: { cellWidth: 118 },
      },
      margin: { left: 14, right: 14 },
      didParseCell: (data: any) => {
        if (data.section === 'body' && data.column.index === 1) {
          const status = data.cell.raw?.toString().toLowerCase();
          if (status === 'implemented') data.cell.styles.textColor = GREEN;
          else if (status === 'partial') data.cell.styles.textColor = AMBER;
          else data.cell.styles.textColor = RED;
        }
      },
    });
  }

  // Subprocessors
  doc.addPage();
  doc.setFontSize(18);
  doc.setTextColor(...DARK_TEXT);
  doc.text('Subprocessors', 14, 20);

  autoTable(doc, {
    startY: 28,
    head: [['Vendor', 'Purpose', 'Location']],
    body: typedConfig.subprocessors.map((s) => [s.name, s.purpose, s.location]),
    theme: 'striped',
    headStyles: { fillColor: PRIMARY_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 35, fontStyle: 'bold' },
      1: { cellWidth: 95 },
      2: { cellWidth: 45 },
    },
    margin: { left: 14, right: 14 },
  });

  // Questionnaire Summaries
  const enabledQuestionnaires = allQuestionnaires.filter((q) => q.enabled);
  if (enabledQuestionnaires.length > 0) {
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(...DARK_TEXT);
    doc.text('Security Questionnaire Results', 14, 20);

    const summaryRows = enabledQuestionnaires.map((q) => {
      const all = q.sections.flatMap((s) => s.questions);
      const total = all.length;
      const yes = all.filter((q) => q.answer === 'yes').length;
      const partial = all.filter((q) => q.answer === 'partial').length;
      const no = all.filter((q) => q.answer === 'no').length;
      const na = all.filter((q) => q.answer === 'na').length;
      return [
        `${q.name}${q.version ? ` v${q.version}` : ''}`,
        total.toString(),
        `${yes} (${safePct(yes, total, 0)}%)`,
        `${partial} (${safePct(partial, total, 0)}%)`,
        `${no} (${safePct(no, total, 0)}%)`,
        na.toString(),
      ];
    });

    autoTable(doc, {
      startY: 28,
      head: [['Questionnaire', 'Total', 'Yes', 'Partial', 'No', 'N/A']],
      body: summaryRows,
      theme: 'grid',
      headStyles: { fillColor: PRIMARY_COLOR, fontSize: 9 },
      bodyStyles: { fontSize: 9, halign: 'center' },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold', cellWidth: 45 },
      },
      margin: { left: 14, right: 14 },
    });
  }

  // Published Documents
  const docs = typedConfig.documents;
  const docEntries = Object.entries(docs).filter(([_, url]) => url != null) as [string, string][];
  if (docEntries.length > 0) {
    const y = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 20 : 28;

    doc.setFontSize(14);
    doc.setTextColor(...DARK_TEXT);
    doc.text('Published Documents', 14, y);

    const docNames: Record<string, string> = {
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      dataProcessingAgreement: 'Data Processing Agreement',
      serviceLevelAgreement: 'Service Level Agreement',
      acceptableUsePolicy: 'Acceptable Use Policy',
      cookiePolicy: 'Cookie Policy',
      securityPolicy: 'Security Policy',
    };

    autoTable(doc, {
      startY: y + 8,
      head: [['Document', 'URL']],
      body: docEntries.map(([key, url]) => [docNames[key] || key, url as string]),
      theme: 'striped',
      headStyles: { fillColor: PRIMARY_COLOR, fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 55 },
        1: { textColor: PRIMARY_COLOR },
      },
      margin: { left: 14, right: 14 },
    });
  }

  addHeadersAndFooters(doc, 'Compliance & Security Report');

  const slug = typedConfig.company.name.toLowerCase().replace(/\s+/g, '-');
  const filePath = path.join(OUTPUT_DIR, `${slug}-compliance-report.pdf`);
  fs.writeFileSync(filePath, Buffer.from(doc.output('arraybuffer')));
  console.log(`  Generated: ${filePath}`);
}

// Main
try {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('Generating PDFs...');

  // Questionnaire PDFs
  for (const q of allQuestionnaires) {
    if (!q.enabled || q.sections.length === 0) continue;
    generateQuestionnairePDF(q);
  }

  // Compliance report
  generateComplianceReport();

  console.log('PDF generation complete.');
} catch (err) {
  console.error('PDF generation failed:', err);
  process.exit(1);
}
