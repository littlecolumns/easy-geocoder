<script>
  export let column;
  export let customText = "";
  import { sourceColNames } from "../store.js";
  import Button from "./Button.svelte";

  const customLabel = "Custom text";

  $: isBlank = column === "";
  $: isCustom = column === customLabel;
  $: removeText = isCustom ? "X" : "remove";
</script>

<div
  class="root"
  class:column-selected="{!isBlank}"
  class:custom-text="{isCustom}"
>
  {#if sourceColNames}
    <div class="select-holder">
      <select bind:value="{column}">
        <option value="">Select a column</option>
        <option value="{customLabel}">{customLabel}</option>
        {#each $sourceColNames as col}
          <option value="{col}">{col}</option>
        {/each}
      </select>
    </div>
    {#if isCustom}
      <div class="text-holder">
        <input
          type="text"
          placeholder="Comma, state, city, etc"
          bind:value="{customText}"
        />
      </div>
    {/if}
    {#if !isBlank}
      <div class="remove-holder">
        <Button onclick="{() => (column = '')}" text="{removeText}" />
      </div>
    {/if}
  {/if}
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    text-align: left;
  }
  input {
    width: 100%;
    font-size: 0.85em;
  }
  .select-holder,
  .remove-holder,
  .text-holder {
    overflow: hidden;
  }
  .select-holder {
    flex: 1;
  }
  .text-holder {
    text-align: center;
    flex: 2;
  }
  .remove-holder {
    text-align: right;
    flex: 0.5;
  }
  select {
    width: 100%;
  }
</style>
