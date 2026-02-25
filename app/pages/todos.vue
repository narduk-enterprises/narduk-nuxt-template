<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

useSeo({
  title: 'Todos',
  description: 'Full CRUD demo powered by Cloudflare D1 and Drizzle ORM — create, read, update, and delete tasks.',
  ogImage: {
    title: 'Todos Demo',
    description: 'CRUD demo with D1 + Drizzle ORM',
    icon: '✅',
  },
})

useWebPageSchema({
  name: 'Todos',
  description: 'Full CRUD demo powered by Cloudflare D1 and Drizzle ORM.',
})

interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

const { loggedIn } = useAuth()
const toast = useToast()

const newTodoTitle = ref('')
const loading = ref(false)
const todos = ref<Todo[]>([])
const fetching = ref(false)

async function fetchTodos() {
  if (!loggedIn.value) return
  fetching.value = true
  try {
    const res = await $fetch<{ todos: Todo[] }>('/api/todos')
    todos.value = res.todos
  }
  catch (err: any) {
    toast.add({ title: 'Error', description: err?.data?.message || 'Failed to load todos', color: 'error' })
  }
  finally {
    fetching.value = false
  }
}

async function addTodo() {
  if (!newTodoTitle.value.trim()) return
  loading.value = true
  try {
    const res = await $fetch<{ todo: Todo }>('/api/todos', {
      method: 'POST',
      body: { title: newTodoTitle.value.trim() },
    })
    todos.value.push(res.todo)
    newTodoTitle.value = ''
    toast.add({ title: 'Added', description: 'Todo created successfully.', color: 'success', icon: 'i-lucide-check-circle' })
  }
  catch (err: any) {
    toast.add({ title: 'Error', description: err?.data?.message || 'Failed to create todo', color: 'error' })
  }
  finally {
    loading.value = false
  }
}

async function toggleTodo(todo: Todo) {
  try {
    const res = await $fetch<{ todo: Todo }>(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: { completed: !todo.completed },
    })
    const idx = todos.value.findIndex(t => t.id === todo.id)
    if (idx !== -1) todos.value[idx] = res.todo
  }
  catch (err: any) {
    toast.add({ title: 'Error', description: err?.data?.message || 'Failed to update todo', color: 'error' })
  }
}

async function deleteTodo(todo: Todo) {
  try {
    await $fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
    todos.value = todos.value.filter(t => t.id !== todo.id)
    toast.add({ title: 'Deleted', description: 'Todo removed.', color: 'success', icon: 'i-lucide-trash-2' })
  }
  catch (err: any) {
    toast.add({ title: 'Error', description: err?.data?.message || 'Failed to delete todo', color: 'error' })
  }
}

const completedCount = computed(() => todos.value.filter(t => t.completed).length)

// Fetch on mount if logged in
onMounted(() => {
  if (loggedIn.value) fetchTodos()
})

// Also watch loggedIn in case auth state resolves after mount
watch(loggedIn, (val) => {
  if (val) fetchTodos()
})
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-8">
    <div>
      <h1 class="font-display text-3xl sm:text-4xl font-bold mb-2">Todos</h1>
      <p class="text-[var(--ui-text-muted)] text-lg">
        Full CRUD demo powered by Cloudflare D1 and Drizzle ORM.
      </p>
    </div>

    <!-- Not logged in state -->
    <UAlert
      v-if="!loggedIn"
      title="Authentication Required"
      description="Sign in on the home page to use the todo list. This page demonstrates route middleware protection."
      color="warning"
      icon="i-lucide-lock"
    />

    <template v-else>
      <!-- Add todo form -->
      <UCard>
        <form class="flex gap-3" @submit.prevent="addTodo">
          <UInput
            v-model="newTodoTitle"
            placeholder="What needs to be done?"
            icon="i-lucide-plus"
            class="flex-1"
            size="lg"
          />
          <UButton type="submit" size="lg" :loading="loading" :disabled="!newTodoTitle.trim()">
            Add
          </UButton>
        </form>
      </UCard>

      <!-- Stats -->
      <div class="flex items-center justify-between text-sm text-[var(--ui-text-muted)]">
        <span>{{ todos.length }} {{ todos.length === 1 ? 'todo' : 'todos' }}</span>
        <span v-if="todos.length > 0">{{ completedCount }} completed</span>
      </div>

      <!-- Loading state -->
      <div v-if="fetching" class="space-y-3">
        <USkeleton v-for="i in 3" :key="i" class="h-16 w-full rounded-lg" />
      </div>

      <!-- Empty state -->
      <UCard v-else-if="todos.length === 0" class="text-center py-12">
        <UIcon name="i-lucide-inbox" class="size-12 text-[var(--ui-text-muted)] mx-auto mb-4" />
        <p class="text-lg font-medium mb-1">No todos yet</p>
        <p class="text-sm text-[var(--ui-text-muted)]">Add your first todo above to get started.</p>
      </UCard>

      <!-- Todo list -->
      <div v-else class="space-y-2">
        <TransitionGroup name="list">
          <UCard
            v-for="todo in todos"
            :key="todo.id"
            class="group"
          >
            <div class="flex items-center gap-3">
              <UCheckbox
                :model-value="todo.completed"
                @update:model-value="toggleTodo(todo)"
              />
              <span
                class="flex-1 text-sm transition-all"
                :class="todo.completed ? 'line-through text-[var(--ui-text-muted)]' : ''"
              >
                {{ todo.title }}
              </span>
              <UButton
                icon="i-lucide-trash-2"
                variant="ghost"
                color="error"
                size="xs"
                class="opacity-0 group-hover:opacity-100 transition-opacity"
                @click="deleteTodo(todo)"
              />
            </div>
          </UCard>
        </TransitionGroup>
      </div>
    </template>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
