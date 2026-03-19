import { mvsp } from './mvsp';
import { caiq } from './caiq';
import { vsaFull } from './vsa-full';
import { vsaCore } from './vsa-core';

import type { Questionnaire, QuestionnaireMeta } from './types';

export const allQuestionnaires: Questionnaire[] = [mvsp, caiq, vsaFull, vsaCore];

export const questionnaireMeta: QuestionnaireMeta[] = allQuestionnaires.map((q) => ({
  name: q.name,
  slug: q.slug,
  description: q.description,
  enabled: q.enabled,
  questionCount: q.sections.reduce((sum, s) => sum + s.questions.length, 0),
  sectionCount: q.sections.length,
  version: q.version,
}));
