"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "@/components/theme-provider"
import { useSettings, type UserSettings } from "@/components/settings-provider"
import { useLanguage, type Language } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

// Default settings as a fallback
const defaultSettings: UserSettings = {
  name: "John Doe",
  email: "john@example.com",
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  twoFactorAuth: false,
  fontSize: "medium",
  language: "en",
  darkMode: false,
}

export default function Settings() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  // Initialize settings context values
  const settingsContext = useSettings()
  const contextSettings = settingsContext?.settings
  const updateContextSettings = settingsContext?.updateSettings
  const saveContextSettings = settingsContext?.saveSettings

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Use context settings if available, otherwise use default
  const [localSettings, setLocalSettings] = useState<UserSettings>(
    contextSettings || {
      ...defaultSettings,
      darkMode: theme === "dark",
      language,
    },
  )

  const [hasChanges, setHasChanges] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Update local settings when context settings change
  useEffect(() => {
    if (contextSettings) {
      setLocalSettings(contextSettings)
    }
  }, [contextSettings])

  // Check if settings have changed
  useEffect(() => {
    if (contextSettings) {
      const hasChanged = JSON.stringify(localSettings) !== JSON.stringify(contextSettings)
      setHasChanges(hasChanged)
    }
  }, [localSettings, contextSettings])

  const handleToggle = (field: keyof UserSettings) => {
    if (field === "darkMode") {
      const newDarkMode = !localSettings.darkMode
      setTheme(newDarkMode ? "dark" : "light")
      setLocalSettings({
        ...localSettings,
        darkMode: newDarkMode,
      })
    } else {
      setLocalSettings({
        ...localSettings,
        [field]: !localSettings[field as keyof typeof localSettings],
      })
    }
  }

  const handleSaveChanges = useCallback(() => {
    // Update settings in context if available
    if (updateContextSettings) {
      updateContextSettings(localSettings)
    }

    // Save settings to localStorage if context method available
    if (saveContextSettings) {
      saveContextSettings()
    } else {
      // Fallback: save directly to localStorage
      localStorage.setItem("talgo-user-settings", JSON.stringify(localSettings))
    }

    // Update language if it changed
    if (localSettings.language !== language) {
      setLanguage(localSettings.language as Language)

      // Force refresh to apply language changes
      window.dispatchEvent(new Event("languagechange", { bubbles: true }))
    }

    toast({
      title: t("save"),
      description: "Your settings have been saved successfully.",
    })
  }, [localSettings, updateContextSettings, saveContextSettings, language, setLanguage, t])

  const handlePasswordChange = () => {
    setPasswordError(null)

    // Validate password
    if (passwordForm.currentPassword.length < 6) {
      setPasswordError("Current password is required")
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters")
      return
    }

    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation password must match")
      return
    }

    // In a real app, this would call an API to change the password
    // For demo purposes, we'll simulate a successful password change

    // Store the new password in localStorage for demonstration
    localStorage.setItem("talgo-password", passwordForm.newPassword)

    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    })

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setIsPasswordDialogOpen(false)
  }

  const handleDeleteAccount = () => {
    setIsDeleting(true)

    // In a real app, this would call an API to delete the account
    // For demo purposes, we'll clear local storage and redirect to login

    // Simulate API call with timeout
    setTimeout(() => {
      // Clear all application data
      localStorage.removeItem("talgo-user-settings")
      localStorage.removeItem("talgo-password")
      localStorage.removeItem("talgo-language")
      localStorage.removeItem("sidebar-state")

      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
        variant: "destructive",
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("settings")}</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t("profile")}</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t("name")}</label>
              <Input
                value={localSettings.name}
                onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("email")}</label>
              <Input
                value={localSettings.email}
                onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                type="email"
              />
            </div>

            <div>
              <Button variant="outline" onClick={handleSaveChanges} disabled={!hasChanges}>
                {t("save")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t("notifications")}</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">{t("emailNotifications")}</label>
                <p className="text-xs text-gray-500">Receive notifications about your applications via email</p>
              </div>
              <Switch
                checked={localSettings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">{t("pushNotifications")}</label>
                <p className="text-xs text-gray-500">Receive notifications on your device</p>
              </div>
              <Switch
                checked={localSettings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">{t("marketingEmails")}</label>
                <p className="text-xs text-gray-500">Receive emails about new features and opportunities</p>
              </div>
              <Switch checked={localSettings.marketingEmails} onCheckedChange={() => handleToggle("marketingEmails")} />
            </div>

            <div>
              <Button variant="outline" onClick={handleSaveChanges} disabled={!hasChanges}>
                {t("save")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t("security")}</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">{t("changePassword")}</label>
                <p className="text-xs text-gray-500">Update your account password</p>
              </div>
              <AlertDialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    {t("changePassword")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("changePassword")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Enter your current password and a new password below.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-4 py-4">
                    {passwordError && <div className="text-sm font-medium text-red-500">{passwordError}</div>}
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <Input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <Input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <Input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePasswordChange}>{t("changePassword")}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">{t("twoFactorAuth")}</label>
                <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <Switch checked={localSettings.twoFactorAuth} onCheckedChange={() => handleToggle("twoFactorAuth")} />
            </div>

            <div>
              <Button variant="outline" onClick={handleSaveChanges} disabled={!hasChanges}>
                {t("save")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t("appearance")}</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">{t("darkMode")}</label>
                <p className="text-xs text-gray-500">Toggle between light and dark theme</p>
              </div>
              <Switch checked={localSettings.darkMode} onCheckedChange={() => handleToggle("darkMode")} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("fontSize")}</label>
              <Select
                value={localSettings.fontSize}
                onValueChange={(value) =>
                  setLocalSettings({ ...localSettings, fontSize: value as "small" | "medium" | "large" })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("language")}</label>
              <Select
                value={localSettings.language}
                onValueChange={(value) => setLocalSettings({ ...localSettings, language: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button variant="outline" onClick={handleSaveChanges} disabled={!hasChanges}>
                {t("save")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t("dangerZone")}</h2>

          <div>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">{t("delete")}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>{t("cancel")}</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : t("delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
