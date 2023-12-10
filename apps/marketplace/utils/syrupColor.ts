import { SyrupType } from '@sugar-shack/shared'

export function syrupColor(syrupType?: SyrupType | '' | null) {
    switch (syrupType) {
    case SyrupType.AMBER:
        return 'bg-yellow-500'
    case SyrupType.DARK:
        return 'bg-yellow-900'
    case SyrupType.CLEAR:
        return 'bg-yellow-100'
    default:
        return ''
    }
}

export function syrupTextColor(syrupType?: SyrupType | '' | null) {
    switch (syrupType) {
    case SyrupType.AMBER:
    case SyrupType.CLEAR:
        return 'text-base-content'
    case SyrupType.DARK:
        return 'text-base-200'
    default:
        return ''
    }
}
