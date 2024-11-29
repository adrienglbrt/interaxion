import { Collection } from "tinacms";

const Page: Collection = {
  name: "page",
  label: "Pages",
  path: "content/pages",
  format: "md",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: (props) => {
      if (props.document._sys.filename === "home") {
        return `/`;
      } else return props.document._sys.filename;
    },
  },
  templates: [
    {
      name: "home",
      label: "Home",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
          description:
            "The title of the page. This is used to display the title in the CMS",
          isTitle: true,
          required: true,
        },
        {
          name: "metaTitle",
          type: "string",
          label: "Meta Title",
          description:
            "The title of the page, displayed in the browser tab, in Google search results and in social media shares. If not provided, the title field will be used.",
          required: false,
        },
        {
          name: "metaDescription",
          type: "string",
          label: "Meta Description",
          description:
            "The description of the page, displayed in Google search results and in social media shares. If not provided, the heading field will be used.",
          required: false,
        },
      ],
    },
    {
      name: "about",
      label: "About",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
          description:
            "The title of the page. This is used to display the title in the CMS",
          isTitle: true,
          required: true,
        },
        {
          name: "metaTitle",
          type: "string",
          label: "Meta Title",
          description:
            "The title of the page, displayed in the browser tab, in Google search results and in social media shares. If not provided, the title field will be used.",
          required: false,
        },
        {
          name: "metaDescription",
          type: "string",
          label: "Meta Description",
          description:
            "The description of the page, displayed in Google search results and in social media shares. If not provided, the heading field will be used.",
          required: false,
        },
      ],
    },
    {
      name: "Work",
      label: "Work",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
          description:
            "The title of the page. This is used to display the title in the CMS",
          isTitle: true,
          required: true,
        },
        {
          name: "metaTitle",
          type: "string",
          label: "Meta Title",
          description:
            "The title of the page, displayed in the browser tab, in Google search results and in social media shares. If not provided, the title field will be used.",
          required: false,
        },
        {
          name: "metaDescription",
          type: "string",
          label: "Meta Description",
          description:
            "The description of the page, displayed in Google search results and in social media shares. If not provided, the heading field will be used.",
          required: false,
        },
      ],
    },
  ],
};

export default Page;
