// `server-only` wirft außerhalb von Next beim Laden. Die Bedingung
// `react-server` würde es zwar leeren, lässt dann aber `next/navigation`
// scheitern — deshalb hier ein leeres Modul an seiner Stelle.
const file = require.resolve("server-only");
require.cache[file] = { id: file, filename: file, loaded: true, exports: {} };
