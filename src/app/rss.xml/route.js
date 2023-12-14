import { getBlogPostList } from "@/helpers/file-helpers";

var RSS = require("rss");

export async function GET() {
  function generateRSSFeed(posts) {
    let feed = new RSS({
      title: "Blog",
      description: "A wonderful blog about Javascript",
      feed_url: "https://localhost:3000/rss.xml",
      site_url: "https://localhost:3000",
      managingEditor: "Tobias Basteiro",
      webMaster: "Tobias Basteiro",
      language: "en",
      categories: ["Javascript", "React", "Next.js"],
      pubDate: new Date(),
      ttl: "60",
    });

    posts.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.abstract,
        url: `https://localhost:3000/${post.slug}`,
        guid: post.slug,
        categories: ["Javascript", "React", "Next.js"],
      });
    });

    return feed.xml();
  }

  const posts = await getBlogPostList();
  const generatedXML = generateRSSFeed(posts);

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "text/xml");

  return new Response(generatedXML, {
    status: 200,
    headers: myHeaders,
  });
}
