<script>
  export let geocodedDataRows;
  export let sourceDataRows;
</script>

{#if $geocodedDataRows && $geocodedDataRows.length > 0 && $geocodedDataRows.length < $sourceDataRows.length}
  <div>
    Working on {$geocodedDataRows.length} of {$sourceDataRows.length}...
  </div>
{/if}
