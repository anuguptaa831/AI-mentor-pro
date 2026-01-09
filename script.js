const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 1. Typing Effect Function 
function typeWriter(text, element, speed = 20) {
    let i = 0;
    element.innerHTML = ""; 
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
            chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll 
        }
    }
    type();
}

// 2. Message UI Function 
function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    
    msgDiv.className = `flex ${role === 'user' ? 'justify-end' : 'gap-4'} max-w-full`;

    const content = role === 'user' 
        ? `<div class="bg-blue-600 p-4 rounded-2xl rounded-tr-none text-sm max-w-[80%] shadow-lg">${text}</div>`
        : `<div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
             <i data-lucide="sparkles" class="w-5 h-5 text-white"></i>
           </div>
           <div class="bg-slate-800/40 border border-slate-700 p-4 rounded-2xl rounded-tl-none glass text-sm max-w-[80%] id="latest-ai-rev">
             ${text}
           </div>`;

    msgDiv.innerHTML = content;
    chatBox.appendChild(msgDiv);
    lucide.createIcons(); 
    // New icons 
    chatBox.scrollTop = chatBox.scrollHeight;

    return role === 'ai' ? msgDiv.querySelector('.glass') : null;
}

// 3. Send Message Logic
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // User message 
    appendMessage('user', message);
    userInput.value = '';

    // AI placeholder (Typing...) 
    const aiResponseElement = appendMessage('ai', "Thinking...");

    try {
        // Backend connection
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        if (data.reply) {
            // Typing effect 
            typeWriter(data.reply, aiResponseElement);
        } else {
            aiResponseElement.innerText = "Sorry,something went Wrong.";
        }

    } catch (error) {
        aiResponseElement.innerText = "Server didnt connect.";
        console.error("Error:", error);
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});