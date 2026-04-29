"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

interface ToggleProps {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}

function Toggle({ label, description, defaultChecked = false }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-4 border-b border-outline/20 last:border-0">
      <div>
        <p className="text-sm font-bold text-on-background">{label}</p>
        {description && (
          <p className="text-xs text-on-surface-variant mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`relative w-12 h-6 transition-colors ${checked ? "bg-primary" : "bg-outline"}`}
        aria-label={label}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white transition-transform ${checked ? "translate-x-7" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@university.edu");
  const [studentId, setStudentId] = useState("STU-2024-0482");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    alert("Settings saved successfully!");
  }

  return (
    <>
      <Header searchPlaceholder="SEARCH SETTINGS..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Settings" },
            ]}
          />

          {/* Page Header */}
          <header className="mb-12">
            <h2 className="text-5xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Settings
            </h2>
            <p className="text-sm font-mono text-slate-500 tracking-widest uppercase">
              Manage your account and preferences
            </p>
          </header>

          {/* Settings Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Main Settings Column */}
            <div className="col-span-8 flex flex-col gap-8">

              {/* Account Information */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">
                  Account Information
                </h3>

                <form onSubmit={handleSave} className="space-y-6">
                  {/* Profile */}
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-secondary-container border border-outline flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-4xl text-secondary" aria-hidden="true">
                        person
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-background mb-1">
                        Profile Picture
                      </p>
                      <p className="text-xs text-on-surface-variant mb-3">
                        JPG, PNG or GIF. Max 2MB.
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 border border-outline text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container transition-colors"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Display Name
                      </label>
                      <input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full border border-outline/40 px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Student ID
                      </label>
                      <input
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full border border-outline/40 px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-slate-50 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-outline/40 px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-slate-50"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-primary text-on-primary px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </section>

              {/* Notifications */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">
                  Notification Preferences
                </h3>
                <div className="space-y-0">
                  <Toggle
                    label="Assignment Deadline Alerts"
                    description="Get notified 24h and 1h before deadlines"
                    defaultChecked={true}
                  />
                  <Toggle
                    label="Grade Published"
                    description="Notified when instructor publishes grades"
                    defaultChecked={true}
                  />
                  <Toggle
                    label="Schedule Changes"
                    description="Alerts for class reschedules or cancellations"
                    defaultChecked={false}
                  />
                  <Toggle
                    label="Resource Uploads"
                    description="When new course materials are available"
                    defaultChecked={false}
                  />
                  <Toggle
                    label="Weekly Summary"
                    description="Digest of upcoming tasks every Sunday"
                    defaultChecked={true}
                  />
                </div>
              </section>

              {/* Appearance */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">
                  Appearance
                </h3>
                <div className="space-y-0">
                  <Toggle
                    label="Dark Mode"
                    description="Switch to dark color scheme"
                    defaultChecked={false}
                  />
                  <Toggle
                    label="Compact View"
                    description="Show more content with reduced spacing"
                    defaultChecked={false}
                  />
                  <Toggle
                    label="Reduced Motion"
                    description="Minimize animations for accessibility"
                    defaultChecked={false}
                  />
                </div>
              </section>

              {/* Danger Zone */}
              <section className="bg-white p-8 border border-error/30">
                <h3 className="text-lg font-bold text-error mb-6 pb-4 border-b border-outline">
                  Danger Zone
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-on-background">
                        Clear All Task Data
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Permanently delete all your local tasks
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Are you sure? This cannot be undone.")) {
                          localStorage.removeItem("classteams_tasks");
                          alert("Task data cleared.");
                        }
                      }}
                      className="px-4 py-2 border border-error text-error text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition-colors"
                    >
                      Clear Data
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-on-background">
                        Delete Account
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Permanently remove your account and all data
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-error text-white text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Settings Sidebar */}
            <aside className="col-span-4 flex flex-col gap-8" aria-label="Account overview">
              {/* Profile Card */}
              <section className="bg-tertiary p-8 text-on-tertiary">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                      person
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{displayName}</h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-wider mt-1">
                    {email}
                  </p>
                  <div className="w-full mt-6 pt-6 border-t border-white/20">
                    <dl className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <dd className="text-2xl font-extrabold text-primary-container">
                          3.82
                        </dd>
                        <dt className="text-[10px] text-white/60 uppercase tracking-tighter">
                          GPA
                        </dt>
                      </div>
                      <div>
                        <dd className="text-2xl font-extrabold">42</dd>
                        <dt className="text-[10px] text-white/60 uppercase tracking-tighter">
                          Credits
                        </dt>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-6 text-primary font-bold">
                  Quick Actions
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: "download", label: "Export My Data" },
                    { icon: "lock", label: "Change Password" },
                    { icon: "help", label: "Help & Support" },
                    { icon: "logout", label: "Sign Out" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="flex items-center gap-3 px-4 py-3 border border-outline/30 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:border-primary hover:text-primary transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">
                        {action.icon}
                      </span>
                      {action.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Version Info */}
              <div className="text-center">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  ClassTeams v1.0.0
                </p>
                <p className="text-[10px] font-mono text-slate-300 uppercase tracking-widest mt-1">
                  Academic Clarity System
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
