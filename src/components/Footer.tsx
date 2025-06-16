import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface Props {
  showFAQ: () => void;
}

export function Footer({ showFAQ }: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 items-center">
        <div className="flex gap-2 items-center">
          <Button variant={"link"} onClick={showFAQ}>
            FAQ's
          </Button>
          <Button variant={"link"} asChild>
            <a target="_blank" href="https://github.com/aditeyaS/sns">
              Github
            </a>
          </Button>
        </div>
        <span className="text-xs text-muted-foreground">
          &copy; SNS, SimpleNoteSend
        </span>
      </CardContent>
    </Card>
  );
}
