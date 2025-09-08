import {act, renderHook} from '@testing-library/react'
import {useVariantStore} from '@/stores'

describe('useVariantStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { resetVariants } = useVariantStore.getState()
    resetVariants()
  })

  it('should add a new option', () => {
    const { result } = renderHook(() => useVariantStore())

    act(() => {
      result.current.addOption()
    })

    expect(result.current.options).toHaveLength(1)
    expect(result.current.options[0]).toMatchObject({
      name: '',
      values: []
    })
  })

  it('should update option name', () => {
    const { result } = renderHook(() => useVariantStore())

    act(() => {
      result.current.addOption()
    })

    const optionId = result.current.options[0].id

    act(() => {
      result.current.updateOptionName(optionId, 'Color')
    })

    expect(result.current.options[0].name).toBe('Color')
  })

  it('should add values to an option', () => {
    const { result } = renderHook(() => useVariantStore())

    act(() => {
      result.current.addOption()
    })

    const optionId = result.current.options[0].id

    act(() => {
      result.current.addValue(optionId)
    })

    expect(result.current.options[0].values).toHaveLength(1)
  })

  it('should generate variants from options', () => {
    const { result } = renderHook(() => useVariantStore())

    // Add Color option
    act(() => {
      result.current.addOption()
    })

    const colorOptionId = result.current.options[0].id

    act(() => {
      result.current.updateOptionName(colorOptionId, 'Color')
      result.current.addValue(colorOptionId)
      result.current.addValue(colorOptionId)
    })

    // Get the value IDs after adding them
    const colorValue1Id = result.current.options[0].values[0].id
    const colorValue2Id = result.current.options[0].values[1].id

    act(() => {
      result.current.updateValue(colorOptionId, colorValue1Id, 'Red')
      result.current.updateValue(colorOptionId, colorValue2Id, 'Blue')
    })

    // Add Size option
    act(() => {
      result.current.addOption()
    })

    const sizeOptionId = result.current.options[1].id

    act(() => {
      result.current.updateOptionName(sizeOptionId, 'Size')
      result.current.addValue(sizeOptionId)
      result.current.addValue(sizeOptionId)
    })

    // Get the value IDs after adding them
    const sizeValue1Id = result.current.options[1].values[0].id
    const sizeValue2Id = result.current.options[1].values[1].id

    act(() => {
      result.current.updateValue(sizeOptionId, sizeValue1Id, 'S')
      result.current.updateValue(sizeOptionId, sizeValue2Id, 'M')
    })

    // Should generate 4 variants (2 colors × 2 sizes)
    expect(result.current.variants).toHaveLength(4)
    
    // The order should be all combinations of Color x Size
    const variantNames = result.current.variants.map(v => v.name)
    expect(variantNames).toContain('Red / S')
    expect(variantNames).toContain('Red / M')
    expect(variantNames).toContain('Blue / S')
    expect(variantNames).toContain('Blue / M')
  })

  it('should toggle variant selection', () => {
    const { result } = renderHook(() => useVariantStore())

    act(() => {
      result.current.addOption()
    })

    const optionId = result.current.options[0].id

    act(() => {
      result.current.updateOptionName(optionId, 'Color')
      result.current.addValue(optionId)
    })

    act(() => {
      result.current.updateValue(optionId, result.current.options[0].values[0].id, 'Red')
    })

    const variantId = result.current.variants[0].id

    act(() => {
      result.current.toggleVariant(variantId)
    })

    expect(result.current.variants[0].selected).toBe(true)

    act(() => {
      result.current.toggleVariant(variantId)
    })

    expect(result.current.variants[0].selected).toBe(false)
  })
})
