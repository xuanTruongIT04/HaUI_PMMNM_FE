export interface User {
  id: number
  email?: string | null
  name?: string | null
  avatar?: string | null
  generation: number
  createdAt: Date
  updatedAt?: Date | null
  dateOfBirth?: string
  phone?: string
  class?: string
  address?: string
}

export interface Contributor {
  name: string
  avatar: string
  github: string
  commits: number
}

export type UserGeneralInfoForm = Partial<
  Omit<
    User,
    'id' |
    'createdAt' |
    'updatedAt' |
    'avatar' |
    'github' |
    'facebook' |
    'linkedIn'
  >
>
