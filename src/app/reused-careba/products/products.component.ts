import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-products",
  imports: [CommonModule],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  //productos: any[] = []; // ya lo tienes
  pageSize: number = 8; // mostrar 8 productos
  currentPage: number = 1;

    constructor() {
    this.updatePageSize(); // establecer tamaño al cargar
    window.addEventListener("resize", () => this.updatePageSize());
  }

  // ⭐ AJUSTAR CANTIDAD DE PRODUCTOS POR PANTALLA
  updatePageSize() {
    const width = window.innerWidth;

    if (width < 600) {
      this.pageSize = 4;   // ⭐ móviles → 4 productos
    } else if (width < 900) {
      this.pageSize = 6;   // ⭐ tablets → 6 productos
    } else {
      this.pageSize = 8;   // ⭐ escritorio → 8 productos
    }
  }

  productos = [
    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Bueno",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Buró",
      precio: 0,
      estadoTexto: "Excelente",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Muy Bueno",
      disponible: false,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Búro",
      precio: 0,
      estadoTexto: "Nuevo",
      disponible: false,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Nuevo",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Bueno",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Buró",
      precio: 0,
      estadoTexto: "Excelente",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Muy Bueno",
      disponible: false,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Bueno",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Buró",
      precio: 0,
      estadoTexto: "Excelente",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Muy Bueno",
      disponible: false,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Búro",
      precio: 0,
      estadoTexto: "Nuevo",
      disponible: false,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Nuevo",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Mesita de Noche",
      precio: 0,
      estadoTexto: "Bueno",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Buró",
      precio: 0,
      estadoTexto: "Excelente",
      disponible: true,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },

    {
      titulo: "Hola Virys",
      precio: 0,
      estadoTexto: "Muy Bueno",
      disponible: false,
      descripcion: [
        "Combina chapa de madera oscura (tipo Ébano) con laca de alto brillo en tono blanco/crema.",
        "Contraste impactante y líneas limpias.",
        "Herrajes metálicos curvos originales.",
        "Estructura sólida y funcional con dos cajones.",
      ],
      img: "/assets/img/photos/reused/buro2.jpg",
    },
  ];

  // productos ya filtrados según página
  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.productos.slice(start, end);
  }

  // número total de páginas
  get totalPages() {
    return Math.ceil(this.productos.length / this.pageSize);
  }

  // cambiar de página
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}
