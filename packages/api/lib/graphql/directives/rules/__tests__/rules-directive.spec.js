const { ApolloServer, gql } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')
const { directiveTypeDefs, ruleDirectives } = require('./../index')
const { serverConfig } = require('./../../../../../index')
const { RuleWrapper } = require('./../ruleScalar')

const rules = require('./../rules')

const s = {
  typeDefs: serverConfig.typeDefs,
  resolvers: serverConfig.resolvers,
  schemaDirectives: serverConfig.schemaDirectives,
}

const server = new ApolloServer(s)

const { mutate } = createTestClient(server)

describe('Rules Directive', () => {
  it('Typemap has custom scalar (RuleWrapper) created dynamically', () => {
    const typemap = server.schema.getTypeMap()
    expect(typemap['RuleWrapper']).toBeInstanceOf(RuleWrapper)
  })

  describe('isEmail', () => {
    it('should pass', () => {
      expect(() => {
        rules.isEmail.validation('chrille_g@hotmale.com')
      }).not.toThrow()
    })

    it('should fail', () => {
      expect(() => {
        rules.isEmail.validation('@chrille.com')
      }).toThrow()
    })
  })

  describe('maxLength', () => {
    it('should pass', () => {
      expect(() => {
        rules.maxLength.validation('String that fits into a VARCHAR(255)', {
          length: 255,
        })
      }).not.toThrow()
    })

    it('should fail', () => {
      expect(() => {
        rules.maxLength.validation('Toooooo long', { length: 8 })
      }).toThrow()
    })
  })

  describe('minLength', () => {
    it('should pass', () => {
      expect(() => {
        rules.minLength.validation('12345678', { length: 8 })
      }).not.toThrow()
    })

    it('should fail', () => {
      expect(() => {
        rules.minLength.validation('tiny', { length: 8 })
      }).toThrow()
    })
  })
})
