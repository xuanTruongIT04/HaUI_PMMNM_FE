import type { FetchOptions } from 'ohmyfetch'
import { $fetch } from 'ohmyfetch'

export default defineNuxtPlugin((nuxtApp) => {
  const { apiBaseUrl, githubApiBaseUrl, githubToken } = nuxtApp.$config.public

  const apiFetcher = $fetch.create({
    baseURL: apiBaseUrl,
  } as FetchOptions)

  const githubApiFetcher = $fetch.create({
    baseURL: githubApiBaseUrl,
    headers: {
      Authorization: `Bearer ${githubToken}`,
    },
  } as FetchOptions)

  return {
    provide: {
      api: apiFetcher,
      githubApi: githubApiFetcher,
    },
  }
})
