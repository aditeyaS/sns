import { encrypt } from "@/utils/crypto";
import { zodResolver } from "@hookform/resolvers/zod";
import { compressToEncodedURIComponent } from "lz-string";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SaveIcon } from "lucide-react";

interface Props {
  onSave: (url: string) => void;
}

export function NoteEditorCard({ onSave }: Props) {
  const formSchema = z.object({
    note: z.string().min(3).trim(),
    phrase: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      phrase: "",
    },
  });

  const phrase = form.watch("phrase");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.phrase) {
      const encoded = await encrypt(values.note, values.phrase);
      onSave(`e/${encoded}`);
    } else {
      const compressed = compressToEncodedURIComponent(values.note);
      onSave(`${compressed}`);
    }
    form.reset();
    toast.success("Your note is converted to a sharable link.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your note here..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phrase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Encryption phrase</FormLabel>
                  <FormControl>
                    <Input placeholder="mugiwara" {...field} />
                  </FormControl>
                  <FormDescription>
                    You will need this phrase to decrypt your note. Leave it
                    empty if you don't want to encrypt your notes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
              <SaveIcon />
              {phrase ? "Encrypt and share" : "Share"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
