import { VOICEOVER } from "./voiceover.gen";

export type SceneId = keyof typeof VOICEOVER;

const norm = (w: string) => w.toLowerCase().replace(/[¿?¡!.,:;]/g, "");

// Scene-relative frame where the n-th occurrence of `word` starts being spoken (voice starts at `lead`).
// Throws so a re-generated voice-over that no longer says the word fails loudly instead of desyncing.
export const cue = (scene: SceneId, word: string, fps: number, lead: number, n = 0) => {
  const hits = VOICEOVER[scene].words.filter(([w]) => norm(w) === norm(word));
  if (!hits[n]) throw new Error(`"${word}" (#${n}) is not in the ${scene} voice-over`);
  return lead + Math.round(hits[n][1] * fps);
};

export const voiceFrames = (scene: SceneId, fps: number) => Math.ceil(VOICEOVER[scene].end * fps);
