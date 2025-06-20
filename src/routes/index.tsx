import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { compressToEncodedURIComponent } from "lz-string";
import { encrypt } from "@/utils/crypto";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [note, setNote] = useState<string>("");
  const [phrase, setPhrase] = useState<string>("");
  const [noteUrl, setNoteUrl] = useState<string>("");
  const [showUrl, setShowUrl] = useState<boolean>(true);

  useEffect(() => {
    const baseUrl = window.location.origin;
    const updateNoteUrl = async () => {
      if (phrase === "") {
        const compressed = compressToEncodedURIComponent(note);
        setNoteUrl(`${baseUrl}/${compressed}`);
      } else {
        const encoded = await encrypt(note, phrase);
        setNoteUrl(`${baseUrl}/e/${encoded}`);
      }
    };
    updateNoteUrl();
  }, [note, phrase]);

  async function handleCopyToClipboard() {
    await copyToClipboard(noteUrl, "Link is copied to clipboard");
  }

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="note">Note *</Label>
          <Textarea
            id="note"
            name="note"
            placeholder="Write your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Character count: {note.length}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phrase">Encryption phrase</Label>
          <Input
            id="phrase"
            name="phrase"
            placeholder="Write your note here..."
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            You will need this phrase to decrypt your note. Leave it empty if
            you don't want to encrypt your notes.
          </p>
        </div>
      </CardContent>
      {note !== "" && (
        <CardContent className="flex flex-col items-start overflow-hidden">
          <Separator className="mb-6" />
          <Label>Sharable link</Label>
          <p className="text-xs text-muted-foreground my-1">
            You can share this link for anyone to access:
          </p>
          <div className="my-2 space-x-2">
            <Button onClick={handleCopyToClipboard}>
              <CopyIcon /> Copy link
            </Button>
            <Button asChild variant={"outline"} onClick={handleCopyToClipboard}>
              <Link target="_blank" to={noteUrl}>
                <ExternalLinkIcon /> Open
              </Link>
            </Button>
          </div>
          <button
            className="mt-2 flex gap-1 text-muted-foreground text-xs underline-offset-4 hover:underline"
            onClick={() => setShowUrl((p) => !p)}
          >
            {showUrl ? "Hide link" : "Show link"}
            {showUrl ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronDownIcon className="size-4" />
            )}
          </button>
          {showUrl && (
            <a
              target="_blank"
              href={noteUrl}
              className="mt-2 text-primary font-mono underline-offset-4 hover:underline break-words whitespace-pre-wrap w-full overflow-hidden"
            >
              {noteUrl}
            </a>
          )}
        </CardContent>
      )}
    </Card>
  );
}
