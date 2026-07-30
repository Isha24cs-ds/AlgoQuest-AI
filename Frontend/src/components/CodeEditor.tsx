import Editor from "@monaco-editor/react";
import { useEffect } from "react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
}

export default function CodeEditor({
  code,
  setCode,
  language,
}: CodeEditorProps) {
  useEffect(() => {
    // nothing needed here now
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 h-full">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
        }}
      />
    </div>
  );
}