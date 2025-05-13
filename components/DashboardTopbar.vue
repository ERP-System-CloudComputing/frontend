<template>
  <v-app-bar app flat color="white">
    <v-spacer />
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-avatar size="32">
            <img src="https://i.pravatar.cc/300" alt="Avatar" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item title="Profile" />
        <v-list-item title="Settings" />
        <v-list-item title="Logout" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
</script>
