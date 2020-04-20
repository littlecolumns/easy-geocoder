<script>
  import Table from "./Table.svelte";
  import { rowToGeocodingParams } from "../utils";
  import {
    geocoderColNames,
    sourceDataRows,
    geocoderFields
  } from "../store.js";

  $: geocoderDataRows = $sourceDataRows
    ? $sourceDataRows
        .slice(0, 100)
        .map(r => rowToGeocodingParams(r, $geocoderFields))
    : null;
</script>

{#if geocoderDataRows}
  <Table colNames="{$geocoderColNames}" dataRows="{geocoderDataRows}" />
{/if}

<style>

</style>
