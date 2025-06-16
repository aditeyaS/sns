import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { fromBase64Url, toBase64Url } from "./base64";

export async function encrypt(note: string, password: string): Promise<string> {
  const compressed = compressToUTF16(note);
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const alg = { name: "AES-GCM", iv };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "encrypt",
  ]);
  const encoded = new TextEncoder().encode(compressed);
  const encrypted = await crypto.subtle.encrypt(alg, key, encoded);
  const full = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
  return toBase64Url(full);
}

export async function decrypt(
  encryptedB64Url: string,
  password: string
): Promise<string> {
  const full = fromBase64Url(encryptedB64Url);
  const iv = full.slice(0, 12);
  const data = full.slice(12);
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);
  const alg = { name: "AES-GCM", iv };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "decrypt",
  ]);
  const decrypted = await crypto.subtle.decrypt(alg, key, data);
  const decompressed = new TextDecoder().decode(decrypted);
  return decompressFromUTF16(decompressed) || "";
}
