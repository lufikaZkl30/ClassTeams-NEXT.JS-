"use client";

import TopBar from "@/components/TopBar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";

/* ── Toggle Switch ── */
function Toggle({ id, defaultChecked = false }: { id: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
      <input
        id={id} type="checkbox" checked={on}
        onChange={() => setOn(!on)} className="sr-only peer"
      />
      <div className={`w-11 h-6 border border-outline peer-focus:outline-none
        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:border after:border-slate-300
        after:h-5 after:w-5 after:transition-all
        peer-checked:after:translate-x-full peer-checked:after:border-white
        ${on ? "bg-primary" : "bg-slate-200"}`}
      />
    </label>
  );
}

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [visibility, setVisibility] = useState("Class Members Only");

  return (
    <>
      <TopBar placeholder="SEARCH SETTINGS..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">

          <Breadcrumb crumbs={[{ label: "Dashboard", href: "/" }, { label: "Settings" }]} />

          <header className="mb-12">
            <h2 className="text-5xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">Settings</h2>
            <p className="text-sm font-mono text-slate-500 tracking-widest uppercase">
              Manage your account and preferences
            </p>
          </header>

          <div className="grid grid-cols-12 gap-8">

            {/* ── Main Column (8 cols) ── */}
            <div className="col-span-8 flex flex-col gap-8">

              {/* Account Information */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">
                  Account Information
                </h3>
                <div className="space-y-6">
                  {/* Profile Row */}
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-secondary-container border border-outline flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl text-secondary" aria-hidden="true">account_circle</span>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Full Name</label>
                          <p className="text-on-surface font-semibold">Jay Chen</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Email</label>
                          <p className="text-on-surface font-semibold">jay.chen@classteams.edu</p>
                        </div>
                      </div>
                      <button className="text-primary text-sm font-bold hover:underline underline-offset-2">
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-outline/30" />

                  {/* Email & Password */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center gap-3 bg-slate-50 p-3 border border-outline/40">
                        <input type="email" defaultValue="jay.chen@classteams.edu"
                          className="flex-1 bg-transparent outline-none text-on-surface text-sm" disabled />
                        <span className="material-symbols-outlined text-green-600 text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">check_circle</span>
                      </div>
                    </div>
                    <button className="text-primary text-sm font-bold hover:underline underline-offset-2">
                      Change Password
                    </button>
                  </div>
                </div>
              </section>

              {/* Notifications */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">Notifications</h3>
                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between py-3 border-b border-outline/20">
                    <div>
                      <p className="font-semibold text-on-surface">Email Notifications</p>
                      <p className="text-xs text-on-surface-variant">Receive email updates for important events</p>
                    </div>
                    <Toggle id="notif-email" defaultChecked={true} />
                  </div>
                  {/* Assignment Reminders */}
                  <div className="flex items-center justify-between py-3 border-b border-outline/20">
                    <div>
                      <p className="font-semibold text-on-surface">Assignment Reminders</p>
                      <p className="text-xs text-on-surface-variant">Get notified 24 hours before deadlines</p>
                    </div>
                    <Toggle id="notif-assignment" defaultChecked={true} />
                  </div>
                  {/* Feedback Notifications */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-on-surface">Feedback Notifications</p>
                      <p className="text-xs text-on-surface-variant">Notify when instructors provide feedback</p>
                    </div>
                    <Toggle id="notif-feedback" defaultChecked={false} />
                  </div>
                </div>
              </section>

              {/* Privacy & Security */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">
                  Privacy &amp; Security
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-outline/20">
                    <div>
                      <p className="font-semibold text-on-surface">Two-Factor Authentication</p>
                      <p className="text-xs text-on-surface-variant">Add extra security to your account</p>
                    </div>
                    <span className="text-green-600 text-sm font-bold">ENABLED</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-outline/20">
                    <div>
                      <p className="font-semibold text-on-surface">Profile Visibility</p>
                      <p className="text-xs text-on-surface-variant">Control who can see your profile</p>
                    </div>
                    <select
                      value={visibility}
                      onChange={e => setVisibility(e.target.value)}
                      className="bg-white border border-outline px-3 py-1 text-sm text-on-surface"
                    >
                      <option>Everyone</option>
                      <option>Class Members Only</option>
                      <option>Private</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-on-surface">Active Sessions</p>
                      <p className="text-xs text-on-surface-variant">Manage devices with access to your account</p>
                    </div>
                    <button className="text-primary text-sm font-bold hover:underline underline-offset-2">View All</button>
                  </div>
                </div>
              </section>

            </div>

            {/* ── Sidebar Column (4 cols) ── */}
            <div className="col-span-4 flex flex-col gap-8">

              {/* Account Status */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">Account Status</h3>
                <div className="space-y-4">
                  {[
                    { icon: "shield",        label: "Security",     value: "Excellent",  valueColor: "text-green-600" },
                    { icon: "storage",       label: "Storage",      value: "2.4 GB / 5 GB", valueColor: "" },
                    { icon: "verified_user", label: "Verification", value: "Verified",   valueColor: "" },
                  ].map(item => (
                    <div key={item.icon} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-0.5" aria-hidden="true">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{item.label}</p>
                        <p className={`font-bold text-sm ${item.valueColor || "text-on-surface"}`}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Display / Theme */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">Display</h3>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-3 border-2 cursor-pointer ${theme === "light" ? "border-primary bg-slate-50" : "border-outline bg-white hover:bg-slate-50"} transition-colors`}>
                    <input type="radio" name="theme" value="light" checked={theme === "light"}
                      onChange={() => setTheme("light")} className="w-4 h-4" />
                    <span className="flex-1 text-sm font-semibold text-on-surface">Light Mode</span>
                    {theme === "light" && (
                      <span className="material-symbols-outlined text-primary text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">check_circle</span>
                    )}
                  </label>
                  <label className={`flex items-center gap-3 p-3 border cursor-pointer ${theme === "dark" ? "border-primary bg-slate-50" : "border-outline bg-white hover:bg-slate-50"} transition-colors`}>
                    <input type="radio" name="theme" value="dark" checked={theme === "dark"}
                      onChange={() => setTheme("dark")} className="w-4 h-4" />
                    <span className="flex-1 text-sm font-semibold text-on-surface">Dark Mode</span>
                  </label>
                </div>
              </section>

              {/* Danger Zone */}
              <section className="bg-white border-2 border-error/40 p-8">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 pb-4 border-b border-error/40 text-error">
                  Danger Zone
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-error font-bold text-sm py-2 px-4 border border-error/40 hover:bg-error hover:text-white transition-colors">
                    Sign Out All Sessions
                  </button>
                  <button
                    onClick={() => { if (confirm("Delete your account? This cannot be undone.")) alert("Account deleted."); }}
                    className="w-full text-error font-bold text-sm py-2 px-4 border border-error/40 hover:bg-error hover:text-white transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </section>

            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 flex justify-end gap-4 pt-8 border-t border-outline/30">
            <button className="px-8 py-3 text-primary font-bold text-sm border border-outline hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={() => alert("Settings saved!")}
              className="px-8 py-3 bg-primary text-white font-bold text-sm hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>

        </div>
      </main>

      <PageFooter />
    </>
  );
}
