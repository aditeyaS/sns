import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";

interface Props {
  url: string;
  onNew: () => void;
}
export function NoteSaveCard({ url, onNew }: Props) {
  async function handleCopyToClipboard() {
    if (!navigator.clipboard) {
      toast.error("Clipboard API is not supported in this browser.");
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link is copied to clipboard");
    } catch (error: any) {
      console.error("Clipboard error:", error);
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Failed to copy the link to clipboard.";
      toast.error(message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share</CardTitle>
        <CardDescription>Open the below link to view the note.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap">
        <a
          target="_blank"
          href={url}
          className="text-2xl underline-offset-4 hover:underline break-words whitespace-pre-wrap overflow-hidden"
        >
          {url}
        </a>
      </CardContent>
      <CardFooter className="flex gap-2 items-center">
        <Button onClick={handleCopyToClipboard}>
          <CopyIcon /> Copy link
        </Button>
        <Button variant={"ghost"} onClick={onNew}>
          Create a new note
        </Button>
      </CardFooter>
    </Card>
  );
}
