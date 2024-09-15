<template>
  <NuxtLayout v-if="!isLoading">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

  const productStore = useProductStore()

  const isLoading = ref(true)

  onBeforeMount(async () => {
    await productStore.getAttributes()
    isLoading.value = false
  })
</script>
