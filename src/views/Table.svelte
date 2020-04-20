<script>
  export let colNames;
  export let dataRows;
  export let numRows = 100;

  $: displayRows = dataRows ? dataRows.slice(0, numRows) : null;
</script>

<div class="table-holder">
  {#if colNames && dataRows}
    <table>
      <thead>
        <tr>
          {#each colNames as colName}
            <th>{colName}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each displayRows as row}
          <tr>
            {#each colNames as col}
              <td>
                {#if row[col]}{row[col]}{:else}&nbsp;{/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .table-holder {
    font-size: 85%;
    margin: 0;
    height: 100%;
    overflow: auto;
  }
</style>
