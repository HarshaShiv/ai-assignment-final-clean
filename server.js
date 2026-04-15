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

/* AI background image */
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
padding:12px 25px;
font-size:16px;
background:#00c3ff;
color:white;
border:none;
border-radius:8px;
cursor:pointer;
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

<div id="answer"></div>

</div>

<script>

async function ask(){

const question=document.getElementById("question").value;

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

app.post("/ask",(req,res)=>{

const answer =
"AI is used in healthcare for medical image analysis, early disease detection, drug discovery, robotic surgery, and personalized treatment plans.";

res.json({answer});

});

const port = process.env.PORT || 3000
app.listen(port, () => {
 console.log("Server running")
})