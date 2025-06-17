import { toast } from "sonner";

export async function copyToClipboard(text: string, successMessage: string) {
  if (!navigator.clipboard) {
    toast.error("Clipboard API is not supported in this browser.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch (error: any) {
    console.error("Clipboard error:", error);

    const message =
      typeof error?.message === "string"
        ? error.message
        : "Failed to copy to clipboard.";

    toast.error(message);
  }
}
