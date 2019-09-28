import { SchemaDirectiveVisitor, ValidationError } from 'apollo-server-express'
import {
  GraphQLInputField,
  GraphQLField,
  NameNode,
  GraphQLError,
  GraphQLNonNull,
  GraphQLString,
  GraphQLScalarType,
} from 'graphql'

// const minLength = (
//   value: string,
//   args: number,
//   cb: (err: string | null) => void
// ) => {
//   if (value.length >= Number(args)) {
//     return true
//   }
//   return false
// }

const validations = {
  minLength: {
    func(value: string, args: number) {
      if (value.length >= Number(args)) {
        return true
      }
      return false
    },
    error(value: any, args: any) {
      return `Minimum length is ${args}, got ${value.length}`
    },
  },

  isEmail: {
    func(value: string, _: any) {
      return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    },
    error(value: any, _: any) {
      return `${value} is not an email`
    },
  },
}

export class ValidationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    field
  }

  visitInputFieldDefinition(field: GraphQLInputField) {
    const constraints = this.getDirectiveArgs(field)
    const label = field.astNode && field.astNode.name.value

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

  const isValid: boolean = constraints.every(constraint => {
    const curr = validations[constraint.name]

    const result = curr.func(value, constraint.value)

    if (!result) {
      errors.push(curr.error(value, constraint.value))
    }

    return result
  })

  if (!isValid && errors.length > 0) {
    throw new ValidationError(errors.join('; '))
  }

  return value
}
