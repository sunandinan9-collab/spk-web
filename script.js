function showPage(pageId, element){

    //semua halaman
    const pages = 
    document.querySelectorAll('.page');

    pages.forEach(page=>{
        page.classList.remove('active');
    });

    //tampilkan halaman aktif
    document
    .getElementById(pageId)
    .classList.add('active');

    // semua menu
    const menus =
    document.querySelectorAll('.menu');

    menus.forEach(menu=>{
        menu.classList.remove('active-menu');
    });

    // menu aktif
    element.classList.add('active-menu');
}

function toggleDarkMode(){
    document.body.classList.toggle('dark');
}

const alternatif = [

    {
        nama:"Supplier A",
        nilai:[80,90,85,88]
    },

    {
        nama:"Supplier B",
        nilai:[70,95,80,90]
    },

    {
        nama:"Supplier C",
        nilai:[85,88,92,84]
    }
];

const bobot = [0.3,0.3,0.2,0.2];

function tampilkanHasil(data){

    let hasilBody =
    document.getElementById("hasilBody");

    hasilBody.innerHTML = "";

    data.forEach((item,index)=>{

        hasilBody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.nilai.toFixed(4)}</td>
                <td>${index+1}</td>
            </tr>
        `;
    });
}

/* ====================
   METODE SAW
==================== */

function hitungSAW(){

    let max = [];

    for(let j=0; j<4; j++){
        max[j] = Math.max(
            ...alternatif.map(a=>a.nilai[j])
        );
    }

    let hasil = alternatif.map(a=>{

        let total = 0;

        for(let j=0; j<4; j++){

            total +=
            (a.nilai[j]/max[j]) * bobot[j];
        }

        return{
            nama:a.nama,
            nilai:total
        };
    });

    hasil.sort((a,b)=>b.nilai-a.nilai);

    tampilkanHasil(hasil);
}

/* ====================
   METODE WP
==================== */

function hitungWP(){

    let hasil = alternatif.map(a=>{

        let total = 1;

        for(let j=0; j<4; j++){

            total *= Math.pow(
                a.nilai[j],
                bobot[j]
            );
        }

        return{
            nama:a.nama,
            nilai:total
        };
    });

    hasil.sort((a,b)=>b.nilai-a.nilai);

    tampilkanHasil(hasil);
}

/* ====================
   METODE SMART
==================== */

function hitungSMART(){

    let max = [];
    let min = [];

    for(let j=0; j<4; j++){

        max[j] = Math.max(
            ...alternatif.map(a=>a.nilai[j])
        );

        min[j] = Math.min(
            ...alternatif.map(a=>a.nilai[j])
        );
    }

    let hasil = alternatif.map(a=>{

        let total = 0;

        for(let j=0; j<4; j++){

            let utility =
            (a.nilai[j]-min[j])/
            (max[j]-min[j]);

            total += utility*bobot[j];
        }

        return{
            nama:a.nama,
            nilai:total
        };
    });

    hasil.sort((a,b)=>b.nilai-a.nilai);

    tampilkanHasil(hasil);
}

/* ====================
   CHART
==================== */

const ctx =
document.getElementById('rankingChart');

new Chart(ctx,{

    type:'bar',

    data:{
        labels:[
            'Supplier A',
            'Supplier B',
            'Supplier C'
        ],

        datasets:[{

            label:'Nilai Supplier',

            data:[85,95,90]

        }]
    }
});