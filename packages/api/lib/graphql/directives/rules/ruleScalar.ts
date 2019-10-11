import { GraphQLScalarType } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'

// https://graphql.org/graphql-js/type/#graphqlscalartype
export class RuleWrapper extends GraphQLScalarType {
  // This is a custom scalar type
  // Each input that has a custom rule directive added to it has its original type (String, Int, Float)
  // transformed into a RuleWrapper scalar.
  // This way we can pass the rule validation function and run it.
  // If the validation throws, we know that the field isn't valid
  // If it the validation just passes the value, everything is fine.

  constructor(_type: any, rule: any, parent: SchemaDirectiveVisitor) {
    super({
      name: 'RuleWrapper',

      serialize(value) {
        const v = _type.serialize(value)

        rule.validation(v, parent.args)

        return v
      },
      parseValue(value) {
        const v = _type.serialize(value)

        rule.validation(v, parent.args)

        return _type.parseValue(v)
      },
      parseLiteral(ast) {
        const v = _type.parseLiteral(ast, null)

        rule.validation(v, parent.args)

        return v
      },
    })
  }
}
