let usermessage = "";
let api_key = "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";
let togglebtn = document.getElementById("toogle-theme");

let api_url = "https://api.groq.com/openai/v1/chat/completions";
const chathis = [];
let container = document.querySelector(".container");
const scrollfunc = () => container.scrollTo({
    top: container.scrollHeight,
    behavior: "smooth"
});
const typeResponse = async (text, element) => {
    let currentText = "";

    for (let i = 0; i < text.length; i++) {
        currentText += text[i];
        element.innerHTML = marked.parse(currentText);

        scrollfunc();

        await new Promise(resolve => setTimeout(resolve, 5));
    }
};
const generateresponse = async (usermessage, newdivbot) => {
    console.log(usermessage);
    let p = newdivbot.querySelector(".bottext");

    let myobj = {
        role: "user",
        content: usermessage
    };
    chathis.push(myobj);
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-20b",
                messages: chathis
            })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message);
        const responsedata = data.choices[0].message.content.trim();
        p.textContent = "";
        await typeResponse(responsedata, p);
        newdivbot.appendChild(p);
        console.log("GROQ RESPONSE:", responsedata);
    } catch (error) {
        console.log(error);

    }
    scrollfunc();
}
let boxbtns = document.querySelectorAll(".suggestions-boxbtn");

for (let i = 0; i < boxbtns.length; i++) {
    boxbtns[i].addEventListener("click", function () {
        let p = boxbtns[i].querySelector("p");
        p.classList.add("usertext");
        let usermessage = p.textContent;
        let oldiv = document.querySelector(".suggestions-box");
        oldiv.remove();
        let newdiv = document.createElement("div");
        let p1 = document.createElement("p");
        p1.textContent = usermessage;
        p1.className = "usertext";
        newdiv.appendChild(p);
        newdiv.className = "message-user"
        let chatlist = document.getElementsByClassName('chatlogs')[0];
        chatlist.appendChild(newdiv);
        let firstheader = document.querySelector(".first-header");
        let suggestboxes = document.querySelectorAll(".suggesstions");
        firstheader.classList.add("none");
        for (let i = 0; i < suggestboxes.length; i++) {
            suggestboxes[i].classList.add("none");
        }
        setTimeout(() => {
            let newdivbot = document.createElement("div");
            let p = document.createElement("p");
            let img = document.createElement("img");
            img.className = "avatar";
            img.src = "gemini-chatbot-logo.svg";
            p.textContent = "just sec...";
            p.className = "bottext";
            newdivbot.appendChild(img);
            newdivbot.appendChild(p);
            newdivbot.className = "message-bot";
            newdivbot.classList.add('loading');
            let chatlist = document.getElementsByClassName('chatlogs')[0];
            chatlist.appendChild(newdivbot);
            generateresponse(usermessage, newdivbot);
        }, 600);


    })
}

let btn = document.getElementById("send-arrow");
btn.addEventListener("click", function () {
    let usermessage = "";
    let input = document.querySelector("input");
    usermessage = input.value;
    input.value = "";
    let oldiv = document.querySelector(".suggestions-box");
    oldiv.remove();
    let newdiv = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = usermessage;
    p.className = "usertext";
    newdiv.appendChild(p);
    newdiv.className = "message-user"
    let chatlist = document.getElementsByClassName('chatlogs')[0];
    chatlist.appendChild(newdiv);
    let firstheader = document.querySelector(".first-header");
    let suggestboxes = document.querySelectorAll(".suggesstions");
    firstheader.classList.add("none");
    for (let i = 0; i < suggestboxes.length; i++) {
        suggestboxes[i].classList.add("none");
    }
    setTimeout(() => {
        let newdivbot = document.createElement("div");
        let p = document.createElement("p");
        let img = document.createElement("img");
        img.className = "avatar";
        img.src = "gemini-chatbot-logo.svg";
        p.textContent = "just sec...";
        p.className = "bottext";
        newdivbot.appendChild(img);
        newdivbot.appendChild(p);
        newdivbot.className = "message-bot";
        newdivbot.classList.add('loading');
        let chatlist = document.getElementsByClassName('chatlogs')[0];
        chatlist.appendChild(newdivbot);
        generateresponse(usermessage, newdivbot);
    }, 600);
})

togglebtn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
})




