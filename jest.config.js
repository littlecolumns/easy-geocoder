module.exports = {
  transform: {
    "^.+\\.svelte$": "svelte-jester",
    "^.+\\.js$": "babel-jest",
  },
  testPathIgnorePatterns: ["/out/"],
  moduleFileExtensions: ["js", "svelte"],
};
