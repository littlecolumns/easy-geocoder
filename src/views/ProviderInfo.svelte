<script>
  const { shell } = require("electron");

  function openTerms(event) {
    event.preventDefault();
    shell.openExternal(provider.terms_url);
  }

  export let provider;
</script>

{#if provider && provider.terms_url}
  <div class="terms-link">
    <a href="{provider.terms_url}" on:click="{openTerms}">
      Terms of use &rarr;
    </a>
  </div>
{/if}

<style>
  .terms-link {
    text-align: center;
  }
</style>
