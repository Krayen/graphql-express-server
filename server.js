const Express = require("express")
const ExpressGraphQL = require("express-graphql")
const schema = require("./Schema/schema")

const app = Express()

app.use(
  "/graphql",
  ExpressGraphQL({
    schema,
    graphiql: true,
  })
)

app.listen(4000, () => console.log("Listening"))
