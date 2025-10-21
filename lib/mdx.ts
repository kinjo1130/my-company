import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');
const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(contentDirectory);

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        excerpt: data.excerpt,
        content,
      };
    });

  // 日付順でソート（新しい順）
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category,
      tags: data.tags || [],
      excerpt: data.excerpt,
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

// Project MDX functions
export interface ProjectMDX {
  id: string;
  title: string;
  period?: string;
  company?: string;
  role?: string;
  summary: string;
  technologies: string[];
  content: string;
}

export async function getProjectMDX(id: string): Promise<ProjectMDX | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      title: data.title,
      period: data.period,
      company: data.company,
      role: data.role,
      summary: data.summary,
      technologies: data.technologies || [],
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function hasProjectMDX(id: string): Promise<boolean> {
  try {
    const fullPath = path.join(projectsDirectory, `${id}.mdx`);
    return fs.existsSync(fullPath);
  } catch (error) {
    return false;
  }
}
