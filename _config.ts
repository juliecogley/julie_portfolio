import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import base_path from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
// import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import filter_pages from "lume/plugins/filter_pages.ts";
import inline from "lume/plugins/inline.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import metas from "lume/plugins/metas.ts";
import minify_html from "lume/plugins/minify_html.ts";
import nav from "lume/plugins/nav.ts";
import pagefind from "lume/plugins/pagefind.ts";
import robots from "lume/plugins/robots.ts";
import sitemap from "lume/plugins/sitemap.ts";
import source_maps from "lume/plugins/source_maps.ts";
import sri from "lume/plugins/sri.ts";
import terser from "lume/plugins/terser.ts";

const site = lume(
  {
    src: "./src",
    location: new URL("https://julie.cogley.jp"),
  }
);

site.use(attributes());
site.use(base_path());
site.use(date());
// site.use(favicon());
site.use(feed());
site.use(filter_pages());
site.use(inline());
site.use(lightningcss());
site.use(metas());
site.use(minify_html());
site.use(nav());
site.use(pagefind());
site.use(robots());
site.use(sitemap());
site.use(source_maps());
site.use(sri());
site.use(terser());

site.copy("static/index_assets", ".");
site.copy("static/portfolio", ".");

// Create zip and tree scripts
site.script("zipsite", "zip -r _site/julie_cogley_jp_site.zip _site");
site.script("maketree", "cd _site && tree -H . -L 5 --charset utf-8 -C -h -o julie_cogley_jp_tree.html");
// Execute scripts after build
site.addEventListener("afterBuild", "zipsite");
site.addEventListener("afterBuild", "maketree");

export default site;
