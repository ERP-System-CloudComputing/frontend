<template>
  <div class=" bg-gray-50 p-6">
    <div class="mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Notifications (3 unread)</h1>
        <button
          @click="markAllAsRead"
          class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Mark All As Read
        </button>
      </div>

      <!-- Today Section -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <!-- Today Header -->
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Today</h2>
          <label class="flex items-center text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              v-model="todaySelectAll"
              @change="toggleTodaySelection"
              class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Select all
          </label>
        </div>

        <!-- Today Notifications -->
        <div class="divide-y divide-gray-100">
          <div
            v-for="notification in todayNotifications"
            :key="notification.id"
            class="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <!-- Avatar -->
            <div class="flex-shrink-0 mr-4">
              <v-avatar size="50" class="mr-4">
                <img src="https://i.pravatar.cc/300" alt="Avatar">
              </v-avatar>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900 mb-1">
                {{ notification.message }}
              </p>
              <p class="text-xs text-gray-500">
                {{ notification.time }}
              </p>
            </div>

            <!-- Unread Indicator -->
            <div class="flex items-center ml-4" style="flex: 0 !important;">
              <div
                v-if="notification.unread"
                class="w-2 h-2 bg-blue-600 rounded-full mr-4"
              ></div>

              <button
                @click="toggleMenu(notification.id)"
                class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Yesterday Section -->
      <div class="bg-white rounded-lg shadow-sm">
        <!-- Yesterday Header -->
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Yesterday 18th November, 2022</h2>
          <label class="flex items-center text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              v-model="yesterdaySelectAll"
              @change="toggleYesterdaySelection"
              class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Select all
          </label>
        </div>

        <!-- Yesterday Notifications -->
        <div class="divide-y divide-gray-100">
          <div
            v-for="notification in yesterdayNotifications"
            :key="notification.id"
            class="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <!-- Avatar -->
            <div class="flex-shrink-0 mr-4">
              <v-avatar size="50" class="mr-4">
                <img src="https://i.pravatar.cc/300" alt="Avatar">
              </v-avatar>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900 mb-1">
                {{ notification.message }}
              </p>
              <p class="text-xs text-gray-500">
                {{ notification.time }}
              </p>
            </div>

            <!-- Menu Button -->
            <div class="flex items-center ml-4">
              <button
                @click="toggleMenu(notification.id)"
                class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MoreVertical class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    const avatarUrl = '/placeholder.svg?height=48&width=48'

    return {
      avatarUrl,
      todaySelectAll: false,
      yesterdaySelectAll: false,
      todayNotifications: [
        {
          id: 1,
          avatar: avatarUrl,
          sender: 'Admin',
          message: 'Your payment invoice request has been approved by Admin',
          time: '3min ago',
          unread: true,
          selected: false
        },
        {
          id: 2,
          avatar: avatarUrl,
          sender: 'Admin',
          message: 'Your payment invoice request has been approved by Admin',
          time: '10min ago',
          unread: true,
          selected: false
        },
        {
          id: 3,
          avatar: avatarUrl,
          sender: 'Admin',
          message: 'Your payment invoice request has been approved by Admin',
          time: '1hr ago',
          unread: true,
          selected: false
        },
        {
          id: 4,
          avatar: avatarUrl,
          sender: 'Admin',
          message: 'Your payment invoice request has been approved by Admin',
          time: '5hr ago',
          unread: false,
          selected: false
        }
      ],
      yesterdayNotifications: [
        {
          id: 5,
          avatar: avatarUrl,
          sender: 'Admin',
          message: 'Your payment invoice request has been approved by Admin',
          time: '1day ago',
          unread: false,
          selected: false
        },
        {
          id: 6,
          avatar: avatarUrl,
          sender: 'Admin',
          message: 'Your payment invoice request has been approved by Admin',
          time: '1day ago',
          unread: false,
          selected: false
        },
        {
          id: 7,
          avatar: avatarUrl,
          sender: 'Admin',
          message: 'Your payment invoice request has been approved by Admin',
          time: '1day ago',
          unread: false,
          selected: false
        }
      ]
    }
  },
  watch: {
    todaySelectAll (newVal) {
      this.todayNotifications.forEach(n => (n.selected = newVal))
    },
    yesterdaySelectAll (newVal) {
      this.yesterdayNotifications.forEach(n => (n.selected = newVal))
    }
  },
  methods: {
    markAllAsRead () {
      this.todayNotifications.forEach((n) => {
        n.unread = false
      })
      console.log('All notifications marked as read')
    },
    toggleMenu (notificationId) {
      console.log('Toggle menu for notification:', notificationId)
      // Aquí puedes manejar la lógica del dropdown
    }
  }
}
</script>

<style scoped>
/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

input[type="checkbox"]:focus {
  ring-color: #3b82f6;
  ring-opacity: 0.5;
}

/* Hover effects */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
