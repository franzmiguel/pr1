

console.log("5678")
var table;
$(document).ready(function() {
   table=$('#example').DataTable({
      "ajax": {       
        "url": "data.json",
                "dataSrc": "" 
            },
            "columns": [
                { "data": "sid" }, 
                { "data": "depot"},
                { "data": "uname"},
                { "data": "sDate"},
                { "data": "clName" },
                { "data": "pName"},
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
        const res2=await fetch('../ipa/cl.json', { method: 'POST', body: dCP });
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
  

const pintaClientes = data=>{   
    cargarCombo(JSON.stringify(data), 'combo_clientes', 'combo_cliente',0,'Todos',false,'Cliente',false,true,0,false);
    $('#combo_cliente').select2({destroy:true});//{destroy:true});
    $(document).on('select2:open', () => {document.querySelector('.select2-search__field').focus();});
}


const cmbFilter = data =>{
  [cmb, colFilter] = data;
  let cmbEl, filterValue=''; colVisible = false;
  cmbEl = document.querySelector('#'+cmb);
  filterValue = cmbEl.options[cmbEl.selectedIndex].text
  console.log(data, filterValue, colFilter);
    if (filterValue== 'Todos'||filterValue== 'todas') {filterValue=''; colVisible=true;}
    table.column(colFilter).search(filterValue).draw();   
    table.column(colFilter).visible(colVisible, colVisible);
  }


const change2 = data=>{
  cmb = data[2];
  console.log(666);
  switch (data[2].id) {
    case 'combo_cliente':
      cmbFilter([data[2].id, 4]);
      break;
   case 'combo_producto':
      cmbFilter([data[2].id, 5]);
      break;
       
    // Agrega mÃ¡s casos segÃºn sea necesario
  }
  
}
