import { Button, toast } from 'core-frontend'
import {
  IconGoogle,
  IconMailRu,
  IconGosuslugi,
  IconVk,
  IconYandex,
} from './oauth-icons'

export const OAUTH_PROVIDERS = [
  { id: 'google', label: 'Google', Icon: IconGoogle },
  { id: 'mailru', label: 'Mail.ru', Icon: IconMailRu },
  { id: 'gosuslugi', label: 'ГосУслуги', Icon: IconGosuslugi },
  { id: 'vk', label: 'ВКонтакте', Icon: IconVk },
  { id: 'yandex', label: 'Яндекс', Icon: IconYandex },
] as const

export type OAuthProviderId = (typeof OAUTH_PROVIDERS)[number]['id']

function handleOAuth(providerId: OAuthProviderId) {
  const label = OAUTH_PROVIDERS.find((p) => p.id === providerId)?.label ?? providerId
  toast.info(`Вход через ${label} — скоро`)
}

export function AuthOAuthButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {OAUTH_PROVIDERS.map(({ id, label, Icon }) => (
        <Button
          key={id}
          variant="secondary"
          isIconOnly
          size="lg"
          className="shrink-0 size-12 rounded-xl"
          aria-label={label}
          onPress={() => handleOAuth(id)}
        >
          <Icon className="size-6" />
        </Button>
      ))}
    </div>
  )
}
