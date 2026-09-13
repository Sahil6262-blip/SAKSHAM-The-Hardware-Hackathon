export const ruleBook = [
  {
    number: '01',
    title: 'Mission Eligibility & Crew Formation',
    rules: [
      {
        label: 'Crew Size',
        text: 'Each "Flight Crew" (team) must consist of a minimum of 3 and a maximum of 4 "Payload Engineers" (participants).',
      },
      {
        label: 'Designation',
        text: 'One member must be designated as the "Crew Commander" (Team Lead) who will serve as the primary point of contact for Ground Control (the organizing committee).',
      },
      {
        label: 'Interdisciplinary Teams',
        text: 'Teams may consist of students from different academic years and branches, provided they are currently enrolled in a recognized educational institution.',
      },
    ],
  },
  {
    number: '02',
    title: 'Enlistment & Clearance (Registration)',
    rules: [
      {
        label: 'Base Registration',
        text: 'All crews must pay the initial ₹200 Mission Enlistment fee via the designated UPI portal to secure a slot for Phase 1.',
      },
      {
        label: 'Domain Selection',
        text: 'During registration, the crew must lock in one of the five "Mission Directives" (Smart Cities, Robotics, Sustainable Tech, Healthcare, or Agriculture).',
      },
      {
        label: 'Phase 2 Clearance',
        text: 'The top 20 crews shortlisted for the offline build must pay the remaining ₹500 clearance fee prior to October 1, 2026. Failure to remit this fee will result in the slot being passed to a waitlisted crew.',
      },
    ],
  },
  {
    number: '03',
    title: 'Phase 1: Pre-Launch Briefing (Online Idea Pitching)',
    rules: [
      {
        label: 'Format',
        text: 'Crews will present their mission schematics (slide deck) to the Mission Review Board via a digital telemetry link (online meeting).',
      },
      {
        label: 'Time Limit',
        text: 'Each crew is strictly allocated 5 minutes for their pitch, followed by a 3-minute Q&A session with the Mission Review Board.',
      },
      {
        label: 'Originality',
        text: 'The proposed hardware solution must be the original conceptual work of the Flight Crew.',
      },
      {
        label: 'Evaluation',
        text: 'Blueprints will be strictly assessed on innovation, technical feasibility, scalability, and societal impact.',
      },
    ],
  },
  {
    number: '04',
    title: 'Phase 2: The 12-Hour Launch Sequence (Offline Hardware Build)',
    rules: [
      {
        label: 'Venue',
        text: 'The EXTC Labs at VCET ("The Command Center").',
      },
      {
        label: 'Duration',
        text: 'Crews have exactly 12 continuous hours on October 1, 2026, to prototype their solution.',
      },
      {
        label: 'Hardware Provision & Assembly',
        text: 'Ground Control (the college) will provide the core microcontrollers (Arduino UNO, ESP32) for the build. While crews may bring pre-written code and specialized peripheral sensors, all physical integration, wiring, and assembly must occur entirely within the 12-hour window.',
      },
      {
        label: 'Backup Supply',
        text: 'Ground Control will maintain a "Payload Supply" desk with ₹10,000 worth of backup emergency components.',
      },
      {
        label: 'Mentorship Checkpoints',
        text: 'Throughout the 12 hours, "Flight Directors" (technical mentors) will conduct mandatory technical feasibility and system integration reviews.',
      },
    ],
  },
  {
    number: '05',
    title: 'Flight Readiness Review (Judging)',
    rules: [
      {
        label: 'Demonstration',
        text: 'At the end of the 12-hour countdown, crews must stop all assembly and demonstrate their functional hardware prototype live to the Chief Administrators.',
      },
      {
        label: 'Evaluation Metrics',
        text: 'Prototypes are judged on practical application, functionality, physical execution of the design, and overall impact.',
      },
    ],
  },
  {
    number: '06',
    title: 'Mission Abort (Disqualification & Conduct)',
    rules: [
      {
        label: 'Plagiarism',
        text: "Submitting another team's work, past projects, or claiming commercial products as original prototypes will result in an immediate Mission Abort.",
      },
      {
        label: 'Pre-Built Hardware',
        text: 'Submitting a fully pre-assembled project is strictly prohibited. The physical construction must be done on-site.',
      },
      {
        label: 'Code of Conduct',
        text: 'Sabotaging another crew’s Launch Pad, tampering with EXTC lab equipment, or disrespecting the Flight Operations Team will result in immediate disqualification and removal from the venue.',
      },
    ],
  },
]
