function showPage(pageId, element){

    // semua halaman
    const pages =
    document.querySelectorAll('.page');

    pages.forEach(page=>{
        page.classList.remove('active');
    });

    // tampilkan halaman aktif
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


/* ====================
   DATA KARYAWAN
==================== */

const alternatif = [

    {
        nama:"Sunandi",
        nilai:[95,90,8,1,29]
    },

    {
        nama:"Gema",
        nilai:[88,85,7,2,31]
    },

    {
        nama:"Dirga",
        nilai:[92,80,6,1,30]
    },

    {
        nama:"Rian",
        nilai:[85,78,5,3,28]
    },

    {
        nama:"Dony",
        nilai:[90,88,9,1,35]
    },

    {
        nama:"Putu",
        nilai:[87,82,4,2,27]
    },

    {
        nama:"Deny",
        nilai:[91,86,7,1,32]
    },

    {
        nama:"Irvan",
        nilai:[84,79,5,4,26]
    },

    {
        nama:"Dedi",
        nilai:[89,84,6,2,33]
    },

    {
        nama:"Ejan",
        nilai:[86,81,5,3,29]
    }
];


/* ====================
   BOBOT KRITERIA
====================

1. Kinerja Penjualan
2. Kepemimpinan
3. Lama Bekerja
4. Pelanggaran
5. Usia

*/

const bobot = [0.30,0.25,0.20,0.15,0.10];


/* ====================
   TAMPILKAN HASIL
==================== */

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
    let min = [];

    for(let j=0; j<5; j++){

        max[j] = Math.max(
            ...alternatif.map(a=>a.nilai[j])
        );

        min[j] = Math.min(
            ...alternatif.map(a=>a.nilai[j])
        );
    }

    let hasil = alternatif.map(a=>{

        let total = 0;

        for(let j=0; j<5; j++){

            let normalisasi;

            // COST
            if(j == 3 || j == 4){

                normalisasi =
                min[j] / a.nilai[j];

            }else{

                // BENEFIT
                normalisasi =
                a.nilai[j] / max[j];
            }

            total +=
            normalisasi * bobot[j];
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

        for(let j=0; j<5; j++){

            let nilai =
            a.nilai[j];

            // COST
            if(j == 3 || j == 4){

                total *= Math.pow(
                    nilai,
                    -bobot[j]
                );

            }else{

                // BENEFIT
                total *= Math.pow(
                    nilai,
                    bobot[j]
                );
            }
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

    for(let j=0; j<5; j++){

        max[j] = Math.max(
            ...alternatif.map(a=>a.nilai[j])
        );

        min[j] = Math.min(
            ...alternatif.map(a=>a.nilai[j])
        );
    }

    let hasil = alternatif.map(a=>{

        let total = 0;

        for(let j=0; j<5; j++){

            let utility;

            // COST
            if(j == 3 || j == 4){

                utility =
                (max[j]-a.nilai[j])/
                (max[j]-min[j]);

            }else{

                // BENEFIT
                utility =
                (a.nilai[j]-min[j])/
                (max[j]-min[j]);
            }

            total +=
            utility*bobot[j];
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
   CHART KARYAWAN
==================== */

const ctx =
document.getElementById('rankingChart');

new Chart(ctx,{

    type:'bar',

    data:{

        labels:[
            'Sunandi',
            'Gema',
            'Dirga',
            'Rian',
            'Dony',
            'Putu',
            'Deny',
            'Irvan',
            'Dedi',
            'Ejan'
        ],

        datasets:[{

            label:'Penilaian Karyawan',

            data:[
                95,
                88,
                92,
                85,
                90,
                87,
                91,
                84,
                89,
                86
            ]

        }]
    }
});