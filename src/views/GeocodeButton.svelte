<script>
  import Promise from "bluebird";

  import { rowToGeocodingParams, flattenDict, addPrefix } from "../utils";
  import { NodeGeocoder } from "../geocoders";
  import DelaySelector from "./DelaySelector.svelte";
  import Notice from "./Notice.svelte";
  import Progress from "./Progress.svelte";

  import {
    provider,
    staticFields,
    geocoderFields,
    sourceDataRows,
    geocodedDataRows,
    running,
    completed
  } from "../store";

  let geocoder;
  let errorText;
  let stop = false;
  let cache = {};
  let delay = 250;

  function saveGeocodedRow(addition) {
    geocodedDataRows.update(existing => [...existing, addition]);
  }

  // Move all of his somewhere else! the problem right now
  // is just the Promise.delay()...

  async function geocodeRow(row) {
    if (stop) {
      running.set(false);
      stop = false;
      throw new Error("Stopped by user");
    }

    // while (paused) {
    //   await new Promise(resolve => setTimeout(resolve, 500));
    // }

    if (row["latitude"] && row["longitude"]) {
      return saveGeocodedRow(row);
    }

    let cacheKey = JSON.stringify(row);
    let cached = cache[cacheKey];
    if (cached) {
      return saveGeocodedRow(cached);
    }

    // Transform the original data row into the format that
    // the geocoding service expects
    let transformed = rowToGeocodingParams(row, $geocoderFields);
    return (
      geocoder
        .geocode(transformed)
        // .then($provider.processResponse)
        .then(results => (results.length > 0 ? results[0] : {}))
        .then(flattenDict)
        .then(addPrefix)
        .then(prefixed => {
          return { ...row, ...prefixed };
        })
        .then(combined => {
          cache[cacheKey] = combined;
          return combined;
        })
        .then(combined => saveGeocodedRow(combined))
        .then(() => Promise.delay(delay))
    );
  }

  async function geocodeAll() {
    const params = $staticFields.reduce((final, current) => {
      final[current.name] = current.value;
      return final;
    }, {});

    try {
      geocoder = NodeGeocoder({
        ...$provider.initOptions,
        ...params
      });
    } catch (err) {
      errorText = err.message || err.cause;
      return;
    }

    // We can throw everything away because we'll have cached results anyway
    errorText = null;

    geocodedDataRows.set([]);
    running.set(true);

    Promise.mapSeries($sourceDataRows, geocodeRow)
      .then(() => {
        completed.set(true);
      })
      .catch(err => {
        errorText = err.message || err.cause;
      })
      .finally(() => {
        running.set(false);
      });
  }

  function pauseGeocoding() {
    stop = true;
  }

  $: buttonText = $geocodedDataRows.length === 0 ? "Geocode" : "Resume";
  $: geocodingPossible =
    $geocoderFields[0].columns.length > 0 && !$running && !$completed;
</script>

<div class="wrapper">
  {#if !$completed}
    <Notice message="{errorText}" messageType="error-text" />

    <DelaySelector bind:delay />

    {#if !$running}
      <button disabled="{!geocodingPossible}" on:click="{geocodeAll}">
        {buttonText}
      </button>
    {:else}
      <button on:click="{pauseGeocoding}">Stop</button>
      <Progress {geocodedDataRows} {sourceDataRows} />
    {/if}
  {/if}
</div>

<style>
  .wrapper {
    text-align: center;
  }
  button {
    margin-bottom: 0;
  }
</style>
