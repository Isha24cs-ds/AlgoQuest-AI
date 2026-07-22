type Props = {
  code: string;
};

export default function CodeBlock({ code }: Props) {
  return (
    <pre className="bg-black text-green-400 rounded-xl p-5 mt-5 overflow-x-auto">
      <code>{code}</code>
    </pre>
  );
}