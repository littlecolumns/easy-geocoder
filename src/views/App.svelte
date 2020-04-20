<script>
  import Dropzone from "./Dropzone.svelte";
  import Table from "./Table.svelte";
  import ProviderPicker from "./ProviderPicker.svelte";
  import ProviderInfo from "./ProviderInfo.svelte";
  import GeocoderFields from "./GeocoderFields.svelte";
  import AddressPreview from "./AddressPreview.svelte";
  import DownloadButton from "./DownloadButton.svelte";
  import GeocodeButton from "./GeocodeButton.svelte";
  import GeocodedPreview from "./GeocodedPreview.svelte";
  import {
    sourceColNames,
    sourceDataRows,
    sourceFile,
    geocodedDataRows,
    provider
  } from "../store.js";

  $: previewDataRows = $sourceDataRows ? $sourceDataRows.slice(0, 100) : null;
  $: hasSource = $sourceDataRows && $sourceDataRows.length > 0;
  $: hasResults = $geocodedDataRows && $geocodedDataRows.length > 0;
</script>

<main class:has-file="{!!$sourceFile}">
  <div class="source">
    <div class="dropzone">
      <Dropzone />
    </div>
    <div class="preview">
      <Table colNames="{$sourceColNames}" dataRows="{previewDataRows}" />
    </div>
  </div>
  <div class="outputs">
    {#if hasSource}
      <div class="customize">
        <ProviderPicker />
        {#if $provider}
          <ProviderInfo provider="{$provider}" />
          <GeocoderFields />
          <GeocodeButton />
          <DownloadButton />
        {/if}
      </div>
      <div class="preview">
        {#if hasResults}
          <GeocodedPreview />
        {:else}
          <AddressPreview />
        {/if}
      </div>
    {/if}
  </div>
</main>

<style>
  .customize {
    padding: 15px;
  }
  main {
    height: 100%;
  }
  main {
    display: flex;
    flex-direction: column;
  }
  main > div {
    flex: 1;
    overflow: hidden;
    transition: all 250ms ease-out;
  }
  .outputs {
    flex: 0;
  }
  .has-file .outputs {
    flex: 3;
  }
  .has-file .source:hover {
    transition: all 250ms ease-out;
    flex: 9;
  }
  .source {
    display: flex;
    flex-direction: column;
  }
  .source .dropzone {
    flex: 1;
  }
  .source > div {
    transition: all 500ms ease-out;
  }
  .has-file .source .preview {
    flex: 4;
  }
  .source .preview {
    flex: 0;
    overflow: hidden;
  }
  .outputs {
    display: flex;
  }
  .outputs div:nth-child(1) {
    flex: 1;
  }
  .outputs div:nth-child(2) {
    flex: 2;
  }
  .preview {
    height: 100%;
    width: 100%;
  }
</style>
