import * as rules from './rules'

import { directiveFactory } from './directiveFactory'
import { createDirectiveTypeDefs } from './typeDefTemplate'

export const ruleDirectives = directiveFactory(rules)
export const directiveTypeDefs = createDirectiveTypeDefs(rules)
