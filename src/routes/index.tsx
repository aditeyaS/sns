import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NoteSaveCard } from "@/components/NoteSaveCard";
import { NoteEditorCard } from "@/components/NoteEditorCard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [savedUrl, setSavedUrl] = useState<string>();

  return (
    <>
      {savedUrl ? (
        <NoteSaveCard url={savedUrl} onNew={() => setSavedUrl(undefined)} />
      ) : (
        <NoteEditorCard
          onSave={(url) => setSavedUrl(`${window.location}${url}`)}
        />
      )}
    </>
  );
}
