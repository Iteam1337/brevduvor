import { GraphQLScalarType } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'

export class RuleWrapper extends GraphQLScalarType {
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
