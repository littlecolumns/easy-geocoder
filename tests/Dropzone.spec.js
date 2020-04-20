import Dropzone from "../src/views/Dropzone.svelte";
import { render, act } from "@testing-library/svelte";
import { sourceFile } from "../src/store.js";

import "@testing-library/jest-dom/extend-expect";

it("Uploading a file changes the name", async () => {
  const file = new File([""], "schools_sample.csv", {
    type: "text/csv",
    path: "/Users/soma/Development/geocoder-electron/sample-data",
  });

  let { getByText } = render(Dropzone);
  expect(getByText("Drag a CSV or Excel file")).toBeDefined();

  await act(() => {
    sourceFile.set(file);
  });

  expect(getByText("schools_sample.csv")).toBeDefined();
});
