import cheerio from "cheerio";
function findTextAndReturnRemainder(target, variable) {
  var chopFront = target.substring(
    target.search(variable) + variable.length,
    target.length
  );
  var result = chopFront.substring(0, chopFront.search(";"));
  return result;
}
export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const url = "https://lectormanga.com/view_uploads/473540";

      const listImage = [];
      const response = await fetch(url, {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "sec-ch-ua":
            '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "cross-site",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          cookie: "__qca=P0-2047510478-1677103364751",
          Referer:
            "https://lectormanga.com/library/manga/48026/isekai-ntr-shinyuu-no-onna-wo-saikyou-skill-de-otosu-houhou",
          "Referrer-Policy": "no-referrer-when-downgrade",
        },
        body: null,
        method: "GET",
      });
      const data = await response.text();

      const $ = cheerio.load(data);      
      var text = $($("script")).text();
      let baseUrlImage = findTextAndReturnRemainder(
        text,
        "var dirPath ="
      ).replace(/['' ]/g, "");
      var findCode = findTextAndReturnRemainder(
        text,
        "var images = JSON.parse"
      );
      console.log(baseUrlImage);
      listImage.push(
        JSON.parse(findCode.replace(/[()'']/g, "")).reduce(
          (a, v, i) => ({ ...a, [i + 1]: baseUrlImage.concat("", v) }),
          {}
        )
      );

      res.statusCode = 200;
      res.json(listImage);
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        error: ":v",
      });
    }
  }
};
