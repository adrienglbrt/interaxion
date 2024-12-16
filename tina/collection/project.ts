import { Collection } from "tinacms";

const Project: Collection = {
  name: "project",
  label: "Projects",
  path: "content/projects",
  format: "md",
  ui: {
    filename: {
      slugify: (props) => {
        if (props.year && props.title) {
          return `${props.year}-${props.title}`
            .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
            .toLowerCase() // Convert the string to lowercase letters
            .trim() // Remove whitespace from both sides of a string (optional)
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/[^\w\-]+/g, "") // Remove all non-word chars
            .replace(/\_/g, "-") // Replace _ with -
            .replace(/\-\-+/g, "-") // Replace multiple - with single -
            .replace(/\-$/g, ""); // Remove trailing -
        } else {
          return "untitled";
        }
      },
    },
    router: (props) => {
      return `/work/${props.document._sys.filename}`;
    },
  },
  fields: [
    {
      name: "title",
      type: "string",
      label: "Title",
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
        "The description of the page, displayed in Google search results and in social media shares. If not provided, the first 160 characters of the description field will be used.",
      required: false,
    },
    {
      name: "year",
      type: "number",
      label: "Year",
      required: true,
    },
    {
      name: "brand",
      type: "string",
      label: "Brand",
      required: true,
    },
    {
      name: "isActive",
      type: "boolean",
      label: "Is Active",
      description: "If active, the case will be displayed on the website.",
      required: true,
    },
    {
      name: "isShowcased",
      type: "boolean",
      label: "Is Showcased",
      description: "If showcased, the case will be displayed on the homepage.",
      required: true,
    },
    {
      name: "showcaseOrder",
      type: "number",
      label: "Showcase Order",
      description:
        "Use only if the case is showcased. The order in which the cases are displayed on the homepage. Lower numbers come first.",
    },
    {
      name: "mainImage",
      type: "object",
      label: "Main Image",
      description:
        "Will be used on the project grid and on the project page. Also on the homepage, if no video loop is provided.",
      required: true,
      fields: [
        {
          name: "image16by9",
          type: "image",
          label: "Image 16:9",
          description: "The aspect ratio must be 16:9.",
          required: true,
        },
        {
          name: "image5by7",
          type: "image",
          label: "Image 5:7",
          description:
            "The aspect ratio must be 5:7. If not provided, the 16:9 image will be used and cropped when necessary",
          required: false,
        },
        {
          name: "image4by3",
          type: "image",
          label: "Image 4:3",
          description:
            "The aspect ratio must be 4:3. If not provided, the 16:9 image will be used and cropped when necessary.",
          required: false,
        },
        { name: "alt", type: "string", label: "Alt Text", required: false },
      ],
    },
    {
      name: "mainVideo",
      type: "string",
      label: "Main Video",
      description: "Enter the Vimeo video ID",
      required: false,
    },
    {
      name: "videoLoop",
      type: "object",
      label: "Video Loop",
      description:
        "Will be used on the homepage, if provided. If not provided, the main image will be used.",
      required: false,
      fields: [
        {
          name: "loop16by9",
          type: "string",
          label: "Loop 16:9",
          description:
            "Enter the Vimeo video ID. The aspect ratio must be 16:9. Cropping on either sides may happen depending on user screen size.",
          required: true,
        },
        {
          name: "loop9by16",
          type: "string",
          label: "Loop 9:16",
          description:
            "Enter the Vimeo video ID. The aspect ratio must be 9:16. Cropping on top / bottom may happen depending on user screen size",
          required: true,
        },
      ],
    },
    {
      name: "introduction",
      type: "rich-text",
      label: "Introduction",
      required: true,
    },
    {
      name: "credits",
      type: "object",
      label: "Credits",
      required: false,
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
      },
      fields: [
        {
          name: "label",
          type: "string",
          label: "Label",
          required: true,
        },
        {
          name: "name",
          type: "string",
          list: true,
          label: "Name",
          required: true,
        },
      ],
    },
    {
      name: "optionalBlocks",
      type: "object",
      label: "Optional Blocks",
      description:
        "Use these blocks to add additional content to the project page.",
      required: false,
      list: true,
      templates: [
        {
          name: "singleImage",
          label: "Single Image",
          fields: [
            {
              name: "image",
              type: "image",
              label: "Image",
              required: true,
            },
            {
              name: "alt",
              type: "string",
              label: "Alt Text",
              required: false,
            },
            {
              name: "aspectRatioWidth",
              type: "number",
              label: "Aspect Ratio Width",
              description: "For instance, for a 16:9 aspect ratio, enter 16.",
              required: true,
            },
            {
              name: "aspectRatioHeight",
              type: "number",
              label: "Aspect Ratio Height",
              description: "For instance, for a 16:9 aspect ratio, enter 9.",
              required: true,
            },
            {
              name: "version",
              type: "string",
              label: "Version",
              required: true,
              options: ["Small", "Medium", "Large"],
            },
          ],
        },
        {
          name: "dualImage",
          label: "Dual Image",
          fields: [
            {
              name: "imageOne",
              type: "image",
              label: "Image 1",
              required: true,
            },
            {
              name: "altOne",
              type: "string",
              label: "Alt Text 1",
              required: false,
            },
            {
              name: "imageTwo",
              type: "image",
              label: "Image 2",
              required: true,
            },
            {
              name: "altTwo",
              type: "string",
              label: "Alt Text 2",
              required: false,
            },
            {
              name: "aspectRatioWidth",
              type: "number",
              label: "Aspect Ratio Width",
              description:
                "For instance, for a 16:9 aspect ratio, enter 16. The 2 images must have the same aspect ratio.",
              required: true,
            },
            {
              name: "aspectRatioHeight",
              type: "number",
              label: "Aspect Ratio Height",
              description:
                "For instance, for a 16:9 aspect ratio, enter 9. The 2 images must have the same aspect ratio.",
              required: true,
            },
            {
              name: "isStackedOnMobile",
              type: "boolean",
              label: "Stack on Mobile",
              description:
                "If checked, the images will be displayed on top of each other on mobile devices.",
              required: false,
            },
          ],
        },
        {
          name: "tripleImage",
          label: "Triple Image",
          fields: [
            {
              name: "imageOne",
              type: "image",
              label: "Image 1",
              required: true,
            },
            {
              name: "altOne",
              type: "string",
              label: "Alt Text 1",
              required: false,
            },
            {
              name: "imageTwo",
              type: "image",
              label: "Image 2",
              required: true,
            },
            {
              name: "altTwo",
              type: "string",
              label: "Alt Text 2",
              required: false,
            },
            {
              name: "imageThree",
              type: "image",
              label: "Image 3",
              required: true,
            },
            {
              name: "altThree",
              type: "string",
              label: "Alt Text 3",
              required: false,
            },
            {
              name: "aspectRatioWidth",
              type: "number",
              label: "Aspect Ratio Width",
              description:
                "For instance, for a 16:9 aspect ratio, enter 16. The 3 images must have the same aspect ratio.",
              required: true,
            },
            {
              name: "aspectRatioHeight",
              type: "number",
              label: "Aspect Ratio Height",
              description:
                "For instance, for a 16:9 aspect ratio, enter 9. The 3 images must have the same aspect ratio.",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default Project;
