import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { title, para1, para2, para3, para4, gener, desc, slug, link, quote, date } = await req.json();

  try {
    const newBlog = await prisma.blogs.create({
      data: {
        title: title,
        para1: para1,
        para2: para2,
        para3: para3,
        para4: para4,
        gener: gener,
        description: desc,
        slug: slug,
        link: link,
        quote: quote,
        date: new Date(date),
      },
    });
    return new Response(JSON.stringify(newBlog), { status: 200 });
  } catch (error) {
    console.error("Error saving blog:", error);
    return new Response(JSON.stringify({ error: "Error saving blog" }), { status: 500 });
  }
}
