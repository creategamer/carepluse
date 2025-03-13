"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";


export const AppointmentModal = ({
    patientId,
    userId,
    appointment,
    type,
  }: {
    patientId: string;
    userId: string;
    appointment?: Appointment;
    type: "schedule" | "cancel";
    title: string;
    description: string;
  }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button
                variant="ghost"
                className={`capitalize ${type === "schedule" && "text-[#24AE7C]"}`}
            >
                {type}
            </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1A1D21] border-[#363A3D] sm:max-w-md">
                <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {type} appointment
                    </DialogDescription>
                </DialogHeader>
                <AppointmentForm
                    userId={userId}
                    patientId={patientId}
                    type={type}
                    appointment={appointment}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}
