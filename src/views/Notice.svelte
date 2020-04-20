<script>
  export let message;
  export let messageType;
</script>

{#if message}
  <div class="{messageType}">
    <pre>{message}</pre>
  </div>
{/if}

<style>
  pre {
    white-space: pre-wrap;
  }

  .error-text {
    background: #f6acc8;
    color: #39375b;
  }

  pre {
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>
