"use client"

import React, {useState} from "react"
import {ArrowLeft, ArrowRight, Eye, FileText, Globe, Palette, Phone, Settings, Store, Upload} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Checkbox} from "@/components/ui/checkbox"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

interface ShopData {
   // Basic Info
   shopName: string
   description: string
   category: string
   logo: string
   banner: string

   // Settings
   currency: string
   language: string
   timezone: string
   shippingEnabled: boolean
   digitalProducts: boolean

   // Branding
   primaryColor: string
   secondaryColor: string
   fontStyle: string

   // Contact
   email: string
   phone: string
   address: string
   city: string
   country: string
   zipCode: string

   // Social
   website: string
   facebook: string
   instagram: string
   twitter: string

   // Policies
   returnPolicy: string
   shippingPolicy: string
   privacyPolicy: string
   termsOfService: string
}

const steps = [
   { id: "basic", title: "Basic Info", icon: Store },
   { id: "settings", title: "Settings", icon: Settings },
   { id: "branding", title: "Branding", icon: Palette },
   { id: "contact", title: "Contact", icon: Phone },
   { id: "social", title: "Social Media", icon: Globe },
   { id: "policies", title: "Policies", icon: FileText },
]

const categories = [
   "Fashion & Apparel",
   "Electronics",
   "Home & Garden",
   "Health & Beauty",
   "Sports & Outdoors",
   "Books & Media",
   "Toys & Games",
   "Food & Beverages",
   "Art & Crafts",
   "Other",
]

export default function ShopCreationPage() {
   const [currentStep, setCurrentStep] = useState(0)
   const [shopData, setShopData] = useState<ShopData>({
      shopName: "",
      description: "",
      category: "",
      logo: "",
      banner: "",
      currency: "USD",
      language: "English",
      timezone: "UTC",
      shippingEnabled: true,
      digitalProducts: false,
      primaryColor: "#3b82f6",
      secondaryColor: "#1f2937",
      fontStyle: "Inter",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      zipCode: "",
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      returnPolicy: "",
      shippingPolicy: "",
      privacyPolicy: "",
      termsOfService: "",
   })

   const [showPreview, setShowPreview] = useState(false)

   const updateShopData = (field: keyof ShopData, value: string | boolean) => {
      setShopData((prev) => ({ ...prev, [field]: value }))
   }

   const nextStep = () => {
      if (currentStep < steps.length - 1) {
         setCurrentStep(currentStep + 1)
      }
   }

   const prevStep = () => {
      if (currentStep > 0) {
         setCurrentStep(currentStep - 1)
      }
   }

   const progress = ((currentStep + 1) / steps.length) * 100

   const handleSubmit = () => {
      console.log("Shop data:", shopData)
      // Here you would submit the data to your backend
      alert("Shop created successfully!")
   }

   const renderStepContent = () => {
      switch (steps[currentStep].id) {
         case "basic":
            return (
               <div className="space-y-6">
                  <div className="space-y-2">
                     <Label htmlFor="shopName">Shop Name *</Label>
                     <Input
                        id="shopName"
                        value={shopData.shopName}
                        onChange={(e) => updateShopData("shopName", e.target.value)}
                        placeholder="Enter your shop name"
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="description">Shop Description *</Label>
                     <Textarea
                        id="description"
                        value={shopData.description}
                        onChange={(e) => updateShopData("description", e.target.value)}
                        placeholder="Describe what your shop sells and what makes it unique"
                        rows={4}
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="category">Category *</Label>
                     <Select value={shopData.category} onValueChange={(value) => updateShopData("category", value)}>
                        <SelectTrigger>
                           <SelectValue placeholder="Select your shop category" />
                        </SelectTrigger>
                        <SelectContent>
                           {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                 {category}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label>Shop Logo</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                           <Upload className="mx-auto h-12 w-12 text-gray-400" />
                           <p className="mt-2 text-sm text-gray-600">Upload your logo</p>
                           <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label>Shop Banner</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                           <Upload className="mx-auto h-12 w-12 text-gray-400" />
                           <p className="mt-2 text-sm text-gray-600">Upload banner image</p>
                           <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                     </div>
                  </div>
               </div>
            )

         case "settings":
            return (
               <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={shopData.currency} onValueChange={(value) => updateShopData("currency", value)}>
                           <SelectTrigger>
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                              <SelectItem value="JPY">JPY (¥)</SelectItem>
                              <SelectItem value="CAD">CAD (C$)</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={shopData.language} onValueChange={(value) => updateShopData("language", value)}>
                           <SelectTrigger>
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Spanish">Spanish</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                              <SelectItem value="German">German</SelectItem>
                              <SelectItem value="Italian">Italian</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={shopData.timezone} onValueChange={(value) => updateShopData("timezone", value)}>
                           <SelectTrigger>
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="EST">EST</SelectItem>
                              <SelectItem value="PST">PST</SelectItem>
                              <SelectItem value="GMT">GMT</SelectItem>
                              <SelectItem value="CET">CET</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center space-x-2">
                        <Checkbox
                           id="shipping"
                           checked={shopData.shippingEnabled}
                           onCheckedChange={(checked) => updateShopData("shippingEnabled", checked as boolean)}
                        />
                        <Label htmlFor="shipping">Enable physical product shipping</Label>
                     </div>

                     <div className="flex items-center space-x-2">
                        <Checkbox
                           id="digital"
                           checked={shopData.digitalProducts}
                           onCheckedChange={(checked) => updateShopData("digitalProducts", checked as boolean)}
                        />
                        <Label htmlFor="digital">Sell digital products</Label>
                     </div>
                  </div>
               </div>
            )

         case "branding":
            return (
               <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                           <Input
                              id="primaryColor"
                              type="color"
                              value={shopData.primaryColor}
                              onChange={(e) => updateShopData("primaryColor", e.target.value)}
                              className="w-16 h-10"
                           />
                           <Input
                              value={shopData.primaryColor}
                              onChange={(e) => updateShopData("primaryColor", e.target.value)}
                              placeholder="#3b82f6"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                        <div className="flex items-center space-x-2">
                           <Input
                              id="secondaryColor"
                              type="color"
                              value={shopData.secondaryColor}
                              onChange={(e) => updateShopData("secondaryColor", e.target.value)}
                              className="w-16 h-10"
                           />
                           <Input
                              value={shopData.secondaryColor}
                              onChange={(e) => updateShopData("secondaryColor", e.target.value)}
                              placeholder="#1f2937"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="fontStyle">Font Style</Label>
                     <Select value={shopData.fontStyle} onValueChange={(value) => updateShopData("fontStyle", value)}>
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Inter">Inter</SelectItem>
                           <SelectItem value="Roboto">Roboto</SelectItem>
                           <SelectItem value="Open Sans">Open Sans</SelectItem>
                           <SelectItem value="Lato">Lato</SelectItem>
                           <SelectItem value="Montserrat">Montserrat</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                     <h4 className="font-medium mb-2">Preview</h4>
                     <div
                        className="p-4 rounded border"
                        style={{
                           backgroundColor: shopData.primaryColor + "10",
                           borderColor: shopData.primaryColor,
                           fontFamily: shopData.fontStyle,
                        }}
                     >
                        <h3 style={{ color: shopData.primaryColor }}>{shopData.shopName || "Your Shop Name"}</h3>
                        <p style={{ color: shopData.secondaryColor }}>This is how your branding will look</p>
                     </div>
                  </div>
               </div>
            )

         case "contact":
            return (
               <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                           id="email"
                           type="email"
                           value={shopData.email}
                           onChange={(e) => updateShopData("email", e.target.value)}
                           placeholder="shop@example.com"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                           id="phone"
                           value={shopData.phone}
                           onChange={(e) => updateShopData("phone", e.target.value)}
                           placeholder="+1 (555) 123-4567"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="address">Street Address</Label>
                     <Input
                        id="address"
                        value={shopData.address}
                        onChange={(e) => updateShopData("address", e.target.value)}
                        placeholder="123 Main Street"
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                           id="city"
                           value={shopData.city}
                           onChange={(e) => updateShopData("city", e.target.value)}
                           placeholder="New York"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                           id="country"
                           value={shopData.country}
                           onChange={(e) => updateShopData("country", e.target.value)}
                           placeholder="United States"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                           id="zipCode"
                           value={shopData.zipCode}
                           onChange={(e) => updateShopData("zipCode", e.target.value)}
                           placeholder="10001"
                        />
                     </div>
                  </div>
               </div>
            )

         case "social":
            return (
               <div className="space-y-6">
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                           id="website"
                           value={shopData.website}
                           onChange={(e) => updateShopData("website", e.target.value)}
                           placeholder="https://yourwebsite.com"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                           id="facebook"
                           value={shopData.facebook}
                           onChange={(e) => updateShopData("facebook", e.target.value)}
                           placeholder="https://facebook.com/yourshop"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                           id="instagram"
                           value={shopData.instagram}
                           onChange={(e) => updateShopData("instagram", e.target.value)}
                           placeholder="https://instagram.com/yourshop"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                           id="twitter"
                           value={shopData.twitter}
                           onChange={(e) => updateShopData("twitter", e.target.value)}
                           placeholder="https://twitter.com/yourshop"
                        />
                     </div>
                  </div>
               </div>
            )

         case "policies":
            return (
               <div className="space-y-6">
                  <Tabs defaultValue="return" className="w-full">
                     <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="return">Return</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        <TabsTrigger value="terms">Terms</TabsTrigger>
                     </TabsList>

                     <TabsContent value="return" className="space-y-2">
                        <Label htmlFor="returnPolicy">Return Policy</Label>
                        <Textarea
                           id="returnPolicy"
                           value={shopData.returnPolicy}
                           onChange={(e) => updateShopData("returnPolicy", e.target.value)}
                           placeholder="Describe your return policy..."
                           rows={6}
                        />
                     </TabsContent>

                     <TabsContent value="shipping" className="space-y-2">
                        <Label htmlFor="shippingPolicy">Shipping Policy</Label>
                        <Textarea
                           id="shippingPolicy"
                           value={shopData.shippingPolicy}
                           onChange={(e) => updateShopData("shippingPolicy", e.target.value)}
                           placeholder="Describe your shipping policy..."
                           rows={6}
                        />
                     </TabsContent>

                     <TabsContent value="privacy" className="space-y-2">
                        <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                        <Textarea
                           id="privacyPolicy"
                           value={shopData.privacyPolicy}
                           onChange={(e) => updateShopData("privacyPolicy", e.target.value)}
                           placeholder="Describe your privacy policy..."
                           rows={6}
                        />
                     </TabsContent>

                     <TabsContent value="terms" className="space-y-2">
                        <Label htmlFor="termsOfService">Terms of Service</Label>
                        <Textarea
                           id="termsOfService"
                           value={shopData.termsOfService}
                           onChange={(e) => updateShopData("termsOfService", e.target.value)}
                           placeholder="Describe your terms of service..."
                           rows={6}
                        />
                     </TabsContent>
                  </Tabs>
               </div>
            )

         default:
            return null
      }
   }

   if (showPreview) {
      return (
         <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
               <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Shop Preview</h1>
                  <Button onClick={() => setShowPreview(false)} variant="outline" className="bg-transparent">
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Back to Editor
                  </Button>
               </div>

               <Card>
                  <CardContent className="p-0">
                     {/* Shop Header */}
                     <div
                        className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative"
                        style={{ backgroundColor: shopData.primaryColor }}
                     >
                        <div className="absolute bottom-4 left-6">
                           <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                 <Store className="h-8 w-8" style={{ color: shopData.primaryColor }} />
                              </div>
                              <div>
                                 <h2 className="text-2xl font-bold text-white" style={{ fontFamily: shopData.fontStyle }}>
                                    {shopData.shopName || "Your Shop Name"}
                                 </h2>
                                 <p className="text-white/80">{shopData.category}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Shop Info */}
                     <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <h3 className="font-semibold mb-2">About</h3>
                              <p className="text-gray-600">{shopData.description || "Shop description will appear here..."}</p>
                           </div>
                           <div>
                              <h3 className="font-semibold mb-2">Contact</h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                 {shopData.email && <p>Email: {shopData.email}</p>}
                                 {shopData.phone && <p>Phone: {shopData.phone}</p>}
                                 {shopData.address && (
                                    <p>
                                       Address: {shopData.address}, {shopData.city}, {shopData.country}
                                    </p>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Shop</h1>
               <p className="text-gray-600">Set up your online store in just a few steps</p>
            </div>

            {/* Progress */}
            <div className="mb-8">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">
                     Step {currentStep + 1} of {steps.length}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setShowPreview(true)} className="bg-transparent">
                     <Eye className="h-4 w-4 mr-2" />
                     Preview
                  </Button>
               </div>
               <Progress value={progress} className="h-2" />
            </div>

            {/* Steps Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
               {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                     <Badge
                        key={step.id}
                        variant={index === currentStep ? "default" : index < currentStep ? "secondary" : "outline"}
                        className="px-3 py-2 cursor-pointer"
                        onClick={() => setCurrentStep(index)}
                     >
                        <Icon className="h-3 w-3 mr-1" />
                        {step.title}
                     </Badge>
                  )
               })}
            </div>

            {/* Main Content */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center">
                     {React.createElement(steps[currentStep].icon, { className: "h-5 w-5 mr-2" })}
                     {steps[currentStep].title}
                  </CardTitle>
                  <CardDescription>
                     {steps[currentStep].id === "basic" && "Tell us about your shop and what you sell"}
                     {steps[currentStep].id === "settings" && "Configure your shop settings and preferences"}
                     {steps[currentStep].id === "branding" && "Customize your shop's look and feel"}
                     {steps[currentStep].id === "contact" && "Add your contact information"}
                     {steps[currentStep].id === "social" && "Connect your social media accounts"}
                     {steps[currentStep].id === "policies" && "Set up your shop policies"}
                  </CardDescription>
               </CardHeader>
               <CardContent>{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
               <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
               </Button>

               {currentStep === steps.length - 1 ? (
                  <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                     Create Shop
                  </Button>
               ) : (
                  <Button onClick={nextStep}>
                     Next
                     <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
               )}
            </div>
         </div>
      </div>
   )
}
