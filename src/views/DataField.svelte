<script>
  import ColumnSelector from "./ColumnSelector.svelte";

  export let field;

  let pieces = [];

  $: pieces = [...pieces.filter(f => f.column !== ""), { column: "" }];
  $: field.columns = pieces
    .filter(p => p.column !== "")
    .map(p => p.customText || p.column);
</script>

<div>
  <!-- <p>{field.name}</p> -->

  {#each pieces as piece}
    <ColumnSelector
      bind:column="{piece.column}"
      bind:customText="{piece.customText}"
    />
  {/each}
  {#if pieces.length > 2}
    <div>
      <input type="checkbox" bind:checked="{field.commas}" />
      Use comma as separator
    </div>
  {/if}
</div>

<style>

</style>
