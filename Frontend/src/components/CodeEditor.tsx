import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor() {
  const [code, setCode] = useState(`#include <bits/stdc++.h>
using namespace std;

int largestElement(vector<int>& nums) {

}
`);

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">

      <Editor
        height="600px"
        defaultLanguage="cpp"
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