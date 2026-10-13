/**
 * ============================================================================
 * KURUKSHETRA TO CAMPUS - CORE APPLICATION LOGIC
 * ============================================================================
 * An interactive educational web app transforming Krishna's Peace Mission
 * from the Mahabharata (Udyoga Parva) into practical conflict resolution
 * for university students.
 * 
 * Tech stack: Pure Vanilla JavaScript (No frameworks, No databases, Zero external npm)
 */

document.addEventListener('DOMContentLoaded', () => {
  initScenarios();
  initSearchAndFilter();
  initModal();
  initSimulator();
  initArchetypeQuiz();
  initAmbientAudio();
  initDeployModal();
  initMobileNav();
});

// ============================================================================
// 1. DATA REPOSITORY: 12 REAL STUDENT CONFLICT SCENARIOS & MAHABHARATA ANCHORS
// ============================================================================
const SCENARIOS = [
  {
    id: 'team-decision-fight',
    category: 'team',
    categoryLabel: '👥 Team Conflict',
    title: 'Group members fighting fiercely over project decision & tech stack',
    summary: 'Two vocal members are locked in an aggressive stalemate over which tools, framework, or topic to adopt, halting all progress.',
    upaya: 'साम (Sāma) & भेद (Bheda)',
    epicRef: 'Udyoga Parva (Book 5): Krishna’s Embassy to the Kaurava Court',
    shloka: {
      sanskrit: 'शमं रोचयसे कृष्ण न युद्धं भरतर्षभ। शमेन हि सुखं लब्धुं शक्यं नान्येन केनचित्॥',
      translit: 'Śamaṁ rocayase kṛṣṇa na yuddhaṁ bharatarṣabha | Śamena hi sukhaṁ labdhuṁ śakyaṁ nānyena kenacit ||',
      meaning: 'Krishna seeks peace, not war. For enduring success and fulfillment can only be achieved through mutual reconciliation, not destruction.'
    },
    epicStory: 'When Krishna traveled as an envoy to Hastinapura, both sides were bristling with martial pride. Krishna did not argue about who had the larger army; he reframed the conversation toward the shared destruction that awaited both houses if they could not find common ground.',
    strategicLesson: 'Never argue entrenched positions; negotiate underlying interests. Separate personal ego from project viability. When two people fight over tools, they are usually fighting for intellectual validation and control.',
    studentReality: 'Teammates argue over React vs. Vue or Machine Learning vs. Standard Stats not because one is objectively 10x better, but because each person wants to work in their comfort zone and claim intellectual leadership.',
    checklist: [
      'Stop the group debate immediately; do not let emotional pride dig deeper trenches.',
      'Create a neutral 3-column evaluation table: Criteria (Deadline, Learning Curve, Rubric Alignment), Option A, Option B.',
      'Assign each proponent 3 minutes to present their case strictly focusing on rubric marks, not personal preference.',
      'Test for a hybrid compromise (e.g., Option A for frontend, Option B for data handling).',
      'If deadlock persists, agree in advance to follow the majority vote or ask the TA for a 2-minute tiebreak with zero grudges.'
    ],
    scripts: [
      {
        channel: 'WhatsApp Group Chat',
        text: "Hey everyone! We both have super valid points on the stack, but going back and forth in chat is stalling our sprint. Let's do a quick 10-minute huddle after class today. We'll list both against the grading rubric and pick the safest path to an 'A'."
      },
      {
        channel: 'Private 1-on-1 Ping',
        text: "Hey [Name], I really respect your idea for using [Tool]. Let's make sure we present the pros neutrally in today's call so the team can decide smoothly without anyone feeling ignored."
      }
    ],
    pitfalls: [
      'Calling the other person\'s choice "stupid" or "outdated" in the public group chat.',
      'Passive-aggressively writing the whole project in your chosen stack overnight without consent.',
      'Sulking and refusing to contribute after your preference was not chosen.'
    ]
  },
  {
    id: 'free-rider-slacking',
    category: 'team',
    categoryLabel: '👥 Team Conflict',
    title: 'The Free-Rider Dilemma: Teammate is not contributing any work',
    summary: 'One group member misses all meetings, dodges assigned sections, and promises to "do it tomorrow" while others carry the burden.',
    upaya: 'साम (Sāma) ➔ दान (Dāna) ➔ दण्ड (Daṇḍa)',
    epicRef: 'Udyoga Parva & Sabha Parva: Vidura’s Warning on Duty & Accountability',
    shloka: {
      sanskrit: 'न सा सभा यत्र न सन्ति वृद्धा न ते वृद्धा ये न वदन्ति धर्मम्।',
      translit: 'Na sā sabhā yatra na santi vṛddhā na te vṛddhā ye na vadanti dharmam |',
      meaning: 'That is no assembly where there are no wise elders; and those are not wise who do not stand up for righteousness and truth.'
    },
    epicStory: 'Vidura consistently reminded Dhritarashtra and the assembly that silence in the face of dereliction of duty brings collective ruin. Ignoring someone who fails to fulfill their vows is not kindness; it is enabling injustice.',
    strategicLesson: 'Deploy the progressive ladder: Sāma (inquire with empathy), Dāna (break into manageable micro-tasks), and finally Daṇḍa (firm, transparent institutional boundaries). Never confront someone publicly without first seeking private clarity.',
    studentReality: 'Most free-riders are not evil; they are overwhelmed, intimidated by other members’ skill levels, facing personal burnout, or simply taking advantage of lack of clear ownership.',
    checklist: [
      'Reach out privately first (never shame someone in the main group chat).',
      'Ask open-ended diagnostic questions: "Hey, are you feeling stuck or overloaded with other coursework?"',
      'Break their massive vague task into 2 discrete bite-sized deliverables with an explicit 48-hour deadline.',
      'Document all delegations and deadlines on a shared Trello/Notion board or email summary.',
      'If they still ghost past the checkpoint, send a clear polite notification and inform the professor before final submission.'
    ],
    scripts: [
      {
        channel: 'Private WhatsApp Ping (Stage 1 - Sāma)',
        text: "Hey [Name], checking in! We missed your input on section 2 yesterday. Are you swamped with other exams or facing any blockers? Let us know so we can help you get started."
      },
      {
        channel: 'Firm Boundary Ping (Stage 2 - Daṇḍa)',
        text: "Hey [Name], we need to integrate section 2 by tomorrow 5 PM to submit on time. If you cannot share your draft by then, the team will reassign it so we don't lose marks, and we will update the professor regarding individual contributions."
      }
    ],
    pitfalls: [
      'Complaining bitterly to other teammates behind their back for 3 weeks without ever confronting them directly.',
      'Doing their entire section in silence, and then exploding with rage on submission day.',
      'Removing their name from the cover sheet without prior written warning.'
    ]
  },
  {
    id: 'credit-stealing-presentation',
    category: 'team',
    categoryLabel: '👥 Team Conflict',
    title: 'A teammate claimed sole credit during the presentation / demo',
    summary: 'During the professor’s review or presentation, one member spoke as if they built everything and minimized everyone else’s hard work.',
    upaya: 'भेद (Bheda) & मर्यादा (Maryādā)',
    epicRef: 'Virata Parva: Arjuna’s Composure & Documented Truth',
    shloka: {
      sanskrit: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।',
      translit: 'Satyameva jayate nānṛtaṁ satyena panthā vitato devayānaḥ |',
      meaning: 'Truth alone triumphs, not untruth. Through truth the divine path of righteousness is established.'
    },
    epicStory: 'When Prince Uttara initially boasted of defeating the Kaurava army, Arjuna did not start a petty shouting match in the assembly. Through quiet dignity and undeniable proof (the royal garments), the truth was established without humiliating anyone needlessly.',
    strategicLesson: 'Never fight loud claims with loud anger; counter subjective boasts with objective documentation. Structure presentations beforehand so credit is hardcoded into the architecture.',
    studentReality: 'Charismatic talkers naturally dominate presentations unless the team establishes strict role boundaries beforehand.',
    checklist: [
      'During the Q&A, calmly step in on your domain: "To add to what [Name] said regarding the database logic, here is how we solved that..."',
      'Always include an explicit "Team Contributions Matrix" slide at the end of the deck listing each member’s specific deliverables.',
      'Maintain clear Git commit histories and shared Google Docs revision logs.',
      'Have a polite private conversation with the member right after the class: "Hey, let\'s make sure we share speaking time equally next round."',
      'If it impacts grading, share the commit log neutrally with the professor during office hours.'
    ],
    scripts: [
      {
        channel: 'In-Meeting Interjection',
        text: "That's a great overview of the frontend! I'd love to jump in on the backend architecture and API routing that I engineered to support that feature..."
      },
      {
        channel: 'Post-Presentation 1-on-1',
        text: "Hey [Name], good job on today's presentation! Moving forward, let's make sure we split the speaking time evenly according to our assigned modules so the evaluator can clearly see everyone's individual contribution."
      }
    ],
    pitfalls: [
      'Interrupting them angrily in front of the professor during the live pitch.',
      'Posting salty indirect complaints on social media or class discord.',
      'Letting it fester quietly, leading to total team breakdown in the next phase.'
    ]
  },
  {
    id: 'communication-passive-aggressive',
    category: 'communication',
    categoryLabel: '💬 Communication',
    title: 'Passive-aggressive jabs and sarcastic memes in the group chat',
    summary: 'Subtle sarcasm, thumbs-up emojis on serious delays, and hostile micro-aggressions are poisoning the team atmosphere.',
    upaya: 'शम (Śama) & धैर्य (Dhriti)',
    epicRef: 'Sabha Parva: Krishna’s Hundred-Transgression Restraint with Shishupala',
    shloka: {
      sanskrit: 'क्षमा बलमशक्तानां शक्तानां भूषणं क्षमा।',
      translit: 'Kṣamā balamaśaktānāṁ śaktānāṁ bhūṣaṇaṁ kṣamā |',
      meaning: 'Patience and forgiveness are the strength of the humble and the greatest ornament of the powerful.'
    },
    epicStory: 'When Shishupala hurled relentless insults in the royal court, Krishna remained serenely composed. He did not lose his temper or trade petty barbs, maintaining supreme dignity while keeping absolute account of boundaries.',
    strategicLesson: 'Never match snark with snark. Text-based sarcasm thrives on ambiguity. The strategic response is deliberate literalism—answer the factual premise while ignoring the emotional bait, then pivot to synchronous voice/in-person communication.',
    studentReality: 'WhatsApp and Discord amplify misunderstandings because you cannot hear vocal tone or see facial expressions. Sarcasm is almost always masked anxiety about grades or deadlines.',
    checklist: [
      'Take 3 deep breaths and do not reply immediately. Never respond when your pulse is elevated.',
      'Do not reply with sarcastic memes or passive-aggressive exclamation marks.',
      'Acknowledge the objective deadline or task buried inside the jab: "Understood on the slide timing."',
      'Move the conversation from text to voice immediately: "Text can be confusing—let’s jump on a quick 5-min call to align."',
      'Establish group chat norms: agree that all project feedback should be direct, actionable, and polite.'
    ],
    scripts: [
      {
        channel: 'Group Chat De-escalation',
        text: "Hey guys, let's keep the group chat strictly focused on project tasks and timelines. Text makes things easy to misread. Let's do a 5-minute call tonight at 8 PM so we can knock this out smoothly!"
      },
      {
        channel: 'Private Message to the Sarcastic Member',
        text: "Hey [Name], noticed your message earlier. It felt a bit tense—is there something specific about the draft or timeline that you're worried about? Let's fix it together."
      }
    ],
    pitfalls: [
      'Responding with an equally snarky meme or sarcastic "K."',
      'Creating a separate splinter group chat behind their back to talk trash.',
      'Giving the silent treatment and ignoring urgent project pings.'
    ]
  },
  {
    id: 'communication-ghosting-deadline',
    category: 'communication',
    categoryLabel: '💬 Communication',
    title: 'A teammate suddenly goes silent / ghosts 48 hours before submission',
    summary: 'No response to calls, blue ticks without replies, and an unfinished section with the deadline rapidly approaching.',
    upaya: 'उपायान्तर (Upāyāntara - Contingency Protocol)',
    epicRef: 'Udyoga Parva: Sanjaya’s Fact-Finding Mission to Upaplavya',
    shloka: {
      sanskrit: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः। न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥',
      translit: 'Udyamena hi sidhyanti kāryāṇi na manorathaiḥ | Na hi suptasya siṁhasya praviśanti mukhe mṛgāḥ ||',
      meaning: 'Success comes only through determined action, never through mere wishful thinking. Prey does not walk into the mouth of a sleeping lion.'
    },
    epicStory: 'When Sanjaya traveled between the two camps, he focused entirely on uncovering hard facts rather than indulging in speculative panic. The Pandavas maintained tactical readiness rather than sitting frozen in hope.',
    strategicLesson: 'Action cures panic. Never wait indefinitely for a ghosting teammate. Establish a clear "Buffer Cutoff" and immediately activate a contingency redistribution plan.',
    studentReality: 'When students ghost at deadlines, it is usually due to intense shame/anxiety because they haven\'t started, rather than malice. Waiting in silence guarantees your collective failure.',
    checklist: [
      'Send a multi-channel time-stamped ping: "Hey [Name], we hope you are okay. We need your draft by 3 PM today."',
      'Set an explicit contingency trigger: "If we don\'t hear back by 3 PM, we will reassign Section 3 to ensure we can submit."',
      'Redistribute the missing section among the remaining members in simplified, bulleted format.',
      'Take screenshots of unanswered communications as an objective timestamped record.',
      'Submit the project with the actual work done and transparently attach a contributor note if required by university policy.'
    ],
    scripts: [
      {
        channel: 'Urgent WhatsApp & Email Notice',
        text: "Hey [Name], hope you are doing well! The final submission is in 36 hours and Section 3 is still open. Please send your current draft by 2 PM today so we can integrate it. If we don't hear from you by then, the team will cover a simplified version to avoid grade penalties. Please let us know ASAP!"
      }
    ],
    pitfalls: [
      'Doing nothing and submitting an empty section hoping the professor won\'t notice.',
      'Calling their phone 40 times in 10 minutes in a blind panic.',
      'Blaming yourself or spending the precious remaining hours venting instead of writing the backup draft.'
    ]
  },
  {
    id: 'communication-style-friction',
    category: 'communication',
    categoryLabel: '💬 Communication',
    title: 'Clashing communication styles: Blunt & direct vs. Sensitive & reserved',
    summary: 'One student\'s straightforward feedback feels like personal attacks to another, causing awkward silence and resentment.',
    upaya: 'लोकव्यवहार (Lokavyavahāra - Adaptive Empathy)',
    epicRef: 'Udyoga Parva: Krishna Adapting His Speech to Vidura, Bhishma, and Kunti',
    shloka: {
      sanskrit: 'अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्। स्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते॥',
      translit: 'Anudvegakaraṁ vākyaṁ satyaṁ priyahitaṁ ca yat | Svādhyāyābhyasanaṁ caiva vāṅmayaṁ tapa ucyate ||',
      meaning: 'Words that cause no agitation, that are truthful, pleasant, and beneficial, constitute the true discipline of speech.'
    },
    epicStory: 'Krishna did not speak to everyone in the same tone. With Bhishma, he used reverence; with Vidura, intimate philosophy; with Duryodhana, firm clarity. True wisdom meets people at their level of perception.',
    strategicLesson: 'Use the "SBI Framework" (Situation - Behavior - Impact). Frame criticism around the work, not the person. Praise publicly, critique privately.',
    studentReality: 'Different students come from different cultural backgrounds and communication habits. What sounds like "honest feedback" to an engineer might sound like an insult to a teammate.',
    checklist: [
      'Adopt the "Praise-Correct-Praise" sandwich or clear rubric-based feedback.',
      'Replace "You made a mess here" with "The professor\'s rubric specifies X, so let\'s format this part according to X."',
      'Ask the quieter teammate directly for their input in smaller meetings: "What are your thoughts on this section?"',
      'Agree as a team on how to deliver constructive feedback (e.g., using Google Docs comments rather than group chat callouts).',
      'Check in privately if you notice someone shutting down during a call.'
    ],
    scripts: [
      {
        channel: 'Constructive Google Docs Comment',
        text: "Great research here! To align with section 3 of the rubric, could we add two supporting citations here? Let me know if you want help finding papers!"
      },
      {
        channel: 'Direct Teammate Softening Ping',
        text: "Hey! Just wanted to clarify that my comment during today's call was purely about the diagram format, not your work! You've done an awesome job on the analysis."
      }
    ],
    pitfalls: [
      'Saying "I\'m just being brutally honest" as an excuse for being rude.',
      'Taking constructive comments about code or slides as attacks on your personal worth.',
      'Refusing to speak in meetings and secretly resenting your teammates.'
    ]
  },
  {
    id: 'decision-stalemate-topic',
    category: 'decision',
    categoryLabel: '⚖️ Decision-Making',
    title: '50/50 Deadlock on choosing project topic or design direction',
    summary: 'The team is split exactly in half between two distinct topics or architectures, and neither side wants to give in.',
    upaya: 'समन्वय (Samanvaya - The Third Alternative)',
    epicRef: 'Udyoga Parva: Pandava War Council & Integration of Conflicting Views',
    shloka: {
      sanskrit: 'न हि वैरेण वैराणि शाम्यन्तीह कदाचन। अवेरेण च शाम्यन्ति एष धर्मः सनातनः॥',
      translit: 'Na hi vaireṇa vairāṇi śāmyantīha kadācana | Averena ca śāmyanti eṣa dharmaḥ sanātanaḥ ||',
      meaning: 'Hatred and discord are never appeased by hatred; they are overcome by wisdom and magnanimity. This is the eternal truth.'
    },
    epicStory: 'In the Pandava war council, Yudhishthira desired peace at all costs, Bhima wanted immediate retribution, Draupadi demanded justice, and Arjuna analyzed the military balance. Krishna did not dismiss any view—he integrated them into a higher strategic synthesis.',
    strategicLesson: 'When two sides are deadlocked between Option A and Option B, the solution is rarely an exhausting brawl to see who gives up first. Seek the "Third Alternative" (Option C) or construct an objective scoring matrix.',
    studentReality: 'Students often treat topic selection like a debate competition where conceding feels like losing. Remember: in group work, winning an argument while losing team harmony results in a terrible grade.',
    checklist: [
      'Draft a neutral 4-factor scoring rubric: Feasibility (30%), Data Availability (30%), Grading Rubric Match (20%), Team Interest (20%).',
      'Rate both topics anonymously on a 1–5 scale.',
      'Explore Option C: Can we combine the best data source of Option A with the analysis model of Option B?',
      'Consult the professor or TA for 5 minutes during office hours: "Which of these two aligns better with your grading expectations?"',
      'If both are identical, flip a coin with an upfront mutual pact: whichever wins, all members commit 100% effort without complaining.'
    ],
    scripts: [
      {
        channel: 'Group Chat Synthesis Proposal',
        text: "Hey team! Since we're evenly split between Topic A and Topic B, let's take both to Prof. Sharma's office hours tomorrow for 5 minutes. We'll ask which one fits the rubric best and go with that decision 100%!"
      }
    ],
    pitfalls: [
      'Continuing to argue for 2 weeks while other groups are already building their prototype.',
      'Half the team secretly working on Topic A while the other half works on Topic B.',
      'Bringing toxic resentment into the rest of the semester because your favorite idea wasn\'t chosen.'
    ]
  },
  {
    id: 'decision-perfectionist-vs-minimalist',
    category: 'decision',
    categoryLabel: '⚖️ Decision-Making',
    title: 'Perfectionist vs. Minimum-Viable-Pass teammate clash',
    summary: 'One member wants an over-engineered masterwork that will take 80 hours; the other just wants a simple passing grade with minimal effort.',
    upaya: 'काल-देश-पात्र (Kāla-Deśa-Pātra - Contextual Balance)',
    epicRef: 'Udyoga & Bhishma Parva: Arjuna’s Idealism vs. Bhima’s Pragmatism',
    shloka: {
      sanskrit: 'युक्तचेष्टस्य कर्मसु। योगो भवति दुःखहा॥',
      translit: 'Yuktaceṣṭasya karmasu | Yogo bhavati duḥkhahā ||',
      meaning: 'For one who is balanced and temperate in their actions and endeavors, strategic wisdom banishes all sorrow.'
    },
    epicStory: 'Arjuna had lofty ethical and philosophical ideals, while Bhima was relentlessly grounded in practical reality. Krishna harmonized both—ensuring ideals did not paralyze action, and brute action did not lose moral direction.',
    strategicLesson: 'Establish the "Core vs. Bonus" boundary. Define the Minimum Lovable Product (MVP) that secures an \'A\' grade according to the rubric first. Extra polish is treated as optional stretch goals.',
    studentReality: 'Perfectionists suffer from anxiety about failing; minimalists suffer from competing priorities (jobs, other courses). Neither is inherently malicious.',
    checklist: [
      'Print or open the official course evaluation rubric together.',
      'Identify the exact minimum requirements for full marks in each category (the "Non-Negotiable Core").',
      'Schedule the core requirements to finish 4 days before the deadline.',
      'Label extra animations, advanced features, or deep optimizations as "Phase 2 Polish."',
      'Allow the ambitious teammate to lead Phase 2 polish without forcing the overloaded teammate into 3 AM sprints.'
    ],
    scripts: [
      {
        channel: 'Balancing Framework Message',
        text: "Let's make sure we hit every point on the rubric first to guarantee our grade. Once the core submission is working by Thursday, anyone who wants to add extra polish and advanced features can do so!"
      }
    ],
    pitfalls: [
      'The perfectionist micromanaging and rewriting everyone\'s code or slides at 4 AM.',
      'The minimalist doing sloppy half-baked work that risks everyone\'s grade.',
      'Refusing to agree on a clear definition of "Done".'
    ]
  },
  {
    id: 'peer-friendship-grade-friction',
    category: 'peer',
    categoryLabel: '🤝 Peer & Roommate',
    title: 'Close friendship is suffering because of academic project stress',
    summary: 'You chose your best friend as your project partner, but working together has triggered tension, missed commitments, and hurt feelings.',
    upaya: 'स्नेह एवं कर्तव्य (Sneha vs. Kartavya)',
    epicRef: 'Udyoga Parva: Balarama’s Neutrality and Krishna’s Clarity on Duty',
    shloka: {
      sanskrit: 'न हि ज्ञातिवधं कृत्वा सुखं लप्स्यामहे वयम्।',
      translit: 'Na hi jñātivadhaṁ kṛtvā sukhaṁ lapsyāmahe vayam |',
      meaning: 'No genuine happiness can be obtained by destroying relationships and kinship in the pursuit of temporary gains.'
    },
    epicStory: 'When war was unavoidable, Balarama chose pilgrimage rather than fighting people he loved. Krishna taught that while personal affection (Sneha) is sacred, academic and moral duty (Kartavya) must be fulfilled with clear, honest transparency rather than fake politeness.',
    strategicLesson: 'Separate the friend identity from the colleague identity. Fake politeness kills both projects and friendships. Address the project issue explicitly as an external obstacle you are tackling together, not a personal character flaw.',
    studentReality: 'Working with friends is the #1 way college students lose friends, because people expect friendship leeway on academic deadlines.',
    checklist: [
      'Take them out for chai/coffee outside the college library; reset the emotional room.',
      'Explicitly say: "Our friendship is 100x more important to me than this course, which is why I want to talk openly so we don\'t stay stressed."',
      'Identify what part of the project is stressing them out and adjust tasks to their genuine strengths.',
      'Set clear external milestones so the deadline is the "bad guy," not you.',
      'Agree to never hold academic project disputes against each other in your social life.'
    ],
    scripts: [
      {
        channel: 'Friendship Reset Conversation Opener',
        text: "Hey, let's grab coffee today. I feel like the project deadline has been making things tense between us, and our friendship matters way more than this course. Let's figure out how to knock out the remaining slides together without stressing each other out."
      }
    ],
    pitfalls: [
      'Bottling up your frustration for weeks until you suddenly stop talking to your best friend.',
      'Expecting your friend to read your mind because "they should know better."',
      'Bringing project complaints into your evening friend hangouts.'
    ]
  },
  {
    id: 'peer-ego-clash-achievers',
    category: 'peer',
    categoryLabel: '🤝 Peer & Roommate',
    title: 'Ego clash: Two high-achieving leaders competing inside the same group',
    summary: 'Both want to be the team captain, both want their ideas at the center, and every meeting turns into an intellectual dominance battle.',
    upaya: 'विभाग (Vibhāga - Domain Sovereignty)',
    epicRef: 'Drona Parva: Complementary Mastery of the Pandava Commanders',
    shloka: {
      sanskrit: 'संहतिः श्रेयसी पुंसां स्वकुलैः सह भारत।',
      translit: 'Saṁhatiḥ śreyasī puṁsāṁ svakulaiḥ saha bhārata |',
      meaning: 'True victory and prosperity belong to those who cultivate unity and collaborative synergy with their peers.'
    },
    epicStory: 'In the Pandava army, Dhrishtadyumna was commander-in-chief, Bhima led the vanguard, and Arjuna led the strategic offensives. By defining distinct spheres of supreme authority, they channeled immense individual egos into an unstoppable collective force.',
    strategicLesson: 'Divide territory clearly (Domain Sovereignty). If two leaders fight, divide the project into two distinct pillars (e.g., Pillar 1: Engineering & Architecture; Pillar 2: User Research, Documentation & Presentation). Give each leader final say in their pillar.',
    studentReality: 'Two alpha students in one group will destroy the project unless their boundaries are separated. Shared authority without clear domains always leads to war.',
    checklist: [
      'Acknowledge each other’s strengths explicitly: "You are incredible at architecture, and I have deep experience in data modeling."',
      'Formally establish two separate domains of decision ownership.',
      'Give each person final veto power strictly within their designated domain.',
      'Focus all competitive energy outward—on winning top grade in the class or the hackathon—rather than inward.',
      'Celebrate each other’s wins publicly.'
    ],
    scripts: [
      {
        channel: 'Domain Separation Proposal',
        text: "Hey [Name], since we both have strong visions, let's divide and conquer so we don't slow each other down. You take total lead on the Architecture and APIs, and I'll take total lead on the UI, Demo, and Documentation. That way we both get complete ownership and build something incredible."
      }
    ],
    pitfalls: [
      'Undermining the other person’s code or writing behind their back.',
      'Constantly checking who spoke more in front of the professor.',
      'Refusing to implement their module simply because you didn\'t invent it.'
    ]
  },
  {
    id: 'peer-roommate-habits',
    category: 'peer',
    categoryLabel: '🤝 Peer & Roommate',
    title: 'Roommate study hours, late-night noise, and cleanliness disputes',
    summary: 'Clashing sleeping schedules, loud video calls during study hours, or piled-up dishes are creating toxic tension in your hostel/apartment.',
    upaya: 'समयबन्ध (Samayabandha - Explicit Covenant)',
    epicRef: 'Aranya Parva: The Pandavas’ Forest Compact & Disciplines',
    shloka: {
      sanskrit: 'यथा चित्तं तथा वाचयथा वाचस्तथा क्रिया। चित्ते वाचि क्रियायां च साधूनामेकरूपता॥',
      translit: 'Yathā cittaṁ tathā vācayathā vācastathā kriyā | Citte vāci kriyāyāṁ ca sādhūnāmekarūpatā ||',
      meaning: 'As the mind thinks, so the speech speaks; as the speech speaks, so the actions act. In mind, speech, and deed, wise individuals maintain harmony.'
    },
    epicStory: 'During their twelve years of exile in the forest, the Pandavas did not survive through random whim. They established clear daily schedules, shared duties, designated times for study and reflection, and respected each other’s personal spaces with absolute discipline.',
    strategicLesson: 'Unspoken expectations are pre-meditated resentments. Establish an explicit Roommate Compact (Samayabandha). Written agreements prevent emotional explosions.',
    studentReality: 'Living together tests patience more than any exam. Most roommate fights start from tiny annoyances (lights left on, unwashed spoons) that build up over months.',
    checklist: [
      'Call a calm "15-minute room reset" conversation over weekend snacks.',
      'Define clear Quiet Hours (e.g., midnight to 8 AM: headphones mandatory).',
      'Create a simple 2-person alternating chore roster.',
      'Normalize the "No Hard Feelings" rule: anyone can politely ask for quiet without the other person taking offense.',
      'Invest in high-quality earplugs or noise-canceling headphones as a proactive sanity buffer.'
    ],
    scripts: [
      {
        channel: 'Polite Roommate Reset',
        text: "Hey! Can we do a quick 10-minute chat this evening over tea? With midterms coming up, let's align on quiet study hours and room routines so we both have a super productive semester without bothering each other."
      }
    ],
    pitfalls: [
      'Passive-aggressively slamming doors or loudly washing dishes at 2 AM to show anger.',
      'Complaining about your roommate to everyone else in the hostel instead of talking to them.',
      'Letting small annoyances boil until you scream at each other during finals week.'
    ]
  },
  {
    id: 'peer-ethical-cheating-pressure',
    category: 'peer',
    categoryLabel: '🤝 Peer & Roommate',
    title: 'Peer pressure to share your completed assignment / project code to copy',
    summary: 'A classmate or friend asks you to "just send your code so I can see it," putting you at risk of academic plagiarism penalties.',
    upaya: 'धर्म एवं मर्यादा (Dharma & Maryādā - Ethical Firmness)',
    epicRef: 'Vana Parva: Yudhishthira’s Yaksha Prashna & Ethical Steadfastness',
    shloka: {
      sanskrit: 'धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः। तस्माद्धर्मो न हन्तव्यो मा नो धर्मो हतोऽवधीत्॥',
      translit: 'Dharma eva hato hanti dharmo rakṣati rakṣitaḥ | Tasmāddharmo na hantavyo mā no dharmo hato\'vadhīt ||',
      meaning: 'Righteousness, when violated, destroys; righteousness, when protected, protects. Therefore, ethics should never be abandoned.'
    },
    epicStory: 'When tested by the Yaksha at the enchanted lake, Yudhishthira refused to take shortcuts or sacrifice moral duty for instant relief. Even under mortal thirst, he answered with uncompromising truth, ultimately saving all his brothers.',
    strategicLesson: 'Say "No" to the violation while saying "Yes" to the person. You can offer intellectual assistance (explaining logic, debugging together) without handing over your raw submission file.',
    studentReality: 'Plagiarism detection algorithms (MOSS, Turnitin) catch both the copycat AND the original author. You risk suspension or an \'F\' grade out of misplaced politeness.',
    checklist: [
      'Never send raw code files or unformatted report text.',
      'Offer genuine tutoring instead: "I can\'t send my file because the plagiarism checker flags identical submissions, but I can jump on a 15-minute call and explain the logic to you."',
      'Point them to lecture slides, documentation, or public tutorials that helped you solve it.',
      'Encourage them to email the professor for a 24-hour extension if they are genuinely stuck.',
      'Remember that a true friend will never demand that you risk your academic record.'
    ],
    scripts: [
      {
        channel: 'Polite but Firm Boundary Script',
        text: "Hey [Name], I can't send my code file because the professor runs Turnitin/MOSS and we'll both get flagged for plagiarism. But I'm super happy to jump on a quick 15-min call to walk you through the logic and help you unblock your approach!"
      }
    ],
    pitfalls: [
      'Sending your file with the naive plea: "Just change the variable names so we don\'t get caught."',
      'Ghosting them awkwardly instead of giving a clear, respectful boundary.',
      'Feeling guilty for protecting your own academic integrity.'
    ]
  }
];

// ============================================================================
// 2. SCENARIOS RENDERING, SEARCH & CATEGORY FILTERING
// ============================================================================
let currentFilter = 'all';
let currentSearchQuery = '';

function initScenarios() {
  updateCounts();
  renderScenarios();
}

function updateCounts() {
  const allCount = SCENARIOS.length;
  const teamCount = SCENARIOS.filter(s => s.category === 'team').length;
  const commCount = SCENARIOS.filter(s => s.category === 'communication').length;
  const decisionCount = SCENARIOS.filter(s => s.category === 'decision').length;
  const peerCount = SCENARIOS.filter(s => s.category === 'peer').length;

  document.getElementById('count-all').textContent = allCount;
  document.getElementById('count-team').textContent = teamCount;
  document.getElementById('count-comm').textContent = commCount;
  document.getElementById('count-decision').textContent = decisionCount;
  document.getElementById('count-peer').textContent = peerCount;
}

function renderScenarios() {
  const grid = document.getElementById('scenarios-grid');
  const noResults = document.getElementById('no-results');
  grid.innerHTML = '';

  const filtered = SCENARIOS.filter(scenario => {
    const matchesFilter = currentFilter === 'all' || scenario.category === currentFilter;
    const q = currentSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      scenario.title.toLowerCase().includes(q) || 
      scenario.summary.toLowerCase().includes(q) ||
      scenario.upaya.toLowerCase().includes(q) ||
      scenario.strategicLesson.toLowerCase().includes(q) ||
      scenario.epicRef.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  noResults.style.display = 'none';

  filtered.forEach(scenario => {
    const card = document.createElement('div');
    card.className = 'scenario-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View resolution for ${scenario.title}`);

    card.innerHTML = `
      <div class="card-top">
        <span class="category-tag cat-${scenario.category}">${scenario.categoryLabel}</span>
        <span class="card-upaya-tag">${scenario.upaya}</span>
      </div>
      <h3 class="card-title">${escapeHTML(scenario.title)}</h3>
      <p class="card-summary">${escapeHTML(scenario.summary)}</p>
      <div class="card-epic-badge">
        <span class="badge-label">Mahabharata Anchor</span>
        <span>${escapeHTML(scenario.epicRef)}</span>
      </div>
      <div class="card-footer">
        <span class="card-btn-text">
          <span>Explore Peace Protocol</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    `;

    card.addEventListener('click', () => openScenarioModal(scenario.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openScenarioModal(scenario.id);
      }
    });

    grid.appendChild(card);
  });
}

function initSearchAndFilter() {
  const searchInput = document.getElementById('conflict-search');
  const clearBtn = document.getElementById('clear-search-btn');
  const pills = document.querySelectorAll('.filter-pill');

  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    clearBtn.style.display = currentSearchQuery.length > 0 ? 'block' : 'none';
    renderScenarios();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearchQuery = '';
    clearBtn.style.display = 'none';
    renderScenarios();
    searchInput.focus();
  });

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-category');
      renderScenarios();
    });
  });
}

window.resetSearchAndFilter = function() {
  currentFilter = 'all';
  currentSearchQuery = '';
  document.getElementById('conflict-search').value = '';
  document.getElementById('clear-search-btn').style.display = 'none';
  document.querySelectorAll('.filter-pill').forEach(p => {
    if (p.getAttribute('data-category') === 'all') p.classList.add('active');
    else p.classList.remove('active');
  });
  renderScenarios();
};

// ============================================================================
// 3. SCENARIO DETAIL MODAL & INTERACTIVE CHECKLIST
// ============================================================================
let activeScenarioData = null;
let completedChecklistSteps = new Set();

function initModal() {
  const modal = document.getElementById('scenario-modal');
  const closeBtn = document.getElementById('modal-close');
  const closeBtnBottom = document.getElementById('modal-close-bottom');
  const tabs = document.querySelectorAll('.modal-tab');
  const printBtn = document.getElementById('btn-print-plan');

  closeBtn.addEventListener('click', closeModal);
  closeBtnBottom.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(`pane-${tab.dataset.tab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  printBtn.addEventListener('click', () => {
    window.print();
  });
}

function openScenarioModal(scenarioId) {
  const scenario = SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario) return;
  activeScenarioData = scenario;
  completedChecklistSteps.clear();

  // Populate Header
  const catBadge = document.getElementById('modal-cat-badge');
  catBadge.textContent = scenario.categoryLabel;
  catBadge.className = `modal-category-badge cat-${scenario.category}`;

  document.getElementById('modal-problem-title').textContent = scenario.title;
  document.getElementById('modal-epic-ref').textContent = `Mahabharata Anchor: ${scenario.epicRef}`;

  // Populate Tab 1: Strategy & Verse
  document.getElementById('modal-shloka-sanskrit').textContent = scenario.shloka.sanskrit;
  document.getElementById('modal-shloka-translit').textContent = scenario.shloka.translit;
  document.getElementById('modal-shloka-meaning').textContent = `"${scenario.shloka.meaning}"`;

  document.getElementById('modal-epic-story').textContent = scenario.epicStory;
  document.getElementById('modal-strategic-lesson').textContent = scenario.strategicLesson;
  document.getElementById('modal-student-reality').textContent = scenario.studentReality;

  // Populate Tab 2: Action Checklist
  renderChecklist(scenario.checklist);

  // Populate Tab 3: Scripts
  renderScripts(scenario.scripts);

  // Populate Tab 4: Pitfalls
  renderPitfalls(scenario.pitfalls);

  // Reset tab to first tab
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelector('.modal-tab[data-tab="strategy"]').classList.add('active');
  document.getElementById('pane-strategy').classList.add('active');

  // Open modal
  const modal = document.getElementById('scenario-modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('scenario-modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

function renderChecklist(steps) {
  const container = document.getElementById('modal-action-checklist');
  container.innerHTML = '';

  steps.forEach((stepText, index) => {
    const item = document.createElement('div');
    item.className = 'checklist-item';
    item.setAttribute('role', 'checkbox');
    item.setAttribute('aria-checked', 'false');
    item.setAttribute('tabindex', '0');

    item.innerHTML = `
      <div class="check-box">
        <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="display:none;"><path d="M20 6 9 17l-5-5"/></svg>
      </div>
      <div class="checklist-text">${escapeHTML(stepText)}</div>
    `;

    const toggle = () => {
      if (completedChecklistSteps.has(index)) {
        completedChecklistSteps.delete(index);
        item.classList.remove('completed');
        item.setAttribute('aria-checked', 'false');
        item.querySelector('.check-icon').style.display = 'none';
      } else {
        completedChecklistSteps.add(index);
        item.classList.add('completed');
        item.setAttribute('aria-checked', 'true');
        item.querySelector('.check-icon').style.display = 'block';
      }
      updateChecklistProgress(steps.length);
    };

    item.addEventListener('click', toggle);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });

    container.appendChild(item);
  });

  updateChecklistProgress(steps.length);
}

function updateChecklistProgress(total) {
  const count = completedChecklistSteps.size;
  const pct = Math.round((count / total) * 100);
  document.getElementById('checklist-progress-text').textContent = `${count} of ${total} steps completed (${pct}%)`;
  document.getElementById('checklist-progress-fill').style.width = `${pct}%`;
}

function renderScripts(scripts) {
  const container = document.getElementById('modal-scripts-container');
  container.innerHTML = '';

  scripts.forEach((script) => {
    const card = document.createElement('div');
    card.className = 'script-card';

    card.innerHTML = `
      <div class="script-card-header">
        <span class="script-channel">📱 ${escapeHTML(script.channel)}</span>
        <button class="btn-copy-script">📋 Copy Script</button>
      </div>
      <div class="script-content">${escapeHTML(script.text)}</div>
    `;

    const copyBtn = card.querySelector('.btn-copy-script');
    copyBtn.addEventListener('click', () => {
      copyToClipboard(script.text);
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => { copyBtn.textContent = '📋 Copy Script'; }, 2000);
    });

    container.appendChild(card);
  });
}

function renderPitfalls(pitfalls) {
  const container = document.getElementById('modal-pitfall-list');
  container.innerHTML = '';

  pitfalls.forEach((pitfall) => {
    const li = document.createElement('li');
    li.textContent = pitfall;
    container.appendChild(li);
  });
}

// ============================================================================
// 4. INTERACTIVE "KRISHNA PEACE MISSION" SIMULATOR (DOOTA MODE)
// ============================================================================
const SIMULATOR_STAGES = [
  {
    stageNum: 1,
    title: 'Stage 1: The WhatsApp Outburst',
    situation: `
      It is 11:30 PM. Your team has 4 days until the capstone submission.
      Arjun suddenly texts the group: <em>"Dev's frontend design is uninspired and amateurish. If we submit this, the professor will fail us. I am redesigning the entire UI from scratch tonight in Tailwind + Three.js."</em>
      Dev replies furiously: <em>"You didn't write a single line of CSS in 3 weeks, and now you want to blow up our working project? Touch my code and I'm quitting the team."</em>
      The chat freezes. Two other silent members are panicking. What is your initial move as the Peace Envoy?
    `,
    choices: [
      {
        id: 'opt1_a',
        label: 'A) Side with Dev immediately and reprimand Arjun',
        subtext: '"Arjun, you are out of line. Dev did the work, so leave it alone."',
        score: -10,
        upaya: 'Imbalanced Judgment',
        feedback: 'Violated Sāma. Taking sides in public inflames Arjun\'s pride and pushes him into open rebellion (like Duryodhana feeling alienated), hardening the rift.'
      },
      {
        id: 'opt1_b',
        label: 'B) Intervene with Sāma (Calm, neutral reframing & pause)',
        subtext: '"Freeze code pushes for tonight. Both of you care about our grade. Let\'s do a 15-minute voice call tomorrow at 10 AM to look at the rubric before anyone changes a file."',
        score: +25,
        upaya: 'साम (Sāma - Cooling the Room)',
        feedback: 'Masterful Envoy move! Like Krishna entering Hastinapura with serenity, you arrested the immediate impulse for destruction, acknowledged their shared desire to pass, and shifted from volatile text to voice.'
      },
      {
        id: 'opt1_c',
        label: 'C) Say nothing and wait to see if they figure it out tomorrow',
        subtext: 'Mute the group chat and hope tempers cool down on their own.',
        score: -5,
        upaya: 'Neglect of Duty (Dhritarashtra trap)',
        feedback: 'Passive silence leads to disaster. By morning, Arjun might overwrite the repo or Dev might delete his branch.'
      }
    ]
  },
  {
    stageNum: 2,
    title: 'Stage 2: Uncovering Underlying Grievances',
    situation: `
      Next morning, you hop on the 1-on-1 call with both members. 
      Dev is wounded: <em>"He doesn't respect my time. I spent 40 hours on this!"</em>
      Arjun admits privately: <em>"I need an A+ in this course for my scholarship. The current UI doesn't look modern enough to impress industry evaluators."</em>
      Now that the true motivations are exposed (Dev wants respect & safety; Arjun has scholarship anxiety), how do you deploy diplomacy?
    `,
    choices: [
      {
        id: 'opt2_a',
        label: 'A) Tell Arjun his scholarship is not Dev’s problem',
        subtext: '"We only promised to build what is in the syllabus. Deal with it."',
        score: -10,
        upaya: 'Crude Dismissal',
        feedback: 'Dismissing Arjun\'s genuine fear will make him disengage completely or sabotage the presentation.'
      },
      {
        id: 'opt2_b',
        label: 'B) Deploy Dāna & Bheda (Preserve core work + add a designated polish layer)',
        subtext: '"Dev\'s foundation is solid and guarantees our base marks. Arjun, you can create a dedicated polished theme/dashboard component without altering Dev\'s underlying structure."',
        score: +30,
        upaya: 'दान (Dāna - Fair Concession) & भेद (Bheda - Clear Boundaries)',
        feedback: 'Brilliant strategic synthesis! Dev\'s 40 hours of work are validated and protected, while Arjun\'s energy is channeled into productive, non-destructive enhancements.'
      },
      {
        id: 'opt2_c',
        label: 'C) Ask the professor to divide the group in half right now',
        subtext: 'Escalate to the highest authority 4 days before deadline.',
        score: -15,
        upaya: 'Premature Daṇḍa',
        feedback: 'Invoking Daṇḍa before exhausting negotiation is seen as failure of teamwork by professors and usually penalizes everyone\'s marks.'
      }
    ]
  },
  {
    stageNum: 3,
    title: 'Stage 3: The Peace Accord & Final Sprint',
    situation: `
      With 48 hours remaining, the project is coming together, but both are exhausted. 
      Arjun has finished the visual polish, and Dev has hooked up the database. 
      Now, how do you seal the presentation to guarantee shared glory and prevent a last-minute flare-up during the evaluation demo?
    `,
    choices: [
      {
        id: 'opt3_a',
        label: 'A) Establish explicit "Presentation Sovereignty" and shared attribution',
        subtext: 'Build an explicit slide showing Dev as Lead System Architect and Arjun as Lead UX Engineer, ensuring both have 3 minutes of speaking time.',
        score: +25,
        upaya: 'मर्यादा (Maryādā - Mutual Honor)',
        feedback: 'Flawless execution! When both warriors are honored for their genuine contributions, jealousy dissolves. The team walks into the presentation united and confident.'
      },
      {
        id: 'opt3_b',
        label: 'B) Let the most confident speaker take the whole presentation',
        subtext: '"Whoever speaks best should just present everything so we get the highest grade."',
        score: -10,
        upaya: 'Recipe for Resentment',
        feedback: 'This re-ignites credit theft fears right at the finish line and destroys team cohesion.'
      }
    ]
  }
];

let simState = {
  currentStageIndex: 0,
  score: 50,
  choicesMade: []
};

function initSimulator() {
  resetSimulator();
}

function resetSimulator() {
  simState = {
    currentStageIndex: 0,
    score: 50,
    choicesMade: []
  };
  renderSimulatorStage();
}

function renderSimulatorStage() {
  const container = document.getElementById('sim-main-container');
  if (simState.currentStageIndex >= SIMULATOR_STAGES.length) {
    renderSimulatorResult();
    return;
  }

  const stage = SIMULATOR_STAGES[simState.currentStageIndex];

  container.innerHTML = `
    <div class="sim-progress-header">
      <span class="stage-tracker">Mission Phase ${stage.stageNum} of ${SIMULATOR_STAGES.length}</span>
      <span class="peace-score-pill">🕊️ Peace Score: ${simState.score}</span>
    </div>

    <span class="sim-intro-badge">CRISIS SIMULATION</span>
    <h3 class="sim-headline">${escapeHTML(stage.title)}</h3>
    
    <div class="sim-actors">
      <div class="actor-card">
        <div class="actor-name"><span>🛡️ Dev</span> (Frontend Author)</div>
        <div class="actor-stance">"I worked 40 hours; touch my code and I quit."</div>
      </div>
      <div class="actor-card">
        <div class="actor-name"><span>⚡ Arjun</span> (Ambitious Perfectionist)</div>
        <div class="actor-stance">"The UI is uninspired; I want an A+ for my scholarship."</div>
      </div>
    </div>

    <div class="sim-story-text">${stage.situation}</div>

    <div class="choices-list" id="sim-choices-list">
      <!-- Choices rendered below -->
    </div>
  `;

  const choicesContainer = container.querySelector('#sim-choices-list');

  stage.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `
      <span class="choice-label">${escapeHTML(choice.label)}</span>
      <span class="choice-sub">${escapeHTML(choice.subtext)}</span>
    `;

    btn.addEventListener('click', () => handleSimChoice(stage, choice));
    choicesContainer.appendChild(btn);
  });
}

function handleSimChoice(stage, choice) {
  simState.score += choice.score;
  simState.choicesMade.push({ stage: stage.title, choice: choice });

  const container = document.getElementById('sim-main-container');
  const choicesContainer = container.querySelector('#sim-choices-list');
  choicesContainer.style.display = 'none';

  const feedbackDiv = document.createElement('div');
  feedbackDiv.className = 'sim-feedback-box';
  feedbackDiv.innerHTML = `
    <div class="feedback-badge">Strategic Analysis: ${escapeHTML(choice.upaya)}</div>
    <p class="feedback-text">${escapeHTML(choice.feedback)}</p>
    <button class="btn btn-gold-sm" id="sim-next-btn">
      <span>Continue to Next Phase ➔</span>
    </button>
  `;

  container.appendChild(feedbackDiv);

  feedbackDiv.querySelector('#sim-next-btn').addEventListener('click', () => {
    simState.currentStageIndex++;
    renderSimulatorStage();
  });
}

function renderSimulatorResult() {
  const container = document.getElementById('sim-main-container');

  let title = '';
  let badge = '';
  let summary = '';

  if (simState.score >= 90) {
    badge = '🦚 MASTER ENVOY (Kṛṣṇa Level)';
    title = 'Supreme Diplomatic Victory!';
    summary = 'Like Krishna in the Udyoga Parva, you practiced supreme composure, listened past angry words to identify real underlying fears, and designed a non-destructive compromise. Both Dev and Arjun feel respected, and your team secured an outstanding grade without breaking relationships.';
  } else if (simState.score >= 60) {
    badge = '⚖️ STEADFAST MEDIATOR (Yudhishthira Level)';
    title = 'Pragmatic Accord Reached';
    summary = 'You managed to prevent the project from exploding, though a few awkward tensions lingered. With a little more attention to early reframing (Sāma), your team can achieve complete harmony.';
  } else {
    badge = '⚠️ CHAOTIC ARBITRATOR';
    title = 'The Chariot Overturned';
    summary = 'Impulsive reactions or premature ultimatums hardened the dispute. The team fragmented, and the presentation felt strained. Study the 4 Upāyas to turn future crises into triumphs!';
  }

  container.innerHTML = `
    <div class="archetype-result-box">
      <div class="archetype-emblem">🕊️</div>
      <div class="sim-intro-badge">${badge}</div>
      <h3 class="archetype-name">${title}</h3>
      <div class="peace-score-pill" style="display:inline-block; margin-bottom:1.5rem;">
        Final Peace Score: ${simState.score} / 105
      </div>
      <div class="archetype-breakdown">
        <p>${summary}</p>
      </div>
      <button class="btn btn-gold" onclick="resetSimulator()">
        <span>🔄 Restart Peace Mission Simulator</span>
      </button>
    </div>
  `;
}

window.resetSimulator = resetSimulator;

// ============================================================================
// 5. CONFLICT ARCHETYPE QUIZ
// ============================================================================
const QUIZ_QUESTIONS = [
  {
    q: 'When a teammate says your slide draft is messy and needs work, what is your immediate reflex?',
    opts: [
      { text: 'A) Get defensive and point out everything wrong with their slides.', archetype: 'bhima' },
      { text: 'B) Feel hurt, say nothing, and privately redo the whole thing at 2 AM.', archetype: 'arjuna' },
      { text: 'C) Ask them for specific rubric examples to understand their perspective.', archetype: 'krishna' },
      { text: 'D) Propose holding an all-team vote to see if everyone agrees.', archetype: 'yudhishthira' }
    ]
  },
  {
    q: 'A group member misses a crucial deadline without giving an excuse. How do you respond?',
    opts: [
      { text: 'A) Call them immediately and demand a straight answer.', archetype: 'bhima' },
      { text: 'B) Take over their work quietly so the quality doesn\'t suffer.', archetype: 'arjuna' },
      { text: 'C) Ping them privately to check if they\'re sick or facing an emergency, while setting a 24h backup trigger.', archetype: 'krishna' },
      { text: 'D) Send a polite group reminder quoting the syllabus policy.', archetype: 'yudhishthira' }
    ]
  },
  {
    q: 'Your team is split 50/50 on which topic to pick. Meetings have reached an exhausting deadlock. What is your strategy?',
    opts: [
      { text: 'A) Insist aggressively on the topic you researched best until they cave in.', archetype: 'bhima' },
      { text: 'B) Dive into researching both topics all night until you find a flaw in the other.', archetype: 'arjuna' },
      { text: 'C) Build an objective scoring matrix and suggest consulting the TA for a 2-min objective tiebreak.', archetype: 'krishna' },
      { text: 'D) Suggest flipping a coin or taking whatever is easiest for everyone.', archetype: 'yudhishthira' }
    ]
  },
  {
    q: 'What is your highest priority in any college group project?',
    opts: [
      { text: 'A) Getting things done fast without endless talking.', archetype: 'bhima' },
      { text: 'B) Technical perfection and craftsmanship that sets an industry benchmark.', archetype: 'arjuna' },
      { text: 'C) Acing the grade while elevating team morale and lifelong bonds.', archetype: 'krishna' },
      { text: 'D) Ensuring absolute fairness and equal rules for every member.', archetype: 'yudhishthira' }
    ]
  }
];

let quizIndex = 0;
let quizScores = { yudhishthira: 0, bhima: 0, arjuna: 0, krishna: 0 };

function initArchetypeQuiz() {
  quizIndex = 0;
  quizScores = { yudhishthira: 0, bhima: 0, arjuna: 0, krishna: 0 };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');

  if (quizIndex >= QUIZ_QUESTIONS.length) {
    renderQuizResult();
    return;
  }

  const q = QUIZ_QUESTIONS[quizIndex];

  container.innerHTML = `
    <div class="quiz-q-num">Question ${quizIndex + 1} of ${QUIZ_QUESTIONS.length}</div>
    <h3 class="quiz-question-title">${escapeHTML(q.q)}</h3>
    <div class="quiz-options">
      ${q.opts.map((opt, i) => `
        <button class="quiz-opt-btn" data-archetype="${opt.archetype}">
          ${escapeHTML(opt.text)}
        </button>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const arch = btn.dataset.archetype;
      quizScores[arch]++;
      quizIndex++;
      renderQuizQuestion();
    });
  });
}

function renderQuizResult() {
  const container = document.getElementById('quiz-container');

  // Determine highest score
  let maxArchetype = 'krishna';
  let maxScore = -1;
  for (const [key, val] of Object.entries(quizScores)) {
    if (val > maxScore) {
      maxScore = val;
      maxArchetype = key;
    }
  }

  const ARCHETYPES = {
    krishna: {
      name: 'Sri Krishna Archetype: The Diplomatic Strategist',
      emblem: '🦚',
      tagline: '"You see beyond the emotional smoke to orchestrate lasting victory."',
      strengths: 'Exceptional emotional composure, empathetic listening, knack for win-win compromises, and mastery over timing.',
      blindspot: 'Teammates may occasionally mistake your deliberate patience for passivity. Make sure your boundaries are clearly voiced.',
      advice: 'Continue stepping up as the designated envoy in project teams. Your ability to reframe conflicts is an invaluable superpower in college and corporate careers.'
    },
    yudhishthira: {
      name: 'Yudhishthira Archetype: The Principled Consensualist',
      emblem: '👑',
      tagline: '"Guided by righteousness, fair rules, and collective harmony."',
      strengths: 'Deep commitment to fairness, ethical integrity, respect for group rules, and patience.',
      blindspot: 'Can become paralyzed by indecision or reluctant to enforce hard boundaries when someone is clearly taking advantage.',
      advice: 'Remember that true Dharma sometimes requires firm Daṇḍa. Don\'t be afraid to set non-negotiable submission deadlines.'
    },
    bhima: {
      name: 'Bhima Archetype: The Direct Decisive Executor',
      emblem: '⚡',
      tagline: '"Zero tolerance for procrastination; you push the chariot forward."',
      strengths: 'High energy, rapid execution, fearless honesty, and bias for immediate action.',
      blindspot: 'Blunt words can inadvertently wound sensitive teammates, causing silent resentment or retaliation.',
      advice: 'Practice Sāma before action. Pausing for 5 minutes before replying to an annoying group chat message will multiply your leadership impact.'
    },
    arjuna: {
      name: 'Arjuna Archetype: The Analytical Perfectionist',
      emblem: '🎯',
      tagline: '"Supreme dedication to mastery, craft, and flawless execution."',
      strengths: 'World-class technical standards, deep research capability, and pride in deliverable quality.',
      blindspot: 'Can burn out by taking on everyone\'s work silently or setting unrealistic standards for peers.',
      advice: 'Remember the concept of "Done is better than perfect." Help teammates grow by delegating rather than quietly rewriting their sections.'
    }
  };

  const arch = ARCHETYPES[maxArchetype];

  container.innerHTML = `
    <div class="archetype-result-box">
      <div class="archetype-emblem">${arch.emblem}</div>
      <h3 class="archetype-name">${arch.name}</h3>
      <p class="archetype-tagline">${arch.tagline}</p>

      <div class="archetype-breakdown">
        <p style="margin-bottom:0.75rem;"><strong>🌟 Superpowers:</strong> ${arch.strengths}</p>
        <p style="margin-bottom:0.75rem;"><strong>⚠️ Blindspots:</strong> ${arch.blindspot}</p>
        <p><strong>💡 Campus Advice:</strong> ${arch.advice}</p>
      </div>

      <button class="btn btn-gold" onclick="initArchetypeQuiz()">
        <span>🔄 Retake Archetype Diagnostic</span>
      </button>
    </div>
  `;
}

window.initArchetypeQuiz = initArchetypeQuiz;

// ============================================================================
// 6. PROCEDURAL AMBIENT SOUND GENERATOR (WEB AUDIO API SYNTH)
// ============================================================================
let audioCtx = null;
let isAudioPlaying = false;
let ambientOscillators = [];
let ambientGain = null;

function initAmbientAudio() {
  const btn = document.getElementById('ambient-btn');
  const label = btn.querySelector('.ambient-label');

  btn.addEventListener('click', () => {
    if (!isAudioPlaying) {
      startAmbientSynth();
      btn.classList.add('active');
      label.textContent = 'Ambient Sound: On';
      isAudioPlaying = true;
    } else {
      stopAmbientSynth();
      btn.classList.remove('active');
      label.textContent = 'Ambient Sound: Off';
      isAudioPlaying = false;
    }
  });
}

function startAmbientSynth() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Master gain
    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);

    // Warm Low-pass Filter for meditative drone
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(432, audioCtx.currentTime);

    // Frequencies: Meditative Tanpura Chord based on Sacred D (146.83 Hz) + Octaves + Fifths (A)
    const baseFreqs = [146.83, 220.00, 293.66, 440.00];

    ambientOscillators = baseFreqs.map((freq, i) => {
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Subtle slow detune modulation (chorus/beating effect)
      const lfo = audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.1 + (i * 0.05), audioCtx.currentTime);
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(1.5, audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start();

      oscGain.gain.setValueAtTime(0.25 / (i + 1), audioCtx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();

      return { osc, lfo };
    });

    filter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);
  } catch (e) {
    console.warn('Web Audio not supported or blocked:', e);
  }
}

function stopAmbientSynth() {
  if (ambientGain && audioCtx) {
    ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
    setTimeout(() => {
      ambientOscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          osc.disconnect();
          lfo.stop();
          lfo.disconnect();
        } catch (_) {}
      });
      ambientOscillators = [];
    }, 1600);
  }
}

// ============================================================================
// 7. DEPLOYMENT MODAL & MOBILE NAVIGATION
// ============================================================================
function initDeployModal() {
  const modal = document.getElementById('deploy-modal');
  const openBtn = document.getElementById('open-deploy-btn');
  const mobileOpenBtn = document.getElementById('mobile-deploy-btn');
  const closeBtn = document.getElementById('deploy-modal-close');
  const closeBtnBottom = document.getElementById('deploy-close-bottom');

  const openModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  };

  openBtn.addEventListener('click', openModal);
  if (mobileOpenBtn) mobileOpenBtn.addEventListener('click', () => {
    document.getElementById('mobile-drawer').classList.remove('open');
    openModal();
  });

  closeBtn.addEventListener('click', closeModal);
  closeBtnBottom.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const links = drawer.querySelectorAll('.mobile-link');

  toggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

// ============================================================================
// 8. CLIPBOARD & UTILITY FUNCTIONS
// ============================================================================
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    }).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

window.copyText = function(text) {
  copyToClipboard(text);
};

function fallbackCopyText(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Copied to clipboard!');
  } catch (err) {
    showToast('Press Ctrl+C to copy');
  }
  document.body.removeChild(ta);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
