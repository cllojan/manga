import cheerio from "cheerio";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const url =
        "https://lectormanga.com/library/manga/48026/isekai-ntr-shinyuu-no-onna-wo-saikyou-skill-de-otosu-houhou";
      const manga = [];
      const response = await fetch(url);
      const data = await response.text();
      const $ = cheerio.load(data);

      $("div .col-sm-9").each((item, el) => {
        const title = $(el).find("h1").text().trim();
        const href = $(el).find("a").attr("href");
        const imgs = $("div.col-12.col-sm-3.text-center")
          .find("img.img-fluid")
          .attr("src");
        const type = $(el).find("h5 span.text-manga").text().trim();
        const status = $(el).find("h5 span.status-publishing").text().trim();
        const txt = href.replace(/\//g, "-");

        manga.push({ title, href: txt, imgs, type, status });
      });

      //capitulos
      Object.assign(manga[0], { capitulos: [] });
      $("#chapters-collapsed ul").each((item, el) => {
        const visu = $(el).find("div.col-6.text-right a").attr("href");
        manga[0]["capitulos"].push({ link: visu });
      });
      $("#chapters ul ").each((item, el) => {
        const visu = $(el).find("div.col-6.text-right a").attr("href");
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
