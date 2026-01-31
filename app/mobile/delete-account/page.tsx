"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function DeleteAccountPage() {
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      phone,
      email,
      confirmed,
    };

    console.log("Delete Account Form Data:", formData);

    if (!confirmed) {
      alert("Please confirm account deletion.");
      return;
    }

    // API call can go here
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-lg border p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-center">
          Delete Account
        </h1>

        <p className="text-sm text-muted-foreground text-center">
          This action is permanent and cannot be undone.
        </p>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+977 98XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Confirmation */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="confirm"
            checked={confirmed}
            onCheckedChange={(val) => setConfirmed(Boolean(val))}
          />
          <Label
            htmlFor="confirm"
            className="text-sm leading-snug"
          >
            I understand that deleting my account is permanent.
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="destructive"
          className="w-full"
        >
          Confirm Delete
        </Button>
      </form>
    </div>
  );
}
