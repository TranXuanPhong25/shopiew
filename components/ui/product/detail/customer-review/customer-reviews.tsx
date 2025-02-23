import RatingComponent from "@/components/ui/product/detail/customer-review/rating-component";
import {Button} from "@/components/ui/button";

export default function CustomerReviews() {
    return (
        <div className="w-full">
            <h2 className="text-lg font-medium p-4 bg-muted/50">Customer reviews</h2>
            <RatingComponent/>
            <div className="flex gap-2 flex-wrap items-center p-4">
                <h2>
                    Filter by:
                </h2>

                <Button className="" variant={"outline"}>
                    All
                </Button>
                <Button className="" variant={"outline"}>
                    5 stars
                </Button>
                <Button className="" variant={"outline"}>
                    4 stars
                </Button>
                <Button className="" variant={"outline"}>
                    3 stars
                </Button>
                <Button className="" variant={"outline"}>
                    2 stars
                </Button>
                <Button className="" variant={"outline"}>
                    1 star
                </Button>
                <Button className="" variant={"outline"}>
                    With media
                </Button>
                <Button className="" variant={"outline"}>
                    With comments
                </Button>
            </div>
        </div>
    )
}