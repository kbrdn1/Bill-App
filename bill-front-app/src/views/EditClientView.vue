<template>
  <div class="edit-client">
    <header class="flex items-baseline justify-between border-b-2 border-gray-300 mb-4">
      <h1 class="text-3xl mb-4">
        {{ isNewClient ? 'Créer un nouveau ' : 'Modifier le ' }} client
        <span v-if="!isNewClient" class="text-primary">#{{ id }}</span>
      </h1>
      <div class="flex gap-2">
        <BButton
          v-if="!isNewClient"
          variant="border-2 border-red-500 hover:bg-red-600"
          icon-left="trash"
          @click="onDeleteBill()"
          >Supprimer</BButton
        >
        <BButton
          to="/client"
          variant="border-2 border-gray-300 hover:bg-gray-300 text-gray-400 hover:text-black"
          icon-left="angle-left"
          >Annuler</BButton
        >
      </div>
    </header>
    <section v-if="client">
      <div class="flex">
        <div class="w-2/3">
          <h2 class="text-2xl mb-3">Contact:</h2>
          <div class="flex items-center gap-3 mb-4">
            <div class="flex items-center justify-between gap-2 w-1/2">
              <label for="firstName" class="w-[120px]">Prénom:</label>
              <input
                type="text"
                id="firstName"
                class="w-full p-2 rounded-md border-2 border-zinc-300"
                v-model="client.firstName"
              />
            </div>
            <div class="flex items-center justify-between gap-2 w-1/2">
              <label for="lastName" class="w-[120px]">Nom:</label>
              <input
                type="text"
                id="lastName"
                class="w-full p-2 rounded-md border-2 border-zinc-300"
                v-model="client.lastName"
              />
            </div>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <div class="flex items-center justify-between gap-2 w-1/2">
              <label for="fonction" class="w-[120px]">Fonction:</label>
              <input
                type="text"
                id="fonction"
                class="w-full p-2 rounded-md border-2 border-zinc-300"
                v-model="client.fonction"
              />
            </div>
            <div class="flex items-center justify-between gap-2 w-1/2">
              <label for="tel" class="w-[120px]">Téléphone:</label>
              <input
                type="number"
                id="tel"
                class="w-full p-2 rounded-md border-2 border-zinc-300"
                v-model="client.tel"
              />
            </div>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <div class="flex w-full items-center justify-between gap-2">
              <label for="email" class="w-[120px]">Email:</label>
              <input
                type="email"
                id="email"
                class="w-full p-2 rounded-md border-2 border-zinc-300"
                v-model="client.email"
              />
            </div>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <div class="flex w-full items-center justify-between gap-2">
              <label for="company" class="w-[120px]">Entreprise:</label>
              <input
                type="company"
                id="company"
                class="w-full p-2 rounded-md border-2 border-zinc-300"
                v-model="client.company"
              />
            </div>
          </div>
        </div>
        <div class="w-1/3 px-2 py-5">
          <label for="date_added" class="w-[120px]">Date d'ajout:</label>
          <input
            type="text"
            id="date_added"
            class="w-full p-2 rounded-md border-2 border-zinc-300"
            v-model="client.date_added"
          />
        </div>
      </div>
      <div class="w-2/3">
        <h2 class="text-2xl">Coordonnées</h2>
        <div class="flex items-center gap-3 mb-4">
          <div class="flex w-full items-center justify-between gap-2">
            <label for="address" class="w-[120px]">Adresse 1:</label>
            <input
              type="address"
              id="address"
              class="w-full p-2 rounded-md border-2 border-zinc-300"
              v-model="client.address"
            />
          </div>
        </div>
        <div class="flex items-center gap-3 mb-4">
          <div class="flex w-full items-center justify-between gap-2">
            <label for="address2" class="w-[120px]">Adresse 2:</label>
            <input
              type="address2"
              id="address2"
              class="w-full p-2 rounded-md border-2 border-zinc-300"
              v-model="client.address2"
            />
          </div>
        </div>
        <div class="flex gap-3 items-center">
          <div class="flex gap-3 w-1/2 items-center">
            <label for="zip" class="w-[120px]">Code Postal:</label>
            <input
              type="number"
              id="zip"
              class="w-full p-2 rounded-md border-2 border-zinc-300"
              v-model="client.zip"
            />
          </div>
          <div class="flex gap-3 w-1/2 items-center">
            <label for="city" class="w-[120px]">Ville:</label>
            <input
              type="text"
              id="city"
              class="w-full p-2 rounded-md border-2 border-zinc-300"
              v-model="client.city"
            />
          </div>
        </div>
        <div class="flex gap-3 w-1/2 items-center mt-3">
          <label for="country" class="w-[120px]">Pays:</label>
          <input
            type="text"
            id="country"
            class="w-full p-2 rounded-md border-2 border-zinc-300"
            v-model="client.country"
          />
        </div>
      </div>

      <div class="flex justify-between">
        <div class="form-check my-3">
          <input class="form-check-input" type="checkbox" v-model="debug" id="debug" />
          <label class="form-check-label" for="debug"> Debug </label>
        </div>

        <div class="text-end">
          <b-button @click="onSaveBill()" variant="bg-primary " icon-right="fas fa-floppy-disk">
            {{ isNewBill ? 'Enregistrer' : 'Modifier' }}
          </b-button>
        </div>
      </div>
    </section>
    <pre
      class="my-2 border-2 border-amber-500 rounded-lg text-white bg-dark p-2 w-fit"
      v-if="debug"
    >
        {{ client }}
      </pre
    >
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useClientStore } from '@/stores/client.js'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      debug: false
    }
  },
  computed: {
    ...mapState(useClientStore, ['client']),
    isNewClient() {
      return !this.id || this.id < 0
    }
  },
  async mounted() {
    if (this.isNewClient) {
      await this.createClient()
    } else {
      await this.getClient(this.id)
    }
  },
  methods: {
    ...mapActions(useClientStore, ['getClient', 'createClient', 'saveClient', 'deleteClient']),

    async onSaveBill() {
      await this.saveClient(this.client)
      this.$router.push('/client')
    }
  }
}
</script>
