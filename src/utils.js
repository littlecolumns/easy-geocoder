export function rowToGeocodingParams(row, fields) {
  return fields.reduce((final, field) => {
    final[field.name] = field.columns
      .map((nameOrCustom) => row[nameOrCustom] || nameOrCustom)
      .join(field.commas ? ", " : " ");
    return final;
  }, {});
}

export function addPrefix(result) {
  // Prepend geo_ to every key except latitude/longitude
  return Object.keys(result).reduce((final, current) => {
    if (current === "latitude" || current === "longitude") {
      final[current] = result[current];
    } else {
      final[`geo_${current}`] = result[current];
    }
    return final;
  }, {});
}

/* Utilities */
// https://coderwall.com/p/w22s0w/recursive-merge-flatten-objects-in-plain-old-vanilla-javascript
export function merge(objects) {
  let out = {};

  for (let i = 0; i < objects.length; i++) {
    for (let p in objects[i]) {
      out[p] = objects[i][p];
    }
  }

  return out;
}

export function flattenDict(obj, name, stem) {
  let out = {};
  let newStem =
    typeof stem !== "undefined" && stem !== "" ? stem + "_" + name : name;

  if (typeof obj !== "object") {
    out[newStem] = obj;
    return out;
  }

  for (let p in obj) {
    let prop = flattenDict(obj[p], p, newStem);
    out = merge([out, prop]);
  }

  return out;
}
