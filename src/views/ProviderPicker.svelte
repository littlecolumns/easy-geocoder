<script>
  import { providers } from "../geocoders.js";
  import { providerName } from "../store.js";
</script>

<div class="root">
  <select bind:value="{$providerName}">
    <option value="">Select a provider</option>
    {#each providers as provider}
      <option value="{provider.name}">{provider.name}</option>
    {/each}
  </select>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
</style>
