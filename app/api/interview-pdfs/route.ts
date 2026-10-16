
import { NextResponse } from 'next/server';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PdfFile = {
  name: string;
  url: string;
  folder: string;
};

type InterviewCategory = {
  name: string;
  files: PdfFile[];
};

async function scanDirectory(
  directory: string,
  relative = ''
): Promise<PdfFile[]> {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const files: PdfFile[] = [];

  for (const entry of entries) {
    const relativePath = relative
      ? `${relative}/${entry.name}`
      : entry.name;

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(
        ...(await scanDirectory(fullPath, relativePath))
      );
    } else if (
      entry.isFile() &&
      entry.name.toLowerCase().endsWith('.pdf')
    ) {
      files.push({
        name: entry.name,
        url: `/interview/${relativePath
          .split('/')
          .map(encodeURIComponent)
          .join('/')}`,
        folder: relative || 'Interview PDFs',
      });
    }
  }

  return files;
}

export async function GET() {
  try {
    const root = path.join(
      process.cwd(),
      'public',
      'interview'
    );

    const allFiles = await scanDirectory(root);
    const grouped = new Map<string, PdfFile[]>();

    for (const file of allFiles) {
      const category = file.folder.split('/')[0];

      if (!grouped.has(category)) {
        grouped.set(category, []);
      }

      grouped.get(category)!.push(file);
    }

    const categories: InterviewCategory[] = Array.from(
      grouped,
      ([name, files]) => ({ name, files })
    );

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Interview PDF API error:', error);

    return NextResponse.json(
      { error: 'Unable to scan interview PDFs.' },
      { status: 500 }
    );
  }
}
