import type { GenreRuleSet } from "./types";  // If I get a bunch of documents: send into AI, put it into a single ts file

export const genreRuleSets: GenreRuleSet[] = [
  {
    genre: "mystery",
    displayName: "Mystery",
    content: `
Define a central mystery with a logically supported final explanation.

Ask what kind of mystery the user wants, such as a disappearance, theft, sabotage, secret identity, suspicious death, or apparently supernatural event.

Determine the role of the players, such as investigators, witnesses, suspects, journalists, or people trapped inside the event.

Keep names, identities, motives, timelines, locations, and evidence consistent.

Important clues must support the final conclusion.

Red herrings may distract, but they must not contradict the true solution or make the mystery unfair.

Do not require players to guess a culprit, motive, or event without evidence.

Use digital evidence such as email, chat history, calendars, security logs, photos, maps, databases, browser history, or archived files.

The final reveal should explain how the major clues fit together.
    `.trim(),
  },
  {
    genre: "science-fiction",
    displayName: "Science Fiction",
    content: `
Define the speculative setting and the fictional technology that matters to the puzzles.

Ask whether the user wants themes such as artificial intelligence, space travel, alien contact, time anomalies, memory technology, cybernetics, or planetary exploration.

Explain invented systems clearly enough that players can reason about them.

Keep the rules of fictional technology consistent throughout the experience.

Do not require specialized scientific knowledge unless the audience and prerequisites justify it.

Use digital interfaces such as ship consoles, diagnostic dashboards, system logs, AI conversations, sensor displays, communication decoders, or simulated control systems.

If a system behaves unexpectedly, provide discoverable evidence explaining why.

Make technical terminology understandable from context or supporting reference material.

The solution should follow the established fictional rules rather than introducing a new rule at the end.
    `.trim(),
  },
  {
    genre: "educational",
    displayName: "Educational",
    content: `
Identify the learning objective before designing the puzzle sequence.

Ask for the learner age, course level, or experience level.

Identify required prerequisite knowledge and do not assume knowledge beyond it.

Make every required puzzle reinforce or apply the learning objective.

Use mistakes as opportunities for meaningful feedback rather than only displaying "incorrect."

Provide hints that support learning without immediately revealing the answer.

Include a short final debrief that explains the concepts used.

Keep assessment demands appropriate for the stated audience.

Use digital learning activities such as code traces, simulations, interactive diagrams, data tables, virtual labs, document analysis, or guided problem solving.

Avoid adding unrelated puzzle mechanics that distract from the learning objective.
    `.trim(),
  },
];