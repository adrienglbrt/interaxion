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
      fields: [
        {
          name: "email",
          label: "Email",
          type: "string",
          required: true,
        },
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
      ],
    },
  ],
};

export default Global;
