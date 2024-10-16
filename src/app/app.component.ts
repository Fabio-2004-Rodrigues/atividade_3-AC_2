import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common'; // Adicionado o CommonModule e diretivas NgFor e NgIf

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,  
    CommonModule, 
    NgFor,       
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  reservaForm: FormGroup;

  destinos: string[] = ['Paris', 'Nova York', 'Tóquio', 'Rio de Janeiro'];

  constructor(private fb: FormBuilder) {
    this.reservaForm = this.fb.group({
      destino: ['', Validators.required],
      dataIda: ['', Validators.required],
      dataVolta: ['', Validators.required],
      numeroPassageiros: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)]
      ],
      emailContato: [
        '',
        [Validators.required, Validators.email]
      ]
    });
  }

  getErrorMessage(field: string): string {
    if (field === 'emailContato' && this.reservaForm.get(field)?.hasError('email')) {
      return 'Insira um e-mail válido';
    }
    if (field === 'numeroPassageiros' && (this.reservaForm.get(field)?.hasError('min') || this.reservaForm.get(field)?.hasError('max'))) {
      return 'O número de passageiros deve estar entre 1 e 5';
    }
    return 'Campo obrigatório';
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      console.log(this.reservaForm.value);
    }
  }
}
