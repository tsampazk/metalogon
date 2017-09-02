db.genres.remove({});

db.genres.insert({ name: "Technical (Lab) presentation" });
db.genres.insert({ name: "Technical project progress report" });
db.genres.insert({ name: "Technical project final report" });
db.genres.insert({ name: "Thesis proposal presentation" });
db.genres.insert({ name: "Internship report presentation" });
db.genres.insert({ name: "Journal article analysis" });
db.genres.insert({ name: "Valuation report presentation" });

db.genres.find({});