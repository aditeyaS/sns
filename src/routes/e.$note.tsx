import { NoteViewCard } from "@/components/NoteViewCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { decrypt } from "@/utils/crypto";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { LockOpenIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/e/$note")({
  component: RouteComponent,
});

const formSchema = z.object({
  phrase: z.string().min(1),
});

function RouteComponent() {
  const { note } = Route.useParams();
  const [decryptedNote, setDecryptedNote] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phrase: "",
    },
  });

  async function onDecrypt(values: z.infer<typeof formSchema>) {
    try {
      const decrypted = await decrypt(note, values.phrase);
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onDecrypt)}
                className="flex flex-col gap-2 items-start w-full"
              >
                <FormField
                  control={form.control}
                  name="phrase"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Encryption phrase</FormLabel>
                      <FormControl>
                        <Input placeholder="mugiwara" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  <LockOpenIcon /> Decrypt
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
