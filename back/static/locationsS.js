window.addEventListener("load", () => {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    function updateTaskList(tasks){
        var tabela = document.getElementById("taskovi");
        tabela.innerHTML = "";

        for(i in tasks){
            let redHTML = `<tr data-taskID="`+tasks[i].id+`">
                <td>`+tasks[i].id +`</td>              
                <td>`+tasks[i].street +`</td>
                <td>`+tasks[i].number+`</td>
                <td>`+tasks[i].city+`</td>
                <td>`+tasks[i].zipnumber+`</td>` + `<td>
                <button type="button" class="btn btn-success btn-sm btn_zavrsi" data-bs-toggle="modal" data-bs-target="#exampleModal"">Edit</button>
                <button class="btn btn-danger  btn-sm btn_obrisi">Obriši</button>
                </td>
                </tr>`;
            
                tabela.innerHTML += redHTML;
        }
        var btns_obrisi = document.querySelectorAll("#taskovi .btn_obrisi");
        for(i=0; i<btns_obrisi.length; i++){
            btns_obrisi[i].addEventListener("click", function(){
                fetch("http://localhost:4000/locations/obrisi/"+this.parentNode.parentNode.dataset.taskid,
                    { method:"DELETE" ,headers:{'Authorization': `Bearer ${token}`}})
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://localhost:4000/locations/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
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
                        street: document.getElementById("street").value,
                        number: document.getElementById("number").value,
                        city : document.getElementById("city").value,
                        zipnumber: document.getElementById("zipnumber").value
                    };
                    nt = JSON.stringify(novi);
                    fetch('http://localhost:4000/locations/edit/'+ id,{
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
                    fetch('http://localhost:4000/locations/api', 
                    {
                        method:"GET",
                        headers:{'Authorization': `Bearer ${token}`}
                    })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
                    })
                })
                        document.getElementById("number").value = '';
                        document.getElementById("zipnumber").value = '';
                        document.getElementById("city").value = '';
                        document.getElementById("street").value = '';
            });
        }
    }

    fetch('http://localhost:4000/locations/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateTaskList(data);
    });

    document.getElementById("btn_dodaj").addEventListener("click", function(){
        let noviRestoran = {
            street: document.getElementById("nova_lokacija_ulica").value,
            number: document.getElementById("nova_lokacija_broj").value,
            city: document.getElementById("nova_lokacija_grad").value,
            zipnumber: document.getElementById("nova_lokacija_zipnumber").value
        };
        nt = JSON.stringify(noviRestoran);
        fetch("http://localhost:4000/locations/dodaj",
                {
                    method:"POST",
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: nt
                })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:4000/locations/api', { method:"GET" ,headers:{'Authorization': `Bearer ${token}`}})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
                document.getElementById("nova_lokacija_ulica").value = '';
                document.getElementById("nova_lokacija_broj").value = '';
                document.getElementById("nova_lokacija_grad").value = '';
                document.getElementById("nova_lokacija_zipnumber").value = '';
    });
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
});