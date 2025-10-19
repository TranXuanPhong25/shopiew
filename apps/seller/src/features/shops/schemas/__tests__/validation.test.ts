import { basicInfoSchema, contactSchema } from '../validation'

describe('Shop Creation Validation Schemas', () => {
  describe('basicInfoSchema', () => {
    it('should validate valid basic info data', () => {
      const validData = {
        name: 'My Shop',
        location: 'New York, USA',
        businessType: 'individual' as const
      }

      const result = basicInfoSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject empty shop name', () => {
      const invalidData = {
        name: '',
        location: 'New York, USA',
        businessType: 'individual' as const
      }

      const result = basicInfoSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errorMessages = result.error.issues.map(e => e.message)
        expect(errorMessages.some(msg => msg.includes('Shop name is required'))).toBe(true)
      }
    })

    it('should reject shop name less than 3 characters', () => {
      const invalidData = {
        name: 'Ab',
        location: 'New York, USA',
        businessType: 'individual' as const
      }

      const result = basicInfoSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errorMessages = result.error.issues.map(e => e.message)
        expect(errorMessages.some(msg => msg.includes('at least 3 characters'))).toBe(true)
      }
    })

    it('should reject empty location', () => {
      const invalidData = {
        name: 'My Shop',
        location: '',
        businessType: 'individual' as const
      }

      const result = basicInfoSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errorMessages = result.error.issues.map(e => e.message)
        expect(errorMessages.some(msg => msg.includes('Location is required'))).toBe(true)
      }
    })
  })

  describe('contactSchema', () => {
    it('should validate valid contact data', () => {
      const validData = {
        email: 'test@example.com',
        phone: '+1 (555) 123-4567'
      }

      const result = contactSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
        phone: '+1 (555) 123-4567'
      }

      const result = contactSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errorMessages = result.error.issues.map(e => e.message)
        expect(errorMessages.some(msg => msg.includes('Email is required'))).toBe(true)
      }
    })

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        phone: '+1 (555) 123-4567'
      }

      const result = contactSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errorMessages = result.error.issues.map(e => e.message)
        expect(errorMessages.some(msg => msg.includes('valid email'))).toBe(true)
      }
    })

    it('should reject empty phone', () => {
      const invalidData = {
        email: 'test@example.com',
        phone: ''
      }

      const result = contactSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errorMessages = result.error.issues.map(e => e.message)
        expect(errorMessages.some(msg => msg.includes('Phone number is required'))).toBe(true)
      }
    })

    it('should reject invalid phone format', () => {
      const invalidData = {
        email: 'test@example.com',
        phone: '123'
      }

      const result = contactSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errorMessages = result.error.issues.map(e => e.message)
        expect(errorMessages.some(msg => msg.includes('valid phone number'))).toBe(true)
      }
    })

    it('should accept various phone formats', () => {
      const validPhones = [
        '+1 (555) 123-4567',
        '1234567890',
        '+84 123 456 789',
        '(123) 456-7890'
      ]

      validPhones.forEach(phone => {
        const data = {
          email: 'test@example.com',
          phone
        }
        const result = contactSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })
})
