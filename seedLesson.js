const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');

mongoose.connect("your_mongodb_atlas_url_here", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"));

const lesson1 = new Lesson({
  lesson_id: 1,
  title: "Greetings and Introductions",
  content: `
    <p>Learn how to greet people in English:</p>
    <ul>
      <li>Hello!</li>
      <li>Hi!</li>
      <li>Good morning / Good afternoon / Good evening</li>
      <li>How are you?</li>
      <li>I am fine, thank you!</li>
    </ul>
    <p>When introducing yourself, you can say:</p>
    <ul>
      <li>My name is Ali.</li>
      <li>I am a student.</li>
    </ul>
  `,
  quiz: [
    {
      question: "How do you greet someone in the morning?",
      options: ["Good night", "Good morning", "Bye"],
      correct: "Good morning"
    },
    {
      question: "What do you say after someone says 'How are you?'",
      options: ["I am fine, thank you!", "No, thank you.", "What's your name?"],
      correct: "I am fine, thank you!"
    }
  ]
});

lesson1.save().then(() => {
  console.log("Lesson added.");
  mongoose.disconnect();
});
