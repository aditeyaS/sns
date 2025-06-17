import { useState } from "react";
import { toast } from "sonner";
import { LockOpenIcon } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { NoteViewCard } from "@/components/NoteViewCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { decrypt } from "@/utils/crypto";

export const Route = createFileRoute("/e/$note")({
  component: RouteComponent,
});

function RouteComponent() {
  const { note } = Route.useParams();
  const [phrase, setPhrase] = useState<string>("");
  const [decryptedNote, setDecryptedNote] = useState<string>();

  async function handleDecrypt() {
    try {
      const decrypted = await decrypt(note, phrase);
      toast.success("🎉 Note decrypted");
      setDecryptedNote(decrypted);
    } catch (error: any) {
      console.error("Decryption failed", error);
      toast.error("Failed to decrypt");
    }
  }

  return (
    <>
      {decryptedNote ? (
        <NoteViewCard note={decryptedNote} />
      ) : (
        <Card>
          <CardContent>
            <Label>Encrypted note</Label>
            <span className="mt-2 text-2xl font-bold">{note}</span>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-start space-y-2 w-full">
              <Label>Encryption phrase *</Label>
              <Input
                placeholder="mugiwara"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
              />
              <Button onClick={handleDecrypt} disabled={phrase === ""}>
                <LockOpenIcon /> Decrypt
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
