import helloWorld from './modules/helloWorld'
import { getTemplatesList } from './modules/repo'

console.log(await getTemplatesList())
