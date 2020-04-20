<script>
  export let delay = 250;
  let options = [0, 250, 500, 1000, 1500, 2000, 3000];
</script>

<div>
  <select bind:value="{delay}">
    {#each options as amount}
      <option value="{amount}">{amount}ms delay</option>
    {/each}
  </select>
</div>
