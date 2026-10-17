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

const INTERVIEW_DIR = path.join(process.cwd(), 'public', 'interview');

async function findPdfs(
  directory: string,
  relativeDirectory = ''
): Promise<PdfFile[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: PdfFile[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.join(relativeDirectory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await findPdfs(absolutePath, relativePath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
      const normalizedPath = relativePath.split(path.sep).join('/');
      files.push({
        name: entry.name,
        url: `/interview/${normalizedPath.split('/').map(encodeURIComponent).join('/')}`,
        folder: relativeDirectory.split(path.sep)[0] || '',
      });
    }
  }

  return files;
}

export async function GET() {
  try {
    const entries = await readdir(INTERVIEW_DIR, { withFileTypes: true });
    const categories: InterviewCategory[] = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const files = await findPdfs(path.join(INTERVIEW_DIR, entry.name));
      files.sort((a, b) => a.name.localeCompare(b.name));

      categories.push({
        name: entry.name,
        files: files.map((file) => ({ ...file, folder: entry.name })),
      });
    }

    categories.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to scan interview PDFs:', error);
    return NextResponse.json(
      { error: 'Failed to load interview PDFs.' },
      { status: 500 }
    );
  }
}
