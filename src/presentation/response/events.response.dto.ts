import z from "zod";

export const EventDTO = z.object({
  id: z
    .string({
      description: "Identificador do evento",
    })
    .uuid(),
  title: z.string({
    description: "Título do evento",
  }),
  details: z
    .string({
      description: "Descrição do evento",
    })
    .nullable(),
  maximumAttendees: z
    .number({
      description: "Número máximo de participantes do evento",
    })
    .nullable(),
  slug: z.string({
    description: "Slug do evento",
  }),
});

export const AttendeeBadgeDTO = z.object({
  attendeeEmail: z
    .string({
      description: "Email do participante",
    })
    .email(),
  attendeeId: z
    .string({
      description: "Identificador do participante",
    })
    .uuid(),
  attendeeName: z.string({
    description: "Nome do participante",
  }),
  eventTitle: z.string({
    description: "Título do evento",
  }),
  checkInURL: z
    .string({
      description: "URL para realizar check-in",
    })
    .url(),
});

export const AttendeeDTO = z.object({
  id: z
    .string({
      description: "Identificador do participante",
    })
    .uuid(),
  name: z.string({
    description: "Nome do participante",
  }),
  email: z
    .string({
      description: "Email do participante",
    })
    .email(),
  eventId: z
    .string({
      description: "Identificador do evento",
    })
    .uuid(),
});
