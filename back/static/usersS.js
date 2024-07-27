window.addEventListener("load", () => {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    function updateTaskList(tasks){
        var tabela = document.getElementById("taskovi");
        tabela.innerHTML = "";

        for(i in tasks){
            let redHTML = `<tr data-taskID="`+tasks[i].id+`">
                <td>`+tasks[i].id +`</td>              
                <td>`+tasks[i].name +`</td>
                <td>`+tasks[i].password+`</td>
                <td>`+tasks[i].email+`</td>
                <td>`+tasks[i].role+`</td>` + `<td>
                <button type="button" class="btn btn-success btn-sm btn_zavrsi" data-bs-toggle="modal" data-bs-target="#exampleModal"">Edit</button>
                <button class="btn btn-danger  btn-sm btn_obrisi">Obriši</button>
                </td>
                </tr>`;
            
                tabela.innerHTML += redHTML;
        }
        var btns_obrisi = document.querySelectorAll("#taskovi .btn_obrisi");
        for(i=0; i<btns_obrisi.length; i++){
            btns_obrisi[i].addEventListener("click", function(){
                fetch("http://localhost:4000/users/obrisi/"+this.parentNode.parentNode.dataset.taskid,
                    { method:"DELETE",
                    headers:{'Authorization': `Bearer ${token}`}
                })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://localhost:4000/users/api', { method:"GET",
                        headers:{'Authorization': `Bearer ${token}`} })
                            .then(response => response.json())
                            .then(data => updateTaskList(data) );
                    });
            });        
        }

        var btns_edits = document.querySelectorAll("#taskovi .btn_zavrsi");
        for(i=0; i < btns_edits.length; i++){
            btns_edits[i].addEventListener("click", function(){
                id = this.parentNode.parentNode.dataset.taskid;
                document.getElementById("save").addEventListener("click", function(){
                    console.log(document.getElementById("save"));
                    let novi = {
                        name: document.getElementById("name").value,
                        email: document.getElementById("email").value,
                        role : document.getElementById("role").value
                    };
                    nt = JSON.stringify(novi);
                    fetch('http://localhost:4000/users/edit/'+ id,{
                        method:"PUT",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: nt
                    })
                    .then(function(response) {
                        return response.json();
                    })
                    .then( data => {
                    fetch('http://localhost:4000/users/api', 
                    {
                        method:"GET",
                        headers:{'Authorization': `Bearer ${token}`}
                    })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
                    })
                })
                        document.getElementById("name").value = '';
                        document.getElementById("email").value = '';
                        document.getElementById("role").value = '';
            });
        }
    }

    fetch('http://localhost:4000/users/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("btn_dodaj").addEventListener("click", function(){
        var e = document.getElementById("novi_user_role");
        var text = e.options[e.selectedIndex].text; 
        let noviRestoran = {
            name: document.getElementById("novi_user_name").value,
            password: document.getElementById("novi_user_password").value,
            email: document.getElementById("novi_user_email").value,
            role: text
        };
        nt = JSON.stringify(noviRestoran);
        console.log(nt)
        fetch("http://localhost:4000/users/dodaj",
                {
                    method:"POST",
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: nt
                })
                .then( response=>response.json())
                .then( data => {
                        fetch('http://localhost:4000/users/api', { method:"GET" ,
                        headers:{'Authorization': `Bearer ${token}`}})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
                document.getElementById("novi_user_name").value = '';
                document.getElementById("novi_user_password").value = '';
                document.getElementById("novi_user_email").value = '';
    });
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });

});