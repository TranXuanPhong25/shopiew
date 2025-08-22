import {ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function MoveNextCarouselBtn({position,hover,scrollNext, nextBtnEnabled}: {position:string,hover:string,scrollNext: () => void, nextBtnEnabled: boolean}) {
  return (
      <Button
          variant="outline"
          className={
              `absolute top-1/2 -translate-y-1/2 ${position} hidden sm:flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md hover:size-10 hover:${hover}  transition-all`
          }
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
      >
          <ChevronRight className="w-4 h-4"/>
      </Button>
  );
}