<script>
  export let desc;
  export let value = "";
</script>

<div>
  <label for="field">{desc}</label>
  <input type="text" bind:value placeholder="{desc}" />
</div>

<style>
  div {
    font-size: 0.85em;
  }
  label {
    width: 25%;
    display: inline-block;
  }
  input {
    width: 70%;
    display: inline-block;
  }
</style>
