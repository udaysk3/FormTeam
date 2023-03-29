
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationInstance } from 'ngx-pagination';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// declare var Object: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  data: any =[];
searchText: string = '';
selectedDomain: string = '';
selectedGender: string = '';
selectedAvailability: string = '';
pageIndex: number = 0;
pageSize: number = 20;
selectedUsers: any[] = [];
selectedDomains: any = {};
domains:any = []

ngOnInit() {

  this.http.get('../../../assets/details.json').subscribe( (data: any) => {
    this.data = data;
    length = this.data.length
    for(let i =0;i<length;i++)
    this.domains.push(data[i].domain)
    console.log(this.domains)
  });

}

addToTeam(user: any) {
  if (!this.isUserInTeam(user)) {
    this.selectedUsers.push(user);
    this.selectedDomains[user.domain] = true;
    // alert(user.first_name + " "+ user.last_name + "(" + user.domain +") " + 'is added to the team')
  }
}
constructor(private http:HttpClient) { }

removeFromTeam(user:any) {
  const index = this.selectedUsers.indexOf(user);
  if (index !== -1) {
    this.selectedUsers.splice(index, 1);
    delete this.selectedDomains[user.domain];
  }
}

isUserInTeam(user: any) {
  return this.selectedUsers.includes(user);
}

showTeamDetails() {
  const domains = [...new Set(this.selectedUsers.filter(user => user.available).map(user => user.domain))];
  alert(`Team members:\n\n${this.selectedUsers.map(user => user.first_name + ' ' + user.last_name).join('\n')}\n\nDomains: ${domains.join(', ')}`);
}


  updatePage(event:any) {
    this.pageIndex = event.pageIndex;
  }
  getSelectedDomains(): string[] {
    return Object.getOwnPropertyNames(this.selectedDomains);
  }
  filterData() {
    let filteredData = this.data.filter((user: any) => {
    if (this.selectedDomain && user.domain !== this.selectedDomain) {
    return false;
    }
    if (this.selectedGender && user.gender !== this.selectedGender) {
    return false;
    }
    if (this.selectedAvailability && user.available.toString() !== this.selectedAvailability) {
    return false;
    }
    if (this.searchText) {
    let fullName = user.first_name + ' ' + user.last_name;
    if (!fullName.toLowerCase().includes(this.searchText.toLowerCase())) {
    return false;
    }
    }
    return true;
    });
    return filteredData;
    }
    sorh :boolean = false
    showorhide(){
      this.sorh = !this.sorh
    }
}

