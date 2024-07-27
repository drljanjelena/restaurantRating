window.addEventListener("load", () => {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    function updateTaskList(tasks){
        var tabela = document.getElementById("taskovi");
        tabela.innerHTML = "";

        for(i in tasks){
            let redHTML = `<tr data-taskID="`+tasks[i].id+`">
                <td>`+tasks[i].id +`</td>              
                <td>`+tasks[i].ocena +`</td>
                <td>`+tasks[i].opis+`</td>` + `<td>
                <button type="button" class="btn btn-success btn-sm btn_zavrsi" data-bs-toggle="modal" data-bs-target="#exampleModal"">Edit</button>
                <button class="btn btn-danger  btn-sm btn_obrisi">Obriši</button>
                </td>
                </tr>`;
            
                tabela.innerHTML += redHTML;
        }
        var btns_obrisi = document.querySelectorAll("#taskovi .btn_obrisi");
        for(i=0; i<btns_obrisi.length; i++){
            btns_obrisi[i].addEventListener("click", function(){
                fetch("http://localhost:4000/ocene/obrisi/"+this.parentNode.parentNode.dataset.taskid,
                    { method:"DELETE",headers:{'Authorization': `Bearer ${token}`} })
                    .then( response=>response.json())
                    .then( data => {
                        fetch('http://localhost:4000/ocene/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
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
                     let novi = {
                        opis: document.getElementById("opis").value
                     };
                     nt = JSON.stringify(novi);
                     fetch('http://localhost:4000/ocene/edit/'+ id,{
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
                     fetch('http://localhost:4000/ocene/api', {method:"GET",headers:{'Authorization': `Bearer ${token}`}})
                     .then(response => response.json())
                     .then(data => updateTaskList(data) );
                     })
                 })
                         document.getElementById("opis").value = '';
             });
         }

    }
    fetch('http://localhost:4000/ocene/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateTaskList(data);
    });

    document.getElementById("btn_dodaj").addEventListener("click", function(){
        let novaOCena = {
            ocena: document.getElementById("nova_ocena_ocena").value,
            opis: document.getElementById("ova_ocena_opis").value
        };
        nt = JSON.stringify(novaOCena);
        fetch("http://localhost:4000/ocene/dodaj",
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
                    fetch('http://localhost:4000/ocene/api', { method:"GET",headers:{'Authorization': `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
                document.getElementById("nova_ocena_ocena").value = '';
                document.getElementById("ova_ocena_opis").value = '';
    });
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
});