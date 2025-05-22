import ReactMarkdown from "react-markdown";

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-neutral max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
