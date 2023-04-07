<template>
  <div class="border-2 border-gray-300 rounded-lg my-5 overflow-hidden shadow-md">
    <table class="w-full">
      <thead>
        <slot name="head">
          <tr class="border-b-2 border-gray-300">
            <th class="py-2">Date</th>
            <th class="py-2">Description</th>
            <th class="py-2">Client</th>
            <th class="py-2 text-end pr-4">Tarif HT</th>
            <th class="py-2 text-end pr-4">Tarif TTC</th>
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
