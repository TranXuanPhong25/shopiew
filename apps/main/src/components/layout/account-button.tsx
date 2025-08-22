"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck, User } from "lucide-react";
import Modal from "../ui/modal";
import { AuthForms } from "@/features/auth/components/auth-forms";
import { useAuth } from "@/features/auth";

const AccountButton = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth(); 
    useEffect(() => {
        if (user) {
            setOpen(false);
        }
    }, [user]);
    if (!user) {
        return (
            <>
                <Button
                    variant="ghost"
                    className={open ? "bg-gray-100" : ""}
                    onClick={() => setOpen(true)}
                >
                    <User className="w-5 h-5 mr-2 sm:mr-2" />
                    <span className="hidden sm:inline">Tài khoản</span>
                </Button>

                {
                    open && <Modal setOpen={setOpen} >
                        <AuthForms setOpen={setOpen} />
                    </Modal>}
            </>
        )
    }
    return <>
        <Button
            variant="ghost"
        >
            <CircleCheck className="w-5 h-5 mr-2 sm:mr-2" />
            <span className="hidden sm:inline">Tài khoản</span>
        </Button>
    </>
};

export default AccountButton;
