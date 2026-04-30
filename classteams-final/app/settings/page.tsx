'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [assignmentReminders, setAssignmentReminders] = useState(true);
  const [feedbackNotif, setFeedbackNotif] = useState(false);

  function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none border border-outline peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />

      <main className="flex-grow ml-64 flex flex-col min-h-screen">
        <TopBar searchPlaceholder="SEARCH SETTINGS..." />

        <section className="p-12 flex-grow bg-background">
          <div className="max-w-6xl mx-auto">

            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li><Link href="/" className="text-primary hover:text-blue-700 font-semibold transition-colors">Dashboard</Link></li>
                <li className="text-on-surface-variant">/</li>
                <li className="text-on-surface-variant font-semibold">Settings</li>
              </ol>
            </nav>

            <header className="mb-12">
              <h2 className="text-5xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">Settings</h2>
              <p className="text-sm font-mono text-slate-500 tracking-widest uppercase">Manage your account and preferences</p>
            </header>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 flex flex-col gap-8">

                {/* Account Settings */}
                <section className="bg-white p-8 border border-outline">
                  <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">Account Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 bg-secondary-container border border-outline flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-2xl text-secondary">account_circle</span>
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
                        <button className="text-primary text-sm font-bold hover:underline underline-offset-2">Edit Profile</button>
                      </div>
                    </div>

                    <div className="h-px bg-outline"></div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Email Address</label>
                        <div className="flex items-center gap-3 bg-slate-50 p-3 border border-outline">
                          <input type="email" defaultValue="jay.chen@classteams.edu" className="flex-1 bg-transparent outline-none text-on-surface text-sm" disabled />
                          <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                        </div>
                      </div>
                      <button className="text-primary text-sm font-bold hover:underline underline-offset-2">Change Password</button>
                    </div>
                  </div>
                </section>

                {/* Notification Settings */}
                <section className="bg-white p-8 border border-outline">
                  <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-outline">
                      <div>
                        <p className="font-semibold text-on-surface">Email Notifications</p>
                        <p className="text-xs text-on-surface-variant">Receive email updates for important events</p>
                      </div>
                      <Toggle checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-outline">
                      <div>
                        <p className="font-semibold text-on-surface">Assignment Reminders</p>
                        <p className="text-xs text-on-surface-variant">Get notified 24 hours before deadlines</p>
                      </div>
                      <Toggle checked={assignmentReminders} onChange={() => setAssignmentReminders(!assignmentReminders)} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-semibold text-on-surface">Feedback Notifications</p>
                        <p className="text-xs text-on-surface-variant">Notify when instructors provide feedback</p>
                      </div>
                      <Toggle checked={feedbackNotif} onChange={() => setFeedbackNotif(!feedbackNotif)} />
                    </div>
                  </div>
                </section>

                {/* Privacy & Security */}
                <section className="bg-white p-8 border border-outline">
                  <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">Privacy & Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-outline">
                      <div>
                        <p className="font-semibold text-on-surface">Two-Factor Authentication</p>
                        <p className="text-xs text-on-surface-variant">Add extra security to your account</p>
                      </div>
                      <span className="text-green-600 text-sm font-bold">ENABLED</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-outline">
                      <div>
                        <p className="font-semibold text-on-surface">Profile Visibility</p>
                        <p className="text-xs text-on-surface-variant">Control who can see your profile</p>
                      </div>
                      <select className="bg-white border border-outline px-3 py-1 text-sm text-on-surface">
                        <option>Everyone</option>
                        <option defaultValue="Class Members Only">Class Members Only</option>
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

                {/* Theme Settings */}
                <section className="bg-white p-8 border border-outline">
                  <h3 className="text-lg font-bold text-on-background mb-6 pb-4 border-b border-outline">Appearance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-semibold text-on-surface">Theme</p>
                        <p className="text-xs text-on-surface-variant">Choose your preferred color scheme</p>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="theme" id="light-theme" defaultChecked className="w-4 h-4" />
                          <span className="text-sm font-medium">Light</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="theme" id="dark-theme" className="w-4 h-4" />
                          <span className="text-sm font-medium">Dark</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <aside className="col-span-4 flex flex-col gap-8">
                <section className="bg-white p-8 border border-outline">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Account Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Plan</span>
                      <span className="font-bold text-primary">Student Pro</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Joined</span>
                      <span className="font-bold">Sep 2024</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Status</span>
                      <span className="font-bold text-green-600">Active</span>
                    </div>
                  </div>
                </section>

                <section className="bg-tertiary p-8 text-on-tertiary">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-6 text-slate-400">Danger Zone</h3>
                  <div className="space-y-4">
                    <button className="w-full border border-red-700 text-red-400 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-900 transition-colors">
                      Export Data
                    </button>
                    <button className="w-full border border-red-700 text-red-400 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-900 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
