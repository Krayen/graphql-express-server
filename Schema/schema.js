const graphql = require("graphql")
const axios = require("axios")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    coupons: {
      type: new GraphQLList(CouponType),
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/companies/${parent.id}/coupons`)
          .then(resp => resp.data)
      },
    },
  }),
})

const CouponType = new GraphQLObjectType({
  name: "Coupon",
  fields: () => ({
    id: { type: GraphQLInt },
    offer: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/companies/${parent.companyId}`)
          .then(resp => resp.data)
      },
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    coupon: {
      type: CouponType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/coupons/${args.id}`)
          .then(resp => resp.data)
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
