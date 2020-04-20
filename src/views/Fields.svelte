<script>
  import Field from "Field";

  export let fields;
  export let separator = " ";
  export let commas = false;

  $: fields = [...fields.filter(f => f.column !== ""), { column: "" }];
  $: separator = commas ? ", " : " ";
  $: filledInFields = fields.filter(f => f.column !== "");
</script>

<div>
  {#each fields as field}
    <Field
      bind:columnIndex="{field.columnIndex}"
      bind:customText="{field.customText}"
      bind:isCustom="{field.isCustom}"
      bind:process="{field.process}"
    />
  {/each}
  {#if filledInFields.length > 1}
    <p>
      <input type="checkbox" bind:checked="{commas}" />
      Use comma as separator
    </p>
  {/if}
</div>

<style>

</style>
