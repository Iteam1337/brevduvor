import { IsAuthenticatedDirective } from './isAuthenticated'

import {
  GraphQLInputField,
  GraphQLScalarType,
  GraphQLNonNull,
  GraphQLArgument,
} from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { ValidationError } from 'apollo-server-core'

let mapObject = (object: any, mapFn: any) => {
  return Object.keys(object).reduce((result, key: keyof typeof result) => {
    result[key] = mapFn([key, object[key]])
    return result
  }, {})
}

const rules = {
  maxLength: {
    args: ['length: Int'],
    validation(value: string, { length }: { length: number }) {
      if (value.length > length) {
        throw new ValidationError(
          `Max length is ${length}, got ${value} with length of ${value.length}`
        )
      }
    },
  },

  minLength: {
    args: ['length: Int'],
    validation(value: string, { length }: { length: number }) {
      if (value.length < length) {
        throw new ValidationError(
          `Minimum length is ${length}, got ${value} with length of ${value.length}`
        )
      }
    },
  },
}

const ruleDirectives = mapObject(rules, ([_, rule]: [string, any]) => {
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

      console.log(field.type)

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
      typeMap['RuleWrapper'] = ofType
    }
  }
})

class RuleWrapper extends GraphQLScalarType {
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

// const template = (name: string, args: string) => `
// directive @${name} (
//   ${args}
// ) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
// `

const createSDL = (rules: any) => {
  console.log(' rules -->', rules)

  const template = (name: string, args: string) => `
    directive @${name} (
      ${args}
    ) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
  `

  return Object.keys(rules)
    .map(key => {
      const rule = rules[key]
      const args = rule.args.join('\n')
      return template(key, args)
    })
    .join('\n')
}

export const directivesSDL = createSDL(rules)

export default {
  isAuthenticated: IsAuthenticatedDirective,
  ...ruleDirectives,
}
