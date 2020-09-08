import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeForm = new FormGroup({
    colectivo: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    direccion: new FormControl(''),
    radioPregunta1: new FormControl(''),
    radioPregunta2: new FormControl(''),
    radioPregunta3: new FormControl(''),
    radioPregunta4: new FormControl(''),
    radioPregunta5: new FormControl(''),
    radioPregunta6: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    paises: new FormControl(''),
    validateCheck: new FormControl('', [Validators.required]),
    select_categoria: new FormControl('', [Validators.required])
  });

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let Record = {};
    Record['Colectivo'] = this.homeForm.value.colectivo;
    Record['Nombre'] = this.homeForm.value.nombre;
    Record['Dni'] = this.homeForm.value.dni;
    Record['Direccion'] = this.homeForm.value.direccion;
    Record['Telefono'] = this.homeForm.value.telefono;
    Record['Email'] = this.homeForm.value.email;
    Record['Paises/CCAA visitados'] = this.homeForm.value.paises;
    Record['Categoria'] = this.homeForm.value.select_categoria;
    Record['p_covid1'] = this.homeForm.get('radioPregunta1').value;
    Record['p_covid2'] = this.homeForm.get('radioPregunta2').value;
    Record['p_covid3'] = this.homeForm.get('radioPregunta3').value;
    Record['p_covid4'] = this.homeForm.get('radioPregunta4').value;
    Record['p_covid5'] = this.homeForm.get('radioPregunta5').value;
    Record['p_covid6'] = this.homeForm.get('radioPregunta6').value;

    this.authSvc.createUser(Record, this.homeForm.value.nombre).then(res => {
      console.log(Record);
      this.homeForm.reset();
    })

  }

}
