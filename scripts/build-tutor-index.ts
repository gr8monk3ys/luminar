import fs from "node:fs";
import path from "node:path";
import { buildTutorIndex } from "../src/lib/tutor/build-index";

const OUTPUT_PATH = path.join(
  process.cwd(),
  "src",
  "content",
  "tutor-index.generated.json"
);

const chunks = buildTutorIndex();
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(chunks, null, 2)}\n`);

console.log(
  `tutor index: ${chunks.length} chunks from ${new Set(chunks.map((c) => c.lessonId)).size} lessons -> ${path.relative(process.cwd(), OUTPUT_PATH)}`
);
