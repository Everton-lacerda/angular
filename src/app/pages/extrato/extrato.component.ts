import { Component, OnInit } from '@angular/core';
import { ExtratoService } from '../../services/extrato.service';
import {DataSource} from '@angular/cdk/collections';

import { Wallet } from 'src/app/models/wallet';
import {PeriodicElement} from '../../models/table'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  wallets : any
  resWallets: any
  data: any

  dataSource = new UserDataSource(this.extratoService);
  displayedColumns: string[] = ['type', 'date', 'value', 'status', 'description'];

  constructor(private extratoService: ExtratoService) { }


  ngOnInit() {
    const id_user = JSON.parse(localStorage.getItem('user'))
    this.extratoService.getExtratoById(id_user.sub)
    .subscribe(resp => {
      this.wallets = resp
      this.resWallets = JSON.parse(this.wallets)
      console.log(this.resWallets)
    })
    // this.data = new TableBasicExample()

    // const ELEMENT_DATA: PeriodicElement[] = [
    //   {type: '1', date: 'Hydrogen', value: 1.0079, status: 'H', description: 'teste' },
    // ];

  }


  // displayedColumns: string[] = ['type', 'date', 'value', 'status', 'description'];
  // dataSource = ELEMENT_DATA;

}


export class UserDataSource extends DataSource<any> {
  wallets : any
  resWallets: any
  data: any

  constructor(private extratoService: ExtratoService) {
    super();
  }

  connect(): Observable<Wallet[]> {
    const id_user = JSON.parse(localStorage.getItem('user'))
    this.extratoService.getExtratoById(id_user.sub)
    .subscribe(resp => {
      this.wallets = resp
     this.resWallets = JSON.parse(this.wallets)
      // console.log(this.resWallets)
    })
    debugger
    return this.wallets
  }
  disconnect() {}
}
