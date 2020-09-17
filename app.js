var myName = prompt("Enter Your Name");
if (myName == '') {
    alert("Please Enter name\nRefresh page");
} else if (myName == false) {
    alert("Please Enter name\nRefresh page");

} else {



    function sendMessage() {
        var message = document.getElementById("message").value;

        // Save in data base

        firebase.database().ref("messages").push().set({
            "sender": myName,
            "message": message
        });
        emptyInput();
        return false;
    }

    let emptyInput = () => {
        var message = document.getElementById("message")
        message.value = '';
    }

    // Listen for incoming message

    firebase.database().ref("messages").on("child_added", (snapshot) => {
        var html = "";
        var count = 0;
        var msg_bubble;
        // given each message a unique id
        if (snapshot.val().sender == myName) {
            count++;
            html = `<button id='del${count}' data-id='${snapshot.key}' class='del rounded' onclick='deleteMessage(this)';>Delete</button>`
        }
        html += `<li id='messages-${snapshot.key}' class='lineMessage'>${snapshot.val().sender}  :  ${snapshot.val().message}</li>`
        document.getElementById("messaages").innerHTML += html;
    });

    function deleteMessage(self) {
        //get message ID
        var textId = self.getAttribute('data-id');

        firebase.database().ref("messages").child(textId).remove()
    }

    // attach listner for delete message

    firebase.database().ref("messages").on("child_removed", (snapshot) => {
        //remove message done

        document.getElementById(`messages-${snapshot.key}`).innerHTML = "This message has been removed"
        let del = document.getElementById(`del${count}`).remove()
    })
}