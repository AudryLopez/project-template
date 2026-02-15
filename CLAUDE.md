# CLAUDE.md - Patterns

> **Last Updated:** February 2026
> **For:** Claude AI, Developers, and Contributors

---

## 🎯 Quick Context

**Tech Stack:** React 19, TypeScript, Next.js 14+ (App Router), Tailwind CSS, shadcn/ui, Zustand, Apollo Client (GraphQL), React Query (REST)

---

## 🚀 Initial Setup

When the user says **"initial setup"**, **"generate utils"**, **"init project"** or similar, Claude must:

### 1. Ask what they need

Before generating anything, ask the user:

```
What do you need for this project?

1. State Management
   - [ ] Zustand (recommended)
   - [ ] None

2. Data Fetching
   - [ ] React Query (REST APIs)
   - [ ] Apollo Client (GraphQL)
   - [ ] Both
   - [ ] None

3. UI Components
   - [ ] shadcn/ui (recommended)
   - [ ] None

4. Animations
   - [ ] Framer Motion
   - [ ] None
```

### 2. Install based on selection

**Base (always install):**
```bash
pnpm add clsx tailwind-merge mitt class-variance-authority
```

**If Zustand selected:**
```bash
pnpm add zustand
```

**If React Query selected:**
```bash
pnpm add @tanstack/react-query
```

**If Apollo selected:**
```bash
pnpm add @apollo/client graphql
```

**If shadcn/ui selected:**
```bash
pnpm dlx shadcn@latest init
```

**If Framer Motion selected:**
```bash
pnpm add framer-motion
```

### 3. Generate utilities and configs

After installation, generate all files in `src/lib/` and any additional setup based on selection.

---

## 📋 Setup Steps (Manual Reference)

When creating a new project or setting up an existing one, follow these steps:

### 1. Install dev dependencies

```bash
pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import
```

### 2. Create `eslint.config.js`

```javascript
import js from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import importPlugin from "eslint-plugin-import"

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/function-component-definition": ["error", {
        namedComponents: "function-declaration",
      }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Imports
      "import/order": ["error", {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
        ],
        "newlines-between": "never",
      }],
      "import/no-default-export": "error",

      // General
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    // Allow default exports only in Next.js pages/layouts
    files: ["**/app/**/page.tsx", "**/app/**/layout.tsx", "**/app/**/loading.tsx", "**/app/**/error.tsx"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    ignores: ["node_modules", "dist", ".next", ".output", "build"],
  },
]
```

### 3. Create `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 4. Create `.prettierignore`

```
node_modules
dist
build
.next
.output
pnpm-lock.yaml
```

### 5. Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    },
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 6. Add scripts to `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit"
  }
}
```

### 7. Create `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"],
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.suggest.autoImports": true
}
```

### 8. Generate base utilities

When the user says **"initial setup"**, **"generate utils"**, **"init project"** or similar, Claude must generate all these files:

```bash
pnpm add clsx tailwind-merge mitt
```

<utils_to_generate>

**src/lib/cn.ts**
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**src/lib/events.ts**
```typescript
import mitt from "mitt"
import { useEffect, useCallback } from "react"

type Events = {
  "toast:show": { message: string; type: "success" | "error" | "warning" }
  "toast:dismiss": { id?: string }
  "modal:open": { id: string; data?: unknown }
  "modal:close": { id?: string }
}

export const events = mitt<Events>()

export function useEvent<K extends keyof Events>(
  event: K,
  callback: (data: Events[K]) => void
) {
  const stableCallback = useCallback(callback, [callback])

  useEffect(() => {
    events.on(event, stableCallback)
    return () => events.off(event, stableCallback)
  }, [event, stableCallback])
}

export function emit<K extends keyof Events>(event: K, data: Events[K]) {
  events.emit(event, data)
}
```

**src/lib/storage.ts**
```typescript
type StorageKey = "auth-token" | "user-preferences" | "theme"

export const storage = {
  get<T>(key: StorageKey): T | null {
    if (typeof window === "undefined") return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set<T>(key: StorageKey, value: T): void {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Storage set error:", error)
    }
  },

  remove(key: StorageKey): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },

  clear(): void {
    if (typeof window === "undefined") return
    localStorage.clear()
  },
}
```

**src/lib/fetcher.ts**
```typescript
type FetchOptions = RequestInit & {
  params?: Record<string, string>
}

export class FetchError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`${status}: ${statusText}`)
    this.name = "FetchError"
  }
}

export async function fetcher<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options

  const fullUrl = params
    ? `${url}?${new URLSearchParams(params).toString()}`
    : url

  const headers = new Headers(init.headers)
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(fullUrl, { ...init, headers })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new FetchError(response.status, response.statusText, data)
  }

  return response.json()
}

fetcher.get = <T>(url: string, params?: Record<string, string>) =>
  fetcher<T>(url, { method: "GET", params })

fetcher.post = <T>(url: string, body: unknown) =>
  fetcher<T>(url, { method: "POST", body: JSON.stringify(body) })

fetcher.put = <T>(url: string, body: unknown) =>
  fetcher<T>(url, { method: "PUT", body: JSON.stringify(body) })

fetcher.delete = <T>(url: string) =>
  fetcher<T>(url, { method: "DELETE" })
```

**src/lib/format.ts**
```typescript
export function formatCurrency(value: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value)
}

export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
  locale = "en-US"
): string {
  const d = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(d)
}

export function formatRelativeTime(date: Date | string, locale = "en-US"): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ]

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

  for (const [unit, seconds] of units) {
    if (diffInSeconds >= seconds) {
      return rtf.format(-Math.floor(diffInSeconds / seconds), unit)
    }
  }

  return rtf.format(0, "second")
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone
}

export function formatCompact(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { notation: "compact", compactDisplay: "short" }).format(value)
}

export function truncate(text: string, length: number): string {
  return text.length <= length ? text : text.slice(0, length).trim() + "..."
}
```

**src/lib/debounce.ts**
```typescript
import { useMemo } from "react"

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function useDebounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  return useMemo(() => debounce(fn, delay), [fn, delay])
}
```

**src/lib/index.ts**
```typescript
export { cn } from "./cn"
export { events, useEvent, emit } from "./events"
export { storage } from "./storage"
export { fetcher, FetchError } from "./fetcher"
export { formatCurrency, formatDate, formatRelativeTime, formatPhone, formatCompact, truncate } from "./format"
export { debounce, useDebounce } from "./debounce"
```

</utils_to_generate>

### 9. Initial folder structure

```bash
mkdir -p src/{app,components/ui,hooks,lib,stores,types}
```

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── hooks/
├── lib/
│   └── cn.ts
├── stores/
└── types/
```

---

## 📦 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── [feature]/         # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/
│   ├── apollo/            # Apollo Client setup
│   │   ├── client.ts      # Apollo Client instance
│   │   ├── queries/       # GraphQL queries
│   │   └── mutations/     # GraphQL mutations
│   ├── react-query/       # React Query setup
│   │   ├── client.ts      # QueryClient config
│   │   └── queries/       # Query hooks
│   ├── cn.ts              # className utility
│   └── utils.ts           # Other utilities
├── stores/                # Zustand stores
├── types/                 # TypeScript types/interfaces
└── graphql/               # GraphQL schema & generated types
```

**Note:** Use `lib/` not `utils/` for utilities folder.

---

## 🎨 Coding Standards & Style Guide

> **CRITICAL:** Follow these patterns exactly to maintain consistency

### Component Declaration Rules

#### ✅ **ALWAYS use function declarations (NOT arrow functions)**

```typescript
// ✅ CORRECT - Function declaration with single-letter parameter
export function PhoneInput(p: PhoneInputProps) {
  const { value, onChange } = p
  return <input value={value} onChange={onChange} />
}

// ✅ CORRECT - Named function with explicit export
export function Button(p: Props) {
  const { variant, children } = p
  return <button className={variant}>{children}</button>
}

// ❌ WRONG - Arrow function component
export const PhoneInput = (p: PhoneInputProps) => {
  return <input {...p} />
}

// ❌ WRONG - Arrow function with React.FC
export const PhoneInput: React.FC<PhoneInputProps> = (p) => {
  return <input {...p} />
}
```

**Exception:** Arrow functions are OK for small helper/variant components inside files:

```typescript
// ✅ OK - Helper components within a file
const IconWrapper = ({ className, ...props }: IconProps) => (
  <span className={cn('inline-flex', className)} {...props} />
)

export function Button({ variant, ...props }: ButtonProps) {
  // Main component uses function declaration
  return <button {...props} />
}
```

---

### Component Structure Template

```typescript
// 1. Imports (organized by category)
import * as React from "react"                    // External: React
import { useQuery } from "@tanstack/react-query"  // External: Libraries
import { cn } from "@/lib/cn"                     // Internal: Utilities
import { useAuthStore } from "@/stores/auth"      // Internal: Stores
import { Button } from "./button"                 // Relative: Local imports

// 2. Type definitions
interface UserCardProps {
  userId: string
  showActions?: boolean
  className?: string
  ref?: React.Ref<HTMLDivElement>
}

// 3. Helper functions (if needed)
function formatUserName(first: string, last: string): string {
  return `${first} ${last}`.trim()
}

// 4. Main component
export function UserCard(p: UserCardProps) {
  // 4a. Destructure props from p parameter
  const { userId, showActions = true, className, ref } = p

  // 4b. Hooks (stores, queries, state)
  const user = useAuthStore((s) => s.user)
  const [isOpen, setIsOpen] = React.useState(false)

  // 4c. Computed values
  const fullName = formatUserName(user?.firstName ?? '', user?.lastName ?? '')

  // 4d. Event handlers (named functions)
  function handleClick() {
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  // 4e. Early returns for conditional rendering
  if (!user) return null

  // 4f. Main render
  return (
    <div ref={ref} className={cn("rounded-lg p-4", className)}>
      <h3>{fullName}</h3>
      {showActions && (
        <Button onClick={handleClick}>View Profile</Button>
      )}
    </div>
  )
}
```

---

### Export Patterns

#### **Default vs Named Exports**

🚨 **CRITICAL RULE:** Default exports are **ONLY for route/page components**, NOT regular components!

```typescript
// ✅ CORRECT - Named export for regular components
export function Button(p: ButtonProps) {
  return <button {...p} />
}

export function Dialog(p: DialogProps) {
  return <div {...p} />
}

// ✅ CORRECT - Default export ONLY for Next.js pages
// app/dashboard/page.tsx
export default function DashboardPage() {
  return <div>Dashboard</div>
}

// app/settings/page.tsx
export default function SettingsPage() {
  return <div>Settings</div>
}

// ❌ WRONG - Default export for regular component
export default function Button(p: ButtonProps) {
  return <button {...p} />  // NO! Use named export!
}
```

**Why this matters:**
- **Named exports** → Explicit imports, better tree-shaking, easier refactoring
- **Default exports** → Reserved for Next.js routing convention
- Mixing them causes confusion about what's a page vs. component

#### **Barrel Exports (index.ts files)**

```typescript
// ✅ CORRECT - Re-export all from module
export * from './button'
export * from './dialog'
export * from './input'

// ✅ CORRECT - Named re-exports
export { Button } from './button'
export { Dialog, DialogContent } from './dialog'

// ❌ WRONG - Default export from barrel
export { default } from './button'  // Confusing
```

---

### Props & Type Definitions

#### **Props Interface Naming**

```typescript
// ✅ CORRECT - Simple Props for single-component files
interface Props {
  label: string
  value?: string
}

export function MyComponent(p: Props) {
  const { label, value } = p
  return <div>{label}: {value}</div>
}

// ✅ CORRECT - Named Props for multi-component files
interface ButtonProps {
  variant?: 'default' | 'outline'
}

interface InputProps {
  value?: string
}

// ❌ WRONG - Generic names in multi-component files
interface IProps { /* ... */ }  // Too generic
```

#### **Props Destructuring**

🚨 **PREFERRED PATTERN:** Use single-letter parameter (p) with body destructuring

```typescript
// ✅ CORRECT - Single-letter parameter with body destructuring (PREFERRED)
export function Input(p: InputProps) {
  const { value, onChange, className, ...rest } = p
  return <input value={value} onChange={onChange} className={className} {...rest} />
}

// ✅ ACCEPTABLE - Signature destructuring (only when NOT spreading props)
export function Badge({ variant, label }: BadgeProps) {
  return <span className={variant}>{label}</span>
}

// ❌ WRONG - No destructuring at all
export function Button(props: ButtonProps) {
  return <button className={props.className}>{props.children}</button>
}
```

---

### TypeScript Patterns

#### **Type over Interface (for simple types)**

```typescript
// ✅ CORRECT - Type for unions/primitives
type Status = 'pending' | 'active' | 'completed'
type Variant = 'default' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

// ✅ CORRECT - Interface for object shapes
interface ButtonProps {
  variant?: Variant
  size?: Size
  children: React.ReactNode
}

interface User {
  id: string
  name: string
  email: string
}
```

#### **Explicit Types (avoid any)**

```typescript
// ✅ CORRECT - Explicit types
function handleChange(value: string) {
  console.log(value)
}

// ❌ WRONG - any type
function handleChange(value: any) {  // Loses type safety!
  console.log(value)
}

// ✅ CORRECT - unknown if type really unknown
function handleData(data: unknown) {
  if (typeof data === 'string') {
    console.log(data.toUpperCase())
  }
}

// ✅ CORRECT - Use satisfies for object validation
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} satisfies Config
```

---

### React 19 Patterns

#### **Refs (No forwardRef!)**

```typescript
// ✅ CORRECT - React 19: Direct ref prop
export function Input(p: InputProps) {
  const { ref, className, ...rest } = p
  return <input ref={ref} className={className} {...rest} />
}

// ❌ WRONG - React 18 pattern (don't use)
import { forwardRef } from "react"
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(p, ref) {
    return <input ref={ref} {...p} />
  }
)
```

#### **Conditional Rendering - Early Returns**

```typescript
// ✅ CORRECT - Early returns for cleaner code
export function UserProfile(p: Props) {
  const { user } = p

  if (!user) return null
  if (user.isDeleted) return <DeletedUser />
  if (user.isBanned) return <BannedUser />

  return <div>{user.name}</div>
}

// ❌ WRONG - Nested conditionals
export function UserProfile(p: Props) {
  const { user } = p

  return (
    <>
      {user ? (
        user.isDeleted ? (
          <DeletedUser />
        ) : (
          <div>{user.name}</div>
        )
      ) : null}
    </>
  )
}
```

#### **Ternary for Simple Cases**

```typescript
// ✅ CORRECT - Ternary for simple cases
export function Badge({ variant }: BadgeProps) {
  return (
    <span className={variant === 'solid' ? 'bg-primary' : 'bg-secondary'} />
  )
}

// ❌ WRONG - Nested ternaries (hard to read)
return (
  <div className={
    variant === 'solid'
      ? 'bg-primary'
      : variant === 'outline'
        ? 'border'
        : 'bg-secondary'
  } />
)
```

---

### Styling Patterns

#### **Tailwind with cn() utility**

```typescript
import { cn } from "@/lib/cn"

// ✅ CORRECT - Use cn() for conditional classes
export function Button(p: ButtonProps) {
  const { variant, size, className } = p

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        variant === 'primary' && "bg-primary text-white",
        variant === 'secondary' && "bg-secondary",
        size === 'sm' && "h-8 px-3 text-sm",
        size === 'lg' && "h-12 px-6 text-lg",
        className
      )}
    />
  )
}

// ❌ WRONG - String concatenation
className={`px-4 py-2 ${variant === 'primary' ? 'bg-primary' : ''}`}
```

#### **No hardcoded colors - Use semantic tokens**

🚨 **NEVER use hardcoded colors.** Always use Tailwind config variables.

```typescript
// ❌ WRONG - Hardcoded colors
<div className="bg-[#3b82f6] text-[#ffffff]" />
<div className="bg-blue-500 text-white" />
<span className="text-gray-600" />
<button className="bg-green-500 hover:bg-green-600" />

// ✅ CORRECT - Semantic tokens from tailwind.config.ts
<div className="bg-primary text-primary-foreground" />
<span className="text-muted-foreground" />
<button className="bg-success hover:bg-success/90" />
<div className="border-border bg-card text-card-foreground" />
<section className="bg-background text-foreground" />
```

**Tailwind config should define:**

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        // Base
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Primary action
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        
        // Secondary action
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        // Muted/subtle
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        // Cards/panels
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Borders
        border: "hsl(var(--border))",
        
        // States
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
      },
    },
  },
}
```

**CSS variables in globals.css:**

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 84% 5%;
    --primary: 222 84% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 14% 96%;
    --secondary-foreground: 222 84% 5%;
    --muted: 220 14% 96%;
    --muted-foreground: 220 9% 46%;
    --card: 0 0% 100%;
    --card-foreground: 222 84% 5%;
    --border: 220 13% 91%;
    --success: 142 76% 36%;
    --warning: 38 92% 50%;
    --error: 0 84% 60%;
  }

  .dark {
    --background: 222 84% 5%;
    --foreground: 210 40% 98%;
    /* ... dark mode values */
  }
}
```

**Benefits:**
- Change colors in one place
- Automatic dark mode
- Consistency across the app
- Easy white-labeling

#### **Class-Variance-Authority (CVA) for complex variants**

```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string
  children: React.ReactNode
}

export function Button(p: ButtonProps) {
  const { variant, size, className, ...rest } = p

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    />
  )
}
```

---

### Event Handlers

```typescript
// ✅ CORRECT - Named functions for handlers
export function LoginForm(p: FormProps) {
  const { onSubmit } = p
  const [email, setEmail] = React.useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email })
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <button type="submit">Login</button>
    </form>
  )
}

// ❌ WRONG - Complex inline arrow functions
return (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit?.({ email }) }}>
    <input onChange={(e) => setEmail(e.target.value)} />
  </form>
)
```

---

### Import Organization

**STRICT ORDER:**

```typescript
// 1. React (if needed)
import * as React from "react"
import { useState, useEffect, useMemo } from "react"

// 2. External libraries (alphabetically)
import { useQuery, useMutation } from "@tanstack/react-query"
import { useApolloClient } from "@apollo/client"
import { format } from "date-fns"

// 3. Radix UI / shadcn primitives (if used)
import * as DialogPrimitive from "@radix-ui/react-dialog"

// 4. Internal absolute imports (@/*)
import { cn } from "@/lib/cn"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui/button"

// 5. Relative imports - components
import { UserAvatar } from "./user-avatar"

// 6. Relative imports - utilities
import { formatPhone } from "./lib/format-phone"

// 7. Types (if separate file)
import type { User } from "@/types"
```

---

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| **Components** | PascalCase | `UserCard`, `PhoneInput` |
| **Component Files** | kebab-case.tsx | `user-card.tsx`, `phone-input.tsx` |
| **Functions** | camelCase | `formatPhone`, `handleSubmit` |
| **Constants** | UPPER_SNAKE_CASE | `API_URL`, `MAX_RETRIES` |
| **Interfaces** | PascalCase | `UserCardProps`, `Props` |
| **Types** | PascalCase | `Status`, `Variant` |
| **Hooks** | camelCase with `use` | `useAuth`, `useLeads` |
| **Stores** | camelCase with `use` | `useAuthStore`, `useCartStore` |
| **Folders** | kebab-case | `user-profile/`, `form-inputs/` |
| **Utilities folder** | `lib/` | `src/lib/` (NOT `utils/`) |

---

## 🚫 Avoiding Prop Drilling

Prop drilling = passing props through multiple component levels that don't use them.

```typescript
// ❌ PROP DRILLING - Layout and Sidebar don't use user, just pass it
function Page() {
  const user = useUser()
  return <Layout user={user} />
}
function Layout({ user }) {
  return <Sidebar user={user} />
}
function Sidebar({ user }) {
  return <UserMenu user={user} />  // Finally used here
}
```

### Solutions

#### 1. **Zustand** ✅ Recommended for global state

```typescript
// stores/auth.ts
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

// Any component accesses directly - no props
function UserMenu() {
  const user = useAuthStore((s) => s.user)
  return <div>{user?.name}</div>
}

function Header() {
  const user = useAuthStore((s) => s.user)
  return <span>Welcome, {user?.name}</span>
}
```

#### 2. **React Context** - For feature/section state

```typescript
// contexts/checkout-context.tsx
interface CheckoutState {
  step: number
  cart: CartItem[]
  setStep: (step: number) => void
  addItem: (item: CartItem) => void
}

const CheckoutContext = createContext<CheckoutState | null>(null)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1)
  const [cart, setCart] = useState<CartItem[]>([])

  function addItem(item: CartItem) {
    setCart((prev) => [...prev, item])
  }

  return (
    <CheckoutContext.Provider value={{ step, cart, setStep, addItem }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be within CheckoutProvider')
  return ctx
}

// Usage - any child accesses without props
function CartSummary() {
  const { cart } = useCheckout()
  return <div>{cart.length} items</div>
}
```

#### 3. **Composition** - Pass components, not data

```typescript
// ✅ COMPOSITION - pass the already-built component
function Page() {
  const user = useUser()

  return (
    <Layout
      sidebar={
        <Sidebar
          userMenu={<UserMenu user={user} />}
        />
      }
    />
  )
}

function Layout({ sidebar }: { sidebar: React.ReactNode }) {
  return (
    <div className="flex">
      <main>Content</main>
      {sidebar}
    </div>
  )
}

function Sidebar({ userMenu }: { userMenu: React.ReactNode }) {
  return (
    <aside>
      <nav>Links</nav>
      {userMenu}
    </aside>
  )
}
```

#### 4. **React Query / Apollo** - Data in global cache

```typescript
// Data lives in cache - each component requests it
function PostList() {
  const { data: posts } = usePostsQuery()

  return (
    <ul>
      {posts?.map((p) => (
        <PostCard key={p.id} postId={p.id} />
      ))}
    </ul>
  )
}

function PostCard({ postId }: { postId: string }) {
  // Instant cache hit - no duplicate fetch
  const { data: post } = usePostQuery(postId)
  return <div>{post?.title}</div>
}

function PostActions({ postId }: { postId: string }) {
  // Same query, same data from cache
  const { data: post } = usePostQuery(postId)
  return <Button>Edit {post?.title}</Button>
}
```

#### 5. **Event Bus** - Decoupled communication

```typescript
// lib/events.ts
import mitt from 'mitt'  // npm install mitt (~200 bytes)

type Events = {
  'toast:show': { message: string; type: 'success' | 'error' }
  'modal:open': { id: string }
  'lead:created': { lead: Lead }
  'lead:deleted': { id: string }
}

export const events = mitt<Events>()

// Typed hook for listening
export function useEvent<K extends keyof Events>(
  event: K,
  callback: (data: Events[K]) => void
) {
  useEffect(() => {
    events.on(event, callback)
    return () => events.off(event, callback)
  }, [event, callback])
}
```

```typescript
// Component A - emits event
function DeleteButton({ id }: { id: string }) {
  async function handleDelete() {
    await deleteLead(id)
    events.emit('lead:deleted', { id })
    events.emit('toast:show', { message: 'Lead deleted', type: 'success' })
  }

  return <Button onClick={handleDelete}>Delete</Button>
}

// Component B - listens (anywhere in the tree)
function LeadList() {
  const queryClient = useQueryClient()

  useEvent('lead:deleted', useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['leads'] })
  }, [queryClient]))

  return <List />
}

// Component C - listens to toasts
function ToastContainer() {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null)

  useEvent('toast:show', useCallback((data) => {
    setToast(data)
    setTimeout(() => setToast(null), 3000)
  }, []))

  if (!toast) return null
  return <Toast type={toast.type}>{toast.message}</Toast>
}
```

### When to use each solution?

| Situation | Solution |
|-----------|----------|
| Global state (auth, theme, UI) | **Zustand** |
| Feature/section state | **Context** |
| Server data | **React Query / Apollo** |
| Props skipping 1-2 levels | **Composition** |
| Props skipping 3+ levels | **Zustand or Context** |
| Communication between decoupled features | **Event Bus** |
| Invalidating data after action | **React Query invalidate** |
| UI events (modals, toasts, drawers) | **Zustand or Event Bus** |

### ⚠️ Anti-patterns to avoid

```typescript
// ❌ Context for everything - causes unnecessary re-renders
<AppContext.Provider value={{ user, theme, cart, leads, ... }}>

// ✅ Separate by domain
<AuthProvider>
  <ThemeProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </ThemeProvider>
</AuthProvider>

// ❌ Zustand with large objects that change frequently
const everything = useAppStore((s) => s)  // Re-render on every change

// ✅ Specific selectors
const user = useAuthStore((s) => s.user)  // Re-render only if user changes

// ❌ Event bus for state that needs to persist
events.emit('user:updated', user)  // If no one listens, it's lost

// ✅ Event bus only for notifications/side effects
events.emit('toast:show', { message: 'Saved!' })
```

---

## 🗂️ State Management (Zustand)

One store per domain/feature in `src/stores/`

```typescript
// src/stores/auth.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)
```

**Usage in components:**

```typescript
export function Header(p: Props) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  if (!user) return null

  return (
    <header>
      <span>{user.name}</span>
      <Button onClick={logout}>Logout</Button>
    </header>
  )
}
```

---

## 🔄 Data Fetching

### Apollo Client (GraphQL)

**Server Component:**

```typescript
// app/users/page.tsx
import { getClient } from '@/lib/apollo/client'
import { GET_USERS } from '@/lib/apollo/queries/users'

export default async function UsersPage() {
  const { data } = await getClient().query({ query: GET_USERS })

  return <UserList users={data.users} />
}
```

**Client Component:**

```typescript
'use client'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER, UPDATE_USER } from '@/lib/apollo/queries/users'

export function UserProfile(p: Props) {
  const { userId } = p

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId }
  })

  const [updateUser] = useMutation(UPDATE_USER)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />

  return <div>{data.user.name}</div>
}
```

### React Query (REST)

**Custom hook:**

```typescript
// src/lib/react-query/queries/use-posts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function usePostsQuery(filters?: PostFilters) {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
```

**SSR with Hydration:**

```typescript
// app/posts/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/react-query/client'
import { fetchPosts } from '@/lib/api/posts'
import { PostsList } from '@/components/posts/posts-list'

export default async function PostsPage() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsList />
    </HydrationBoundary>
  )
}
```

---

## ⚡ Performance Patterns

### When to Optimize

**Don't optimize prematurely!** Only add optimizations when you have:
1. Measured performance issues
2. Identified the bottleneck
3. Determined the optimization will help

### React.memo for Expensive Components

```typescript
import { memo } from "react"

function LeadCardComponent(p: Props) {
  const { lead } = p

  return (
    <Card>
      <Title>{lead.name}</Title>
      <Details>{lead.email}</Details>
    </Card>
  )
}

export const LeadCard = memo(LeadCardComponent)
```

### useMemo for Expensive Calculations

```typescript
import { useMemo } from "react"

export function LeadList(p: Props) {
  const { leads, filters } = p

  const filteredLeads = useMemo(() => {
    return leads
      .filter(lead => lead.status === filters.status)
      .sort((a, b) => b.createdAt - a.createdAt)
  }, [leads, filters])

  return <ul>{filteredLeads.map(lead => <LeadCard key={lead.id} lead={lead} />)}</ul>
}
```

### useCallback for Stable Function References

```typescript
import { useCallback, memo } from "react"

export function ParentComponent(p: Props) {
  const [count, setCount] = useState(0)

  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id)
  }, [])

  return (
    <div>
      <MemoizedChild onClick={handleClick} />
      <p>Count: {count}</p>
    </div>
  )
}

const MemoizedChild = memo(function Child(p: { onClick: (id: string) => void }) {
  return <button onClick={() => p.onClick('123')}>Click</button>
})
```

### Lazy Loading Components

```typescript
import { lazy, Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"

const HeavyChart = lazy(() => import('./heavy-chart'))

export function Dashboard(p: Props) {
  return (
    <div>
      <Header />
      <Suspense fallback={<Spinner />}>
        <HeavyChart />
      </Suspense>
    </div>
  )
}
```

**When NOT to optimize:**
- Components that rarely re-render
- Simple calculations (< 1ms)
- Short lists (< 100 items)
- When it makes code harder to read

---

## ♿ Accessibility Best Practices

### Semantic HTML

```typescript
// ✅ CORRECT - Use semantic HTML elements
export function ArticleCard(p: Props) {
  const { article } = p

  return (
    <article>
      <header>
        <h2>{article.title}</h2>
        <time dateTime={article.date}>{article.formattedDate}</time>
      </header>

      <section>
        <p>{article.excerpt}</p>
      </section>

      <footer>
        <Button>Read More</Button>
      </footer>
    </article>
  )
}

// ❌ WRONG - Generic divs everywhere
export function ArticleCard(p: Props) {
  return (
    <div>
      <div><div>{p.article.title}</div></div>
      <div>{p.article.excerpt}</div>
    </div>
  )
}
```

### ARIA Labels

```typescript
export function SearchInput(p: Props) {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        aria-label="Search items"
        aria-describedby="search-help"
        placeholder="Enter search term"
      />
      <span id="search-help" className="sr-only">
        Search by name, email, or ID
      </span>
    </div>
  )
}
```

### Keyboard Navigation

```typescript
export function Dialog(p: Props) {
  const { isOpen, onClose, children } = p

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {children}
    </div>
  )
}
```

### Focus Management

```typescript
import { useEffect, useRef } from "react"

export function Modal(p: Props) {
  const { isOpen, onClose, children } = p
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  )
}
```

---

## ✅ Quick Reference Checklist

Before committing a component, verify:

- [ ] Uses `function` declaration (not arrow)
- [ ] **Named export** for components (NOT default export!)
- [ ] **Default export ONLY** if it's a Next.js page/layout
- [ ] Uses single-letter parameter `p` with body destructuring
- [ ] Imports organized (React → External → @/ → Relative)
- [ ] File named in kebab-case.tsx
- [ ] Component named in PascalCase
- [ ] Uses `cn()` for className merging
- [ ] **No hardcoded colors** - uses semantic tokens (bg-primary, text-muted-foreground)
- [ ] No `forwardRef` (use direct `ref` prop - React 19)
- [ ] Types are explicit (no `any`)
- [ ] Event handlers are named functions
- [ ] Early returns for conditional rendering
- [ ] Loading and error states handled
- [ ] Accessible (semantic HTML, ARIA when needed)

---

## 🛠️ Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
npm run test         # Run tests
```

---

## 📚 Key Dependencies

```json
{
  "next": "^14.x",
  "react": "^19.x",
  "typescript": "^5.x",
  "@apollo/client": "^3.x",
  "@tanstack/react-query": "^5.x",
  "zustand": "^4.x",
  "tailwindcss": "^3.x",
  "class-variance-authority": "^0.7.x",
  "@radix-ui/react-*": "shadcn dependencies"
}
```

---

## 📝 Notes for Claude

When assisting with this project:
- ✅ Follow established patterns (function declarations, `p` parameter)
- ✅ Use TypeScript with explicit types (no `any`)
- ✅ Use named exports for components, default only for pages
- ✅ Follow React 19 patterns (no forwardRef)
- ✅ Use `cn()` for conditional Tailwind classes
- ✅ **Never use hardcoded colors** - always semantic tokens (bg-primary, text-muted-foreground, etc.)
- ✅ Use `lib/` not `utils/` for utilities
- ✅ Handle loading and error states
- ✅ Consider accessibility
- ⚠️ Don't over-optimize prematurely
- ⚠️ Keep Server Components as default, add 'use client' only when needed

---

**This is a living document. Update as the project evolves!**