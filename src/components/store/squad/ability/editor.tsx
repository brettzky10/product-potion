"use client";

import { useState } from "react";
import { FaRegCircleXmark, FaRegCircleCheck } from "react-icons/fa6";


interface WebhookTestButtonProps {
  //subscription: WebhookSubscription;
  headers: Record<string, string>;
  body: unknown;
  disabled: boolean;
  className?: string;
}

function WebhookTestButton({ headers, body, disabled, className }: WebhookTestButtonProps) {
  // Placeholder implementation
  return (
    <button
      disabled={disabled}
      className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    >
      Test
    </button>
  );
}

export function TestEditor({

  json,
  onChange,
}: {
 
  json: unknown;
  onChange: (json: unknown, isValid: boolean) => void;
}) {
  const testJson = (test: string) => {
    try {
      JSON.parse(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  const [editorJson, setEditorJson] = useState(json);
  const [validJson, setValidJson] = useState(true);

  const handleEditorChange: React.KeyboardEventHandler<HTMLPreElement> = (
    e
  ) => {
    const text = e.currentTarget.innerText;
    const isValid = testJson(text);
    setValidJson(isValid);
    if (isValid) {
      const parsedJson = JSON.parse(text);
      setEditorJson(parsedJson);
      onChange(parsedJson, isValid);
    } else {
      onChange(text, isValid);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div className="border border-gray-300 rounded-md">
          <pre
            contentEditable
            suppressContentEditableWarning={true}
            className="w-full p-4"
            onKeyUp={handleEditorChange}
          >
            {JSON.stringify(editorJson, null, 2)}
          </pre>
        </div>
        {/* <WebhookTestButton
          headers={{}}
          body={editorJson}
          disabled={!validJson}
          className="h-auto w-[80px] absolute right-[10px] bottom-[10px]"
        /> */}
      </div>
      <p>
        {validJson ? (
          <span>
            <FaRegCircleCheck className="text-green-600 inline mr-2" />
            JSON syntax valid
          </span>
        ) : (
          <span>
            <FaRegCircleXmark className="text-red-600 inline mr-2" />
            JSON syntax parsing error
          </span>
        )}
      </p>
    </div>
  );
}

