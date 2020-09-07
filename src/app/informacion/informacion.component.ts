import { Component, OnInit } from '@angular/core';
import { InformacionService } from 'src/app/informacion.service';
import { formulario } from 'src/app/Model/formulario.model';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  _formulario: formulario[];

  constructor(private _informacionService: InformacionService) {

   }

  ngOnInit(): void {
    this._informacionService.getDatosFormulario().subscribe(data => {
      this._formulario = data.map(e => {
        return {
          categoria: e.payload.doc.data().Categoria,
          colectivo: e.payload.doc.data().Colectivo,
          direccion: e.payload.doc.data().Direccion,
          dni: e.payload.doc.data().Dni,
          email: e.payload.doc.data().Email,
          nombre: e.payload.doc.data().Nombre,
          p_covid1: e.payload.doc.data().p_covid1,
          p_covid2: e.payload.doc.data().p_covid2,
          p_covid3: e.payload.doc.data().p_covid3,
          p_covid4: e.payload.doc.data().p_covid4,
          p_covid5: e.payload.doc.data().p_covid5,
          p_covid6: e.payload.doc.data().p_covid6,
          telefono: e.payload.doc.data().Telefono
        } as unknown as formulario;
    });
console.log(this._formulario);
  });}

  }
