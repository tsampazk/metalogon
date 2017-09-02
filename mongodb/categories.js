db.categories.remove({});

// Moves
db.categories.insert({ name: "Introduction", canon: "Moves", description: "" });
db.categories.insert({ name: "Methodology", canon: "Moves", description: "" });
db.categories.insert({ name: "Results and Discussion", canon: "Moves", description: "" });
db.categories.insert({ name: "Conclusion", canon: "Moves", description: "" });
db.categories.insert({ name: "Question and Answer", canon: "Moves", description: "" });

// Structure
db.categories.insert({ name: "Overview", canon: "Structure", description: "Provides overview of the talk, emphasizing the connection between key terms and concepts" });
db.categories.insert({ name: "Transitions", canon: "Structure", description: "Uses conceptual transitions to connect key sections of the presentation" });
db.categories.insert({ name: "Argumentation", canon: "Structure", description: "Provides a clear line of argument which is brought to a clear position at the end" });
db.categories.insert({ name: "Coherence", canon: "Structure", description: "Connects the central rhetorical moves for each section explicitly to each other" });

// Visuals
db.categories.insert({ name: "Limited text", canon: "Visuals", description: "Uses primarily pictorial cues (limited text) " });
db.categories.insert({ name: "Assertive slide titles", canon: "Visuals", description: "Uses assertion-based slide titles to convey key concepts (including title slide)" });
db.categories.insert({ name: "Visual cues", canon: "Visuals", description: "Images and text highlight/focus audience on key points" });
db.categories.insert({ name: "Supportive graphics", canon: "Visuals", description: "Graphics show relevant data/concepts to support the claims" });
db.categories.insert({ name: "Memorable images", canon: "Visuals", description: "Memorable images provide necessary context to support the oral discussion" });
db.categories.insert({ name: "Effective graphs", canon: "Visuals", description: "Graphs are high resolution and legends/annotations are easily legible" });

// Style
db.categories.insert({ name: "Coherence", canon: "Style", description: "Uses transitions at the sentence level to connect key concepts and parts of the argument" });
db.categories.insert({ name: "Concision", canon: "Style", description: "Uses the fewest possible words to explain the concepts for the audience, avoiding unnecessary repetition" });
db.categories.insert({ name: "Flow", canon: "Style", description: "Uses structures such as given/new or three-part structures to help the audience follow the argument" });
db.categories.insert({ name: "Emphasis", canon: "Style", description: "Uses specific words or phrases to draw attention to important concepts" });
db.categories.insert({ name: "Figures of Speech/Tropes", canon: "Style", description: "Uses analogies, metaphors or other rhetorical devices to enhance the concepts and make the speech memorable" });
db.categories.insert({ name: "Figures of Sound", canon: "Style", description: "Uses auditory cues at the sentence (e.g. patterned parallelism) or word level (e.g. alliteration) to make the oral delivery more memorable" });

// Delivery
db.categories.insert({ name: "Volume, rate and pitch", canon: "Delivery", description: "Volume, rate, and pitch are appropriate and modulated" });
db.categories.insert({ name: "Gestures, eye contact and body movement", canon: "Delivery", description: "Gestures, eye contact, and body movement used intentionally to engage audience" });
db.categories.insert({ name: "Metadiscourse", canon: "Delivery", description: "Metadiscourse orients listener and helps transition between sections" });
db.categories.insert({ name: "Posture and stance", canon: "Delivery", description: "Posture and stance project confidence, and allow speaker to interact with audience and screen" });
db.categories.insert({ name: "Language", canon: "Delivery", description: "Technical and informal language are both employed as appropriate" });

db.categories.find({});