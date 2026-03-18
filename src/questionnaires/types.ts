import { z } from 'zod';

export const questionAnswerSchema = z.enum(['yes', 'no', 'na', 'partial']);

export const questionSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: questionAnswerSchema,
  explanation: z.string().default(''),
});

export const questionnaireSectionSchema = z.object({
  name: z.string(),
  questions: z.array(questionSchema),
});

export const questionnaireSchema = z.object({
  name: z.string(),
  slug: z.string(),
  version: z.string().optional(),
  description: z.string(),
  url: z.string().url().optional(),
  enabled: z.boolean().default(true),
  sections: z.array(questionnaireSectionSchema),
});

export const questionnaireMetaSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  enabled: z.boolean().default(true),
  questionCount: z.number().int().nonnegative(),
  sectionCount: z.number().int().nonnegative(),
  version: z.string().optional(),
});

export type Question = z.infer<typeof questionSchema>;
export type QuestionAnswer = z.infer<typeof questionAnswerSchema>;
export type QuestionnaireSection = z.infer<typeof questionnaireSectionSchema>;
export type Questionnaire = z.infer<typeof questionnaireSchema>;
export type QuestionnaireMeta = z.infer<typeof questionnaireMetaSchema>;
