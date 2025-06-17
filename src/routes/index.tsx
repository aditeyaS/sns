import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { compressToEncodedURIComponent } from "lz-string";
import { encrypt } from "@/utils/crypto";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [note, setNote] = useState<string>("");
  const [phrase, setPhrase] = useState<string>("");
  const [noteUrl, setNoteUrl] = useState<string>("");

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
          <Button className="my-2" onClick={handleCopyToClipboard}>
            <CopyIcon /> Copy link
          </Button>
          <a
            target="_blank"
            href={noteUrl}
            className="text-xl underline-offset-4 hover:underline break-words whitespace-pre-wrap w-full overflow-hidden"
          >
            {noteUrl}
          </a>
        </CardContent>
      )}
    </Card>
  );
}
