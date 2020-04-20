<script>
  import DataField from "./DataField.svelte";
  import StaticField from "./StaticField.svelte";
  import { staticFields, addressField } from "../store.js";
</script>

<div>
  <div class="fields">
    <div class="field">
      <p>
        <strong>Build your address:</strong>
      </p>
      <DataField bind:field="{$addressField}" />
    </div>
  </div>
  {#if $staticFields.length > 0}
    <div class="statics">
      {#each $staticFields as sf}
        <div class="field">
          <StaticField desc="{sf.desc}" bind:value="{sf.value}" />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .statics {
    margin-top: 5px;
  }
</style>
