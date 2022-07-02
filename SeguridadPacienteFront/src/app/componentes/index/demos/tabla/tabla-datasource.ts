import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TablaItem {
  name: string;
  id: number;
  externo: number;
  responsable: string;
  oportunidad: string;
  porcentaje: number;
  fecha : string;
  empresa : string;
  edad : string;
  sexo : string;
  tipo : string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TablaItem[] = [
  {id: 1, name: 'juanito', externo : 123, porcentaje : 10, responsable: 'Jair Villarreal', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'Calidad medica - Calle 18', edad : '18', sexo : 'M', tipo : 'tipo 1'  },
  {id: 2, name: 'sutanito', externo : 124, porcentaje : 5, responsable: 'Jazmin Camacho', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'Calidad medica - PAD', edad : '8', sexo : 'F', tipo : 'tipo 2'},
  {id: 3, name: 'perencigito', externo : 125, porcentaje : 80, responsable: 'Luis Castro', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'Contact Center - Principal', edad : '80', sexo : 'M', tipo : 'tipo 3'},
  {id: 4, name: 'Beryllium', externo : 126, porcentaje : 16, responsable: 'Andres Diaz', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'Contact Center - Principal', edad : '16', sexo : 'F', tipo : 'tipo 1'},
  {id: 5, name: 'Boron', externo : 127, porcentaje : 76, responsable: 'Juan Carlos', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'Calidad medica - Calle 18', edad : '60', sexo : 'M', tipo : 'tipo 2'},
  {id: 6, name: 'Carbon', externo : 128, porcentaje : 10, responsable: 'daniel Sanz', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'farmacia - CAD', edad : '30', sexo : 'F', tipo : 'tipo 2'},
  {id: 7, name: 'Nitrogen', externo : 129, porcentaje : 50, responsable: 'Jair', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'farmacia - Prado', edad : '18', sexo : 'M', tipo : 'tipo 1'},
  {id: 8, name: 'Oxygen', externo : 102, porcentaje : 20, responsable: 'Jair', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'Calidad medica - Calle 18', edad : '22', sexo : 'F', tipo : 'tipo 3'},
  {id: 9, name: 'Fluorine', externo : 13, porcentaje : 11, responsable: 'Jair', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'Calidad medica - Calle 18', edad : '45', sexo : 'F', tipo : 'tipo 4'},
  {id: 10, name: 'Neon', externo : 1211, porcentaje : 100, responsable: 'Jair', oportunidad: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut arcu at sem egestas', fecha : '2021-01-01', empresa : 'Calidad medica - Calle 18', edad : '53', sexo : 'M', tipo : 'tipo 1'},
];

/**
 * Data source for the Tabla view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TablaDataSource extends DataSource<TablaItem> {
  data: TablaItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TablaItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TablaItem[]): TablaItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TablaItem[]): TablaItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'responsable': return compare(+a.responsable, +b.responsable, isAsc);
        case 'fecha': return compare(+a.fecha, +b.fecha, isAsc);
        case 'externo': return compare(+a.externo, +b.externo, isAsc);
        case 'sexo': return compare(+a.sexo, +b.sexo, isAsc);
        case 'tipo': return compare(+a.tipo, +b.tipo, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
