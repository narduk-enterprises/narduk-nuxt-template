---
description: Dashboard scaffolding workflow using Nuxt UI Pro Dashboard components — sidebar, panels, navbar, search
---

# Build Dashboard

This workflow scaffolds a complete admin/dashboard interface using Nuxt UI Pro's Dashboard components. These components provide sidebar state management, resizable panels, mobile responsiveness, and search — all out of the box.

> **Prerequisite:** All Dashboard components are included in `@nuxt/ui` v4. No separate package needed.

---

## Step 1: Dashboard Layout

Create `app/layouts/dashboard.vue`:

```vue
<template>
  <UDashboardGroup>
    <UDashboardSidebar :links="sidebarLinks" collapsible>
      <template #header>
        <div class="flex items-center gap-2 px-4">
          <NuxtImg src="/logo.svg" alt="App Name" class="h-6" />
          <span class="font-semibold truncate">App Name</span>
        </div>
      </template>
      <template #footer>
        <UDropdownMenu :items="userMenuItems">
          <UUser :name="user.name" :description="user.email" :avatar="{ src: user.avatar }" />
        </UDropdownMenu>
      </template>
    </UDashboardSidebar>

    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #left>
          <UDashboardSidebarToggle />
          <UBreadcrumb :items="breadcrumbs" />
        </template>
        <template #right>
          <UDashboardSearchButton />
          <UColorModeButton />
        </template>
      </UDashboardNavbar>

      <slot />
    </UDashboardPanel>

    <UDashboardSearch :groups="searchGroups" />
  </UDashboardGroup>
</template>
```

**Key features:**

- `UDashboardGroup` provides context for sidebar state (open/collapsed) with localStorage persistence
- `UDashboardSidebar` is collapsible on desktop and converts to a drawer on mobile
- `UDashboardSidebarToggle` shows on mobile only (hamburger) to open the drawer
- `UDashboardSidebarCollapse` can be added to collapse the sidebar on desktop
- `UDashboardSearch` opens a `CommandPalette` modal (trigger: `Cmd+K` / `Ctrl+K`)
- `UDashboardPanel` with `grow` fills available space

---

## Step 2: Sidebar Navigation

Define sidebar links with icons and nested items:

```ts
const sidebarLinks = computed(() => [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dashboard',
  },
  {
    label: 'Users',
    icon: 'i-lucide-users',
    to: '/dashboard/users',
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    children: [
      { label: 'General', to: '/dashboard/settings' },
      { label: 'Billing', to: '/dashboard/settings/billing' },
      { label: 'Team', to: '/dashboard/settings/team' },
    ],
  },
]);
```

**Tips:**

- Use `UNavigationMenu` for links within the sidebar for active-state tracking
- Links support `badge` for notification counts
- Collapsed mode shows icons only with tooltips

---

## Step 3: Dashboard Pages

### Overview Page (`app/pages/dashboard/index.vue`)

```vue
<template>
  <div class="p-6 space-y-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted">{{ stat.label }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
          <UIcon :name="stat.icon" class="text-primary size-8" />
        </div>
      </UCard>
    </div>

    <!-- Data Table -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Recent Activity</h2>
          <UButton label="View All" variant="ghost" to="/dashboard/activity" />
        </div>
      </template>
      <UTable :columns="columns" :rows="recentActivity" />
    </UCard>
  </div>
</template>
```

### List Page with Toolbar (`app/pages/dashboard/users/index.vue`)

```vue
<template>
  <div>
    <UDashboardToolbar>
      <template #left>
        <UInput icon="i-lucide-search" placeholder="Search users..." v-model="search" />
      </template>
      <template #right>
        <UButton label="Add User" icon="i-lucide-plus" color="primary" />
      </template>
    </UDashboardToolbar>

    <div class="p-6">
      <UTable
        :columns="columns"
        :rows="filteredUsers"
        :empty-state="{ icon: 'i-lucide-users', label: 'No users found' }"
      />
      <UPagination v-model="page" :total="total" :page-count="pageSize" class="mt-4" />
    </div>
  </div>
</template>
```

---

## Step 4: Multi-Panel Layout (Optional)

For detail views with a side panel (e.g., inbox, file manager):

```vue
<template>
  <UDashboardGroup>
    <UDashboardSidebar :links="sidebarLinks" collapsible />

    <UDashboardPanel :width="300" resizable>
      <!-- List panel -->
      <UDashboardNavbar title="Messages" />
      <UScrollArea class="flex-1">
        <div
          v-for="item in items"
          :key="item.id"
          class="p-4 border-b cursor-pointer hover:bg-muted/50"
        >
          {{ item.title }}
        </div>
      </UScrollArea>
    </UDashboardPanel>

    <UDashboardResizeHandle />

    <UDashboardPanel grow>
      <!-- Detail panel -->
      <UDashboardNavbar :title="selectedItem?.title" />
      <div class="p-6">
        <!-- Detail content -->
      </div>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
```

**Key:** `UDashboardResizeHandle` between panels enables drag-to-resize. Use `:width` and `resizable` for the left panel, `grow` for the right panel.

---

## Step 5: Search Integration

Configure the `UDashboardSearch` with navigation groups:

```ts
const searchGroups = computed(() => [
  {
    id: 'pages',
    label: 'Pages',
    items: [
      { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
      { label: 'Users', icon: 'i-lucide-users', to: '/dashboard/users' },
      { label: 'Settings', icon: 'i-lucide-settings', to: '/dashboard/settings' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { label: 'Create User', icon: 'i-lucide-user-plus', click: () => openCreateModal() },
      { label: 'Export Data', icon: 'i-lucide-download', click: () => exportData() },
    ],
  },
]);
```

The search modal opens with `Cmd+K` / `Ctrl+K` automatically. Add `UDashboardSearchButton` to the navbar for discoverability.

---

## Step 6: Auth Middleware

Protect dashboard routes with Nuxt middleware:

```ts
// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const user = useUserSession();
  if (!user.value) {
    return navigateTo('/login');
  }
});
```

Apply to the dashboard layout or pages:

```ts
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
```

---

## Step 7: Verification

1. Start dev server: `pnpm run dev`
2. Navigate to dashboard pages
3. Test sidebar collapse/expand (desktop) and drawer (mobile)
4. Test panel resizing (if multi-panel)
5. Test `Cmd+K` search
6. Toggle dark mode
7. Run `/check-ui-styling` and `/audit-ui-ux`

---

## Dashboard Component Quick Reference

| Component                   | Purpose                          | Key Props                                   |
| --------------------------- | -------------------------------- | ------------------------------------------- |
| `UDashboardGroup`           | Outer wrapper with sidebar state | Default slot                                |
| `UDashboardSidebar`         | Collapsible sidebar              | `links`, `collapsible`, header/footer slots |
| `UDashboardSidebarCollapse` | Collapse button (desktop)        | —                                           |
| `UDashboardSidebarToggle`   | Drawer toggle (mobile)           | —                                           |
| `UDashboardPanel`           | Content panel                    | `width`, `resizable`, `grow`                |
| `UDashboardResizeHandle`    | Resize handle between panels     | —                                           |
| `UDashboardNavbar`          | Top navbar                       | `title`, left/right slots                   |
| `UDashboardToolbar`         | Action toolbar                   | left/right slots                            |
| `UDashboardSearch`          | Command palette modal            | `groups`                                    |
| `UDashboardSearchButton`    | Button to open search            | —                                           |
