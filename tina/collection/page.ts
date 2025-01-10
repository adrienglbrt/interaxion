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
        {
          name: "introductionText",
          label: "Introduction Text",
          type: "rich-text",
          required: true,
        },
        {
          name: "services",
          label: "Services",
          type: "object",
          required: false,
          fields: [
            {
              name: "heading",
              label: "Heading",
              type: "string",
              required: true,
            },
            {
              name: "content",
              label: "Description",
              type: "rich-text",
              required: true,
            },
          ],
        },
        {
          name: "image",
          label: "Image",
          type: "image",
          description:
            "Aspect ratio needs to be 16:9. On mobile it will be cropped into a 5:7, so please keep the subject in the center.",
          required: true,
        },
        {
          name: "imageAlt",
          label: "Image Alt Text",
          type: "string",
          required: false,
        },
        {
          name: "clients",
          label: "Clients",
          type: "object",
          required: true,
          fields: [
            {
              name: "heading",
              label: "Heading",
              type: "string",
              required: true,
            },
            {
              name: "content",
              label: "Description",
              type: "string",
              ui: {
                component: "textarea",
              },
              required: true,
            },
          ],
        },
        {
          name: "contact",
          label: "Contact",
          type: "object",
          required: true,
          fields: [
            {
              name: "heading",
              label: "Heading",
              type: "string",
              required: true,
            },
          ],
        },
        {
          name: "socials",
          label: "Socials",
          type: "object",
          required: true,
          fields: [
            {
              name: "heading",
              label: "Heading",
              type: "string",
              required: true,
            },
          ],
        },
        {
          name: "colophon",
          label: "Colophon",
          type: "object",
          required: false,
          fields: [
            {
              name: "copyright",
              label: "Copyright",
              type: "string",
              required: false,
            },
            {
              name: "credits",
              label: "Credits",
              type: "string",
              required: false,
            },
          ],
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
