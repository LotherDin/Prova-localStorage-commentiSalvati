

function getResponse(response) {
  return response.json();
}

function getResult(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}


window.onload = function () {
  const posts = !!localStorage.getItem("posts")
    ? JSON.parse(localStorage.getItem("posts"))
    : null;
  if (!!posts) {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const newNode = document.createElement("div");
      newNode.setAttribute("id", `post-item-${post.id}`);
      newNode.innerHTML = `
            <h2>${post.title}</h2>
                <p>${post.body}</p>
                <input type="text" id="comment-input-${post.id}" placeholder="Inserisci commento">
                <button id="button-comment-${post.id}">Commenta</button>
                <ul id="comment-list-${post.id}">
                </ul>
                <button id='button-delete-${post.id}'>Elimina</button>`;
      document.getElementById("post-list").appendChild(newNode);
      let commentIndex = 0; //punto d'inizio da dove fare partire il ciclo for dei commenti
      let comments = [];
      if (localStorage.getItem(post.id)) {
        const stored = localStorage.getItem(post.id);
        console.log(JSON.parse(stored));
        comments = JSON.parse(stored);

        for (let i = commentIndex; i < comments.length; i++) {
          let comment = comments[i];

          let commentList = document.getElementById(`comment-list-${post.id}`);


          let newComment = document.createElement("li");
          newComment.setAttribute("id", `newLi-${commentIndex}`);
          let deleteButton = document.createElement("button");
          deleteButton.setAttribute("id", `button-delete-comment-${commentIndex}`);
          deleteButton.setAttribute("data-comment-index", commentIndex);
          deleteButton.textContent = "Delete";
          newComment.innerHTML = `${comment}`;
          newComment.appendChild(deleteButton);
          commentList.appendChild(newComment);
          deleteButton.addEventListener("click", (event) => {
            let indexToRemove = event.target.dataset.commentIndex;
            let commentElement = document.getElementById(`newLi-${indexToRemove}`);
            comments = comments.filter(obj => obj !== comment);
            localStorage.setItem(post.id, JSON.stringify(comments));

            if (commentElement) {
              commentElement.remove();
            }
          });



        }


      }
      document.getElementById(`button-comment-${post.id}`).addEventListener("click", () => {

        let inputComment = document.getElementById(`comment-input-${post.id}`);
        commentIndex = comments.length;
        comments.push(inputComment.value);
        localStorage.setItem(post.id, JSON.stringify(comments));


        for (let i = commentIndex; i < comments.length; i++) {
          let comment = comments[i];
          let commentList = document.getElementById(`comment-list-${post.id}`);


          let newComment = document.createElement("li");
          newComment.setAttribute("id", `newLi-${commentIndex}`);
          let deleteButton = document.createElement("button");
          deleteButton.setAttribute("id", `button-delete-comment-${commentIndex}`);
          deleteButton.setAttribute("data-comment-index", commentIndex);
          deleteButton.textContent = "Delete";
          newComment.innerHTML = `${comment}`;
          newComment.appendChild(deleteButton);
          commentList.appendChild(newComment);
          deleteButton.addEventListener("click", (event) => {
            let indexToRemove = event.target.dataset.commentIndex;
            let commentElement = document.getElementById(`newLi-${indexToRemove}`);
            comments = comments.filter(obj => obj !== comment);
            localStorage.setItem(post.id, JSON.stringify(comments));
            if (commentElement) {
              commentElement.remove();
            }
          });



        }

      });

      document.getElementById(`button-delete-${post.id}`)
        .addEventListener("click", () => {
          const filteredPosts = posts.filter((p) => p.id !== post.id);
          localStorage.setItem("posts", JSON.stringify(filteredPosts));
          document.getElementById(`post-item-${post.id}`).remove();
        });
    }
  } else {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(getResponse)
      .then(getResult);
  }

};
