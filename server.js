const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

res.send(`
<!DOCTYPE html>
<html>

<head>
<title>AI Healthcare Assistant</title>

<style>

body{
font-family: Arial, sans-serif;
text-align:center;
padding:50px;
color:white;

background-image:url("https://images.unsplash.com/photo-1585435557343-3b092031a831");
background-size:cover;
background-position:center;
}

.container{
background: rgba(0,0,0,0.6);
padding:40px;
border-radius:15px;
display:inline-block;
}

h1{
font-size:40px;
}

input{
width:350px;
padding:12px;
font-size:16px;
border-radius:8px;
border:none;
}

button{
padding:10px 15px;
font-size:14px;
background:#00c3ff;
color:white;
border:none;
border-radius:8px;
cursor:pointer;
margin:5px;
}

button:hover{
background:#0099cc;
}

#answer{
margin-top:20px;
font-size:18px;
}

</style>

</head>

<body>

<div class="container">

<h1>🤖 AI Healthcare Assistant</h1>

<p>Ask how Artificial Intelligence is used in healthcare</p>

<input id="question" placeholder="Ask your question..." />

<br><br>

<button onclick="ask()">Ask AI</button>

<br><br>

<div id="suggestions">

<p><b>Try these questions:</b></p>

<button onclick="setQuestion('What is AI in healthcare?')">1</button>
<button onclick="setQuestion('How is AI used in disease diagnosis?')">2</button>
<button onclick="setQuestion('What are the benefits of AI in hospitals?')">3</button>
<button onclick="setQuestion('How does AI help doctors make decisions?')">4</button>
<button onclick="setQuestion('What is machine learning in healthcare?')">5</button>
<button onclick="setQuestion('How is AI used in medical imaging?')">6</button>
<button onclick="setQuestion('Can AI predict diseases early?')">7</button>
<button onclick="setQuestion('How is AI used in drug discovery?')">8</button>
<button onclick="setQuestion('What are the risks of AI in healthcare?')">9</button>
<button onclick="setQuestion('How will AI change healthcare in the future?')">10</button>

</div>

<div id="answer"></div>

</div>

<script>

function setQuestion(q){
  document.getElementById("question").value = q;
  ask(); // auto ask (nice for demo)
}

async function ask(){

const question=document.getElementById("question").value;

document.getElementById("answer").innerText = "Thinking...";

const res=await fetch("/ask",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({question})
});

const data=await res.json();

document.getElementById("answer").innerText=data.answer;

}

</script>

</body>
</html>
`);
});


// 🔥 UPDATED AI ROUTE
app.post("/ask", async (req, res) => {

try {

const { question } = req.body;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": \`Bearer \${process.env.OPENAI_API_KEY}\`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: "You are an AI healthcare assistant. Give clear, simple answers in 3-4 bullet points."
},
{
role: "user",
content: question
}
]
})
});

const data = await response.json();

res.json({
answer: data.choices[0].message.content
});

} catch (error) {
console.error(error);
res.json({ answer: "Error getting response from AI" });
}

});


const port = process.env.PORT || 3000
app.listen(port, () => {
 console.log("Server running")
})