import React, { forwardRef, useImperativeHandle } from 'react'
import { CheckCircle, Store, Mail, Phone, MapPin, Image } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useShopCreationStore } from '@/stores'
import { useAuth } from '@/features/auth'

export interface StepRef {
  submit: () => void
  isValid: boolean
  saveData: () => void
}

export const FinishStep = forwardRef<StepRef, object>((props, ref) => {
  const { shopData, submitForm, isSubmitting } = useShopCreationStore()
  const { user } = useAuth()

  useImperativeHandle(ref, () => ({
    submit: () => {
      // Submit the form when Continue/Create Shop is clicked
      if (user?.userId) {
        submitForm(user.userId)
      } else {
        console.error('User ID not available for shop creation')
      }
    },
    isValid: true, // Finish step is always valid
    saveData: () => {
      // No data to save in finish step
    }
  }))

  const handleCreateShop = () => {
    if (user?.userId) {
      submitForm(user.userId)
    } else {
      console.error('User ID not available for shop creation')
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost Done!</h2>
        <p className="text-gray-600">Review your shop information and create your store</p>
      </div>

      {/* Shop Summary */}
      <div className="space-y-6">
        {/* Visual Assets */}
        {(shopData.logo || shopData.banner) && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Image className="w-5 h-5 mr-2 text-orange-600" />
                Visual Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shopData.logo && (
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-2">Logo</label>
                  <div className="inline-block">
                    <img 
                      src={typeof shopData.logo === 'string' ? shopData.logo : URL.createObjectURL(shopData.logo)} 
                      alt="Shop logo"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                </div>
              )}
              {shopData.banner && (
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-2">Cover Image</label>
                  <div className="inline-block">
                    <img 
                      src={typeof shopData.banner === 'string' ? shopData.banner : URL.createObjectURL(shopData.banner)} 
                      alt="Shop cover"
                      className="w-48 h-27 object-cover rounded-lg border border-gray-200"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Store className="w-5 h-5 mr-2 text-orange-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Shop Name</label>
                <p className="text-gray-900">{shopData.name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Location</label>
                <p className="text-gray-900">{shopData.location || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Business Type</label>
                <p className="text-gray-900 capitalize">{shopData.businessType || 'Not provided'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Phone className="w-5 h-5 mr-2 text-orange-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{shopData.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{shopData.phone || 'Not provided'}</p>
                </div>
              </div>
             
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Terms and Conditions */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            </div>
            <div className="text-sm">
              <p className="text-gray-800 mb-2">
                By creating your shop, you agree to our{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                  Privacy Policy
                </a>
                .
              </p>
              <p className="text-gray-600">
                Your shop will be reviewed and activated within 24 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Shop Button */}
      <div className="text-center pt-4">
        <button
          onClick={handleCreateShop}
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Your Shop...
            </>
          ) : (
            <>
              <CheckCircle className="inline-block w-5 h-5 mr-2" />
              Create My Shop
            </>
          )}
        </button>
      </div>
    </div>
  )
})

FinishStep.displayName = 'FinishStep'
