import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

export class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (...args: any[]) => {
      const { user } = args[2]

      if (user) {
        const result = await resolve.apply(this, args)

        return result
      } else {
        throw new AuthenticationError(
          'Invalid Token. You must be logged in to view this resource'
        )
      }
    }
  }
}
