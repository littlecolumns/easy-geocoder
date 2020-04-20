<script>
  import FileSaver from "file-saver";
  import Papa from "papaparse";

  import {
    geocodedDataRows,
    geocodedColNames,
    completed,
    sourceFile,
    running
  } from "../store";

  function download() {
    const empty = $geocodedColNames.reduce((final, current) => {
      final[current] = null;
      return final;
    }, {});
    const withMissingCols = $geocodedDataRows.map(row => {
      return { ...empty, ...row };
    });
    let csv = Papa.unparse(withMissingCols);
    let blob = new Blob([csv], { type: "text/plain" }); // eslint-disable-line no-undef
    let filename =
      $sourceFile.name.replace(/\.([^.]*)?$/, "") + "-geocoded.csv";
    FileSaver.saveAs(blob, filename);
  }
</script>

<div class="wrapper">
  {#if $geocodedDataRows && $geocodedDataRows.length > 0}
    <div class="button-holder">
      <button on:click="{download}" disabled="{$running}">
        Download
        {#if !$running}
          {#if $completed}
            all results
          {:else}{$geocodedDataRows.length} results{/if}
        {/if}
      </button>
    </div>
  {/if}
</div>

<style>
  .wrapper {
    text-align: center;
    padding: 10px;
  }
  button {
    margin-bottom: 0;
  }
</style>
