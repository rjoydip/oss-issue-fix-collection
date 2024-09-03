import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import inline from "lume/plugins/inline.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import esbuild from "lume/plugins/esbuild.ts";
import transformImages from "lume/plugins/transform_images.ts";
import favicon from "lume/plugins/favicon.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import postcss from "lume/plugins/postcss.ts";
import nesting from "npm:postcss-nesting";
import sitemap from "lume/plugins/sitemap.ts";
import metas from "lume/plugins/metas.ts";
import toc from "lume_markdown_plugins/toc.ts";
import { alert } from "npm:@mdit/plugin-alert";
import ventoLang from "vento/highlightjs-vento.js";

const markdown = {
  plugins: [toc, alert],
  options: {
    linkify: true,
  },
};

const site = lume(
  {
    location: new URL("https://lume.land"),
  },
  { markdown },
);

site.remoteFile("styles/main.css", "https://cdn.jsdelivr.net/gh/rjoydip/oss-issue-fix-collection@b02de94a901c9375a5ae1ec9eb9459b3e1c8d7c1/docs/styles/main.css")
site.remoteFile("styles/pages/landing.css", "https://github.com/rjoydip/oss-issue-fix-collection/blob/b02de94a901c9375a5ae1ec9eb9459b3e1c8d7c1/docs/styles/pages/landing.css")
site.remoteFile("main.js", "https://github.com/rjoydip/oss-issue-fix-collection/blob/b02de94a901c9375a5ae1ec9eb9459b3e1c8d7c1/docs/main.js")

site.remoteFile("fonts/inter.woff2", "https://github.com/rjoydip/oss-issue-fix-collection/blob/b02de94a901c9375a5ae1ec9eb9459b3e1c8d7c1/docs/fonts/inter.woff2")
site.remoteFile("fonts/epilogue.woff2", "https://github.com/rjoydip/oss-issue-fix-collection/blob/b02de94a901c9375a5ae1ec9eb9459b3e1c8d7c1/docs/fonts/epilogue.woff2")
site.remoteFile("fonts/jetbrains-mono.woff2", "https://github.com/rjoydip/oss-issue-fix-collection/blob/b02de94a901c9375a5ae1ec9eb9459b3e1c8d7c1/docs/fonts/jetbrains-mono.woff2")

site
  .ignore("scripts")
  .copy("static", ".")
  .use(codeHighlight({
    languages: {
      vento: ventoLang,
    },
  }))
  .use(postcss({
    plugins: [nesting()],
  }))
  .use(favicon())
  .use(inline())
  .use(metas())
  .use(esbuild({
    extensions: [".js"],
  }))
  .use(resolveUrls())
  .use(transformImages())
  .use(sitemap())
  .scopedUpdates(
    (path) => path.endsWith(".png") || path.endsWith(".jpg"),
  )
  .filter("slice", (arr, length) => arr.slice(0, length))
  .process([".html"], (pages) => {
    for (const page of pages) {
      const doc = page.document!;
      const blocks = doc.querySelectorAll("lume-code");

      blocks.forEach((block, i) => {
        const pres = block.querySelectorAll(
          ":scope > pre",
        );

        const menu = doc.createElement("ul");
        menu.setAttribute("role", "tablist");
        menu.setAttribute("aria-label", "Code Tabs");
        menu.classList.add("lume-code-menu");

        pres.forEach((pre, j) => {
          const title = pre.querySelector("code")!.getAttribute("title")!;

          const li = doc.createElement("li");
          li.setAttribute("role", "presentation");

          const button = doc.createElement("button");
          button.setAttribute("role", "tab");
          button.setAttribute("aria-selected", j === 0 ? "true" : "false");
          button.setAttribute("aria-controls", `panel-${i + 1}-${j + 1}`);
          button.setAttribute("id", `tab-${i + 1}-${j + 1}`);
          button.setAttribute("tabindex", j === 0 ? "0" : "-1");
          button.innerText = title;
          button.classList.add("lume-code-tab");

          if (j > 0) {
            pre.setAttribute("hidden", "true");
          } else {
            button.classList.add("is-active");
          }

          pre.setAttribute("role", "tabpanel");
          pre.setAttribute("aria-labelledby", `tab-${i + 1}-${j + 1}`);
          pre.setAttribute("id", `panel-${i + 1}-${j + 1}`);
          pre.setAttribute("tabindex", "0");

          li.append(button);
          menu.appendChild(li);
        });

        (block as unknown as HTMLElement).prepend(menu as unknown as Node);
      });
    }
  })
  .use(minifyHTML({
    options: {
      minify_css: false, // https://github.com/wilsonzlin/minify-html/issues/173
    },
  }));
export default site;
