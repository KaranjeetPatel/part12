import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// reset jsdom (simulate browser) after each test
afterEach(() => {
  cleanup()
})