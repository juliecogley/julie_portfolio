import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const username = Deno.env.get("USERNAME1")!;
const password = Deno.env.get("PASSWORD1")!;

const cms = lumeCMS({
  site: {
    name: "Julie Cogley Portfolio CMS",
    description: "Edit the content of the Julie Cogley Portfolio site.",
    url: "https://julie.cogley.jp",
    body: `
    <p>This is a monolingual portfolio site, with a top index page, an about page, showcase pages to provide narrative about projects, and as-is copies of specific sites.</p>
    `,
  },
  auth: {
    method: "basic",
    users: {
      // foo: "bar",
      [username]: password,
    },
  },
});

// Register GitHub storage
cms.storage(
  "gh",
  new GitHub({
    client: new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") }),
    owner: "juliecogley",
    repo: "julie_portfolio",
    branch: "main",
  }),
);

// Configure an upload folder
cms.upload("uploads", "gh:/src/assets");

// Pages collection
cms.collection(
  "showcase",
  "gh:/src/showcase/*.vto",
  [
    {
      name: "indextitle",
      type: "text",
      label: "Title for Top Index",
      description: "Visible when hovering mouse over the top index image link",
      attributes: {
        required: true,
      },
    },
    {
      name: "indeximage",
      type: "file",
      label: "Image for Top Index",
      description: "Image to display on the top page showcase grid.",
      attributes: {
        accept: "image/*",
        required: true,
      },
    },
    {
      name: "metas",
      type: "object",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title of the Page",
          description: "Visible in browser tab and page source head section",
          attributes: {
            required: true,
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "Description for the Page",
          description: "Visible in search engine results",
          attributes: {
            required: true,
          },
        },
        {
          name: "image",
          type: "file",
          description: "Image to link in head metadata.",
          attributes: {
            accept: "image/*",
            required: true,
          },
        },    
      ],
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      description: "Category to categorize the page on the top index",
      init(field) {
        field.options = ["clientwork", "work", "classwork", "hobby"];
      },
    },
    "draft: checkbox",
    {
      name: "order",
      type: "number",
      label: "Order",
      description: "Order in which the page will appear in the top menu. View all showcase pages at /showcase/ to see how the order number is currently set.",
      attributes: {
        required: true,
      },
    },
    "content: markdown",
  ],
);

export default cms;
