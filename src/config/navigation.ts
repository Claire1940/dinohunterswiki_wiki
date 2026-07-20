import type { LucideIcon } from 'lucide-react'
import {
	BookOpen,
	Download,
	Gift,
	PawPrint,
	Smartphone,
	Swords,
	TrendingUp,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

// Dino Hunters 内容分类（与 content/<locale>/ 下的目录一一对应）
// community 分类不进导航栏（任务要求）
export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'codes', path: '/codes', icon: Gift, isContentType: true },
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'dinosaurs', path: '/dinosaurs', icon: PawPrint, isContentType: true },
	{ key: 'weapons', path: '/weapons', icon: Swords, isContentType: true },
	{ key: 'progression', path: '/progression', icon: TrendingUp, isContentType: true },
	{ key: 'downloads', path: '/downloads', icon: Download, isContentType: true },
	{ key: 'mobile', path: '/mobile', icon: Smartphone, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['codes', 'guide', 'dinosaurs', ...]

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
