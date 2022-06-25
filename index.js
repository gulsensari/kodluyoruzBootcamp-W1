
//POST İŞLEMLERİ
document.querySelector("#loadPost").addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json()).then(response => {
            loadingDom.style.display = "block"
            setTimeout(()=>{
                loadingDom.style.display = "none"
           const posts = response.slice(0, 20)
             renderPost(posts)
            },1000)
            
        })
})

const renderPost = (data = []) => {
    data.forEach((item) => {
        const li = document.createElement("li")
        li.innerHTML = `<div class="card">
      <div class="card-body">
        ${item.title}
      </div>
    </div>`
        document.querySelector("#ul-1").appendChild(li)
    })
}

//USER 
const loadUserButton = document.querySelector("#loadUsers")
const loadingDom = document.querySelector('#loading')
let users = []
const loadUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users").then(response => {
        loadingDom.style.display = "block"
        return response.json()
    }).then(response => {
        setTimeout(() => {
            loadingDom.style.display = "none"
            users = response.map((x, index) => {
                x.orderNo = index + 1
                return x

            })
            renderUsers(users)
        }, 1000)

    })

}

loadUserButton.addEventListener("click", loadUsers)

const userDom = document.querySelector("#user")

let user = {}
const renderUsers = (users = []) => {
    userDom.innerHTML = ""
    const table = document.createElement("table")
    table.classList.add("table")

    const thead = document.createElement("thead")
    thead.innerHTML = `
      <tr>
      <th   scope="col">Id</th>
      <th   scope="col">Sıra No</th>
      <th scope="col">Name</th>
        <th  scope="col">Email</th>
        <th  scope="col">Phone</th>
        <th  scope="col">Website</th>
        <th   scope="col">Actions</th>
      </tr>`
    table.appendChild(thead)


    const tbody = document.createElement("tbody")
    tbody.innerHTML = users.map((user, index) => {
        return `<tr>
          <td  scope="row">${index + 1}</td>
          <td  scope="row">${user.id}</td>
          <td >${user.name}</td>
          <td >${user.email}</td>
          <td >${user.phone}</td>
          <td >${user.website}</td>
          <td>
          <button type="button" class="btn btn-danger btn-sm remove" data-id="${user.id}">Sil</button>
          <button type="button" class="btn btn-warning btn-sm update" data-id="${user.id}">Düzenle</button>
          </td>
        </tr>`
    }).join(" ")
    table.appendChild(tbody)

    userDom.appendChild(table)

    //delete işlemi
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", function () {
            const status = confirm("Kaydı silmek üzeresiniz emin misiniz?")
            if (status) {
                const id = this.getAttribute("data-id")
                renderUsers(users.filter(x => x.id != id))
            }
        })
    })
    //update işlemi
    document.querySelectorAll(".update").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id")
            const _user = users.find(user => user.id == id)

            fillUser(_user)
            toggleUser()
            toggleTable("none")
        })
    })

    //sıralama işlemi
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', () => {
        let tdArray = []
        const tdDom = document.querySelectorAll('td')
        tdDom.forEach(td => {
            if (td.cellIndex == th.cellIndex) {  
                if (th.cellIndex == 0 || th.cellIndex == 1) {
                    tdArray.push(Number(td.textContent))
                } else {
                    tdArray.push(td.textContent)
                }
            }

        })
        if (th.cellIndex == 0 || th.cellIndex == 1) {
            
            if (tdArray[0] < tdArray[1]) { tdArray.sort(function (a, b) { return b - a }) }
            else { tdArray.sort(function (a, b) { return a - b }) }

            for (let i = 0; i <= tdArray.length - 1; i++) {
                tdDom.forEach(td => {
                    if (tdArray[i] == td.textContent) {
                        tbody.appendChild(td.parentNode)
                        table.appendChild(tbody)
                    }

                })
            }

        }
        else {
            // string değerlerin sıralanması
            if (tdArray[0] < tdArray[1]) {
                tdArray.sort()
                tdArray.reverse()
            } else {
                tdArray.sort()
            }

            for (let i = 0; i <= tdArray.length - 1; i++) {
                tdDom.forEach(td => {
                    if (tdArray[i] == td.textContent) {
                        tbody.appendChild(td.parentNode)
                        table.appendChild(tbody)
                    }

                })
            }
        }
    }

    ))
}

const toggleTable = (display = "none") => {
    document.querySelector("#user").style.display = display
}

const toggleUser = (display = "block") => {
    document.querySelector("#user-form").style.display = display
}
const fillUser = (user) => {
    document.querySelector("#labelName").value = user.name
    document.querySelector("#labelPhone").value = user.phone
    document.querySelector("#labelWebSite").value = user.website
    document.querySelector("#labelEmail").value = user.email
    document.querySelector("#userId").value = user.id

}

const updateUser = () => {
    const name = document.querySelector("#labelName").value
    const phone = document.querySelector("#labelPhone").value
    const webSite = document.querySelector("#labelWebSite").value
    const email = document.querySelector("#labelEmail").value
    const userId = document.querySelector("#userId").value
    const index = users.findIndex(user => user.id == userId)
    users[index] = { name, phone, website: webSite, email, id: userId }
    renderUsers(users)
    alert("Kayıt Başarılı")
    toggleTable("block");
    toggleUser("none");
}

document.querySelector("#cancel").addEventListener("click", () => {
    toggleTable("block");
    toggleUser("none");
})

document.querySelector("#save").addEventListener("click", updateUser)

