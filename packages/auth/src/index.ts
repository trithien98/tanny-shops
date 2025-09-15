export type Role = 'customer' | 'support' | 'merchandiser' | 'admin'

export function hasRole(userRoles: Role[], requiredRoles: Role | Role[]): boolean {
  const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]
  return required.some(role => userRoles.includes(role))
}

export function hasAnyRole(userRoles: Role[], requiredRoles: Role[]): boolean {
  return requiredRoles.some(role => userRoles.includes(role))
}

export function hasAllRoles(userRoles: Role[], requiredRoles: Role[]): boolean {
  return requiredRoles.every(role => userRoles.includes(role))
}

export function isAdmin(userRoles: Role[]): boolean {
  return userRoles.includes('admin')
}

export function isCustomer(userRoles: Role[]): boolean {
  return userRoles.includes('customer')
}

// Clerk helper types and utilities
export interface UserWithRoles {
  id: string
  email: string
  roles: Role[]
}

export const AUTH_ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  DASHBOARD: '/account',
  ADMIN: '/admin'
} as const