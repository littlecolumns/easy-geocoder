<script>
  export let onclick;
  export let text = "remove";
</script>

<span class="button" on:click="{onclick}">{text}</span>

<style>
  .button {
    cursor: pointer;
    background: #f4efd3;
    color: #333;
    padding: 2px 5px;
    font-size: 0.75em;
  }
</style>
