import type { EscapeRoomExample } from "./types";

export const escapeRoomExamples: EscapeRoomExample[] = [
  {
    id: "mystery-vanishing-librarian",
    title: "The Vanishing Librarian",
    genre: "mystery",
    content: `Premise
The director of a digital archive has disappeared minutes before announcing the discovery of a valuable lost manuscript. Players enter the archive's web portal and must determine where she went and why.

Player Objective
Determine the librarian's location, identify the person who tried to delay the announcement, and recover the manuscript access code.

Digital Setting
A simulated library intranet containing email, room-booking records, digitized photographs, an archive catalog, and a staff chat system.

Major Puzzle Sequence
1. Calendar Conflict
Players compare the librarian's public calendar with a room-booking log. A meeting labeled 'Preservation Review' was moved from Room 204 to the climate-controlled archive.
2. Altered Photograph
An archive photograph contains a visible shelf label. Image metadata shows the photo was edited after upload by the assistant curator.
3. Chat Timeline
Staff chat messages reveal that the assistant curator falsely claimed the climate archive was closed. Timestamps show the claim was posted after the librarian had already entered.
4. Catalog Cipher
Catalog numbers from three manuscript records map to letters using a reference table in the portal. The result is the access code 'LUMEN.'
5. Final Deduction
Players use the access code to open a recorded message. The librarian explains that a door sensor failed and she is safely locked inside the climate archive. The assistant curator altered information only to delay the announcement and claim credit.

Important Clues
- Updated room-booking entry
- Photograph shelf label
- Image-edit metadata
- Chat timestamps
- Door sensor maintenance warning

Hints
- Puzzle 1: Compare the calendar with a source that records physical room use.
- Puzzle 2: The visible image is not the only information stored with a file.
- Puzzle 4: The catalog reference table converts the numeric portions of the records.

Solutions
Room 204 is outdated; the climate archive is the real destination. The assistant curator edited the image and posted misleading chat information. The catalog records produce LUMEN.

Completion Condition
Players submit: 'Climate Archive,' 'Assistant Curator,' and 'LUMEN.' The portal then plays the librarian's rescue message.

Designer Notes
The assistant curator committed professional misconduct but did not abduct or physically harm the librarian. All required evidence is available before the final deduction.`,
  },
  {
    id: "mystery-counterfeit-gallery",
    title: "The Counterfeit Gallery",
    genre: "mystery",
    content: `Premise
Hours before an online charity auction, a curator suspects that one of four featured paintings has been replaced by a counterfeit. Players are hired as remote investigators.

Player Objective
Identify the counterfeit painting, determine when the substitution occurred, and name the insider who enabled it.

Digital Setting
A museum operations portal with conservation scans, shipping records, employee access logs, donor emails, and a virtual gallery.

Major Puzzle Sequence
1. Conservation Layer Comparison
Players compare infrared scan summaries. One painting's listed underdrawing does not match the image shown in the auction catalog.
2. Shipping Route Reconstruction
Tracking records contain duplicate container IDs. A map view reveals that one container took an unexplained detour to a private restoration studio.
3. Access-Log Correlation
Players align badge logs with a scheduled network outage. One employee's access appears impossible until they discover that a contractor credential was temporarily linked to the employee's account.
4. Donor Email Acrostic
The first letters of sentences in a donor email spell 'FRAME.' This directs players to inspect frame inventory records.
5. Final Deduction
The frame record, scan mismatch, and credential link show that 'Harbor at Dawn' is counterfeit and that the registrar enabled the swap during the shipping detour.

Important Clues
- Infrared scan mismatch
- Duplicate container ID
- Restoration-studio detour
- Temporary credential-link record
- Frame serial-number inconsistency

Hints
- Puzzle 1: Compare the written conservation summary with the current catalog image.
- Puzzle 2: Duplicate identifiers can hide two different journeys.
- Puzzle 3: An account name does not always identify the person holding the credential.
- Puzzle 4: Read the beginnings of the sentences.

Solutions
The counterfeit is 'Harbor at Dawn.' The swap occurred during the detour to the private studio. The registrar used the temporary contractor credential link to hide access.

Completion Condition
Players submit the painting title, the detour location, and the registrar's role. The auction is paused and the evidence report is generated.

Designer Notes
No knowledge of art history is required. Every technical term is explained in the portal.`,
  },
  {
    id: "mystery-locked-observatory",
    title: "The Locked Observatory",
    genre: "mystery",
    content: `Premise
An astronomer scheduled a live announcement, then vanished from the observatory's remote collaboration system. A strange transmission appears to predict events before they happen.

Player Objective
Determine what happened to the astronomer, explain the 'predictive' transmission, and restore access to the announcement.

Digital Setting
A virtual observatory with telescope logs, weather telemetry, audio recordings, research notebooks, message history, and a remote instrument console.

Major Puzzle Sequence
1. Telescope Scheduling Anomaly
Players compare observation requests with actual telescope movement logs. The telescope moved six minutes before each supposed prediction.
2. Audio Spectrogram
A recording contains a repeated digital tone. An included spectrogram tool reveals groups that correspond to timestamps.
3. Weather Delay
Cloud-cover telemetry explains why some observations were processed later than they were captured. The transmission used earlier images but appeared to arrive first.
4. Notebook Cross-Reference
Notebook page numbers correspond to star-catalog entries. Their initials spell 'BACKUP NODE.'
5. Access Recovery
Players locate a backup collaboration node and find the astronomer's message: she isolated herself after discovering that a colleague had automated misleading 'predictions' to attract investors.
6. Final Deduction
The colleague used early telescope movement data and delayed image processing to create the illusion of prediction.

Important Clues
- Telescope movement precedes transmission
- Spectrogram timestamps
- Cloud-processing delays
- Notebook-to-catalog mapping
- Backup-node audit logs

Hints
- Puzzle 1: Compare when the telescope moved, not only when images appeared.
- Puzzle 2: The tones represent groups of numbers.
- Puzzle 3: Data capture time and publication time are different.
- Puzzle 4: The notebook numbers refer to the catalog, not page order.

Solutions
The astronomer is safe on the backup node. The predictive effect was manufactured using advance observation data and delayed public processing. The colleague responsible is identified in the backup-node audit log.

Completion Condition
Players explain the timing trick, identify the backup node, and name the responsible colleague.

Designer Notes
The eerie atmosphere comes from uncertainty and strange signals, not supernatural events. The advanced difficulty comes from timeline reconciliation.`,
 
  },
  {
    id: "scifi-orbital-failure",
    title: "Orbitfall Station",
    genre: "science-fiction",
    content: `Premise
A research station is losing altitude after its navigation AI enters emergency isolation. Players are remote mission specialists connected through a damaged control interface.

Player Objective
Restore trustworthy navigation data, identify the failed sensor, and authorize a safe orbital correction.

Digital Setting
A simulated mission-control dashboard with sensor panels, maintenance logs, crew messages, an AI chat interface, and an orbital-status display.

Major Puzzle Sequence
1. Sensor Agreement
Three altitude sensors report values. Two follow the same trend while one jumps unpredictably. Players identify the faulty sensor using a plain-language reliability guide.
2. Maintenance Log
A filtered maintenance log reveals that Sensor B was exposed to radiation during a recent experiment.
3. AI Trust Protocol
The AI asks players to provide two independent pieces of evidence before it will leave isolation mode.
4. Burn Sequence
Players arrange three correction steps using a safety checklist: verify orientation, isolate the faulty sensor, then authorize the burn.
5. Final Authorization
A checksum puzzle based on displayed status codes yields the authorization word 'APOGEE.'

Important Clues
- Two sensors agree over time
- Radiation event in maintenance log
- AI requires independent confirmation
- Safety checklist gives the order

Hints
- Puzzle 1: Look for the reading that behaves differently, not simply the highest value.
- Puzzle 3: Evidence from two different systems is stronger than two readings from one system.
- Puzzle 5: Use the checksum table displayed beside the status codes.

Solutions
Sensor B is faulty. The radiation event explains the failure. The correct sequence is orientation, isolation, burn. The authorization word is APOGEE.

Completion Condition
Players submit Sensor B, the correct safety sequence, and APOGEE. The station returns to a stable orbit.

Designer Notes
No orbital-mechanics knowledge is required. The fictional controls explain every needed rule.`,
  },
  {
    id: "scifi-memory-archive",
    title: "The Memory Archive",
    genre: "science-fiction",
    content: `Premise
In a future memory clinic, a patient's identity record has fragmented across several encrypted memory sessions. The clinic AI cannot determine which memories are authentic.

Player Objective
Reconstruct the patient's identity, identify one implanted memory, and restore the correct continuity record.

Digital Setting
A neural-archive interface with memory transcripts, emotion graphs, device logs, identity records, and an AI ethics monitor.

Major Puzzle Sequence
1. Continuity Markers
Players learn that authentic sessions contain a stable three-symbol neural marker. One memory lacks it.
2. Contradictory Sensory Detail
Two transcripts describe the same event, but only one matches environmental data from the city's public archive.
3. Device Provenance
Upload logs show that the inconsistent memory came from an unauthorized external device.
4. Emotional Baseline
Emotion graphs are not used as truth detectors; instead, players compare them only to identify the sequence in which memories were recorded.
5. Identity Reconstruction
Names, dates, and relationship references from authentic sessions fill gaps in the continuity record.
6. Ethics Decision
Players choose whether to delete, quarantine, or retain the implanted memory with a warning. The ethics monitor explains the consequences without declaring one morally correct answer.

Important Clues
- Stable neural marker
- Public environmental record
- Unauthorized device ID
- Recording-order metadata
- Repeated relationship references

Hints
- Puzzle 1: The marker is described in the tutorial panel.
- Puzzle 2: Compare the memory with an independent record.
- Puzzle 3: Trace where each file originated.
- Puzzle 5: Repeated facts across authentic sessions are reliable anchors.

Solutions
The memory from the unauthorized device is implanted. The patient's continuity record is reconstructed from the remaining sessions.

Completion Condition
Players identify the implanted session and correctly complete the identity record. The final ethical choice changes the ending text but does not invalidate success.

Designer Notes
The system never claims emotions prove truth. The fictional memory technology remains consistent.`,
  },
  {
    id: "scifi-first-contact",
    title: "First Contact Protocol",
    genre: "science-fiction",
    content: `Premise
A deep-space listening array receives a structured alien transmission. An automated defense system will classify it as hostile unless players demonstrate a peaceful interpretation before the countdown ends.

Player Objective
Decode the transmission's structure, identify its intended response pattern, and send a non-hostile reply.

Digital Setting
A signal-analysis workspace with waveform views, symbol clusters, star maps, translation hypotheses, system logs, and a response composer.

Major Puzzle Sequence
1. Repetition Structure
Players identify repeated symbol groups that align with prime-number pulse intervals.
2. Spatial Reference
A star map shows that one symbol cluster represents the sender's home system through relative distances rather than human constellation names.
3. Shared Constant
A tutorial explains a fictional but consistent spectral constant. Players use it to align the alien units with the station's units.
4. Intent Classification
Three translation hypotheses are available. Only one fits all repeated contexts and produces a request for acknowledgment rather than a threat.
5. Response Construction
Players build a reply using the same pattern: shared constant, home-system reference, peaceful acknowledgment, and a deliberately limited information payload.
6. Safety Review
The defense system checks whether the response accidentally includes station coordinates. Players must remove that field before transmission.

Important Clues
- Prime pulse intervals
- Relative star distances
- Spectral conversion tutorial
- Repeated contextual symbol use
- Defense-system privacy warning

Hints
- Puzzle 1: Count the gaps between repeated pulses.
- Puzzle 2: Ignore human constellation shapes and compare distances.
- Puzzle 4: A valid meaning must work everywhere the symbol appears.
- Puzzle 6: A peaceful reply does not require revealing your exact location.

Solutions
The message requests acknowledgment and knowledge exchange. The safe response mirrors the alien structure but omits precise station coordinates.

Completion Condition
Players transmit a structurally valid acknowledgment that passes the safety review.

Designer Notes
The puzzle avoids requiring real astrophysics or linguistics. All needed rules are introduced in the interface.`,
  },
  {
    id: "edu-code-trace",
    title: "The Broken Robot Lab",
    genre: "educational",
    content: `Learning Objective
Trace variables, conditionals, and simple loops in short programs.

Premise
A classroom robot has locked itself in diagnostic mode. Players must repair its control sequence before the lab closes.

Player Objective
Solve four code-tracing challenges to restore the robot's movement plan.

Digital Setting
A browser-based code console with step controls, variable tables, robot animation, and feedback panels.

Major Puzzle Sequence
1. Variable Update
Players step through three assignment statements and enter the final values of x and y.
2. Conditional Path
Players predict which branch executes for a given battery level. Incorrect answers highlight the evaluated condition.
3. Loop Trace
Players complete a table showing the loop counter and distance after each iteration.
4. Debug the Route
Players choose one of three corrected conditionals so the robot avoids an obstacle.
5. Final Program
The four answers produce movement commands that guide the robot to the charging station.

Important Clues
- Step-by-step execution button
- Current-line highlight
- Variable table
- Plain-language conditional explanation

Hints
- Puzzle 1: Process one assignment at a time; later statements use updated values.
- Puzzle 2: Substitute the battery value into the condition.
- Puzzle 3: Record values after each full iteration.
- Puzzle 4: Test the boundary value where the obstacle begins.

Solutions
Each puzzle includes worked solution steps in the designer panel.

Completion Condition
The robot reaches the charging station and displays a successful diagnostic report.

Debrief
The final screen reviews variable state, branch selection, loop iteration, and boundary testing.

Designer Notes
Prerequisites are limited to variables, comparisons, if statements, and simple for loops.`,
  },
  {
    id: "edu-ecosystem-data",
    title: "River System Rescue",
    genre: "educational",
    content: `Learning Objective
Interpret simple ecosystem data and explain how changes in one population can affect others.

Premise
A virtual river ecosystem is becoming unstable. Players are environmental analysts who must identify the cause and recommend a recovery plan.

Player Objective
Use food-web relationships and data trends to diagnose the disruption.

Digital Setting
An interactive river map with population graphs, water-quality readings, species profiles, and a simulation panel.

Major Puzzle Sequence
1. Food-Web Connections
Players build a simple food web from species-profile descriptions.
2. Population Trends
Graphs show declining insect larvae followed by declining fish and bird populations.
3. Water-Quality Comparison
Players compare readings from three river locations. One site shows a sharp oxygen decrease after runoff events.
4. Simulation Test
Players test possible interventions. Removing more fish worsens the system; reducing runoff gradually restores oxygen and insect populations.
5. Recommendation
Players choose evidence supporting the runoff-reduction plan.

Important Clues
- Species diet descriptions
- Time-aligned population graphs
- Dissolved oxygen readings
- Simulation outcomes

Hints
- Puzzle 1: Draw an arrow from food to the organism that eats it.
- Puzzle 2: Look for which decline occurs first.
- Puzzle 3: Compare readings before and after rain.
- Puzzle 4: A good intervention should improve several connected populations.

Solutions
Runoff reduces oxygen, harming insect larvae and then species that depend on them. Reducing runoff is the supported intervention.

Completion Condition
Players submit the causal chain and recovery recommendation.

Debrief
The final screen explains interconnected populations, correlation across time, and the role of simulation in testing explanations.

Designer Notes
The activity does not imply that a single data set proves all ecological causes; it presents a simplified instructional model.`,
  },
  {
    id: "edu-cyber-incident",
    title: "Campus Cyber Defense",
    genre: "educational",
    content: `Learning Objective
Recognize phishing indicators, apply basic account-security practices, and interpret simple authentication logs.

Premise
A fictional campus portal is experiencing suspicious sign-ins. Players join the incident-response team and must contain the account compromise.

Player Objective
Identify the phishing message, determine which account was compromised, and choose appropriate containment steps.

Digital Setting
A simulated email client, login-log viewer, account-security dashboard, incident notes, and response checklist.

Major Puzzle Sequence
1. Phishing Comparison
Players compare three messages and identify warning signs: mismatched sender domain, urgent credential request, and misleading link text.
2. Link Inspection
A safe hover simulation reveals the actual destination domain without opening the link.
3. Login Timeline
Authentication logs show a successful login from an unusual location shortly after the phishing message was opened.
4. Account Identification
Players correlate the recipient list with the affected username.
5. Containment Order
Using the provided response guide, players order actions: revoke active sessions, reset credentials, enable multifactor authentication, and notify the user.
6. Scope Check
Players verify that no other account shows the same suspicious pattern.

Important Clues
- Sender-domain mismatch
- Link destination
- Email-open timestamp
- Unusual login location and time
- Response checklist

Hints
- Puzzle 1: Do not judge only by logos or formatting.
- Puzzle 2: Compare the visible text with the actual destination.
- Puzzle 3: Build a timeline around the moment the message was opened.
- Puzzle 5: Stop current access before relying on a new password.

Solutions
The financial-aid-themed message is phishing. The compromised account is identified by matching the recipient and login timeline. The response order follows the provided checklist.

Completion Condition
Players identify the message and account, complete the containment sequence, and document the evidence.

Debrief
The final screen reviews phishing indicators, why password reuse is risky, the purpose of multifactor authentication, and the importance of evidence-based incident response.

Designer Notes
All domains, accounts, and logs are fictional. The activity teaches defensive recognition and response only.`,
  },
];