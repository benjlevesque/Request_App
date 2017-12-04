import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Web3Service } from './util/web3.service';
import blockies from 'blockies';

import { routerTransition } from './animations/router.transition';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {

  accounts: string[];
  account: string;
  searchValue: string;
  icon;

  constructor(private web3Service: Web3Service, private router: Router, private route: ActivatedRoute) {
    this.web3Service.searchValue.subscribe(async (searchValue) => {
      this.searchValue = searchValue;
    })
  }

  ngOnInit(): void {
    this.watchAccount();
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
      this.icon = blockies({
        seed: this.account.toLowerCase(),
      });
    });
  }

  search() {
    this.web3Service.setSearchValue(this.searchValue);
    if (this.searchValue && this.searchValue.length <= 42)
      this.router.navigate(['/search', this.searchValue]);
    else
      this.router.navigate(['/request', this.searchValue]);
  }

  goHome() {
    this.web3Service.setSearchValue(null);
    this.router.navigate(['/']);
  }


}
