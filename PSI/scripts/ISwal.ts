interface ISwal {
    fire(a: string);
    fire(a: string, b: string, c: string);
    fire(a: object);
    //confirm(a: string, b: string);
}

declare var Swal: ISwal;
//Swal.fire('Any fool can use a computer');