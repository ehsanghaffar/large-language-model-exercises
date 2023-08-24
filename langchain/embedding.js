import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { config } from "dotenv";

config()
/* Create instance */
const embeddings = new OpenAIEmbeddings({
  maxRetries: 10, //  API errors
  maxConcurrency: 5, // Rate limits
  timeout: 1000, // 1s timeout
});

/* Embed queries */
const res = await embeddings.embedQuery("Hello world");

console.log(res)


/* Embed documents */
// const documentRes = await embeddings.embedDocuments(["Hello world", "Bye bye"]);

// console.log({ documentRes });