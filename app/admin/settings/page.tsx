"use client";

import { useEffect, useState } from "react";
import { Settings, Save, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
    const [noticeText, setNoticeText] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setNoticeText(data.announcement.text);
            setIsEnabled(data.announcement.enabled);
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);

        const payload = {
            announcement: {
                text: noticeText,
                enabled: isEnabled
            }
        };

        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: 'Settings saved successfully!' });
            } else {
                setStatus({ type: 'error', message: 'Failed to save settings.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An unexpected error occurred.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                    <Settings className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
                    <p className="text-gray-500">Configure site-wide announcements and notices</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        Homepage Announcement Notice
                    </h3>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Enable Announcement</p>
                                    <p className="text-sm text-gray-500">Show or hide the notice banner on the home page</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEnabled(!isEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Notice Text
                                </label>
                                <textarea
                                    value={noticeText}
                                    onChange={(e) => setNoticeText(e.target.value)}
                                    placeholder="Enter the notice for your customers (e.g., Free shipping on orders over PKR 5000!)"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary h-32"
                                />
                            </div>
                        </div>

                        {status && (
                            <div className={`p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {status.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                {status.message}
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={saving} className="flex items-center gap-2 text-white">
                                <Save className="h-4 w-4" />
                                {saving ? "Saving..." : "Save Settings"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Preview</h3>
                {isEnabled && noticeText ? (
                    <div className="bg-accent text-white py-2 px-4 text-center text-sm font-medium rounded-md shadow-sm">
                        {noticeText}
                    </div>
                ) : (
                    <p className="text-gray-400 italic text-center py-4">Announcement banner is currently hidden</p>
                )}
            </div>
        </div>
    );
}
