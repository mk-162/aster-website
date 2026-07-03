/** Single source of truth for every deep link into the Aster PWA.
 * All marketing-site → app URLs go through this map — never hardcode
 * astertrack.app elsewhere. */
export const appLinks = {
  app: "https://astertrack.app",
  signup: "https://astertrack.app/signup",
  discover: "https://astertrack.app/discover",
  watch: (slug: string) => `https://astertrack.app/watch/${slug}`,
  event: (slug: string) => `https://astertrack.app/events/${slug}`,
  /* Organiser/enterprise/brand conversations land on the contact form. */
  organiserDemo: "/contact?topic=organiser",
} as const;
