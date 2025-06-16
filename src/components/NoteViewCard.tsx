import { CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

interface Props {
  note: string;
}

export function NoteViewCard({ note }: Props) {
  async function handleCopyToClipboard() {
    if (!navigator.clipboard) {
      toast.error("Clipboard API is not supported in this browser.");
      return;
    }
    try {
      await navigator.clipboard.writeText(note);
      toast.success("Note is copied to clipboard");
    } catch (error: any) {
      console.error("Clipboard error:", error);
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Failed to copy the note to clipboard.";
      toast.error(message);
    }
  }

  return (
    <Card>
      <CardContent>
        <Label>Note</Label>
        <span className="mt-2 text-4xl font-bold">{note}</span>
      </CardContent>
      <CardFooter className="flex gap-2 items-center">
        <Button onClick={handleCopyToClipboard}>
          <CopyIcon /> Note
        </Button>
        <Button variant={"ghost"} asChild>
          <Link to="/">Create a new note</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
