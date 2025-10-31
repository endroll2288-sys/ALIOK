 //  通知メッセージ表示
    function showNotice(text, type = "success") {
      const notice = document.createElement("div");
      notice.textContent = text;
      notice.style.position = "fixed";
      notice.style.top = "20px";
      notice.style.left = "50%";
      notice.style.transform = "translateX(-50%)";
      notice.style.padding = "12px 20px";
      notice.style.borderRadius = "8px";
      notice.style.color = "#fff";
      notice.style.fontSize = "16px";
      notice.style.zIndex = "9999";
      notice.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      notice.style.transition = "opacity 0.5s";

      if (type === "success") {
        notice.style.backgroundColor = "#4CAF50"; // 緑
      } else if (type === "error") {
        notice.style.backgroundColor = "#f44336"; // 赤
      }

      document.body.appendChild(notice);

      // 3秒後にフェードアウトして削除
      setTimeout(() => {
        notice.style.opacity = "0";
        setTimeout(() => notice.remove(), 500);
      }, 3000);
    }


    
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

    
    // ちゃんねるIDをlocalStorageに保存
    const webhookInput = document.getElementById("webhook");
    const savedWebhook = localStorage.getItem("discordWebhook");
    if (savedWebhook) {
      webhookInput.value = savedWebhook;
    }

    document.getElementById("saveWebhook").addEventListener("click", () => {
      const url = webhookInput.value.trim();
      if (!url.startsWith("1")) {
        showNotice("正しいIdを入力してください。", "error");
        return;
      }
      localStorage.setItem("discordWebhook", url);
      showNotice("Webhookを保存しました！", "success");
    });



    
    

// メッセージ内容をlocalStorageに保存・復元
    const messageInput = document.getElementById("message");
    const savedMessage = localStorage.getItem("discordMessage");
    if (savedMessage) messageInput.value = savedMessage;

    // 入力があるたびに保存
    messageInput.addEventListener("input", () => {
      localStorage.setItem("discordMessage", messageInput.value);
    });

    
    
    // メッセージ送信
    document.getElementById("sendBtn").addEventListener("click", async () => {
      const webhookURL = localStorage.getItem("discordWebhook");
      const RequestURL = `https://discord.com/api/v10/channels/${webhookURL}/messages`
      if (!RequestURL) {
        showNotice("Idが設定されていません。", "error");
        return;
      }


      const randomize = document.getElementById('randomize').value;
      
      const loop = document.getElementById("loop").value;

      const token= document.getElementById("token").value;
      if (!token) {
        showNotice("Tokenが入力されていません。", "error");
        return;
      }
      const useToken = `${token}`

      const content = document.getElementById("message").value;
      if (!content) {
        showNotice("メッセージを入力してください。", "error");
        return;
      }

     

      const time = document.getElementById("time").value
      
      const Interval=time//*1000

      
      try {

          
       for(let req=0;req <loop; req++){

         if (randomize === "on") {
                // ランダムな文字列を生成
                const randomString = generateRandomString(15); // 任意の長さのランダム文字列
                finalContent = content +`｜`+randomString+`｜`;
            } else {
                finalContent = content; // そのままの文字列
            }
        
        console.log(`${useToken} and ${RequestURL} and ${finalContent}`)
         
        await wait(Interval);
        
         const response = await fetch(RequestURL, {
          method: "POST",
          headers: { "Authorization": useToken , "Content-Type": "application/json" },
          body: JSON.stringify({ "content":finalContent }),
        });
        console.log(response);
       
      
        
        if (response.ok) {
          showNotice("メッセージを送信しました！", "success");
       //document.getElementById("message").value = "";
      
        } else {
          showNotice("送信に失敗しました。ちゃんねるIDを確認してください。", "error");
        }
         }
      } catch (error) {
        showNotice("通信エラーが発生しました。", "error");
        console.error(error);
        return;
      }
    });
