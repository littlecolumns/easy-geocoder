import Table from "../src/views/Table.svelte";
import { render } from "@testing-library/svelte";
import "@testing-library/jest-dom/extend-expect";

it("it displays nothing when sent nothing", async () => {
  render(Table, {
    colNames: null,
    dataRows: null,
  });
  expect(document.querySelector("table")).toBeNull();
});

it("it displays nothing when sent no rows", async () => {
  render(Table, {
    colNames: [],
    dataRows: null,
  });
  expect(document.querySelector("table")).toBeNull();
});

it("it displays nothing when sent no columns", async () => {
  render(Table, {
    colNames: null,
    dataRows: [],
  });
  expect(document.querySelector("table")).toBeNull();
});

it("it displays a table when sent columns and rows", async () => {
  render(Table, {
    colNames: [],
    dataRows: [],
  });
  expect(document.querySelector("table")).not.toBeNull();
});

it("it displays headers when sent headers", async () => {
  render(Table, {
    colNames: ["test1", "test2", "test3"],
    dataRows: [],
  });
  expect(document.querySelector("thead th:nth-child(1)")).toHaveTextContent(
    "test1"
  );
  expect(document.querySelector("thead th:nth-child(2)")).toHaveTextContent(
    "test2"
  );
  expect(document.querySelector("thead th:nth-child(3)")).toHaveTextContent(
    "test3"
  );
});

it("it displays rows when sent row data", async () => {
  render(Table, {
    colNames: ["test1", "test2", "test3"],
    dataRows: [
      {
        test1: "value1",
        test2: "value2",
        test3: "value3",
      },
    ],
  });
  expect(document.querySelector("tbody")).toHaveTextContent("value1");
  expect(document.querySelector("tbody")).toHaveTextContent("value2");
  expect(document.querySelector("tbody")).toHaveTextContent("value3");
});

it("it displays the proper number of rows and columns when sent row data", async () => {
  render(Table, {
    colNames: ["test1", "test2", "test3"],
    dataRows: [
      {
        test1: "value1",
        test2: "value2",
        test3: "value3",
        test4: "value4",
      },
      {
        test1: "value1",
        test2: "value2",
        test3: "value3",
        test4: "value4",
      },
      {
        test1: "value1",
        test2: "value2",
        test3: "value3",
        test4: "value4",
      },
    ],
  });
  expect([
    ...document.querySelectorAll("tbody tr:nth-child(1) td"),
  ]).toHaveLength(3);
  expect([...document.querySelectorAll("tbody tr")]).toHaveLength(3);
});
