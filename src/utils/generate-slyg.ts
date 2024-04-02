export const generateSlug = (text: string): string => {
    return text.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\W\S-]/g, '')
    .replace(/\s+/g, '-')
}