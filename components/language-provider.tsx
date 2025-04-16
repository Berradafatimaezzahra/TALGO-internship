"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define available languages
export type Language = "en" | "es" | "fr" | "de"

// Define translations
type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

// More comprehensive translations
const translations: Translations = {
  en: {
    // General
    dashboard: "Dashboard",
    profile: "Profile",
    chat: "Chat",
    applications: "My Applications",
    programs: "Available Internships",
    settings: "Settings",
    darkMode: "Dark Mode",
    fontSize: "Font Size",
    language: "Language",
    save: "Save Changes",
    delete: "Delete Account",
    welcome: "Welcome to TalGo",
    apply: "Apply Now",
    tasks: "Program Tasks",
    logout: "Logout",

    // Auth
    login: "Login",
    signup: "Sign Up",
    forgotPassword: "Forgot Password",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",

    // Settings
    notifications: "Notifications",
    emailNotifications: "Email Notifications",
    pushNotifications: "Push Notifications",
    marketingEmails: "Marketing Emails",
    security: "Security",
    twoFactorAuth: "Two-Factor Authentication",
    changePassword: "Change Password",
    appearance: "Appearance",
    dangerZone: "Danger Zone",

    // Programs
    duration: "Duration",
    difficulty: "Difficulty",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    submitApplication: "Submit Application",
    cancel: "Cancel",

    // Profile
    name: "Name",
    role: "Role",
    location: "Location",
    bio: "Bio",
    education: "Education",
    university: "University",
    graduationYear: "Graduation Year",
  },
  es: {
    // General
    dashboard: "Panel de Control",
    profile: "Perfil",
    chat: "Chat",
    applications: "Mis Aplicaciones",
    programs: "Pasantías Disponibles",
    settings: "Configuración",
    darkMode: "Modo Oscuro",
    fontSize: "Tamaño de Fuente",
    language: "Idioma",
    save: "Guardar Cambios",
    delete: "Eliminar Cuenta",
    welcome: "Bienvenido a TalGo",
    apply: "Aplicar Ahora",
    tasks: "Tareas del Programa",
    logout: "Cerrar Sesión",

    // Auth
    login: "Iniciar Sesión",
    signup: "Registrarse",
    forgotPassword: "Olvidé mi Contraseña",
    email: "Correo Electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    createAccount: "Crear Cuenta",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    dontHaveAccount: "¿No tienes una cuenta?",

    // Settings
    notifications: "Notificaciones",
    emailNotifications: "Notificaciones por Correo",
    pushNotifications: "Notificaciones Push",
    marketingEmails: "Correos de Marketing",
    security: "Seguridad",
    twoFactorAuth: "Autenticación de Dos Factores",
    changePassword: "Cambiar Contraseña",
    appearance: "Apariencia",
    dangerZone: "Zona de Peligro",

    // Programs
    duration: "Duración",
    difficulty: "Dificultad",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    submitApplication: "Enviar Solicitud",
    cancel: "Cancelar",

    // Profile
    name: "Nombre",
    role: "Rol",
    location: "Ubicación",
    bio: "Biografía",
    education: "Educación",
    university: "Universidad",
    graduationYear: "Año de Graduación",
  },
  fr: {
    // General
    dashboard: "Tableau de Bord",
    profile: "Profil",
    chat: "Discussion",
    applications: "Mes Candidatures",
    programs: "Stages Disponibles",
    settings: "Paramètres",
    darkMode: "Mode Sombre",
    fontSize: "Taille de Police",
    language: "Langue",
    save: "Enregistrer les Modifications",
    delete: "Supprimer le Compte",
    welcome: "Bienvenue sur TalGo",
    apply: "Postuler Maintenant",
    tasks: "Tâches du Programme",
    logout: "Déconnexion",

    // Auth
    login: "Connexion",
    signup: "Inscription",
    forgotPassword: "Mot de Passe Oublié",
    email: "Email",
    password: "Mot de Passe",
    confirmPassword: "Confirmer le Mot de Passe",
    createAccount: "Créer un Compte",
    alreadyHaveAccount: "Vous avez déjà un compte?",
    dontHaveAccount: "Vous n'avez pas de compte?",

    // Settings
    notifications: "Notifications",
    emailNotifications: "Notifications par Email",
    pushNotifications: "Notifications Push",
    marketingEmails: "Emails Marketing",
    security: "Sécurité",
    twoFactorAuth: "Authentification à Deux Facteurs",
    changePassword: "Changer le Mot de Passe",
    appearance: "Apparence",
    dangerZone: "Zone Dangereuse",

    // Programs
    duration: "Durée",
    difficulty: "Difficulté",
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
    submitApplication: "Soumettre la Candidature",
    cancel: "Annuler",

    // Profile
    name: "Nom",
    role: "Rôle",
    location: "Emplacement",
    bio: "Biographie",
    education: "Éducation",
    university: "Université",
    graduationYear: "Année de Diplôme",
  },
  de: {
    // General
    dashboard: "Dashboard",
    profile: "Profil",
    chat: "Chat",
    applications: "Meine Bewerbungen",
    programs: "Verfügbare Praktika",
    settings: "Einstellungen",
    darkMode: "Dunkelmodus",
    fontSize: "Schriftgröße",
    language: "Sprache",
    save: "Änderungen Speichern",
    delete: "Konto Löschen",
    welcome: "Willkommen bei TalGo",
    apply: "Jetzt Bewerben",
    tasks: "Programmaufgaben",
    logout: "Abmelden",

    // Auth
    login: "Anmelden",
    signup: "Registrieren",
    forgotPassword: "Passwort Vergessen",
    email: "E-Mail",
    password: "Passwort",
    confirmPassword: "Passwort Bestätigen",
    createAccount: "Konto Erstellen",
    alreadyHaveAccount: "Haben Sie bereits ein Konto?",
    dontHaveAccount: "Haben Sie kein Konto?",

    // Settings
    notifications: "Benachrichtigungen",
    emailNotifications: "E-Mail-Benachrichtigungen",
    pushNotifications: "Push-Benachrichtigungen",
    marketingEmails: "Marketing-E-Mails",
    security: "Sicherheit",
    twoFactorAuth: "Zwei-Faktor-Authentifizierung",
    changePassword: "Passwort Ändern",
    appearance: "Erscheinungsbild",
    dangerZone: "Gefahrenzone",

    // Programs
    duration: "Dauer",
    difficulty: "Schwierigkeitsgrad",
    beginner: "Anfänger",
    intermediate: "Fortgeschritten",
    advanced: "Experte",
    submitApplication: "Bewerbung Einreichen",
    cancel: "Abbrechen",

    // Profile
    name: "Name",
    role: "Rolle",
    location: "Standort",
    bio: "Biografie",
    education: "Bildung",
    university: "Universität",
    graduationYear: "Abschlussjahr",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isInitialized, setIsInitialized] = useState(false)

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("talgo-language") as Language
    if (savedLanguage && ["en", "es", "fr", "de"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
    setIsInitialized(true)
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("talgo-language", language)
      document.documentElement.lang = language

      // Force re-render of components that depend on language
      const event = new Event("languagechange", { bubbles: true })
      window.dispatchEvent(event)
    }
  }, [language, isInitialized])

  // Add an event listener for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // This is intentionally empty to force re-renders when language changes
    }

    window.addEventListener("languagechange", handleLanguageChange)
    return () => window.removeEventListener("languagechange", handleLanguageChange)
  }, [])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
