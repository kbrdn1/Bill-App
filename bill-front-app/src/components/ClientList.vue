<template>
  <div class="border-2 border-gray-300 rounded-lg my-5 overflow-hidden shadow-md">
    <table class="w-full">
      <thead class="bg-blue-500 text-white">
        <slot name="head">
          <tr class="border-b-2 border-gray-300">
            <th class="py-2">Nom</th>
            <th class="py-2">Entreprise</th>
            <th class="py-2 text-end pr-4">Date d'ajout</th>
            <th class="py-2 text-end pr-4">Actions</th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
