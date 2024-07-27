window.addEventListener("load", () => {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    function updateTaskList(tasks){
        var tabela = document.getElementById("taskovi");
        tabela.innerHTML = "";

        for(i in tasks){
            let redHTML = `<tr data-taskID="`+tasks[i].id+`">
                <td>`+tasks[i].id +`</td>              
                <td>`+tasks[i].listVisitedID +`</td>
                <td>`+tasks[i].restaurantID+`</td>
                <td>`+tasks[i].datum+`</td>` + `<td>
                <button type="button" class="btn btn-success btn-sm btn_zavrsi" data-bs-toggle="modal" data-bs-target="#exampleModal"">Edit</button>
                <button class="btn btn-danger  btn-sm btn_obrisi">Obriši</button>
                </td>
                </tr>`;
            
                tabela.innerHTML += redHTML;
        }
        var btns_obrisi = document.querySelectorAll("#taskovi .btn_obrisi");
        for(i=0; i<btns_obrisi.length; i++){
            btns_obrisi[i].addEventListener("click", function(){
                fetch("http://localhost:4000/listvisitedandrestaurant1/obrisi/"+this.parentNode.parentNode.dataset.taskid,
                    { method:"DELETE",headers:{'Authorization': `Bearer ${token}`} })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://localhost:4000/listvisitedandrestaurant1/api', { method:"GET" ,headers:{'Authorization': `Bearer ${token}`}})
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
                        restaurantID: document.getElementById("restaurantID").value,
                        date: document.getElementById("date").value
                    };
                    nt = JSON.stringify(novi);
                    fetch('http://localhost:4000/listvisitedandrestaurant1/edit/'+ id,{
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
                    fetch('http://localhost:4000/listvisitedandrestaurant1/api', 
                    {
                        method:"GET",
                        headers:{'Authorization': `Bearer ${token}`}
                    })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
                    })
                })
                        document.getElementById("restaurantID").value = '';
                        document.getElementById("date").value = '';
            });
        }
    }
    fetch('http://localhost:4000/listvisitedandrestaurant1/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateTaskList(data);
    });

    document.getElementById("btn_dodaj").addEventListener("click", function(){
        let noviRestoran = {
            listVisitedID: document.getElementById("novi_lista_lista").value,
            restaurantID: document.getElementById("novi_lista_rid").value,
            datum: document.getElementById("novi_datum").value
        };
        nt = JSON.stringify(noviRestoran);
        fetch("http://localhost:4000/listvisitedandrestaurant1/dodaj",
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
                    fetch('http://localhost:4000/listvisitedandrestaurant1/api', { method:"GET" ,headers:{'Authorization': `Bearer ${token}`}})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
                document.getElementById("novi_lista_lista").value = '';
                document.getElementById("novi_lista_rid").value = '';
                document.getElementById("novi_datum").value = '';
    });

    
    fetch('http://localhost:4000/restaurants/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
    .then(response => response.json())
    .then(data => {
    var combobox =document.getElementById("novi_lista_rid");
    while(combobox.firstChild){
    combobox.removeChild(combobox.firstChild);
    }
    for(i in data){
        let opt = document.createElement("option");
        opt.value = data[i].id;
        opt.innerHTML = data[i].name;
        combobox.appendChild(opt);
    }  
    });
    fetch('http://localhost:4000/listvisited/api', { method:"GET" ,headers:{'Authorization': `Bearer ${token}`}})
    .then(response => response.json())
    .then(data => {
    var combobox =document.getElementById("novi_lista_lista");
    while(combobox.firstChild){
    combobox.removeChild(combobox.firstChild);
    }
    for(i in data){
        let opt = document.createElement("option");
        opt.value = data[i].id;
        opt.innerHTML = data[i].id;
        combobox.appendChild(opt);
    }  
    });
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
});