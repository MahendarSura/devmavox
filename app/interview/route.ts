
import { NextResponse } from 'next/server';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const interviewRoot = path.join(process.cwd(), 'public', 'interview');

async function listPdfs(
  directory: string,
  relativeDirectory = ''
): Promise<{ name: string; url: string; folder: string }[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: { name: string; url: string; folder: string }[] = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listPdfs(fullPath, relativePath));
    } else if (entry.isFile() && /\.pdf$/i.test(entry.name)) {
      const urlPath = relativePath
        .split(path.sep)
        .map(encodeURIComponent)
        .join('/');

      files.push({
        name: entry.name,
        url: `/interview/${urlPath}`,
        folder: relativeDirectory.split(path.sep).slice(1).join(' / '),
      });
    }
  }

  return files;
}

export async function GET() {
  try {
    const entries = await readdir(interviewRoot, { withFileTypes: true });
    const categories = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const files = await listPdfs(
        path.join(interviewRoot, entry.name),
        entry.name
      );

      files.sort((a, b) => a.name.localeCompare(b.name));

      categories.push({
        name: entry.name,
        files,
      });
    }

    categories.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to read interview PDFs:', error);
    return NextResponse.json(
      { error: 'Unable to load interview PDFs' },
      { status: 500 }
    );
  }
}
