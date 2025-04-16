"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Upload, Mail, Phone, Clock, Linkedin, Twitter } from "lucide-react"

export default function ContactUs() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setContactForm({
      ...contactForm,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the form data to a backend
    alert("Message sent!")
  }

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password.",
    },
    {
      question: "How can I connect with my mentor?",
      answer:
        "Once you're matched with a mentor, you can use the chat feature to communicate with them. You can also schedule video calls through the platform.",
    },
    {
      question: "What should I do if I'm having technical issues?",
      answer:
        "If you're experiencing technical issues, please try clearing your browser cache and cookies. If the problem persists, contact our support team through the contact form.",
    },
    {
      question: "How do I track my internship progress?",
      answer:
        "You can track your internship progress through the dashboard. It shows your completed tasks, upcoming deadlines, and overall progress.",
    },
    {
      question: "Can I change my mentor?",
      answer:
        "Yes, you can request to change your mentor once during your internship. Go to your profile settings and select 'Request Mentor Change'.",
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Need help? We're here for you!</h1>
      <p className="text-gray-600 mb-6">
        Have questions or concerns? Our support team is ready to assist you. Choose your preferred way to reach us
        below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Subject *</label>
                  <Select onValueChange={(value) => handleInputChange("subject", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                  </Button>
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-700 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Email</h3>
                    <p className="text-sm text-blue-700">support@talgo.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-700 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Phone</h3>
                    <p className="text-sm">Mon-Fri, 9:00 AM - 6:00 PM EST</p>
                    <p className="text-sm text-blue-700">+1 (234) 567-890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-700 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Response Time</h3>
                    <p className="text-sm">We typically respond within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-sm font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
