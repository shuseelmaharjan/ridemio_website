"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CircleHelp,
  Clock3,
  CreditCard,
  Lock,
  MapPinned,
  Phone,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  fullName: string;
  email: string;
  message: string;
};

const supportTopics = [
  {
    title: "Account & Login",
    description: "Update details or reset password",
    icon: Lock,
  },
  {
    title: "Payment & Receipts",
    description: "Billing history and fare reviews",
    icon: CreditCard,
  },
  {
    title: "Lost & Found",
    description: "Track an item left in a vehicle",
    icon: Search,
  },
  {
    title: "General Inquiry",
    description: "Policy questions and other help",
    icon: CircleHelp,
  },
];

export default function ContactSupportPage() {
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted form:", formState);

    setFormState({
      fullName: "",
      email: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] mt-[-64px] pt-32">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Common Support Topics
              </h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportTopics.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="border-slate-200 bg-white shadow-sm transition-all hover:shadow-md px-0 py-4"
                  >
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-sm leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-5 sm:p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Send us a message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="name@email.com"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                    >
                      Describe your issue in detail
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="min-h-[180px] rounded-2xl border-slate-200 bg-slate-50 resize-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 className="h-4 w-4 text-amber-500" />
                      <span>Average response time: &lt; 2 hours</span>
                    </div>

                    <Button
                      type="submit"
                      className="h-12 rounded-xl px-8 text-sm font-semibold sm:min-w-[180px]"
                    >
                      Submit Inquiry
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="overflow-hidden rounded-3xl border-rose-200 bg-rose-50 shadow-sm pt-4">
              <CardContent className="p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">
                  <AlertTriangle className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-semibold text-rose-700">Safety Report</h2>
                <p className="mt-3 text-sm leading-6 text-rose-700/80">
                  If you have been involved in an incident or feel unsafe,
                  please report it immediately to our 24/7 Response Team.
                </p>

                <Button className="mt-6 h-12 w-full rounded-xl bg-red-600 text-white hover:bg-red-700">
                  Report Now
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-3xl border-blue-100 bg-[#e9eeff] shadow-sm pt-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Regional Offices
                </h2>

                <div className="mt-5 space-y-4 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                    <p>
                      Kathmandu, Nepal, 44600
                      <br />
                      {/* London, UK EC2V 6EE */}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-blue-700" />
                    <p>+977 9800000000</p>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-2 shadow-inner">
                  {/* <div className="h-36 w-full rounded-xl bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14)_1px,_transparent_1px),linear-gradient(135deg,#0b2b58,#113f79)] [background-size:14px_14px,100%_100%]" /> */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1536.818459975636!2d85.32330445961458!3d27.698124733467353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a5a17cf095%3A0xae7d89f50454f655!2sSinghdurbar!5e1!3m2!1sen!2snp!4v1775056929780!5m2!1sen!2snp" 
                    width="400" 
                    height="300" 
                    style={{border:0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
