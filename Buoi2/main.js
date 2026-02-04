const API_POSTS = "http://localhost:3000/posts";

// Load dữ liệu khi mở trang
window.onload = loadPosts;

// ================= LOAD POSTS =================
function loadPosts() {
    fetch(API_POSTS)
        .then(res => res.json())
        .then(posts => {
            const tbody = document.getElementById("body_table");
            tbody.innerHTML = "";

            posts.forEach(p => {
                tbody.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.title}</td>
                        <td>${p.views}</td>
                    </tr>
                `;
            });
        });
}

// ================= GET NEW ID =================
function getNewId(posts) {
    if (posts.length === 0) return "1";

    let maxId = Math.max(
        ...posts.map(p => Number(p.id))
    );

    return (maxId + 1).toString(); // ID là CHUỖI
}

function Save() {
    const idInput = document.getElementById("id_txt").value.trim();
    const title = document.getElementById("title_txt").value;
    const views = document.getElementById("view_txt").value;

    // CHỈ xử lý tạo mới khi ID trống
    if (idInput !== "") {
        alert("ID để trống khi tạo mới!");
        return;
    }

    fetch(API_POSTS)
        .then(res => res.json())
        .then(posts => {
            const newId = getNewId(posts);

            const newPost = {
                id: newId,        // ID CHUỖI
                title: title,
                views: Number(views)
            };

            return fetch(API_POSTS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            });
        })
        .then(() => {
            alert("Thêm post thành công!");
            loadPosts();
            clearForm();
        });
}


// ================= CLEAR FORM =================
function clearForm() {
    document.getElementById("id_txt").value = "";
    document.getElementById("title_txt").value = "";
    document.getElementById("view_txt").value = "";
}
