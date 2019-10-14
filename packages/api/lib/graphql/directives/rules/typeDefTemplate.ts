const template = (name: string, args: string) => `
      directive @${name} (
        ${args}
      ) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
    `

const templateNoArgs = (name: string) => `
      directive @${name} on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
    `

export const createDirectiveTypeDefs = (rules: any) => {
  return Object.keys(rules)
    .map(key => {
      const rule = rules[key]
      if (rule.args && rule.args.length > 0) {
        const args = rule.args.join('\n')
        return template(key, args)
      } else {
        return templateNoArgs(key)
      }
    })
    .join('\n')
}
