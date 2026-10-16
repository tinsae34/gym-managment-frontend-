/**
 * Gym Management Dashboard - Theme Configuration
 * Dark, modern, athletic design system
 */

export const theme = {
    // Primary color palette
    colors: {
        // Background colors
        bg: {
            primary: '#0f172a',      // Main background (slate-900)
            secondary: '#1e293b',    // Card/Panel background (slate-800)
            tertiary: '#334155',     // Hover states (slate-700)
            dark: '#020617',         // Deepest background (slate-950)
        },

        // Brand colors
        brand: {
            primary: '#4f46e5',      // Indigo for primary actions
            secondary: '#6366f1',    // Lighter indigo
            accent: '#818cf8',       // Accent indigo
        },

        // Status colors
        status: {
            active: '#10b981',       // Emerald - Active members
            expired: '#ef4444',      // Red - Expired members
            frozen: '#f59e0b',       // Amber - Frozen members
            warning: '#f97316',      // Orange - Warnings
        },

        // Semantic colors
        success: '#10b981',        // Success states
        error: '#ef4444',          // Error states
        warning: '#f59e0b',        // Warning states
        info: '#3b82f6',          // Info states

        // Text colors
        text: {
            primary: '#f8fafc',      // Primary text (slate-50)
            secondary: '#cbd5e1',    // Secondary text (slate-300)
            tertiary: '#94a3b8',     // Muted text (slate-400)
            disabled: '#64748b',     // Disabled text (slate-500)
        },

        // Border colors
        border: {
            default: '#334155',      // Default borders (slate-700)
            light: '#475569',        // Light borders (slate-600)
            dark: '#1e293b',         // Dark borders (slate-800)
        },
    },

    // Typography
    typography: {
        fontFamily: {
            sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        },
        fontSize: {
            xs: '0.75rem',     // 12px
            sm: '0.875rem',    // 14px
            base: '1rem',      // 16px
            lg: '1.125rem',    // 18px
            xl: '1.25rem',     // 20px
            '2xl': '1.5rem',   // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem',  // 36px
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },

    // Spacing scale
    spacing: {
        xs: '0.25rem',   // 4px
        sm: '0.5rem',    // 8px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '3rem',   // 48px
        '3xl': '4rem',   // 64px
    },

    // Border radius
    borderRadius: {
        sm: '0.25rem',   // 4px
        md: '0.375rem',  // 6px
        lg: '0.5rem',    // 8px
        xl: '0.75rem',   // 12px
        '2xl': '1rem',   // 16px
        full: '9999px',
    },

    // Shadows
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        glow: {
            success: '0 0 20px rgba(16, 185, 129, 0.5)',
            error: '0 0 20px rgba(239, 68, 68, 0.5)',
            primary: '0 0 20px rgba(79, 70, 229, 0.5)',
        },
    },

    // Transitions
    transitions: {
        fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Z-index scale
    zIndex: {
        base: 0,
        dropdown: 1000,
        modal: 1050,
        toast: 1100,
        tooltip: 1200,
    },
} as const;

export type Theme = typeof theme;
