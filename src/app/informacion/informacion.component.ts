import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InformacionService } from 'src/app/informacion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { formulario } from 'src/app/Model/formulario.model';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})

export class InformacionComponent implements OnInit {
  _formularioPrueba: formulario[];
  _formulario: formulario[];
  _formularioFiltrado: formulario[] = [];
  EmailAdmin: string;

  infoForm = new FormGroup({
    nombreFilter: new FormControl('')
  });

  constructor(private _informacionService: InformacionService, private router: Router, private db: AngularFirestore) {
    this.EmailAdmin = "bellavistaud@gmail.com";
  }

  ngOnInit(): void {
    if (this.EmailAdmin != sessionStorage.getItem('email')) {
      this.router.navigate(['/login']);
    }
    this._informacionService.getDatosFormulario().subscribe(data => {
      this._formulario = data.map(e => {
        return {
          collection: e.payload.doc.id,
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
          telefono: e.payload.doc.get('Telefono')
        } as unknown as formulario;
      });
      console.log(this._formulario);
    });

    this._informacionService.getDatosFormularioPruebas().subscribe(data => {
      this._formularioPrueba = data.map(e => {
        return {
          collection: e.payload.doc.id
        } as unknown as formulario;
      });
      console.log(this._formulario);
    });

  }

  getNombreFiltro() {

    this._formularioFiltrado = [];

    var dni = (<HTMLInputElement>document.getElementById('inputDni')).value;
    var nombre = (<HTMLInputElement>document.getElementById('inputNombre')).value;
    var categoria = (<HTMLInputElement>document.getElementById('inputCategoria')).value;
    // var fecha = (<HTMLInputElement>document.getElementById('inputFecha')).value;

    //console.log("prueba de elementos", dni, " ", nombre, " ", categoria, " ", fecha);
    // console.log(" fecha bbdd ", this._formulario[0].fecha);
    // console.log(" fecha seleccionada ", fecha);

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

    // if (fecha != "" && this._formularioFiltrado.length > 0) {
    //   for (let index = 0; index < this._formularioFiltrado.length; index++) {
    //     if (!this._formularioFiltrado[index].fecha.includes(fecha)) {
    //       this._formularioFiltrado.splice(index, 1)
    //     }

    //   }
    // } else if (fecha != "") {
    //   for (let index = 0; index < this._formulario.length; index++) {
    //     if (this._formulario[index].fecha.includes(fecha)) {
    //       this._formularioFiltrado.push(this._formulario[index])
    //     }

    //   }
    // }

    console.log(" lista filtrada ", this._formularioFiltrado);
  }

  borrarTodo() {
    for (let index = 0; index < this._formulario.length; index++) {
      this.db.collection("Personas").doc(this._formulario[index].collection).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }

  }
  borrarTodo2() {
    for (let index = 0; index < this._formularioPrueba.length; index++) {
      this.db.collection("Prueba").doc(this._formularioPrueba[index].collection).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }

  }


  reloadList() {
    window.location.reload();
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  @ViewChild('content') content: ElementRef
  public generarPdf() {

    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    }

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('prueba.pdf')

  }

  exportAsPDF(div_id)
  {
    let data = document.getElementById(div_id);  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
      pdf.addImage(contentDataURL, 'PNG', 0, 0, canvas.width, canvas.height); 
      pdf.save('listado_personas_club_deportivo_bellavista.pdf');   
    }); 
  }

}
