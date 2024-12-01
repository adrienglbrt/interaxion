import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export default function RichText({ text }: { text: TinaMarkdownContent }) {
  return (
    <div className='max-w-prose'>
      <TinaMarkdown
        content={text}
        components={{
          p: (props) => <p className='leading-relaxed' {...props} />,
        }}
      />
    </div>
  );
}
