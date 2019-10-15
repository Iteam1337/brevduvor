import { GraphQLInputField, GraphQLNonNull, GraphQLArgument } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { ValidationError } from 'apollo-server-core'
import { RuleWrapper } from './ruleScalar'

const mapObject = (object: any, mapFn: any) => {
  return Object.keys(object).reduce((result, key: keyof typeof result) => {
    result[key] = mapFn([key, object[key]])
    return result
  }, {})
}

export const directiveFactory = (rules: any) =>
  mapObject(rules, ([_, rule]: [string, any]) => {
    // https://github.com/apollographql/graphql-tools/issues/957

    return class extends SchemaDirectiveVisitor {
      visitInputFieldDefinition(field: GraphQLInputField) {
        this.wrapType(field)
      }

      visitArgumentDefinition(field: GraphQLArgument) {
        this.wrapType(field)
      }

      wrapType = (field: GraphQLInputField | GraphQLArgument) => {
        const { ofType }: any = field.type

        switch (field.type.toString()) {
          case 'RuleWrapper!':
          case 'Int!':
          case 'Float!':
          case 'String!': {
            field.type = new GraphQLNonNull(new RuleWrapper(ofType, rule, this))
            break
          }
          case 'RuleWrapper':
          case 'Int':
          case 'Float':
          case 'String': {
            field.type = new RuleWrapper(ofType, rule, this)
            break
          }
          default: {
            throw new ValidationError(
              "Cannot add a rule to this value. It's type must be one of String | Int | Float"
            )
          }
        }

        this.patchTypemap(field)
      }

      patchTypemap(field: GraphQLInputField) {
        const typeMap = this.schema.getTypeMap()
        const { ofType }: any = field.type
        typeMap[field.name] = ofType
      }
    }
  })
