import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { DxDataGridModule } from "devextreme-angular";
import 'devextreme/data/odata/store';
import { Employee  } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  dataSource: any;
  employees: Employee[] | [];
  maxId: number;
  constructor(http: HttpClient) {
    this.employees = [];
    this.maxId = 0;
    this.cloneIconClick = this.cloneIconClick.bind(this);

    http.get<Employee[]>('/employees').subscribe(result => {
      this.employees = result;
      console.log(result);
      if (this.employees.length > 0)
        this.maxId = this.employees[this.employees.length - 1].Id;

    }, error => console.error(error));
    
  }

  title = 'angularapp';

  private static isChief(position:string) {
    return position && ['CEO', 'CMO'].indexOf(position.trim().toUpperCase()) >= 0;
  }

  rowValidating(e: any) {
    const position = e.newData.Position;

    if (AppComponent.isChief(position)) {
      e.errorText = `The company can have only one ${position.toUpperCase()}. Please choose another position.`;
      e.isValid = false;
    }
  }

  editorPreparing(e:any) {
    if (e.parentType === 'dataRow' && e.dataField === 'Position') {
      e.editorOptions.readOnly = AppComponent.isChief(e.value);
    }
  }

  allowDeleting(e:any) {
    return !AppComponent.isChief(e.row.data.Position);
  }

  isCloneIconVisible(e:any) {
    return !e.row.isEditing;
  }

  isCloneIconDisabled(e:any) {
    return AppComponent.isChief(e.row.data.Position);
  }

  cloneIconClick(e:any) {
    const clonedItem = { ...e.row.data, ID: this.getMaxID() };

    this.employees.splice(e.row.rowIndex, 0, clonedItem);
    e.event.preventDefault();
  }

  getMaxID() {
    return ++this.maxId;
  }

}

