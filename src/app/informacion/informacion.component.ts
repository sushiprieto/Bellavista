import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
Usuario=[
{
  nombre:'Victor',
  dni:'30235098T',
  email:'elaburrimientomanda@gmail.com',
  direccion:'c/Siracusa bloque 7',
  categoria:'alevin',
},
{
  nombre:'Victor',
  dni:'30235098T',
  email:'elaburrimientomanda@gmail.com',
  direccion:'c/Siracusa bloque 7',
  categoria:'alevin',
},
{
  nombre:'Victor',
  dni:'30235098T',
  email:'elaburrimientomanda@gmail.com',
  direccion:'c/Siracusa bloque 7',
  categoria:'alevin',
},
{
  nombre:'Victor',
  dni:'30235098T',
  email:'elaburrimientomanda@gmail.com',
  direccion:'c/Siracusa bloque 7',
  categoria:'alevin',
}

]
  constructor() { }

  ngOnInit(): void {
  }

}
