import React from 'react'
import { CheckCircle, ArrowRight, Store, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useShopCreationStore } from '../../../../stores/shop-creation-store'

export function ShopCreationSuccess() {
  const router = useRouter()
  const { shopData, resetForm } = useShopCreationStore()

  const handleGoToDashboard = () => {
    resetForm()
    router.push('/dashboard')
  }

  const handleViewShop = () => {
    resetForm()
    // Navigate to shop preview or shop page
    router.push('/shop/preview')
  }

  const handleCreateAnother = () => {
    resetForm()
    // Stay on the same page, form will be reset
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Congratulations! 🎉
            </h1>
            <h2 className="text-xl text-gray-700 mb-6">
              Your shop "{shopData.shopName}" has been created successfully!
            </h2>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Store className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-1">Shop Review</h3>
                <p className="text-sm text-blue-700">
                  Your shop will be reviewed and activated within 24 hours
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Home className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-orange-900 mb-1">Get Started</h3>
                <p className="text-sm text-orange-700">
                  You can start adding products and customizing your shop
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="text-left mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">What's next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Add your first products to start selling
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Customize your shop appearance and branding
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Set up payment methods and shipping options
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Share your shop with customers
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleGoToDashboard}
                className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                onClick={handleViewShop}
                variant="outline"
                className="flex-1"
              >
                <Store className="w-4 h-4 mr-2" />
                View Shop
              </Button>
              <Button 
                onClick={handleCreateAnother}
                variant="outline"
                className="flex-1"
              >
                Create Another Shop
              </Button>
            </div>

            {/* Contact Support */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help getting started?{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                  Contact our support team
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
