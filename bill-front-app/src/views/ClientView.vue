<template>
  <div class="client">
    <div class="flex items-baseline justify-between border-b-2 mb-4">
      <h1 class="text-3xl font-medium mb-4"><i class="fas fa-angle-down me-2" />Clients</h1>
      <BButton
        variant="bg-primary"
        iconLeft="circle-plus"
        :to="{ name: 'createClient', params: { id: -1 } }"
      >
        Ajouter un client
      </BButton>
    </div>
    <!-- ./titre + bouton -->

    <p v-if="!clients || !clients.length" class="text-primary my-5">Aucun client pour l'instant.</p>
  <ClientList v-else>
    <ClientListItem
      v-for="client in clients"
      :key="client.id"
      :client="client"
      message="test"
      @delete="deleteClient($event)"
      @edit="editClient($event)"
    />
  </ClientList>
    </div>

</template>

<script>
import ClientList from '@/components/ClientList.vue'
import ClientListItem from '@/components/ClientListItem.vue'
import { useClientStore } from '@/stores/client.js'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    ClientList,
    ClientListItem
  },
  computed: {
    ...mapState(useClientStore, ['clients', 'totalClients'])
  },
  mounted() {
    this.getAllClients()
  },
  methods: {
    ...mapActions(useClientStore, ['deleteClient', 'getAllClients'])
  }
}
</script>
