import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { HttpClient } from '@angular/common/http';
import { PdfLoaderService } from 'src/app/services/pdf-loader.service';
import JSZip from 'jszip';
const FileSaver = require('file-saver');

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface Pdf {
  name: string;
  url: string;
  musicUrl?: string;
}

@Component({
  selector: 'app-sheet-music-viewer',
  templateUrl: './sheet-music-viewer.component.html',
  styleUrls: ['./sheet-music-viewer.component.css'],
})
export class SheetMusicViewerComponent implements OnInit {
  pdfs: Pdf[] = [];
  filteredPdfs: Pdf[] = [];
  selectedPdf: Pdf | null = null;
  searchTerm: string = '';
  musicList: { [key: string]: string } = {};
  pdfLoaded: boolean = false;

  @ViewChild('pdfViewer') pdfViewer!: ElementRef;

  constructor(
    private pdfLoaderService: PdfLoaderService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.pdfLoaderService.getPdfList().subscribe((lines) => {
      this.parsePdfList(lines);
      this.filteredPdfs = this.pdfs;
    });

    this.loadMusicList();
  }

  parsePdfList(lines: string[]): void {
    this.pdfs = lines.map((line) => {
      const [name, url] = line.split(',');
      return { name: name.trim(), url: url.trim() };
    });

    this.sortPdfs();
  }

  loadMusicList(): void {
    this.http
      .get('assets/sheet-music-viewer/music-list.txt', { responseType: 'text' })
      .subscribe((data) => {
        const lines = data.split('\n');
        lines.forEach((line) => {
          const [pdfName, musicUrl] = line.split(',');
          if (pdfName && musicUrl) {
            this.musicList[pdfName.trim()] = musicUrl.trim();
          }
        });
      });
  }

  sortPdfs(): void {
    this.pdfs.sort((a, b) => a.name.localeCompare(b.name));
  }

  filterPdfs(): void {
    const normalizedSearchTerm = this.normalizeString(this.searchTerm);
    this.filteredPdfs = this.pdfs.filter((pdf) =>
      this.normalizeString(pdf.name).includes(normalizedSearchTerm)
    );
  }

  normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredPdfs = this.pdfs;
  }

  selectPdf(event: Event, pdf: Pdf): void {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    pdf.musicUrl = this.musicList[pdf.name] ?? undefined;
    this.selectedPdf = pdf;
    this.pdfLoaded = false;
    this.loadPdf(pdf.url);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      this.scrollToViewer();
    }, 0);
  }

  loadPdf(url: string): void {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((pdf) => {
      const pdfContainer = document.getElementById('pdf-container');
      if (pdfContainer) {
        pdfContainer.innerHTML = '';
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          pdf.getPage(pageNumber).then((page) => {
            const screenWidth = window.innerWidth;
            let scale = screenWidth < 768 ? 0.75 : 1.5;

            const viewport = page.getViewport({ scale: scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d')!;
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            page.render({
              canvasContext: context,
              viewport: viewport,
            });

            pdfContainer.appendChild(canvas);
            
            // Mark as loaded when first page is rendered
            if (pageNumber === 1) {
              this.pdfLoaded = true;
            }
          });
        }
      }
    });
  }

  scrollToViewer(): void {
    if (this.pdfViewer) {
      this.pdfViewer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  closePdfViewer(): void {
    this.selectedPdf = null;
    this.pdfLoaded = false;
    // Restore body scroll
    document.body.style.overflow = '';
    const pdfContainer = document.getElementById('pdf-container');
    if (pdfContainer) {
      pdfContainer.innerHTML = '';
    }
  }

  async downloadAllPdfsAsZip(): Promise<void> {
    const zip = new JSZip();

    for (const pdf of this.pdfs) {
      const response = await fetch(pdf.url);
      const blob = await response.blob();
      zip.file(`${pdf.name}.pdf`, blob);
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'partituras.zip');
    });
  }
}
