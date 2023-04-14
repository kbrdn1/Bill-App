<template>
  <div class="bill">
    <header class="flex items-baseline justify-between border-b-2 border-gray-300 mb-4">
      <h1 class="text-3xl mb-4">
        {{ isNewBill ? 'Créer une nouvelle ' : 'Modifier la' }} facture
        <span v-if="!isNewBill" class="text-primary">#{{ id }}</span>
      </h1>
      <div class="flex gap-2">
        <BButton
          v-if="!isNewBill"
          variant="border-2 border-red-500 hover:bg-red-600"
          icon-left="trash"
          @click="onDeleteBill()"
          >Supprimer</BButton
        >
        <BButton
          to="/"
          variant="border-2 border-gray-300 hover:bg-gray-300 text-gray-400 hover:text-black"
          icon-left="angle-left"
          >Annuler</BButton
        >
      </div>
    </header>

    <!-- j'attends que bill existe pour afficher le formulaire -->
    <section v-if="bill" class="p-4 rounded-lg">
      <div class="w-full flex items-center justify-between gap-3">
        <div class="mb-3 flex justify-between items-center gap-3 w-1/4">
          <label for="billnum" class="font-semibold text-lg">Facture N°</label>
          <input
            v-model.number="bill.billnum"
            class="p-2 rounded-md border-2 border-zinc-300"
            id="billnum"
          />
        </div>
        <div class="mb-3 flex items-center gap-3 w-3/4">
          <label for="description" class="font-semibold text-lg">Description</label>
          <input
            v-model="bill.description"
            class="w-full p-2 rounded-md border-2 border-zinc-300"
            id="description"
          />
        </div>
      </div>
      <div class="mb-3 flex justify-between items-center pr-1 w-1/4">
        <label for="billnum" class="font-semibold text-lg">Émise le:</label>
        <input
          v-model.number="bill.date"
          class="p-2 rounded-md border-2 border-zinc-300"
          id="billnum"
        />
      </div>
      <div class="mb-3 flex justify-between items-center pr-1 w-1/4">
        <label for="client" class="font-semibold text-lg">Client :</label>
        <select
          class="p-2 rounded-md border-2 border-zinc-300"
          :arialabel="bill.client._id + ' ' + bill.client._id"
          v-model="bill.client._id"
          id="client"
        >
          <option class="">Choisir</option>
          <option v-for="client in clients" :key="client._id" :value="client._id">
            {{ client.firstName + ' ' + client.lastName }}
          </option>
        </select>
      </div>
      <div class="border-2 border-gray-300 rounded-lg my-5 overflow-hidden">
        <table class="w-full">
          <thead class="bg-blue-500 text-white">
            <tr class="border-b-2 border-gray-500">
              <th class="py-2">Actions</th>
              <th class="py-2">Prestation</th>
              <th class="py-2">Quantité</th>
              <th class="py-2 text-end pr-4">Montant U.</th>
              <th class="py-2 text-end pr-4">Montant Total</th>
            </tr>
          </thead>
          <tbody>
            <!-- prestations -->
            <tr v-for="(prestation, index) in bill.prestations" :key="'prestation-' + index">
              <td class="flex justify-center">
                <div class="flex gap-1 justify-end pr-3">
                  <BButton
                    class=""
                    icon-left="circle-plus"
                    variant="text-primary"
                    v-if="index === bill.prestations.length - 1"
                    @click="onAddPrestation()"
                    ><span class="sr-only">Ajouter</span></BButton
                  >
                  <BButton
                    :disabled="bill.prestations.length === 1"
                    class="pe-0"
                    icon-left="trash"
                    variant="text-red-500"
                    @click="onDeletePrestation(index)"
                    ><span class="sr-only">Supprimer</span></BButton
                  >
                </div>
              </td>
              <td>
                <input v-model="prestation.description" class="w-full p-2 rounded-md" />
              </td>
              <td>
                <input
                  min="1"
                  type="number"
                  v-model="prestation.qty"
                  class="w-full text-center p-2 rounded-md"
                />
              </td>
              <td><input v-model="prestation.price" class="w-full p-2 rounded-md text-end" /></td>
              <td>
                <input
                  :value="prestation.qty * prestation.price"
                  disabled
                  class="w-full p-2 rounded-md text-end"
                />
              </td>
            </tr>
            <!-- ./prestations -->
            <!-- totaux -->
            <tr>
              <td colspan="4" class="text-end pt-3 pb-1">
                <label for="discount" class="mr-3 pt-1 font-medium">Remises</label>
              </td>
              <td class="text-end pt-3 pb-1">
                <input
                  class="w-full p-2 rounded-md text-end"
                  type="number"
                  v-model.number="bill.discount"
                  id="discount"
                />
              </td>
            </tr>
            <tr>
              <td colspan="4" class="text-end pt-3 pb-1">
                <label for="totalHT" class="mr-3 pt-1 font-medium">Total HT</label>
              </td>
              <td class="text-end pt-3 pb-1">
                <input
                  class="w-full p-2 rounded-md text-end"
                  readonly
                  :value="totalHT"
                  type="number"
                  id="totalHT"
                />
              </td>
            </tr>
            <tr>
              <td colspan="4" class="text-end pt-3 pb-1">
                <label for="totalTVA" class="mr-3 pt-1 font-medium">TVA ({{ bill.tva }}%)</label>
              </td>
              <td class="text-end pt-3 pb-1">
                <input
                  class="w-full p-2 rounded-md text-end"
                  readonly
                  :value="totalTVA"
                  type="number"
                  id="totalTVA"
                />
              </td>
            </tr>
            <tr>
              <td colspan="4" class="text-end pt-3 pb-1">
                <label for="totalTTC" class="mr-3 pt-1 font-medium">Montant total TTC</label>
              </td>
              <td class="text-end pt-3 pb-1">
                <input
                  class="w-full p-2 rounded-md text-end"
                  readonly
                  :value="totalTTC"
                  type="number"
                  id="totalTTC"
                />
              </td>
            </tr>
            <tr>
              <td colspan="4" class="text-end pt-3 pb-1">
                <label for="paid" class="mr-3 pt-1 font-medium">Acompte déjà payé</label>
              </td>
              <td class="text-end pt-3 pb-1">
                <input
                  class="w-full p-2 rounded-md text-end"
                  type="number"
                  v-model.number="bill.paid"
                  id="paid"
                />
              </td>
            </tr>
            <tr>
              <td colspan="4" class="text-end py-1">
                <label for="totalRestDue" class="mr-3 pt-1 font-medium">Reste Dû TTC</label>
              </td>
              <td class="text-end py-1">
                <input
                  class="w-full p-2 rounded-md text-end bg-secondary-subtle fw-bold"
                  readonly
                  :value="totalRest"
                  type="number"
                  id="totalRestDue"
                />
              </td>
            </tr>
          </tbody>
        </table>
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
      {{ bill }}
      {{ clients }}
    </pre>
  </div>
</template>

<script>
import prestationInterface from '@/interfaces/prestationInterface.js'

import { mapState, mapActions } from 'pinia'
import { useBillStore } from '@/stores/bill.js'
import { useClientStore } from '@/stores/client.js'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      debug: false
    }
  },
  computed: {
    // on connecte le state de bill avec mapWritableState
    ...mapState(useBillStore, ['bill']),
    ...mapState(useClientStore, ['clients']),

    // est-ce une nouvelle facture ? ou est-on en train de modifier une facture enregistrée ?
    isNewBill() {
      return !this.id || this.id < 0
    },

    // calcule le total HT en fonction des prestations et de la remise
    totalHT() {
      let total = 0
      if (this.bill.prestations && this.bill.prestations.length) {
        for (const prestation of this.bill.prestations) {
          total += prestation.qty * prestation.price
        }
      }
      total -= this.bill.discount
      return total
    },
    // calcule le montant de la TVA
    totalTVA() {
      return (this.totalHT * this.bill.tva) / 100
    },
    // calcule le montant TTC
    totalTTC() {
      return this.totalHT + this.totalTVA
    },
    // calcule le reste Dû
    totalRest() {
      return this.totalTTC - this.bill.paid
    }
  },
  async mounted() {
    // console.log(this.$route.params.id)
    console.log(this.id)
    // au chargement du composant, en fonction de l'id passé dans la route, sous forme de props..
    if (this.isNewBill) {
      // soit je crée un nouveau formulaire (venant du store)
      await this.createBill()
    } else {
      // soit je remplis le formulaire avec les données d'une facture existante (venant du store)
      await this.getBill(this.id)
    }
    // on récupère la liste des clients
    await this.getAllClients()
  },
  methods: {
    // on importe les méthodes du store bill
    ...mapActions(useBillStore, ['createBill', 'getBill', 'saveBill', 'deleteBill']),
    // on importe les méthodes du store client
    ...mapActions(useClientStore, ['getAllClients']),

    // pousse une nouvelle prestation dans le tableau bill.prestations
    onAddPrestation() {
      this.bill.prestations.push({
        ...prestationInterface, // on a importé l'interface de notre objet prestation
        description: 'description par défaut' // on peut modifier les valeurs à la volée
      })
    },
    // supprime une prestation dans le tableau bill.prestations en fonction
    // de son index dans le tableau
    onDeletePrestation(index) {
      this.bill.prestations.splice(index, 1)
    },
    onDeleteBill() {
      this.deleteBill(this.id)
      this.$router.push('/')
    },
    async onSaveBill() {
      await this.saveBill({
        ...this.bill,
        totalHT: this.totalHT,
        totalTTC: this.totalTTC
      })
      this.$router.push('/')
    }
  }
}
</script>
