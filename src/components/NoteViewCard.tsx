import { CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Link } from "@tanstack/react-router";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

interface Props {
  note: string;
}

export function NoteViewCard({ note }: Props) {
  async function handleCopyToClipboard() {
    await copyToClipboard(note, "Note is copied to clipboard");
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
