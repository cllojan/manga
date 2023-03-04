import cheerio from "cheerio";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const url = "https://lectormanga.com/library";
      const manga = [];
      const response = await fetch(url);
      const data = await response.text();
      const $ = cheerio.load(data);
      $("div .col-6 .card").each((item, el) => {
        const title = $(el).find("a").text().trim();
        const href = $(el).find("a").attr("href");
        const img = $(el).find("img").attr("src");
        const type = $(el).find("span.float-right").text().trim();
        const txt = href.replace(/\//g, "-");

        manga.push({ title, href: txt, img, type });
      });
      res.statusCode = 200;
      res.json(manga);
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        error: ":v",
      });
    }
  }
};
