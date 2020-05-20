type statusTranslation = {
  [key: string]: string
}

export const statusTranslations: statusTranslation = {
  CREATED: 'Skapad',
  PACKED: 'Packad',
  SENT: 'Skickad',
  READY_TO_LAND: 'Redo att landa',
  DELIVERED: 'Levererad',
}

const translate = (status: string) => statusTranslations[status] || status

export default translate
