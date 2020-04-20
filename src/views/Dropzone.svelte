<script>
  import { sourceFile } from "../store.js";
  import Button from "./Button.svelte";

  let label;
  let hovering = false;
  $: uploaded = !!$sourceFile;

  function handleMouseEnter(event) {
    event.preventDefault();
    hovering = true;
  }

  function handleMouseExit(event) {
    event.preventDefault();
    hovering = false;
  }

  function handleDragEnter(event) {
    event.preventDefault();
    hovering = true;
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragLeave(event) {
    event.preventDefault();
    hovering = false;
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    sourceFile.set(file);
    hovering = false;
  }

  function removeSource(event) {
    event.preventDefault();
    event.stopPropagation();
    sourceFile.set(null);
  }

  function startUpload() {
    if (!uploaded) {
      label.click();
    }
  }
</script>

<div
  class="dropzone"
  class:hovering
  class:uploaded
  on:dragmouseenter="{handleMouseEnter}"
  on:dragmousexit="{handleMouseExit}"
  on:dragleave="{handleDragLeave}"
  on:dragenter="{handleDragEnter}"
  on:dragover="{handleDragOver}"
  on:drop="{handleDrop}"
  on:click="{startUpload}"
>

  <form>
    {#if $sourceFile}
      <p>
        Using
        <strong>{$sourceFile.name}</strong>
        <Button onclick="{removeSource}" />
      </p>
    {:else}
      <label bind:this="{label}" for="file-upload">
        <strong>Drag a CSV or Excel file</strong>
        or click to upload
      </label>
      <input type="file" id="file-upload" />
    {/if}
  </form>

  <slot />
</div>

<style>
  input {
    display: none;
  }
  .dropzone {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 200ms ease-out;
    text-align: center;
    height: 100%;
    width: 100%;
  }
</style>
