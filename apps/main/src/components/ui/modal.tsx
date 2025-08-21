import { X } from "lucide-react";
import { Button } from "./button";
import React from "react";

const Modal = ({ setOpen ,children }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>,children:React.ReactNode }) => {
    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/40"
                onClick={() => setOpen(false)}
            />
            <div className="fixed z-50  left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg  min-w-[320px] ">
                <div className="absolute -top-3 -right-3 z-50">
                    <Button
                    variant={"outline"}
                        size={"icon"}
                        className="text-gray-500 hover:text-gray-700 text-xl rounded-full"
                        onClick={() => setOpen(false)}
                    >
                        <X className="w-6 h-6" />

                    </Button>
                </div>

                 {/* {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { setOpen } as any);
                    }
                    return child;
                })} */}
                {children}
            </div>
        </>
    )
}
export default Modal;