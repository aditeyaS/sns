import { NoteViewCard } from "@/components/NoteViewCard";
import { createFileRoute } from "@tanstack/react-router";
import { decompressFromEncodedURIComponent } from "lz-string";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/$note")({
  component: RouteComponent,
});

function RouteComponent() {
  const { note } = Route.useParams();
  const [parsedNote, setParsedNote] = useState("");

  useEffect(() => {
    setParsedNote(decompressFromEncodedURIComponent(note));
  }, [note]);

  return <NoteViewCard note={parsedNote} />;
}
