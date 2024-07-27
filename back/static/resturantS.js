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
                <td>`+tasks[i].radnoVreme+`</td>
                <td>`+tasks[i].typeID +`</td>
                <td>`+tasks[i].locationID +`</td>` + `<td>
                <button type="button" class="btn btn-success btn-sm btn_zavrsi" data-bs-toggle="modal" data-bs-target="#exampleModal"">Edit</button>
                <button class="btn btn-danger  btn-sm btn_obrisi">Obriši</button>
                </td>
                </tr>`;
                tabela.innerHTML += redHTML;
        }
        //------->brisanje
        var btns_obrisi = document.querySelectorAll("#taskovi .btn_obrisi");
        for(i=0; i<btns_obrisi.length; i++){
            btns_obrisi[i].addEventListener("click", function(){
                fetch("http://localhost:4000/restaurants/obrisi/"+this.parentNode.parentNode.dataset.taskid,
                    { method:"DELETE",headers:{'Authorization': `Bearer ${token}`} })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://localhost:4000/restaurants/api', { method:"GET" ,headers:{'Authorization': `Bearer ${token}`}})
                            .then(response => response.json())
                            .then(data => updateTaskList(data) );
                    });
            });        
        }
        //------>editovanje
        var btns_edits = document.querySelectorAll("#taskovi .btn_zavrsi");
        for(i=0; i < btns_edits.length; i++){
            btns_edits[i].addEventListener("click", function(){
                id = this.parentNode.parentNode.dataset.taskid;
                document.getElementById("save").addEventListener("click", function(){
                    console.log(document.getElementById("save"));
                    let novi = {
                        name: document.getElementById("name").value,
                        radnoVreme: document.getElementById("radnoVremename").value,
                        locationID: document.getElementById("location").value,
                        typeID : document.getElementById("type").value ,
                    };
                    nt = JSON.stringify(novi);
                    fetch('http://localhost:4000/restaurants/edit/'+ id,{
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
                    fetch('http://localhost:4000/restaurants/api', {method:"GET",headers:{'Authorization': `Bearer ${token}`}})
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
                    })
                })
                        document.getElementById("name").value = '';
                        document.getElementById("radnoVremename").value = '';
                        document.getElementById("location").value='';
                        document.getElementById("type").value='';
            });
        }
    }
    

    fetch('http://localhost:4000/restaurants/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateTaskList(data);
    });
// -----------dodavanje
    document.getElementById("btn_dodaj").addEventListener("click", function(){
        let noviRestoran = {
            name: document.getElementById("novi_restoran_name").value,
            radnoVreme: document.getElementById("novi_restoran_RV").value,
            typeID: document.getElementById("novi_restoran_typeID").value,
            locationID: document.getElementById("novi_restoran_locationID").value
        };
        nt = JSON.stringify(noviRestoran);
        fetch("http://localhost:4000/restaurants/dodaj",
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
                    fetch('http://localhost:4000/restaurants/api', { method:"GET" ,headers:{'Authorization': `Bearer ${token}`}})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
                document.getElementById("novi_restoran_name").value = '';
                document.getElementById("novi_restoran_RV").value = '';
                document.getElementById("novi_restoran_typeID").value = '';
                document.getElementById("novi_restoran_locationID").value = '';
    });

    fetch('http://localhost:4000/typeofrestaurants/api', { method:"GET" ,headers:{'Authorization': `Bearer ${token}`}})
    .then(response => response.json())
    .then(data => {
    var combobox =document.getElementById("novi_restoran_typeID");
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

    fetch('http://localhost:4000/locations/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
    .then(response => response.json())
    .then(data => {
    var combobox =document.getElementById("novi_restoran_locationID");
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