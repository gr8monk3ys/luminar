import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { getClientIp } from '@/lib/get-client-ip'

function requestWith(headers: Record<string, string>) {
  return new NextRequest('http://localhost/api/test', { headers })
}

describe('getClientIp', () => {
  it('prefers x-real-ip, which the platform sets and overwrites', () => {
    const request = requestWith({
      'x-real-ip': '203.0.113.7',
      'x-forwarded-for': '1.1.1.1, 203.0.113.7',
    })
    expect(getClientIp(request)).toBe('203.0.113.7')
  })

  it('takes the RIGHT-most x-forwarded-for hop, not the caller-supplied left', () => {
    // A client rotating the left-most entry must not be able to mint a fresh
    // rate-limit bucket per request.
    const request = requestWith({ 'x-forwarded-for': '9.9.9.9, 203.0.113.7' })
    expect(getClientIp(request)).toBe('203.0.113.7')
  })

  it('is stable while the spoofed prefix changes', () => {
    const first = getClientIp(requestWith({ 'x-forwarded-for': 'a, b, 203.0.113.7' }))
    const second = getClientIp(requestWith({ 'x-forwarded-for': 'x, y, 203.0.113.7' }))
    expect(first).toBe(second)
  })

  it('handles a single-hop header', () => {
    expect(getClientIp(requestWith({ 'x-forwarded-for': '203.0.113.7' }))).toBe('203.0.113.7')
  })

  it('falls back to a shared bucket when no trustworthy header is present', () => {
    expect(getClientIp(requestWith({}))).toBe('anonymous')
    expect(getClientIp(requestWith({ 'x-forwarded-for': '  ,  ' }))).toBe('anonymous')
  })
})
