# Shop Creation Form Validation

This directory contains the validation schemas for the multi-step shop creation form.

## Validation Schemas

### Basic Info Step (`basicInfoSchema`)
Validates the first step of shop creation:
- **name**: Required, minimum 3 characters, maximum 50 characters
- **location**: Required
- **businessType**: Required, must be either "individual" or "business"

### Contact Step (`contactSchema`)
Validates the second step of shop creation:
- **email**: Required, must be a valid email format
- **phone**: Required, must be at least 10 digits, accepts various formats including:
  - `+1 (555) 123-4567`
  - `1234567890`
  - `+84 123 456 789`
  - `(123) 456-7890`

## How Validation Works

The form uses **react-hook-form** with **Zod** for schema validation:

1. **Immediate Validation**: Form validation triggers immediately on mount via `form.trigger()`
2. **Continuous Validation**: Validation runs on change, blur, and submit (mode: 'all')
3. **Step Navigation**: The "Continue" button is disabled when required fields are not valid
4. **Error Display**: Validation errors are shown inline below each field

## Testing

Run the validation tests:
```bash
cd apps/seller
pnpm test -- validation.test.ts
```

The test suite covers:
- Valid data acceptance
- Required field validation
- Format validation (email, phone)
- Edge cases and various input formats
