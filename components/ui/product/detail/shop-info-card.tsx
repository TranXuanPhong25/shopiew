import {BadgeCheckIcon, MapPinHouse, MessageSquare} from "lucide-react"
import {Button} from "@/components/ui/button"

export default function ShopInfoCard() {
    return (
        <div className="rounded-lg  bg-background ">
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sold by</span>
            </div>
            <div className="flex justify-between items-center border-b">
                <div>
                    <div className="flex my-2">
                        <div className="relative">
                            <img className="rounded-full"
                                 src={"https://placehold.co/70x70.png"}
                                 alt={"FOCALLURE Beauty.VN"}
                                 width={70}
                                 height={70}
                            />
                            <div className="absolute right-0 bottom-0 size-3 bg-gray-400 rounded-full -translate-x-1/2 -translate-y-1/2 outline-4 outline-white outline"/>
                        </div>
                        <div className="flex flex-col justify-center ml-2">
                            <div className="font-bold flex gap-1">FOCALLURE Beauty.VN <BadgeCheckIcon className="size-5  text-green-400" /></div>
                            <div className="text-muted-foreground text-sm flex gap-1"><MapPinHouse className="size-4"/>Hanoi, Vietnam</div>
                        </div>
                    </div>

                </div>
                <div className="flex items-end justify-center flex-col">
                    <Button variant="outline" size="sm" className="text-custom-1 h-8 hover:text-custom-1 mb-1">
                        <MessageSquare className="h-4 w-4 mr-1"/> Chat
                    </Button>
                    <span className="text-xs text-gray-500">Active 5 minutes ago</span>
                </div>
            </div>

            <div className="grid grid-cols-3 divide-x">
                <div className="p-4 text-center">
                    <div className="text-muted-foreground text-sm">Seller Ratings</div>
                    <div className="font-bold text-2xl mt-1">98%</div>
                </div>
                <div className="p-4 text-center">
                    <div className="text-muted-foreground text-sm">Ships On Time</div>
                    <div className="font-bold text-2xl mt-1">98%</div>
                </div>
                <div className="p-4 text-center">
                    <div className="text-muted-foreground text-sm">Chat Response</div>
                    <div className="font-bold text-2xl mt-1">100%</div>
                </div>
            </div>

            <div className="p-4 text-center border-t">
                <Button variant="link" className="text-blue-500 font-medium">
                    GO TO STORE
                </Button>
            </div>
        </div>
    )
}

