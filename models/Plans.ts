import { PlansName } from "./enums/plansName"

export const pixelPlan = {
  externalId: "pixel-plan",
  name: PlansName.Pixel as string,
  description: "Perfeito para começar sua jornada retrô",
  quantity: 1,
  price: 499,
} as const

export const turboPlan = {
  externalId: "turbo-plan",
  name: PlansName.Turbo as string,
  description: "A escolha mais popular dos gamers",
  quantity: 1,
  price: 999,
} as const

export const ultraPlan = {
  externalId: "ultra-plan",
  name: PlansName.Ultra as string,
  description: "Experiência completa sem limites",
  quantity: 1,
  price: 1499,
} as const