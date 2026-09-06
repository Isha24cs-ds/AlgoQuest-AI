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

  const getMonacoLang = (lang: string) => {
    const l = (lang || "").toLowerCase();
    if (l === "c++" || l === "cpp") return "cpp";
    if (l === "python" || l === "python3") return "python";
    if (l === "java") return "java";
    if (l === "javascript" || l === "js") return "javascript";
    return l;
  };

  return (
    <div className="bg-slate-900 overflow-hidden w-full h-full relative">
      <Editor
        height="100%"
        width="100%"
        language={getMonacoLang(language)}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 4,
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  );
}