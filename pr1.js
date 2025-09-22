

console.log("5678")

$(document).ready(function() {
        $('#example').DataTable({
            "ajax": {
                "url": "data.json",
                "dataSrc": "" 
            },
            "columns": [
                { "data": "sid" }, 
                { "data": "depot" },
                { "data": "uname"},
                { "data": "sDate"},
                { "data": "clName" },
                { "data": "pName" },
                { "data": "q"},
                { "data": "p"},
                {"data": "q",
                "render": function (data, type, row, meta ) {
                return row.q * row.p;}, className:"text-right"
                },
            ]
        });
    });

const fetchData = async()=>{
    try{
        const dCP = new FormData(); dCP.append('src', 'client');     
        const res2=await fetch('cl.json', { method: 'POST', body: dCP });
        const data2=await res2.json(); myCP = data2; pintaClientes(data2); 

        const dProd = new FormData(); dProd.append('src', 'product');     
        const res1=await fetch(base_url+'Data/getDataCmb/0', { method: 'POST', body: dProd });
        const data1=await res1.json(); myProducts = data1; pintaProductos(data1);
 } 
    catch (error){
       console.log(error);
        if (window.showError) showError('Error al cargar los datos. Intente nuevamente.'); 
    }
}
fetchData();
  
