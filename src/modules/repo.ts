import { fetch } from 'undici'

export interface TemplateMeta {
  name: string
  description: string
  author?: string
  repository:
    | string
    | {
        url: string
      }
}

type TemplatesJson = { templates: TemplateMeta[] }

export const getTemplatesList = async (templatesFileUrl?: string) => {
  if (!templatesFileUrl) {
    templatesFileUrl =
      'https://raw.githubusercontent.com/pkgtoolsjs/pkgtools/refs/heads/main/templates.json'
  }

  const res = await fetch(templatesFileUrl)
  const json = res.json() as unknown as TemplatesJson

  return json
}
