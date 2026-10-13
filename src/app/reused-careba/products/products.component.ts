import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioReusoDbService } from "src/app/services/inventarioReuso-db.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {

  productos: any[] = [];

  pageSize: number = 8;
  currentPage: number = 1;

  private resizeHandler = () => {
    this.updatePageSize();
  };

  constructor(
    private inventarioDbService: InventarioReusoDbService
  ) {
    this.updatePageSize();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }

  // Obtener los muebles registrados en Firebase
  cargarProductos(): void {
    this.inventarioDbService.obtenerInventarioReuso().subscribe({
      next: (inventario: any[]) => {
        this.productos = inventario;
        this.currentPage = 1;
      },
      error: (error: any) => {
        console.error('Error al cargar los muebles:', error);
      }
    });
  }

  //Productos especifico en WhatsApp
  encodeURIComponent(texto: string): string {
    return encodeURIComponent(texto);
  }

  //Separar descripcion por comas para mostrarlo en vista como una lista
  separarDescripcion(descripcion: string): string[] {
    return descripcion
      .split('.')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }

  // Ajustar cantidad de productos según el dispositivo
  updatePageSize(): void {
    const width = window.innerWidth;

    if (width < 600) {
      this.pageSize = 4;
    } else if (width < 900) {
      this.pageSize = 6;
    } else {
      this.pageSize = 8;
    }
  }

  // Productos correspondientes a la página actual
  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.productos.slice(start, end);
  }

  // Número total de páginas
  get totalPages(): number {
    return Math.ceil(this.productos.length / this.pageSize);
  }

  // Cambiar de página
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }
}
