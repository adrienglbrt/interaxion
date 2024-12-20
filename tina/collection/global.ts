import { Collection } from "tinacms";

const Global: Collection = {
  name: "global",
  label: "Global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      name: "contact",
      label: "Contact",
      type: "object",
      required: true,
      fields: [
        {
          name: "email",
          label: "Email",
          type: "string",
          required: true,
        },
        {
          name: "addressOne",
          label: "Address One",
          type: "object",
          required: true,
          fields: [
            {
              name: "addressLineOne",
              label: "Address Line One",
              type: "string",
              required: true,
            },
            {
              name: "addressLineTwo",
              label: "Address Line Two",
              type: "string",
              required: true,
            },
            {
              name: "city",
              label: "City",
              type: "string",
              required: true,
            },
            {
              name: "postCode",
              label: "Post Code",
              type: "string",
              required: true,
            },
            {
              name: "country",
              label: "Country",
              type: "string",
              required: true,
            },
            {
              name: "phone",
              label: "Phone",
              type: "string",
              required: true,
            },
          ],
        },
        {
          name: "addressTwo",
          label: "Address Two",
          type: "object",
          required: false,
          fields: [
            {
              name: "addressLineOne",
              label: "Address Line One",
              type: "string",
              required: true,
            },
            {
              name: "addressLineTwo",
              label: "Address Line Two",
              type: "string",
              required: true,
            },
            {
              name: "city",
              label: "City",
              type: "string",
              required: true,
            },
            {
              name: "postCode",
              label: "Post Code",
              type: "string",
              required: true,
            },
            {
              name: "country",
              label: "Country",
              type: "string",
              required: true,
            },
            {
              name: "phone",
              label: "Phone",
              type: "string",
              required: true,
            },
          ],
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
          name: "instagram",
          label: "Instagram",
          type: "object",
          required: true,
          fields: [
            { name: "url", type: "string", label: "URL", required: true },
            { name: "label", type: "string", label: "Label", required: true },
          ],
        },
        {
          name: "linkedin",
          label: "LinkedIn",
          type: "object",
          required: true,
          fields: [
            { name: "url", type: "string", label: "URL", required: true },
            { name: "label", type: "string", label: "Label", required: true },
          ],
        },
      ],
    },
    {
      name: "metaData",
      label: "Meta data",
      type: "object",
      required: true,
      fields: [
        {
          name: "websiteTitle",
          type: "string",
          label: "Website Title",
          required: true,
        },
        {
          name: "websiteDescription",
          type: "string",
          label: "Website Description",
          required: true,
        },
        {
          name: "websiteImage",
          type: "image",
          label: "Website Image",
          required: true,
          description:
            "The image used when sharing the website on social media. Size must be 1200 X 630 pixels.",
        },
      ],
    },
    {
      name: "error404",
      type: "object",
      label: "Error 404",
      required: true,
      fields: [
        {
          name: "heading",
          type: "string",
          label: "Heading",
          required: true,
        },
        {
          name: "message",
          type: "string",
          label: "Message",
          required: true,
        },
        {
          name: "redirectLinkLabel",
          type: "string",
          label: "Redirect Link Label",
          required: true,
        },
      ],
    },
  ],
};

export default Global;
