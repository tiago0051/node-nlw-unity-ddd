import z from "zod";

export const ListQueryRequestDTO = z.object({
  take: z.coerce
    .number({
      description: "Quantidade de linhas a serem retornadas",
      invalid_type_error: "É esperado um número para o parâmetro 'take'",
    })
    .int({
      message: "É esperado um número inteiro para o parâmetro 'take'",
    })
    .positive({
      message: "É esperado um número maior que zero para o parâmetro 'take'",
    })
    .nullish()
    .default(10),
  pageIndex: z.coerce
    .number({
      description: "O index da página a ser retornada",
      invalid_type_error: "É esperado um número para o parâmetro 'pageIndex'",
    })
    .int({
      message: "É esperado um número inteiro para o parâmetro 'pageIndex'",
    })
    .min(0, {
      message: "É esperado um número maior ou igual a zero para o parâmetro 'take'",
    })
    .nullish()
    .default(0),
  search: z
    .string({
      description: "Texto para busca",
      invalid_type_error: "É esperado um texto para o parâmetro 'search'",
    })
    .nullish(),
});
