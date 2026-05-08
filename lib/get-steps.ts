import { STEPS } from "./framework-data";
import type { Step } from "./framework-data";

const BASE_ID = "app9NFmCVscwQAFnR";

type AirtableRecord = { fields: Record<string, unknown> };
type AirtableResponse = { records: AirtableRecord[]; offset?: string };

async function fetchAllRecords(
  table: string,
  token: string,
  sort: string,
): Promise<Record<string, unknown>[]> {
  const all: Record<string, unknown>[] = [];
  let offset: string | undefined;
  do {
    const url = new URL(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`,
    );
    url.searchParams.set("sort[0][field]", sort);
    url.searchParams.set("sort[0][direction]", "asc");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Airtable ${table}: HTTP ${res.status}`);

    const data = (await res.json()) as AirtableResponse;
    all.push(...data.records.map((r) => r.fields));
    offset = data.offset;
  } while (offset);
  return all;
}

export async function getPrompts(): Promise<Record<string, string>> {
  const token = process.env.AIRTABLE_API_KEY;
  if (!token) return {};

  try {
    const fields = await fetchAllRecords("Prompts", token, "label");
    return Object.fromEntries(
      fields
        .filter((f) => f.label && f.content)
        .map((f) => [f.label as string, f.content as string]),
    );
  } catch {
    return {};
  }
}

export async function getSteps(): Promise<Step[]> {
  const token = process.env.AIRTABLE_API_KEY;
  if (!token) return STEPS;

  try {
    const [stepFields, subFields] = await Promise.all([
      fetchAllRecords("Steps", token, "stepNumber"),
      fetchAllRecords("SubQuestions", token, "stepNumber"),
    ]);

    subFields.sort((a, b) => {
      const sn = (a.stepNumber as number) - (b.stepNumber as number);
      return sn !== 0 ? sn : (a.orderInStep as number) - (b.orderInStep as number);
    });

    return stepFields.map((s) => ({
      number: s.stepNumber as number,
      title: (s.Title as string) ?? "",
      description: (s.description as string) ?? "",
      designMoveExample: (s.designMoveExample as string) ?? "",
      howToDoItExample: ((s.howToDoItExample as string) ?? "")
        .split("\n")
        .filter(Boolean),
      exitImpact: (s.exitImpact as string) ?? "",
      pitchSlide: (s.pitchSlide as string) ?? "",
      subQuestions: subFields
        .filter((q) => q.stepNumber === s.stepNumber)
        .map((q) => ({
          id: (q.questionId as string) ?? "",
          question: (q.question as string) ?? "",
          placeholder: (q.placeholder as string) ?? "",
          demoAnswer: (q.demoAnswer as string) ?? "",
        })),
    }));
  } catch {
    return STEPS;
  }
}
