import { Component, OnInit } from '@angular/core';
import { InformacionService } from 'src/app/informacion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { formulario } from 'src/app/Model/formulario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  _formulario: formulario[];
  _formularioFiltrado: formulario[] = [];
  EmailAdmin: string;

  infoForm = new FormGroup({
    nombreFilter: new FormControl('')
  });

  constructor(private _informacionService: InformacionService, private router: Router) {
    this.EmailAdmin = "bellavistaud@gmail.com";
  }

  ngOnInit(): void {
    if (this.EmailAdmin != sessionStorage.getItem('email')) {
      this.router.navigate(['/login']);
    }
    this._informacionService.getDatosFormulario().subscribe(data => {
      this._formulario = data.map(e => {
        return {
          fecha: e.payload.doc.get('Fecha'),
          categoria: e.payload.doc.get('Categoria'),
          colectivo: e.payload.doc.get('Colectivo'),
          direccion: e.payload.doc.get('Direccion'),
          dni: e.payload.doc.get('Dni'),
          email: e.payload.doc.get('Email'),
          nombre: e.payload.doc.get('Nombre'),
          p_covid1: e.payload.doc.get('p_covid1'),
          p_covid2: e.payload.doc.get('p_covid2'),
          p_covid3: e.payload.doc.get('p_covid3'),
          p_covid4: e.payload.doc.get('p_covid4'),
          p_covid5: e.payload.doc.get('p_covid5'),
          p_covid6: e.payload.doc.get('p_covid6'),
          telefono: e.payload.doc.get('Telefono')} as unknown as formulario;
      });
      console.log(this._formulario);
    });
  }

  getNombreFiltro() {

    this._formularioFiltrado = [];

    var dni = (<HTMLInputElement>document.getElementById('inputDni')).value;
    var nombre = (<HTMLInputElement>document.getElementById('inputNombre')).value;
    var categoria = (<HTMLInputElement>document.getElementById('inputCategoria')).value;
    // var filtrado: formulario[]

    console.log(" lista filtrada ", dni, " ", nombre, " ", categoria);



    if (dni != "") {
      for (let index = 0; index < this._formulario.length; index++) {
        if (this._formulario[index].dni.includes(dni)) {
          this._formularioFiltrado.push(this._formulario[index])
        }

      }
      console.log(" for dni ", this._formularioFiltrado);
    }

    if (nombre != "" && this._formularioFiltrado.length > 0) {
      for (let index = 0; index < this._formularioFiltrado.length; index++) {
        if (!this._formularioFiltrado[index].nombre.includes(nombre)) {
          this._formularioFiltrado.splice(index, 1)
        }

      }
    } else if (nombre != "") {
      for (let index = 0; index < this._formulario.length; index++) {
        if (this._formulario[index].nombre.includes(nombre)) {
          this._formularioFiltrado.push(this._formulario[index])
        }

      }
    }

    if (categoria != "" && this._formularioFiltrado.length > 0) {
      for (let index = 0; index < this._formularioFiltrado.length; index++) {
        if (!this._formularioFiltrado[index].categoria.includes(categoria)) {
          this._formularioFiltrado.splice(index, 1)
        }

      }
    } else if (categoria != "") {
      for (let index = 0; index < this._formulario.length; index++) {
        if (this._formulario[index].categoria.includes(categoria)) {
          this._formularioFiltrado.push(this._formulario[index])
        }

      }
    }



    // filtrado = this._formulario.filter((formulario: formulario) => formulario.nombre.includes(nombre));
    // this._formulario = filtrado; 

    console.log(" lista filtrada ", this._formularioFiltrado);
  }

  reloadList() {
    window.location.reload();
  }

}
