import { writable, derived } from "svelte/store";
import { providers } from "./geocoders";
import Papa from "papaparse";
import XLSX from "xlsx";

export const sourceFile = writable();
export const running = writable(false);
export const completed = writable(false);
export const sourceDataRows = writable();
export const sourceColNames = writable();
export const geocodedDataRows = writable();
export const geocodedColNames = writable();

/*
 After the file is set, pull in the first 100
 rows as a preview
*/
sourceFile.subscribe((file) => {
  if (!file) {
    sourceColNames.set(null);
    sourceDataRows.set([]);
    geocodedColNames.set(null);
    geocodedDataRows.set([]);
    completed.set(false);
    return;
  }

  if (
    file.name.toString().endsWith("xls") ||
    file.name.toString().endsWith("xlsx")
  ) {
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log("reading it in");
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: "array" });

      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      const results = XLSX.utils.sheet_to_json(sheet, { header: 0, raw: true });

      completed.set(false);
      sourceColNames.set(Object.keys(results[0]));
      sourceDataRows.set(results);
    };
    reader.readAsArrayBuffer(file);
  } else {
    Papa.parse(file, {
      // preview: 100,
      header: true,
      complete: function (results) {
        completed.set(false);
        sourceColNames.set(results.meta.fields);
        sourceDataRows.set(results.data);
      },
    });
  }
});

geocodedDataRows.subscribe((results) => {
  if (!results || results.length < 1) {
    geocodedColNames.set(null);
  } else {
    // I hope in the first 10 rows we have all the column names
    const keys = [].concat.apply(
      [],
      results.slice(0, 10).map((r) => Object.keys(r))
    );
    const unique = [...new Set(keys)];
    geocodedColNames.set(unique);
  }
});

export const providerName = writable();

export const provider = derived(providerName, ($providerName) =>
  providers.find((p) => p.name === $providerName)
);

export const addressField = writable({
  name: "address",
  columns: [],
  commas: false,
});

export const dataFields = writable();
export const staticFields = writable();

export const geocoderFields = derived(addressField, ($addressField) => [
  $addressField,
]);

export const geocoderColNames = derived(geocoderFields, ($geocoderFields) =>
  $geocoderFields.map((a) => a.name)
);

provider.subscribe((p) => {
  if (!p) return;

  dataFields.set(
    p.extraFields.map((f) => {
      return {
        ...f,
        columns: [],
        commas: false,
      };
    })
  );

  staticFields.set(p.staticFields.map((f) => ({ ...f })));
});
