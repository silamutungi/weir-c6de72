export type MatchStatus = 'pending' | 'approved' | 'blocked' | 'monetized'

export interface ContentMatch {
  id: string
  user_id: string
  platform: string
  content_url: string
  brand_name: string
  match_confidence: number
  status: MatchStatus
  potential_value: number
  detected_at: string
  created_at: string
  deleted_at: string | null
}

export interface LicenseTemplate {
  id: string
  user_id: string
  name: string
  type: 'restricted' | 'balanced' | 'open'
  terms: string
  fee: number
  created_at: string
  deleted_at: string | null
}

export interface Earning {
  id: string
  user_id: string
  match_id: string
  platform: string
  amount: number
  status: 'pending' | 'paid'
  paid_at: string | null
  created_at: string
  deleted_at: string | null
}

export interface Profile {
  id: string
  display_name: string
  email: string
  avatar_url: string | null
  plan: 'free' | 'creator' | 'pro'
  created_at: string
}
