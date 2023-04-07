<template>
  <div class="w-full 3xl:w-[1920px] 3xl:mx-auto">
    <header
      class="w-full py-5 px-10 flex items-center justify-between border-b-2 border-gray-300 shadow-sm"
    >
      <RouterLink
        :to="{
          name: 'home'
        }"
        class="text-primary text-3xl flex items-center gap-3"
      >
        <img src="logo.png" alt="logo" class="h-10">
        <span class="font-semibold">Bills App</span>
      </RouterLink>
      <ul class="flex gap-4 items-center font-medium">
        <li class="hover:text-primary transition-all">
          <!-- RouterLink prend en charge la navigation interne avec les pages 
          déclarée dans ./router/index.js 
          on modifie la classe active sur chaque lien 
          pour utiliser les classes de bootstrap "active"
          -->

          <RouterLink
            to="/"
            exact-active-class="bg-primary text-dark font-semibold"
            active-class="bg-primary text-dark font-semibold"
            class="px-4 py-2 rounded-md transition-all"
          >
            <i class="fa-solid fa-house mr-1" /> Accueil
          </RouterLink>
        </li>
        <li class="hover:text-primary transition-all">
          <RouterLink
            exact-active-class="bg-primary text-dark font-semibold"
            active-class="bg-primary text-dark font-semibold"
            to="/about"
            class="px-4 py-2 rounded-md transition-all"
          >
            A propos
          </RouterLink>
        </li>
      </ul>
    </header>

    <main class="main-router-container mx-28 my-10 3xl:w-[1920px] 3xl:mx-auto">
      <!-- ici seront affichées les différentes "routes" ou "pages" de mon application -->
      <RouterView />
    </main>

    <footer class="py-3 my-4 border-t-2 border-gray-300 text-center">
      <span class="mb-3 mb-md-0 text-primary font-semibold">© {{ currentYear }} Bills.app</span>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    currentYear() {
      //récupère la date courante
      const d = new Date()
      // retourne l'année pour l'affichage dans le template de currentYear
      return d.getFullYear()
    }
  }
}
</script>

<style scoped>
.maClassPerso {
  color: green;
}
</style>
