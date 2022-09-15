import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RegistrationForm } from './RegistrationForm'

describe('RegistrationForm', () => {
  test('is present in DOM', () => {
    render(<RegistrationForm />)

    expect(screen.findAllByTestId('registration-form')).toBeDefined()
  })
})
