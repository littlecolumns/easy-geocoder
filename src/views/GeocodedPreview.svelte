<script>
  import Table from "./Table.svelte";
  import { geocodedDataRows, geocodedColNames } from "../store";
</script>

{#if $geocodedDataRows.length > 0}
  <Table colNames="{$geocodedColNames}" dataRows="{$geocodedDataRows}" />
{/if}

<style>

</style>
