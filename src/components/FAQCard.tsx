import { EyeOff } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  hideFAQ: () => void;
}

export function FAQCard({ hideFAQ }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>FAQ's</CardTitle>
        <CardDescription>Frequently asked questions</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <span>
                <span className="font-bold">For encrypted note:</span> The note
                is compressed, encrypted with the phrase then attached at the
                end of the url
              </span>
              <span>
                <span className="font-bold">For not encrypted note:</span> The
                note is compressed and attached at the end of the url
              </span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it secure?</AccordionTrigger>
            <AccordionContent>Hopefully, yes.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Why was this created?</AccordionTrigger>
            <AccordionContent>
              My laptop (linux) was connected to the TV and I wanted to copy
              paste from my iPhone. So I created this to create the note then
              used the browser's send tab to device functionality to access the
              note on the other laptop.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"} onClick={hideFAQ}>
          <EyeOff />
          Hide FAQ's
        </Button>
      </CardFooter>
    </Card>
  );
}
