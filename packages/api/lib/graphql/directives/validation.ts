import { SchemaDirectiveVisitor, ValidationError } from 'apollo-server-express'
import {
  GraphQLInputField,
  GraphQLField,
  NameNode,
  GraphQLError,
  GraphQLNonNull,
  GraphQLString,
  GraphQLScalarType,
  isWrappingType,
  isNamedType,
} from 'graphql'

// class ConstraintDirective extends GraphQLDirective {
//   constructor() {
//     super({
//       name: 'Constraint',
//       locations: [DirectiveLocation.INPUT_FIELD_DEFINITION],
//     })
//   }
// }

const validations = {
  minLength: {
    func(value: string, args: any) {
      if (value.length >= Number(args)) {
        return true
      }
      return false
    },
    error(label: any, value: any, args: any) {
      return `${label}: Minimum length is ${args}, got ${value.length}`
    },
  },

  maxLength: {
    func(value: string, args: any) {
      if (value.length <= Number(args)) {
        return true
      }
      return false
    },
    error(label: any, value: any, args: any) {
      return `${label}: Maximum length is ${args}, got ${value.length}`
    },
  },

  isStrong: {
    func(value: string, _args: any) {
      const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

      return strong.test(value)
    },
    error(label: any, value: any, _: any) {
      return `${label}: The following criteria must be met; one number, one special character, one uppercase letter, one lowercase letter and at least 8 characters long. Got ${value}`
    },
  },

  isEmail: {
    func(value: string, _: any) {
      return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    },
    error(label: any, value: any, _: any) {
      return `${label}: ${value} is not an email`
    },
  },
}

// Enforcing value restrictions
// https://www.apollographql.com/docs/apollo-server/schema/creating-directives/#enforcing-value-restrictions

export class ValidationDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field: GraphQLInputField) {
    const constraints = this.getDirectiveArgs(field)
    const label = field.astNode && field.astNode.name.value

    // Overwrite the scalar type with our validatable implementation
    switch (field.type.toString()) {
      case 'String!': {
        field.type = new GraphQLNonNull(
          new ValidatableString(label, constraints)
        )
        break
      }
      case 'String':
      default: {
        field.type = new ValidatableString(label, constraints)
        break
      }
    }

    this.patchIntrospection(field)
  }

  // Hack to make introspection work
  patchIntrospection(field: GraphQLInputField) {
    const typeMap = this.schema.getTypeMap()
    let type = field.type

    if (isWrappingType(type)) {
      type = type.ofType
    }

    if (isNamedType(type) && !typeMap[type.name]) {
      typeMap[type.name] = type
    }
  }

  getDirectiveArgs = (
    field: GraphQLInputField | GraphQLField<any, any>
  ): { name: string; value: any }[] => {
    if (field.astNode && field.astNode.directives) {
      const validationDirective = field.astNode.directives.find(
        (dir: any) => dir.name.value === 'validation'
      )

      if (validationDirective && validationDirective.arguments) {
        const args = validationDirective.arguments.map(
          ({ name, value }: { name: NameNode; value: any }) => {
            return { name: name.value, value: value.value }
          }
        )

        return args
      }
      throw new GraphQLError(
        'validation directive is missing or has no arguments'
      )
    }
    throw new GraphQLError('AST node for field is missing')
  }
}

// Custom scalar
class ValidatableString extends GraphQLScalarType {
  constructor(label: any, constraints: any) {
    super({
      name: 'ValidatableString',
      serialize(value) {
        return run(GraphQLString.serialize(value), constraints, label)
      },
      parseValue(value) {
        return run(GraphQLString.serialize(value), constraints, label)
      },
      parseLiteral(ast) {
        const value = GraphQLString.parseLiteral(ast, null)
        return run(GraphQLString.serialize(value), constraints, label)
      },
    })
  }
}

const run = (
  value: any,
  constraints: {
    name: keyof (typeof validations)
    value: any
  }[],
  label: string
) => {
  label
  const errors: string[] = []

  const isValid: boolean = constraints
    .map(constraint => {
      const curr = validations[constraint.name]

      const result = curr.func(value, constraint.value)

      if (!result) {
        errors.push(curr.error(label, value, constraint.value))
      }

      return result
    })
    .map(r => {
      return r
    })
    .every(result => result)

  if (!isValid && errors.length > 0) {
    throw new ValidationError(errors.join('; '))
  }

  return value
}
