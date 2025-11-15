import Express from "express";

const app = Express();

app.use("/", (req, res) => res.send({ json: "Hello World!" }));

app.listen(3000, () => {
  console.log("App is listening on port 3000...");
});
