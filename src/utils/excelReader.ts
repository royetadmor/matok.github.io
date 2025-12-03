// src/utils/loadQuestionsFromExcel.ts
import * as XLSX from "xlsx";
import type { QuestionFromExcel } from "../types/types";


export async function loadQuestionsFromExcel(): Promise<QuestionFromExcel[]> {
  const resp = await fetch("/questions.xlsx");
  const arrayBuffer = await resp.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Convert rows (skip header)
  const allQuestions = rows.slice(1).map((row, index) => ({
    id: index + 1,
    text: row[0],
    type: row[2],
  }));

  // Shuffle array (Fisher-Yates)
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }

  // Pick first 20
  return allQuestions.slice(0, 20);
}