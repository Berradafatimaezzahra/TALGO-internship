"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("creditCard")
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "TalGo*****",
    cardNumber: "2124 56** **** ****",
    expiryDate: "**/**",
    cvv: "***",
  })

  const handleInputChange = (field: string, value: string) => {
    setCardDetails({
      ...cardDetails,
      [field]: value,
    })
  }

  const openPayPal = () => {
    window.open("https://www.paypal.com", "_blank")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-700">TalGo</h1>
        <p className="text-sm text-gray-500">Interns Level Up. Companies Grow Up.</p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold mb-6 text-center">Payment Methods</h2>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            <div className={`border rounded-md p-4 ${paymentMethod === "paypal" ? "border-blue-500" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="font-medium">
                    PayPal
                  </Label>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-700"
                >
                  <path d="M7 11a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4h-1a4 4 0 0 0-4 4v1z"></path>
                  <path d="M21 11V8a4 4 0 0 0-4-4h-1a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4h1"></path>
                  <path d="M3 15v-1a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"></path>
                </svg>
              </div>
              {paymentMethod === "paypal" && (
                <div className="mt-4">
                  <button
                    onClick={openPayPal}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
                  >
                    <span>Continue with PayPal</span>
                  </button>
                </div>
              )}
            </div>

            <div className={`border rounded-md p-4 ${paymentMethod === "creditCard" ? "border-blue-500" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="creditCard" id="creditCard" />
                  <Label htmlFor="creditCard" className="font-medium">
                    Credit Card
                  </Label>
                </div>
                <div className="flex space-x-2">
                  <CreditCard className="h-6 w-6 text-blue-700" />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg"
                    alt="Visa"
                    className="h-6"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg"
                    alt="Mastercard"
                    className="h-6"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
                    alt="Apple Pay"
                    className="h-6"
                  />
                </div>
              </div>
            </div>
          </RadioGroup>

          {paymentMethod === "creditCard" && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white p-4 rounded-lg w-[200px] h-[120px] relative">
                  <div className="absolute top-2 left-2 w-8 h-5 bg-yellow-400 rounded-sm"></div>
                  <div className="absolute bottom-8 left-2 text-xs">CARD HOLDER NAME</div>
                  <div className="absolute bottom-4 left-2 text-xs font-mono">{cardDetails.cardholderName}</div>
                  <div className="absolute top-10 left-2 font-mono text-sm">{cardDetails.cardNumber}</div>
                  <div className="absolute bottom-8 right-2 text-xs">EXPIRES</div>
                  <div className="absolute bottom-4 right-2 text-xs font-mono">{cardDetails.expiryDate}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Card Holder Name</label>
                <Input
                  value={cardDetails.cardholderName}
                  onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <Input
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry date</label>
                  <Input
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">CVV Code</label>
                  <Input
                    value={cardDetails.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    type="password"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
