"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Modal from "../ui/modal";
import LoginForm from "@/features/auth/components/login-form";

const AccountButton = () => {
    const [open, setOpen] = useState(false);

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
                open && <Modal setOpen={setOpen} children={<LoginForm />} />}
        </>
    );
};

export default AccountButton;
